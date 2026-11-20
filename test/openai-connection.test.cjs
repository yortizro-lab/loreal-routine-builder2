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
    const { onRequestPost } = await import("../functions/api/routine.js");
    return (req, key = "test-key") => onRequestPost({ request: req, env: { OPENAI_API_KEY: key } });
  }],
]) {
  test(`${name} handles raw OpenAI responses and reports failures safely`, async () => {
    const handler = await loadHandler();
    global.fetch = async (url, options) => {
      assert.equal(url, "https://api.openai.com/v1/responses");
      assert.equal(options.headers.Authorization, "Bearer test-key");
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
    assert.equal(response.status, 429);
    assert.equal((await response.json()).error, "Rate limit exceeded.");

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
      assert.equal(response.status, 500);
      assert.deepEqual(await response.json(), { error: "Unable to generate a routine." });
      assert.equal(logged, true);
    } finally {
      console.error = originalError;
    }
  });
}

test("local server returns text from a raw OpenAI response", async () => {
  const oldPort = process.env.PORT;
  const oldKey = process.env.OPENAI_API_KEY;
  const originalCreateServer = http.createServer;
  let server;
  process.env.PORT = "0";
  process.env.OPENAI_API_KEY = "test-key";
  global.fetch = async () => Response.json(openAiResult);
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
