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

module.exports = { getOutputText };
