import { getOutputText, getRoutineInstructions } from "./openai-response.cjs";

interface Env {
  OPENAI_API_KEY: string;
  OPENAI_MODEL?: string;
  ENABLE_WEB_SEARCH?: string;
  ALLOWED_ORIGIN?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/" && request.method === "GET") {
      return jsonResponse(200, { status: "ok" });
    }

    if (url.pathname === "/api/routine") {
      const origin = request.headers.get("Origin");
      const allowedOrigin = origin && (origin === url.origin || origin === env.ALLOWED_ORIGIN) ? origin : null;
      const corsHeaders = new Headers({ Vary: "Origin", Allow: "POST, OPTIONS" });
      if (allowedOrigin) {
        corsHeaders.set("Access-Control-Allow-Origin", allowedOrigin);
        corsHeaders.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        corsHeaders.set("Access-Control-Allow-Headers", "Content-Type");
      }

      let response: Response;
      if (origin && !allowedOrigin) {
        response = jsonResponse(403, { error: "Origin not allowed." });
      } else if (request.method === "OPTIONS") {
        response = new Response(null, { status: 204 });
      } else if (request.method !== "POST") {
        response = jsonResponse(405, { error: "Method not allowed." });
      } else {
        response = await generateRoutine(request, env);
      }
      corsHeaders.forEach((value, key) => response.headers.set(key, value));
      return response;
    }

    return jsonResponse(405, { error: "Method not allowed." });
  },
};

async function generateRoutine(request: Request, env: Env): Promise<Response> {
  try {
    if (!env.OPENAI_API_KEY) {
      return jsonResponse(500, { error: "OpenAI API access is not configured." });
    }

    let payload: {
      products?: Array<{ name?: string; category?: string }>;
      conversation?: ChatMessage[];
    };
    try {
      payload = await request.json() as typeof payload;
    } catch (error) {
      if (error instanceof SyntaxError) {
        return jsonResponse(400, { error: "Invalid JSON request." });
      }
      throw error;
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return jsonResponse(400, { error: "Expected a JSON object." });
    }
    const products = Array.isArray(payload.products) ? payload.products : [];
    const conversation = Array.isArray(payload.conversation) ? payload.conversation : [];

    if (!products.length && !conversation.length) {
      return jsonResponse(400, { error: "Select at least one product." });
    }
    if (products.length > 20) {
      return jsonResponse(400, { error: "Too many products selected." });
    }

    const selectedProducts = products
      .filter((product) => product && typeof product.name === "string")
      .slice(0, 20)
      .map((product) => ({
        name: (product.name || "").slice(0, 200),
        category: typeof product.category === "string" ? product.category.slice(0, 100) : "Product",
      }));

    const priorMessages = conversation
      .filter((message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
      )
      .slice(-12)
      .map((message) => ({
        role: message.role,
        content: message.content.slice(0, 2_000),
      }));

    const input = [
      ...priorMessages,
      ...(priorMessages.length === 0
        ? [{
            role: "user",
            content: `Create my routine from these selected products:\n${JSON.stringify(selectedProducts, null, 2)}`,
          }]
        : []),
    ];

    const model = env.OPENAI_MODEL || "gpt-4.1";
    // Web search is off unless ENABLE_WEB_SEARCH is exactly "true".
    const webSearch = env.ENABLE_WEB_SEARCH === "true";

    let openAiResponse: Response;
    try {
      openAiResponse = await fetch(OPENAI_RESPONSES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          ...(webSearch ? { tools: [{ type: "web_search" }] } : {}),
          instructions: getRoutineInstructions(selectedProducts, webSearch),
          input,
        }),
      });
    } catch (error) {
      const name = error instanceof Error ? error.name : "UnknownError";
      const message = sanitizeForLog(error instanceof Error ? error.message : String(error), env);
      console.error(`OpenAI fetch failed: ${name}: ${message}`);
      return jsonResponse(502, {
        error: `Unable to reach OpenAI (network error: ${name}). Check Worker logs.`,
      });
    }

    console.log(`OpenAI request url=${OPENAI_RESPONSES_URL} model=${model} web_search=${webSearch} status=${openAiResponse.status}`);

    if (!openAiResponse.ok) {
      const rawBody = await openAiResponse.text().catch(() => "");
      let detail = "";
      let errorCode = "";
      let errorType = "";
      try {
        const err = (JSON.parse(rawBody) as { error?: { code?: string; type?: string } }).error;
        if (typeof err?.code === "string") errorCode = err.code.slice(0, 64);
        if (typeof err?.type === "string") errorType = err.type.slice(0, 64);
        const code = err?.code || err?.type;
        if (typeof code === "string" && /^[\w.-]{1,64}$/.test(code)) detail = ` [${code}]`;
      } catch {}
      console.error(
        `OpenAI API error: status=${openAiResponse.status} code=${errorCode || "none"} type=${errorType || "none"} model=${model} url=${OPENAI_RESPONSES_URL} body=${sanitizeForLog(rawBody, env).slice(0, 2_000)}`,
      );
      const hints: Record<number, string> = {
        400: "Check the request and model configuration.",
        401: "Check the Worker API key.",
        403: "Check API key permissions and model access.",
        404: errorCode === "model_not_found"
          ? "The model was not found or this API key cannot access it. Check OPENAI_MODEL."
          : "Check the API endpoint and model configuration.",
        429: "Check your OpenAI rate limits and billing.",
      };
      return jsonResponse(502, {
        error: `OpenAI API error (${openAiResponse.status})${detail}. ${hints[openAiResponse.status] || "Try again later or check Worker logs."}`,
      });
    }

    let data: {
      output_text?: string;
      output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string; annotations?: Array<{ type?: string; url?: string; title?: string }> }> }>;
    };
    try {
      data = await openAiResponse.json() as typeof data;
    } catch {
      console.error(`OpenAI API returned malformed JSON: status=${openAiResponse.status}`);
      return jsonResponse(502, {
        error: `OpenAI API returned invalid JSON (HTTP ${openAiResponse.status}).`,
      });
    }

    const routine = getOutputText(data);
    if (!routine) {
      return jsonResponse(502, { error: "OpenAI returned an empty routine." });
    }

    const citations: Array<{ title: string; url: string }> = [];
    for (const item of data.output || []) {
      for (const content of item.content || []) {
        for (const annotation of content.annotations || []) {
          if (annotation.type === "url_citation" && annotation.url) {
            if (!citations.some((citation) => citation.url === annotation.url)) {
              let title = "Source";
              try {
                title = annotation.title || new URL(annotation.url).hostname;
              } catch {}
              citations.push({ title, url: annotation.url });
            }
          }
        }
      }
    }

    return jsonResponse(200, { routine, citations });
  } catch {
    console.error("Unable to generate a routine.");
    return jsonResponse(500, { error: "Unable to generate a routine. Check Worker logs." });
  }
}

function sanitizeForLog(text: string, env: Env): string {
  let out = text;
  if (env.OPENAI_API_KEY) out = out.split(env.OPENAI_API_KEY).join("[REDACTED]");
  return out
    .replace(/sk-[A-Za-z0-9_-]{8,}/g, "[REDACTED]")
    .replace(/Bearer\s+[A-Za-z0-9._~+\/=-]+/gi, "Bearer [REDACTED]");
}

function jsonResponse(status: number, payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
