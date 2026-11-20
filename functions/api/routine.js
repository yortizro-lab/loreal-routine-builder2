import { getOutputText, getRoutineInstructions } from "../../src/openai-response.cjs";

export async function onRequestPost(context) {
  try {
    if (!context.env.OPENAI_API_KEY) {
      return jsonResponse(500, { error: "OpenAI API access is not configured." });
    }

    let payload;
    try {
      payload = await context.request.json();
    } catch (error) {
      if (error instanceof SyntaxError) {
        return jsonResponse(400, { error: "Invalid JSON request." });
      }
      throw error;
    }
    const products = Array.isArray(payload.products) ? payload.products : [];
    const conversation = Array.isArray(payload.conversation) ? payload.conversation : [];
    console.log("Received products:", products);

    if ((!products.length && !conversation.length) || products.length > 20) {
      return jsonResponse(400, {
        error: products.length > 20 ? "Too many products selected." : "Select at least one product.",
      });
    }

    const selectedProducts = products
      .filter((product) => product && typeof product.name === "string")
      .slice(0, 20)
      .map((product) => ({
        name: product.name.slice(0, 200),
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
        Authorization: `Bearer ${context.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: context.env.OPENAI_MODEL || "gpt-4o-mini",
        tools: [{ type: "web_search_preview" }],
        instructions: getRoutineInstructions(selectedProducts),
        input,
      }),
    });

    const upstreamText = await openAiResponse.text();
    let data;
    let malformedJson = false;
    try {
      data = JSON.parse(upstreamText);
    } catch {
      malformedJson = true;
      data = { output: [] };
    }

    if (!openAiResponse.ok) {
      const upstreamMessage =
        typeof data.error === "string"
          ? data.error
          : data.error?.message || upstreamText.slice(0, 1_000) || "No error details returned";
      console.error(
        `OpenAI API error: status=${openAiResponse.status} body=${upstreamText.slice(0, 2_000)}`
      );
      return jsonResponse(502, {
        error: `OpenAI API error (${openAiResponse.status}): ${upstreamMessage}`,
      });
    }

    if (malformedJson) {
      console.error(`OpenAI API returned malformed JSON: status=${openAiResponse.status} body=${upstreamText.slice(0, 2_000)}`);
      return jsonResponse(502, {
        error: `OpenAI API returned invalid JSON (HTTP ${openAiResponse.status}): ${upstreamText.slice(0, 1_000)}`,
      });
    }

    const routine = getOutputText(data);
    if (!routine) {
      return jsonResponse(502, { error: "OpenAI returned an empty routine." });
    }

    const citations = [];
    for (const item of data.output || []) {
      for (const content of item.content || []) {
        for (const annotation of content.annotations || []) {
          if (annotation.type === "url_citation" && annotation.url) {
            const exists = citations.some((citation) => citation.url === annotation.url);
            if (!exists) {
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
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : "Unable to generate a routine.",
    });
  }
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Allow": "POST, OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}

function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
