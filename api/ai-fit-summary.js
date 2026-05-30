import { createAiFitSummary } from "../server/aiFitSummary.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const result = await createAiFitSummary(request.body || {});
  return response.status(result.status).json(result.body);
}
