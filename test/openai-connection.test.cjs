const assert = require("node:assert/strict");
const http = require("node:http");
const { after, test } = require("node:test");
const { getOutputText } = require("../src/openai-response.cjs");

const originalFetch = global.fetch;
after(() => { global.fetch = originalFetch; });

const openAiResult = {
  output: [
    { type: "web_search_call", status: "completed" },
    {
      type: "message",
      role: "assistant",
      content: [
        { type: "output_text", text: "Morning: ", annotations: [] },
        {
          type: "output_text",
          text: "apply sunscreen.",
          annotations: [{ type: "url_citation", url: "https://example.com/guide", title: "Guide" }],
        },
      ],
    },
  ],
};

function request(body = JSON.stringify({ products: [{ name: "Sunscreen" }] })) {
  return new Request("https://example.com/api/routine", { method: "POST", body });
}

test("extracts raw Responses API text and preserves SDK-style fallback", () => {
  assert.equal(getOutputText(openAiResult), "Morning: apply sunscreen.");
  assert.equal(getOutputText({ output_text: "  fallback  " }), "fallback");
  assert.equal(getOutputText({ output: [{ type: "message", content: [{ type: "refusal", text: "No" }] }] }), "");
});

for (const [name, loadHandler] of [
  ["Worker", async () => {
    const worker = require("../src/index.ts").default;
    return (req, key = "test-key") => worker.fetch(req, { OPENAI_API_KEY: key });
  }],
  ["Pages", async () => {
    const { onRequest } = await import("../functions/api/routine.js");
    return (req, key = "test-key") => onRequest({ request: req, env: { OPENAI_API_KEY: key } });
  }],
]) {
  test(`${name} handles raw OpenAI responses and reports failures safely`, async () => {
    const handler = await loadHandler();
    global.fetch = async (url, options) => {
      assert.equal(url, "https://api.openai.com/v1/responses");
      assert.equal(options.method, "POST");
      assert.equal(options.headers["Content-Type"], "application/json");
      assert.equal(options.headers.Authorization, "Bearer test-key");
      const { model, tools, instructions, input } = JSON.parse(options.body);
      assert.equal(model, "gpt-6-luna");
      assert.equal(tools[0].type, "web_search_preview");
      assert.match(input[0].content, /Sunscreen/);
      assert.match(instructions, /skincare, haircare, makeup/);
      assert.match(instructions, /L'Oreal Paris and Maybelline/);
      return Response.json(openAiResult);
    };
    let response = await handler(request());
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      routine: "Morning: apply sunscreen.",
      citations: [{ title: "Guide", url: "https://example.com/guide" }],
    });

    global.fetch = async () => Response.json({ output: [] });
    response = await handler(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error, "OpenAI returned an empty routine.");

    global.fetch = async () => Response.json({ error: { message: "Rate limit exceeded." } }, { status: 429 });
    response = await handler(request());
    assert.equal(response.status, 502);
    assert.match((await response.json()).error, /OpenAI API error \(429\).*rate limits/);

    response = await handler(request(), "");
    assert.equal(response.status, 500);
    assert.match((await response.json()).error, /not configured/);

    response = await handler(request("{"));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, "Invalid JSON request.");

    global.fetch = async () => new Response("not JSON");
    const originalError = console.error;
    let logged = false;
    console.error = () => { logged = true; };
    try {
      response = await handler(request());
      assert.equal(response.status, 502);
      assert.equal((await response.json()).error, "OpenAI API returned invalid JSON (HTTP 200).");
      assert.equal(logged, true);
    } finally {
      console.error = originalError;
    }
  });
}

  test("Worker CORS covers preflight, success and errors only for configured origins", async () => {
    const worker = require("../src/index.ts").default;
    const env = { OPENAI_API_KEY: "test-key", ALLOWED_ORIGIN: "https://site.pages.dev" };
    const send = (method, origin, body) => worker.fetch(new Request("https://worker.example/api/routine", {
      method, headers: { Origin: origin }, ...(body ? { body } : {}),
    }), env);

    const preflight = await send("OPTIONS", "https://site.pages.dev");
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get("access-control-allow-origin"), "https://site.pages.dev");
    assert.match(preflight.headers.get("access-control-allow-methods"), /POST/);
    assert.match(preflight.headers.get("access-control-allow-headers"), /Content-Type/i);

    global.fetch = async (_url, options) => {
      assert.deepEqual(JSON.parse(options.body).input, [{ role: "user", content: "Hi" }]);
      return Response.json(openAiResult);
    };
    const success = await send("POST", "https://site.pages.dev", JSON.stringify({ conversation: [{ role: "user", content: "Hi" }] }));
    assert.equal(success.status, 200);
    assert.equal(success.headers.get("access-control-allow-origin"), "https://site.pages.dev");
    const method = await send("GET", "https://site.pages.dev");
    assert.equal(method.status, 405);
    assert.equal(method.headers.get("access-control-allow-origin"), "https://site.pages.dev");
    const blocked = await send("POST", "https://other.example", "{}");
    assert.equal(blocked.status, 403);
    assert.equal(blocked.headers.get("access-control-allow-origin"), null);
    const sameOrigin = await send("OPTIONS", "https://worker.example");
    assert.equal(sameOrigin.headers.get("access-control-allow-origin"), "https://worker.example");
    assert.equal(success.headers.get("vary"), "Origin");
    const missingKey = await worker.fetch(new Request("https://worker.example/api/routine", {
      method: "POST", headers: { Origin: "https://site.pages.dev" }, body: "{}",
    }), { ALLOWED_ORIGIN: "https://site.pages.dev" });
    assert.equal(missingKey.status, 500);
    assert.equal(missingKey.headers.get("access-control-allow-origin"), "https://site.pages.dev");
  });

  test("Worker reports upstream failures without exposing response bodies or keys", async () => {
    const worker = require("../src/index.ts").default;
    const logs = [];
    const originalError = console.error;
    console.error = (...args) => logs.push(args.join(" "));
    try {
      for (const status of [401, 404, 429, 500]) {
        global.fetch = async () => Response.json({ error: { message: "test-key" } }, { status });
        const response = await worker.fetch(request(), { OPENAI_API_KEY: "test-key" });
        assert.equal(response.status, 502);
        const body = await response.text();
        assert.match(body, new RegExp(`OpenAI API error \\(${status}\\)`));
        assert.doesNotMatch(body, /test-key/);
      }
      global.fetch = async () => { throw new Error("test-key"); };
      const response = await worker.fetch(request(), { OPENAI_API_KEY: "test-key" });
      assert.equal(response.status, 502);
      assert.doesNotMatch(await response.text(), /test-key/);
      assert.doesNotMatch(logs.join("\n"), /test-key/);
    } finally {
      console.error = originalError;
    }
  });

test("local server returns text from a raw OpenAI response", async () => {
  const oldPort = process.env.PORT;
  const oldKey = process.env.OPENAI_API_KEY;
  const originalCreateServer = http.createServer;
  let server;
  process.env.PORT = "0";
  process.env.OPENAI_API_KEY = "test-key";
  global.fetch = async (_url, options) => {
    const { instructions } = JSON.parse(options.body);
    assert.match(instructions, /skincare, haircare, makeup/);
    assert.match(instructions, /L'Oreal Paris and Maybelline/);
    return Response.json(openAiResult);
  };
  http.createServer = (...args) => {
    server = originalCreateServer(...args);
    return server;
  };
  try {
    require("../server.js");
    await new Promise((resolve) => server.once("listening", resolve));
    const result = await new Promise((resolve, reject) => {
      const req = http.request({
        host: "127.0.0.1",
        port: server.address().port,
        path: "/api/routine",
        method: "POST",
      }, (res) => {
        let body = "";
        res.on("data", (chunk) => { body += chunk; });
        res.on("end", () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
      });
      req.on("error", reject);
      req.end(JSON.stringify({ products: [{ name: "Sunscreen" }] }));
    });
    assert.equal(result.status, 200);
    assert.equal(result.body.routine, "Morning: apply sunscreen.");
    assert.deepEqual(result.body.citations, [{ title: "Guide", url: "https://example.com/guide" }]);
  } finally {
    http.createServer = originalCreateServer;
    if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    if (oldPort === undefined) delete process.env.PORT; else process.env.PORT = oldPort;
    if (oldKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = oldKey;
  }
});
