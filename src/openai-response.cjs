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
 * @param {Array<{ name: string, category: string, area?: string, brand?: string, description?: string }>} selectedProducts
 * @param {boolean} [webSearch]
 * @returns {string}
 */
function getRoutineInstructions(selectedProducts, webSearch = true) {
  return `You are a beauty routine assistant for L'Oreal Paris, Maybelline, and CeraVe. Answer questions only about the generated routine or related skincare, haircare, makeup, fragrance, grooming, beauty safety, application, and product-selection topics. For unrelated requests, briefly explain that you can only help with beauty and routine questions, then invite a relevant question.

Remember and use the complete conversation history supplied with the request. Connect follow-up answers to prior recommendations, clarify or revise earlier steps when needed, and avoid repeating the full routine unless the user asks for it. Identify the category the user is asking about and give a practical, clear answer in the right order.

When building a routine from selected products, use only those products and group the instructions separately by area: Skincare, Haircare, Makeup, or Fragrance. Do not combine incompatible steps into one sequence. If no selected products fit the requested category, offer general guidance without inventing product names, ingredients, or product-specific facts. Ask what products the user has when product-specific recommendations are needed.

For skincare, include sunscreen in morning guidance and remind users to patch-test and stop if irritation occurs. For haircare, separate wash-day and styling steps and follow the order shampoo, conditioner, treatment, then styling as applicable. For makeup, order preparation, complexion, color, eyes, and finishing as applicable. Follow product-label directions for every area.${webSearch ? " Use web search for current or official product guidance, and cite or link substantial claims that depend on it." : ""}

Selected products:
${JSON.stringify(selectedProducts, null, 2)}`;
}

module.exports = { getOutputText, getRoutineInstructions };
