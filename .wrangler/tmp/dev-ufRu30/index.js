var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// src/openai-response.cjs
var require_openai_response = __commonJS({
  "src/openai-response.cjs"(exports, module) {
    init_modules_watch_stub();
    function getOutputText2(data) {
      const text = (data.output || []).filter((item) => item.type === "message").flatMap((item) => item.content || []).filter((content) => content.type === "output_text" && typeof content.text === "string").map((content) => content.text).join("");
      return (text || data.output_text || "").trim();
    }
    __name(getOutputText2, "getOutputText");
    function getRoutineInstructions2(selectedProducts, webSearch = true) {
      return `You are a beauty routine assistant for L'Oreal Paris and Maybelline. Help with skincare, haircare, makeup, and other beauty routines. Identify the category the user is asking about and give a practical, clear routine in the right order.

When building a routine from selected products, use only those products. If no selected products fit the requested category, offer general guidance without inventing product names, ingredients, or product-specific facts. Ask what products the user has when product-specific recommendations are needed.

For skincare, include sunscreen in morning guidance and remind users to patch-test and stop if irritation occurs. For haircare and makeup, follow product-label directions and explain the appropriate application order.${webSearch ? " Use web search for current or official product guidance, and cite or link substantial claims that depend on it." : ""}

Selected products:
${JSON.stringify(selectedProducts, null, 2)}`;
    }
    __name(getRoutineInstructions2, "getRoutineInstructions");
    module.exports = { getOutputText: getOutputText2, getRoutineInstructions: getRoutineInstructions2 };
  }
});

// .wrangler/tmp/bundle-xQf7t5/middleware-loader.entry.ts
init_modules_watch_stub();

// .wrangler/tmp/bundle-xQf7t5/middleware-insertion-facade.js
init_modules_watch_stub();

// src/index.ts
init_modules_watch_stub();
var import_openai_response = __toESM(require_openai_response(), 1);
var OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
var src_default = {
  async fetch(request, env) {
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
      let response;
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
  }
};
async function generateRoutine(request, env) {
  try {
    if (!env.OPENAI_API_KEY) {
      return jsonResponse(500, { error: "OpenAI API access is not configured." });
    }
    let payload;
    try {
      payload = await request.json();
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
    const selectedProducts = products.filter((product) => product && typeof product.name === "string").slice(0, 20).map((product) => ({
      name: (product.name || "").slice(0, 200),
      category: typeof product.category === "string" ? product.category.slice(0, 100) : "Product"
    }));
    const priorMessages = conversation.filter(
      (message) => message && (message.role === "user" || message.role === "assistant") && typeof message.content === "string"
    ).slice(-12).map((message) => ({
      role: message.role,
      content: message.content.slice(0, 2e3)
    }));
    const input = [
      ...priorMessages,
      ...priorMessages.length === 0 ? [{
        role: "user",
        content: `Create my routine from these selected products:
${JSON.stringify(selectedProducts, null, 2)}`
      }] : []
    ];
    const model = env.OPENAI_MODEL?.trim() || "gpt-4.1";
    const webSearch = env.ENABLE_WEB_SEARCH === "true";
    let openAiResponse;
    try {
      openAiResponse = await fetch(OPENAI_RESPONSES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model,
          ...webSearch ? { tools: [{ type: "web_search" }] } : {},
          instructions: (0, import_openai_response.getRoutineInstructions)(selectedProducts, webSearch),
          input
        })
      });
    } catch (error) {
      const name = error instanceof Error ? error.name : "UnknownError";
      const message = sanitizeForLog(error instanceof Error ? error.message : String(error), env);
      console.error(`OpenAI fetch failed: ${name}: ${message}`);
      return jsonResponse(502, {
        error: `Unable to reach OpenAI (network error: ${name}). Check Worker logs.`
      });
    }
    console.log(`OpenAI request url=${OPENAI_RESPONSES_URL} model=${model} web_search=${webSearch} status=${openAiResponse.status}`);
    if (!openAiResponse.ok) {
      const rawBody = await openAiResponse.text().catch(() => "");
      let detail = "";
      let errorCode = "";
      let errorType = "";
      try {
        const err = JSON.parse(rawBody).error;
        if (typeof err?.code === "string") errorCode = err.code.slice(0, 64);
        if (typeof err?.type === "string") errorType = err.type.slice(0, 64);
        const code = err?.code || err?.type;
        if (typeof code === "string" && /^[\w.-]{1,64}$/.test(code)) detail = ` [${code}]`;
      } catch {
      }
      console.error(
        `OpenAI API error: status=${openAiResponse.status} code=${errorCode || "none"} type=${errorType || "none"} model=${model} url=${OPENAI_RESPONSES_URL} body=${sanitizeForLog(rawBody, env).slice(0, 2e3)}`
      );
      const hints = {
        400: "Check the request and model configuration.",
        401: "Check the Worker API key.",
        403: "Check API key permissions and model access.",
        404: errorCode === "model_not_found" ? "The model was not found or this API key cannot access it. Check OPENAI_MODEL." : "Check the API endpoint and model configuration.",
        429: "Check your OpenAI rate limits and billing."
      };
      return jsonResponse(502, {
        error: `OpenAI API error (${openAiResponse.status})${detail}. ${hints[openAiResponse.status] || "Try again later or check Worker logs."}`
      });
    }
    let data;
    try {
      data = await openAiResponse.json();
    } catch {
      console.error(`OpenAI API returned malformed JSON: status=${openAiResponse.status}`);
      return jsonResponse(502, {
        error: `OpenAI API returned invalid JSON (HTTP ${openAiResponse.status}).`
      });
    }
    const routine = (0, import_openai_response.getOutputText)(data);
    if (!routine) {
      return jsonResponse(502, { error: "OpenAI returned an empty routine." });
    }
    const citations = [];
    for (const item of data.output || []) {
      for (const content of item.content || []) {
        for (const annotation of content.annotations || []) {
          if (annotation.type === "url_citation" && annotation.url) {
            if (!citations.some((citation) => citation.url === annotation.url)) {
              let title = "Source";
              try {
                title = annotation.title || new URL(annotation.url).hostname;
              } catch {
              }
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
__name(generateRoutine, "generateRoutine");
function sanitizeForLog(text, env) {
  let out = text;
  if (env.OPENAI_API_KEY) out = out.split(env.OPENAI_API_KEY).join("[REDACTED]");
  return out.replace(/sk-[A-Za-z0-9_-]{8,}/g, "[REDACTED]").replace(/Bearer\s+[A-Za-z0-9._~+\/=-]+/gi, "Bearer [REDACTED]");
}
__name(sanitizeForLog, "sanitizeForLog");
function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
__name(jsonResponse, "jsonResponse");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-xQf7t5/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-xQf7t5/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
