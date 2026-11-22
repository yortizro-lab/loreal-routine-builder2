import { getOutputText, getRoutineInstructions } from "./openai-response.cjs";

interface Env {
  OPENAI_API_KEY: string;
  OPENAI_MODEL?: string;
  ALLOWED_ORIGIN?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

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

    let openAiResponse: Response;
    try {
      openAiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-4.1-mini",
          tools: [{ type: "web_search" }],
          instructions: getRoutineInstructions(selectedProducts),
          input,
        }),
      });
    } catch {
      console.error("Unable to reach OpenAI.");
      return jsonResponse(502, { error: "Unable to reach OpenAI. Try again later." });
    }

    if (!openAiResponse.ok) {
      console.error(`OpenAI API error: status=${openAiResponse.status}`);
      const hints: Record<number, string> = {
        400: "Check the request and model configuration.",
        401: "Check the Worker API key.",
        403: "Check API key permissions and model access.",
        404: "Check the API endpoint and model configuration.",
        429: "Check your OpenAI rate limits and billing.",
      };
      return jsonResponse(502, {
        error: `OpenAI API error (${openAiResponse.status}). ${hints[openAiResponse.status] || "Try again later or check Worker logs."}`,
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

function jsonResponse(status: number, payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
