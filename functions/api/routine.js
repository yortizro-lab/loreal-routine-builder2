import worker from "../../src/index.ts";

export function onRequest(context) {
  return worker.fetch(context.request, context.env);
}
