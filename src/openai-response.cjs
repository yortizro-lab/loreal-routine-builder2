/**
 * @param {{ output_text?: string, output?: Array<{ type?: string, content?: Array<{ type?: string, text?: string }> }> }} data
 * @returns {string}
 */
function getOutputText(data) {
  const text = (data.output || [])
    .filter((item) => item.type === "message")
    .flatMap((item) => item.content || [])
    .filter((content) => content.type === "output_text" && typeof content.text === "string")
    .map((content) => content.text)
    .join("");

  return (text || data.output_text || "").trim();
}

/**
 * @param {Array<{ name: string, category: string }>} selectedProducts
 * @returns {string}
 */
function getRoutineInstructions(selectedProducts) {
  return `You are a beauty routine assistant for L'Oreal Paris and Maybelline. Help with skincare, haircare, makeup, and other beauty routines. Identify the category the user is asking about and give a practical, clear routine in the right order.

When building a routine from selected products, use only those products. If no selected products fit the requested category, offer general guidance without inventing product names, ingredients, or product-specific facts. Ask what products the user has when product-specific recommendations are needed.

For skincare, include sunscreen in morning guidance and remind users to patch-test and stop if irritation occurs. For haircare and makeup, follow product-label directions and explain the appropriate application order. Use web search for current or official product guidance, and cite or link substantial claims that depend on it.

Selected products:
${JSON.stringify(selectedProducts, null, 2)}`;
}

module.exports = { getOutputText, getRoutineInstructions };
