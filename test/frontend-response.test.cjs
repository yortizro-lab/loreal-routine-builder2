const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function loadApp(fetch, apiUrl) {
  const elements = new Map();
  function element(tagName = "div") {
    return {
      tagName: tagName.toUpperCase(),
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
      if (selector === 'meta[name="routine-api-url"]') elements.get(selector).content = apiUrl;
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
  const context = vm.createContext({ document, localStorage, fetch, URL, console: { error() {} }, SyntaxError });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../public/script.js"), "utf8"), context);
  return { context, elements };
}

test("catalog offers skincare, haircare, and makeup products", () => {
  const { context } = loadApp();
  const products = vm.runInContext("products", context);
  for (const area of ["Haircare", "Makeup"]) {
    assert.ok(products.filter((product) => product.area === area).length >= 3);
  }
  for (const brand of ["L'Oréal", "Maybelline", "CeraVe"]) {
    assert.ok(products.some((product) => product.brand === brand));
  }
  const brandSites = vm.runInContext("brandSites", context);
  for (const site of Object.values(brandSites)) {
    assert.match(site, /^https:\/\//);
  }
});

test("routine responses preserve JSON errors and handle non-JSON or malformed errors", async () => {
  const { context } = loadApp();
  const read = vm.runInContext("readRoutineResponse", context);
  const fallback = "Unable to generate a routine.";

  await assert.rejects(read(Response.json({ error: "OpenAI failed." }, { status: 502 }), fallback), /OpenAI failed/);
  await assert.rejects(read(new Response("<html>Bad Gateway</html>", { status: 502 }), fallback), /Unable to generate a routine\. \(HTTP 502\)/);
  await assert.rejects(read(new Response("", { status: 502, headers: { "Content-Type": "application/json" } }), fallback), /Unable to generate a routine\. \(HTTP 502\)/);
  assert.equal((await read(Response.json({ routine: "Routine" }), fallback)).routine, "Routine");
});

test("all chat entry points POST the expected JSON to the configured endpoint", async () => {
  const calls = [];
  const { elements } = loadApp(async (url, options) => {
    calls.push({ url, options, body: JSON.parse(options.body) });
    return Response.json({ error: "Test error" }, { status: 502 });
  }, "https://worker.example/api/routine");
  elements.get("#chat-input").value = "Main question";
  elements.get("#floating-chat-input").value = "Floating question";
  const event = { preventDefault() {} };
  await elements.get("#generate-button").listeners.click();
  await elements.get("#chat-form").listeners.submit(event);
  await elements.get("#floating-chat-form").listeners.submit(event);
  assert.equal(calls.length, 3);
  for (const call of calls) {
    assert.equal(call.url, "https://worker.example/api/routine");
    assert.equal(call.options.method, "POST");
    assert.equal(call.options.headers["Content-Type"], "application/json");
    assert.deepEqual(call.body.products[0], {
      name: "CeraVe Hydrating Mineral Sunscreen SPF 50",
      brand: "CeraVe",
      category: "Sunscreen",
      area: "Skincare",
      description: "A mineral broad-spectrum facial sunscreen with SPF 50, ceramides, and niacinamide that hydrates while helping protect skin from the sun.",
    });
    assert.ok(Array.isArray(call.body.conversation));
  }
  assert.equal(calls[1].body.conversation.at(-1).content, "Main question");
  assert.equal(calls[2].body.conversation.at(-1).content, "Floating question");
});

test("follow-ups retain the generated routine and complete prior conversation", async () => {
  const calls = [];
  let responseNumber = 0;
  const { elements } = loadApp(async (url, options) => {
    calls.push(JSON.parse(options.body));
    responseNumber += 1;
    return Response.json({ routine: `Routine response ${responseNumber}`, citations: [] });
  });

  await elements.get("#generate-button").listeners.click();
  for (let index = 0; index < 14; index += 1) {
    elements.get("#chat-input").value = `Question ${index}`;
    await elements.get("#chat-form").listeners.submit({ preventDefault() {} });
  }

  const finalCall = calls.at(-1);
  assert.equal(finalCall.conversation.length, 28);
  assert.equal(finalCall.conversation[0].content, "Routine response 1");
  assert.equal(finalCall.conversation.at(-1).content, "Question 13");
  assert.ok(finalCall.conversation.some((message) => message.content === "Question 0"));
  assert.ok(finalCall.conversation.some((message) => message.content === "Routine response 14"));
});

test("AI-generated routines render bold headings in both chat windows", async () => {
  const productUrl = "https://www.cerave.com/skincare/sunscreen/hydrating-mineral-sunscreen-face-lotion-spf-50";
  const { elements } = loadApp(async () => Response.json({
    routine: `**Daily Maintenance:**\nUse [CeraVe Hydrating Mineral Sunscreen SPF 50](${productUrl}).`,
    products: [{
      id: "uv-fluid",
      name: "CeraVe Hydrating Mineral Sunscreen SPF 50",
      description: "Lightweight daily hydration.",
      url: productUrl,
    }],
    citations: [{ title: "CeraVe", url: "https://www.cerave.com/" }],
  }));
  elements.get("#floating-chat-input").value = "Build it";

  await elements.get("#generate-button").listeners.click();
  await elements.get("#floating-chat-form").listeners.submit({ preventDefault() {} });

  const mainTurn = elements.get("#chat-messages").children.find((child) => child.className === "chat-turn assistant");
  const floatingTurn = elements.get("#floating-chat-messages").children.find((child) => child.className === "floating-chat-turn assistant" && child.children[1]?.children[0]?.textContent === "Daily Maintenance:");
  assert.equal(mainTurn.children[1].children[0].tagName, "STRONG");
  assert.equal(mainTurn.children[1].children[0].textContent, "Daily Maintenance:");
  assert.equal(floatingTurn.children[1].children[0].tagName, "STRONG");
  assert.equal(floatingTurn.children[1].children[0].textContent, "Daily Maintenance:");
  const mainProducts = elements.get("#chat-messages").children.find((child) => child.className === "recommended-products");
  const mainCard = mainProducts.children[1].children[0];
  // Catalog-backed card carries an image, brand label, title link, category/price meta, description, and shop button.
  assert.equal(mainCard.children[0].tagName, "IMG");
  assert.equal(mainCard.children.find((child) => child.className === "recommended-product-brand").textContent, "CeraVe");
  const titleLink = mainCard.children.find((child) => child.tagName === "H4").children[0];
  assert.equal(titleLink.href, productUrl);
  assert.equal(titleLink.target, "_blank");
  assert.equal(titleLink.rel, "noopener noreferrer");
  const meta = mainCard.children.find((child) => child.className === "recommended-product-meta");
  assert.equal(meta.children.find((span) => span.className === "recommended-product-price").textContent, "$19.99");
  assert.equal(mainCard.children.find((child) => child.className === "recommended-product-description").textContent, "Lightweight daily hydration.");
  assert.equal(mainCard.children.find((child) => child.className === "recommended-product-action").textContent, "Shop Product");
  const inlineProductLink = mainTurn.children[1].children.find((child) => child.className === "inline-product-link");
  assert.equal(inlineProductLink.href, productUrl);
  const floatingProducts = elements.get("#floating-chat-messages").children.find((child) => child.className === "recommended-products");
  assert.equal(floatingProducts.children[1].children[0].children.find((child) => child.className === "recommended-product-action").textContent, "Shop Product");
  const floatingSources = elements.get("#floating-chat-messages").children.find((child) => child.className === "floating-chat-citations");
  assert.equal(floatingSources.children[1].href, "https://www.cerave.com/");
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
