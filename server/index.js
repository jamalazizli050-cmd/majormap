import "dotenv/config";
import express from "express";
import cors from "cors";
import { createAiFitSummary } from "./aiFitSummary.js";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors({ origin: ["http://127.0.0.1:5173", "http://localhost:5173"] }));
app.use(express.json({ limit: "80kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.post("/api/ai-fit-summary", async (request, response) => {
  const result = await createAiFitSummary(request.body || {});
  response.status(result.status).json(result.body);
});

app.listen(PORT, () => {
  console.log(`UniSearch API listening on http://127.0.0.1:${PORT}`);
});
