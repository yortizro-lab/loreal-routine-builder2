const assert = require("node:assert/strict");
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

test("Worker root health check is safe and does not change other routes", async () => {
  const worker = require("../src/index.ts").default;
  const env = { OPENAI_API_KEY: "test-key", OPENAI_MODEL: "private-config" };
  global.fetch = async () => { throw new Error("Health check must not call OpenAI"); };

  const health = await worker.fetch(new Request("https://worker.example/"), env);
  assert.equal(health.status, 200);
  assert.equal(health.headers.get("cache-control"), "no-store");
  assert.deepEqual(await health.json(), { status: "ok" });
  const withoutKey = await worker.fetch(new Request("https://worker.example/"), {});
  assert.equal(withoutKey.status, 200);
  assert.deepEqual(await withoutKey.json(), { status: "ok" });
  for (const [path, method] of [["/", "POST"], ["/unknown", "GET"], ["/api/routine", "GET"]]) {
    const response = await worker.fetch(new Request(`https://worker.example${path}`, { method }), env);
    assert.equal(response.status, 405);
    assert.deepEqual(await response.json(), { error: "Method not allowed." });
  }
});

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
      assert.equal(model, "gpt-4.1");
      assert.equal(tools[0].type, "web_search");
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
      for (const status of [400, 401, 403, 404, 429, 500]) {
        global.fetch = async () => Response.json({ error: { message: "test-key" } }, { status });
        const response = await worker.fetch(request(), { OPENAI_API_KEY: "test-key" });
        assert.equal(response.status, 502);
        const body = await response.text();
        assert.match(body, new RegExp(`OpenAI API error \\(${status}\\)`));
        if (status === 400) assert.match(body, /request and model configuration/);
        assert.doesNotMatch(body, /test-key/);
      }
      global.fetch = async () => new Response(new ReadableStream({
        start(controller) { controller.error(new Error("test-key")); },
      }), { status: 401 });
      let response = await worker.fetch(request(), { OPENAI_API_KEY: "test-key" });
      assert.equal(response.status, 502);
      assert.match(await response.text(), /OpenAI API error \(401\)/);
      global.fetch = async () => { throw new Error("test-key"); };
      response = await worker.fetch(request(), { OPENAI_API_KEY: "test-key" });
      assert.equal(response.status, 502);
      assert.doesNotMatch(await response.text(), /test-key/);
      assert.doesNotMatch(logs.join("\n"), /test-key/);
    } finally {
      console.error = originalError;
    }
  });

test("Worker uses the configured OpenAI model", async () => {
  const worker = require("../src/index.ts").default;
  global.fetch = async (_url, options) => {
    assert.equal(JSON.parse(options.body).model, "configured-model");
    return Response.json(openAiResult);
  };
  const response = await worker.fetch(request(), {
    OPENAI_API_KEY: "test-key",
    OPENAI_MODEL: "configured-model",
  });
  assert.equal(response.status, 200);
});
