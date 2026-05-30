import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
const GEMINI_MODEL_LABEL = process.env.GEMINI_MODEL_LABEL || "Gemini 3 Flash";

export async function createAiFitSummary({ studentProfile, university, matchedProgram }) {
  if (!studentProfile || !university || !matchedProgram) {
    return { status: 400, body: { error: "Missing studentProfile, university, or matchedProgram." } };
  }

  if (!process.env.GEMINI_API_KEY) {
    return {
      status: 500,
      body: {
        error: "AI summary is not configured on this deployment. Add GEMINI_API_KEY in Vercel Project Settings > Environment Variables, then redeploy.",
      },
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const acceptanceBaseline = getAcceptanceBaseline(university);
    const result = await model.generateContent(buildPrompt({ studentProfile, university, matchedProgram, acceptanceBaseline }));
    const aiResult = parseAiResult(result.response.text());
    const summary = aiResult.summary;

    if (!summary) {
      return { status: 502, body: { error: "Gemini returned an empty summary." } };
    }

    const fitEstimatePercent = clampFitEstimate(aiResult.fitEstimatePercent, acceptanceBaseline);
    return {
      status: 200,
      body: {
        summary,
        model: GEMINI_MODEL_LABEL,
        fitEstimatePercent,
        fitEstimateLabel: getFitEstimateLabel(fitEstimatePercent),
        fitEstimateReason: aiResult.fitEstimateReason || acceptanceBaseline.reason,
        acceptanceBaselinePercent: acceptanceBaseline.percent,
      },
    };
  } catch (error) {
    return { status: 500, body: { error: error.message || "Gemini request failed." } };
  }
}

function buildPrompt({ studentProfile, university, matchedProgram, acceptanceBaseline }) {
  return `
You are an admissions guidance assistant for UniSearch.

Use only the provided student profile, university data, and matched program data.
Treat the university and program data as curated facts gathered from official university/course pages and local admissions research.
Do not invent exact grade requirements, exact score cutoffs, deadlines, scholarships, rankings, acceptance chances, or guaranteed admission outcomes.
Use cautious wording: may, usually, often, depending on university/program.
Be practical, specific, and human. Sound like a strong admissions counselor talking to one student, not a generic chatbot.
Clearly include this sentence: "Requirements change every year. Always verify exact details on the official university website."

Return valid JSON only. Do not wrap it in markdown or code fences.
The JSON shape must be:
{
  "fitEstimatePercent": number,
  "fitEstimateReason": "one short sentence",
  "summary": "plain text report"
}

fitEstimatePercent rules:
- Start from the acceptance baseline below.
- Adjust down for missing English proof, weak/missing recognized qualifications, no relevant exams, no math/CS evidence for technical majors, weak achievements, or scholarship-heavy competition.
- Adjust up only for unusually strong completed evidence such as excellent grades, strong official exam scores, AP/IB/A-level evidence, relevant projects, awards, and clear program fit.
- Do not raise the estimate by more than 12 percentage points above the acceptance baseline.
- For very selective/high category universities, be extra conservative and usually stay close to or below the acceptance baseline.
- This is a planning estimate, not an official admission probability.

summary rules:
Write the summary as plain text only.
Do not use markdown symbols such as #, ##, *, **, bullet asterisks, tables, or code fences.
Use these exact section labels on their own lines:
Overall fit
Why this university makes sense
Possible gaps
Recommended next actions
Official details to verify

Overall fit must choose one value only from Strong fit, Moderate fit, Reach option, Needs preparation, followed by one short sentence.
Why this university makes sense should use the student's country, qualification, grades, exams and scores, achievements, selected majors, and target regions.
Possible gaps should mention only relevant gaps such as qualification recognition, missing English proof, missing AP/IB/A-levels/Foundation route, projects, math/CS evidence, scholarship competitiveness, or country-specific rules.
Recommended next actions should give 4-6 concrete actions as numbered sentences.
Official details to verify should mention exact program entry requirements, accepted qualifications from the student country, English score requirements, application deadline, required documents, tuition/fees, and scholarships.

Acceptance baseline for this university:
${JSON.stringify(acceptanceBaseline, null, 2)}

Student profile:
${JSON.stringify(studentProfile, null, 2)}

University:
${JSON.stringify(
    {
      name: university.name,
      country: university.country,
      city: university.city,
      region: university.region,
      category: university.categoryLabel || university.competitivenessCategory,
      strongFor: university.strongFor,
      overview: university.overview,
      officialUrl: university.officialUrl,
      acceptance: university.insights?.acceptance,
      selectivityScore: university.insights?.criteriaScores?.acceptanceSelectivityTransparency,
    },
    null,
    2,
  )}

Matched program:
${JSON.stringify(matchedProgram, null, 2)}
`;
}

function parseAiResult(text) {
  const cleaned = String(text || "")
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return { summary: cleaned };
  }
}

function getAcceptanceBaseline(university) {
  const category = university.category || university.competitivenessCategory;
  const region = university.region;
  const byCategory = { high: 8, mid: 32, safer: 58 };
  const byRegion = {
    "United Kingdom": { high: 13, mid: 38, safer: 62 },
    "United States": { high: 7, mid: 35, safer: 65 },
    Canada: { high: 18, mid: 45, safer: 68 },
    Europe: { high: 22, mid: 50, safer: 72 },
    Asia: { high: 16, mid: 42, safer: 66 },
    Turkey: { high: 20, mid: 48, safer: 70 },
  };
  const percent = byRegion[region]?.[category] ?? byCategory[category] ?? 35;
  return {
    percent,
    maxRecommendedPercent: Math.min(95, percent + 12),
    source: university.insights?.acceptance?.publishedRate || "Estimated baseline from UniSearch selectivity category; verify official admit-rate data where published.",
    reason: university.insights?.acceptance?.note || "Acceptance data varies by program and year.",
  };
}

function clampFitEstimate(value, acceptanceBaseline) {
  const numeric = Number(value);
  const fallback = acceptanceBaseline.percent;
  const estimate = Number.isFinite(numeric) ? numeric : fallback;
  return Math.max(1, Math.min(acceptanceBaseline.maxRecommendedPercent, Math.round(estimate)));
}

function getFitEstimateLabel(percent) {
  if (percent >= 65) return "Strong fit";
  if (percent >= 38) return "Moderate fit";
  if (percent >= 18) return "Reach option";
  return "Needs preparation";
}
