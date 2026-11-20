import { getOutputText } from "./openai-response.cjs";

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  OPENAI_API_KEY: string;
  OPENAI_MODEL?: "gpt-4o-mini";
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/routine") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204 });
      }

      if (request.method !== "POST") {
        return jsonResponse(405, { error: "Method not allowed." });
      }

      return generateRoutine(request, env);
    }

    if (request.method === "GET" || request.method === "HEAD") {
      return env.ASSETS.fetch(request);
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

    const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || "gpt-4o-mini",
        tools: [{ type: "web_search_preview" }],
        instructions:
          "You are a skincare routine advisor. Create a safe, practical personalized routine using only the products supplied by the user. Explain the morning and evening order, use concise clear steps, and state where a product is not appropriate for a certain time of day. Include sunscreen in the morning if it is among the selected products. Do not invent products or ingredients. Add a brief reminder to patch-test and stop use if irritation occurs.\n\nUse current, real-world skincare guidance and product facts. Search the web when relevant, and cite or link every substantial claim that depends on current information or official product guidance.\n\nSelected products:\n" +
          JSON.stringify(selectedProducts, null, 2),
        input,
      }),
    });

    const data = await openAiResponse.json() as {
      output_text?: string;
      output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string; annotations?: Array<{ type?: string; url?: string; title?: string }> }> }>;
      error?: { message?: string };
    };

    if (!openAiResponse.ok) {
      return jsonResponse(openAiResponse.status === 429 ? 429 : 502, {
        error: data.error?.message || "The OpenAI API request failed.",
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
  } catch (error) {
    console.error("Unable to generate a routine:", error);
    return jsonResponse(500, { error: "Unable to generate a routine." });
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
