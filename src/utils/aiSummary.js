export const AI_MODEL_LABEL = "Gemini 3 Flash";

export function getAiSummaryCacheKey(university, program, profile) {
  return university && program ? `aiSummaryV2_${university.id}_${program.programId}_${hashProfile(profile)}` : "";
}

export async function requestAiFitSummary({ profile, university, program }) {
  const response = await fetch("/api/ai-fit-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentProfile: profile, university, matchedProgram: program }),
  });
  const data = await readJsonResponse(response);
  if (!response.ok) throw new Error(data.error || "AI request failed");
  return data;
}

export function cleanAiSummary(summary) {
  return String(summary || "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

export function readCachedAiReport(cacheKey) {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    return typeof parsed === "string" ? { summary: parsed } : parsed;
  } catch {
    return null;
  }
}

export function writeCachedAiReport(cacheKey, report) {
  localStorage.setItem(cacheKey, JSON.stringify(report));
}

export function splitAiSummary(summary) {
  const cleaned = cleanAiSummary(summary);
  const labels = [
    "Overall fit",
    "Why this university makes sense",
    "Possible gaps",
    "Recommended next actions",
    "Official details to verify",
  ];

  const sections = [];
  labels.forEach((label, index) => {
    const start = cleaned.indexOf(label);
    if (start === -1) return;
    const nextStarts = labels.slice(index + 1).map((nextLabel) => cleaned.indexOf(nextLabel)).filter((value) => value > start);
    const end = nextStarts.length ? Math.min(...nextStarts) : cleaned.length;
    const body = cleaned.slice(start + label.length, end).trim();
    sections.push({ title: label, body });
  });

  return sections.length ? sections : [{ title: "AI fit summary", body: cleaned }];
}

async function readJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return response.json();

  const body = await response.text();
  const detail = body ? ` Server returned: ${body.slice(0, 120)}` : "";
  throw new Error(`AI API did not return JSON. Check that /api/ai-fit-summary is deployed on Vercel.${detail}`);
}

function hashProfile(profile) {
  const text = stableStringify(profile || {});
  let hash = 5381;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 33) ^ text.charCodeAt(index);
  }
  return (hash >>> 0).toString(36);
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${key}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}
