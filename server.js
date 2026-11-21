import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import openaiResponse from "./src/openai-response.cjs";

const { getOutputText, getRoutineInstructions } = openaiResponse;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = Number(process.env.PORT || 4173);
const root = path.join(__dirname, "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

async function readJson(request) {
  let body = "";
  for await (const chunk of request) body += chunk;
  if (body.length > 100_000) throw new Error("Request body is too large.");
  return JSON.parse(body || "{}");
}

async function generateRoutine(products, conversation) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API access is not configured. Set OPENAI_API_KEY on the server.");
  }

  const selectedProducts = products.map((product) => ({
    name: product.name,
    category: product.category,
  }));
  const priorMessages = conversation
    .filter((message) => message && (message.role === "user" || message.role === "assistant") && typeof message.content === "string")
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

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-6-luna",
      tools: [{ type: "web_search_preview" }],
      instructions: getRoutineInstructions(selectedProducts),
      input,
    }),
  });

  if (!response.ok) {
    console.error(`OpenAI API error: status=${response.status}`);
    throw new Error(`OpenAI API error (${response.status}). Check the API key, model access, rate limits, and billing.`);
  }
  const data = await response.json();

  const text = getOutputText(data);
  const citations = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      for (const annotation of content.annotations || []) {
        if (annotation.type === "url_citation" && annotation.url) {
          const exists = citations.some((citation) => citation.url === annotation.url);
          if (!exists) {
            let host = "Source";
            try {
              host = new URL(annotation.url).hostname;
            } catch {}
            citations.push({
              title: annotation.title || host,
              url: annotation.url,
            });
          }
        }
      }
    }
  }

  return { routine: text, citations };
}

const server = http.createServer(async (request, response) => {
  if (request.method === "POST" && request.url === "/api/routine") {
    try {
      const payload = await readJson(request);
      const conversation = Array.isArray(payload.conversation) ? payload.conversation : [];
      if (!Array.isArray(payload.products) || (payload.products.length === 0 && conversation.length === 0)) {
        return sendJson(response, 400, { error: "Select at least one product." });
      }
      if (payload.products.length > 20) {
        return sendJson(response, 400, { error: "Too many products selected." });
      }

      const result = await generateRoutine(payload.products, conversation);
      if (!result.routine) throw new Error("OpenAI returned an empty routine.");
      return sendJson(response, 200, result);
    } catch (error) {
      const status = error instanceof SyntaxError ? 400 : 502;
      const message = error instanceof SyntaxError
        ? "Invalid JSON request or OpenAI response."
        : error instanceof Error && (error.message.startsWith("OpenAI API error (") || error.message.startsWith("OpenAI API access is not configured") || error.message === "OpenAI returned an empty routine.")
          ? error.message
          : "Unable to generate a routine. Check server logs.";
      if (message === "Unable to generate a routine. Check server logs.") console.error(message);
      return sendJson(response, status, { error: message });
    }
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  const pathname = request.url === "/" ? "/index.html" : new URL(request.url, "http://localhost").pathname;
  const filePath = path.resolve(root, `.${pathname}`);
  if (!filePath.startsWith(root + path.sep)) {
    return sendJson(response, 403, { error: "Forbidden." });
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(request.method === "HEAD" ? undefined : content);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Routine builder running at http://127.0.0.1:${port}`);
});
