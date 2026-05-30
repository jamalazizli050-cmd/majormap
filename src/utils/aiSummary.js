export const AI_MODEL_LABEL = "Gemini 3 Flash";

export function getAiSummaryCacheKey(university, program, profile) {
  return university && program ? `aiSummary_${university.id}_${program.programId}_${hashProfile(profile)}` : "";
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

export function calculateFitEstimate({ profile, university, program }) {
  if (!university) return { value: 0, label: "Needs preparation" };

  const scores = university.insights.criteriaScores;
  const selectivityScore = scores.acceptanceSelectivityTransparency;
  const evidenceScore = getEvidenceScore(profile);
  const categoryAdjustment = { high: -14, mid: -2, safer: 9 }[university.category] ?? 0;
  const exactProgramBonus = program?.programId ? 4 : 0;
  const interestBonus = profile?.regions?.includes(university.region) || profile?.regions?.includes("All regions") ? 4 : 0;
  const raw = 38 + selectivityScore * 4 + evidenceScore + categoryAdjustment + exactProgramBonus + interestBonus;
  const value = Math.max(18, Math.min(88, Math.round(raw)));

  let label = "Reach option";
  if (value >= 72) label = "Strong fit";
  else if (value >= 55) label = "Moderate fit";
  else if (value < 38) label = "Needs preparation";

  return { value, label };
}

function getEvidenceScore(profile) {
  if (!profile) return 0;
  let score = 0;
  if (profile.grades?.trim()) score += 7;
  if (profile.achievements?.trim()) score += 6;
  if (profile.completedExams?.length) score += Math.min(12, profile.completedExams.length * 4);
  const scoreText = Object.values(profile.examScores || {}).join(" ").trim();
  if (scoreText) score += 5;
  if (profile.qualification) score += 4;
  return score;
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
