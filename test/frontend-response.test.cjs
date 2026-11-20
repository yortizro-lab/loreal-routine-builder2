const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function loadApp(fetch) {
  const elements = new Map();
  function element() {
    return {
      value: "",
      children: [],
      listeners: {},
      addEventListener(type, handler) { this.listeners[type] = handler; },
      append(...children) { this.children.push(...children); },
      appendChild(child) { this.children.push(child); },
      setAttribute() {},
      scrollIntoView() {},
      remove() {},
    };
  }
  const document = {
    documentElement: {},
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, element());
      return elements.get(selector);
    },
    querySelectorAll() { return []; },
    createElement: element,
    addEventListener() {},
  };
  const localStorage = {
    getItem(key) { return key.includes("selected-products") ? '["uv-fluid"]' : "en"; },
    setItem() {},
    removeItem() {},
  };
  const context = vm.createContext({ document, localStorage, fetch, console: { error() {} }, SyntaxError });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../script.js"), "utf8"), context);
  return { context, elements };
}

test("routine responses preserve JSON errors and handle non-JSON or malformed errors", async () => {
  const { context } = loadApp();
  const read = vm.runInContext("readRoutineResponse", context);
  const fallback = "Unable to generate a routine.";

  await assert.rejects(read(Response.json({ error: "OpenAI failed." }, { status: 502 }), fallback), /OpenAI failed/);
  await assert.rejects(read(new Response("<html>Bad Gateway</html>", { status: 502 }), fallback), /Unable to generate a routine\. \(HTTP 502\)/);
  await assert.rejects(read(new Response("", { status: 502, headers: { "Content-Type": "application/json" } }), fallback), /Unable to generate a routine\. \(HTTP 502\)/);
  assert.equal((await read(Response.json({ routine: "Routine" }), fallback)).routine, "Routine");
});

test("all chat entry points show a useful error for an HTML gateway response", async () => {
  const { elements } = loadApp(async () => new Response("<html>Bad Gateway</html>", { status: 502 }));
  elements.get("#chat-input").value = "Question";
  elements.get("#floating-chat-input").value = "Question";
  const event = { preventDefault() {} };

  await elements.get("#generate-button").listeners.click();
  await elements.get("#chat-form").listeners.submit(event);
  await elements.get("#floating-chat-form").listeners.submit(event);

  for (const [selector, expectedCount] of [["#chat-messages", 2], ["#floating-chat-messages", 1]]) {
    const errors = elements.get(selector).children.filter((child) => child.className.includes("error"));
    assert.equal(errors.length, expectedCount);
    assert.ok(errors.every((error) => error.textContent.includes("HTTP 502")));
  }
});
