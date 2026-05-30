import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
const MAX_BODY_CHARS = 24000;
const MAX_PROFILE_CHARS = 6000;
const MAX_UNIVERSITY_CHARS = 9000;
const MAX_PROGRAM_CHARS = 7000;

export async function createAiFitSummary({ studentProfile, university, matchedProgram }) {
  if (!studentProfile || !university || !matchedProgram) {
    return { status: 400, body: { error: "Missing studentProfile, university, or matchedProgram." } };
  }

  const validationError = validateAiPayload({ studentProfile, university, matchedProgram });
  if (validationError) {
    return { status: 413, body: { error: validationError } };
  }

  if (!process.env.GEMINI_API_KEY) {
    return { status: 500, body: { error: "Missing GEMINI_API_KEY environment variable." } };
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const result = await model.generateContent(buildPrompt({ studentProfile, university, matchedProgram }));
    const summary = result.response.text();

    if (!summary) {
      return { status: 502, body: { error: "Gemini returned an empty summary." } };
    }

    return { status: 200, body: { summary } };
  } catch (error) {
    return { status: 500, body: { error: error.message || "Gemini request failed." } };
  }
}

function buildPrompt({ studentProfile, university, matchedProgram }) {
  return `
You are an admissions guidance assistant for UniSearch.

Use only the provided student profile, university data, and matched program data.
Do not invent exact grade requirements, exact score cutoffs, deadlines, scholarships, rankings, acceptance chances, or guaranteed admission outcomes.
Use cautious wording: may, usually, often, depending on university/program.
Be practical and concise.
Clearly include this sentence: "Requirements change every year. Always verify exact details on the official university website."

Return a clean markdown-style summary with these sections:
1. Overall fit: choose one value only from Strong fit, Moderate fit, Reach option, Needs preparation.
2. Why it fits: use the student's country, qualification, grades, exams and scores, achievements, selected majors, and target regions.
3. Possible gaps: qualification recognition, missing English proof, missing AP/IB/A-levels/Foundation route, projects, math/CS evidence, scholarship competitiveness, or other relevant gaps.
4. Recommended next actions: 4-6 concrete actions.
5. What to verify on official website: exact program entry requirements, accepted qualifications from student country, English score requirements, application deadline, required documents, scholarships.

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
    },
    null,
    2,
  )}

Matched program:
${JSON.stringify(matchedProgram, null, 2)}
`;
}

function validateAiPayload({ studentProfile, university, matchedProgram }) {
  const bodyLength = safeStringify({ studentProfile, university, matchedProgram }).length;
  if (bodyLength > MAX_BODY_CHARS) return "AI summary request is too large. Please shorten the student profile before generating.";
  if (safeStringify(studentProfile).length > MAX_PROFILE_CHARS) return "Student profile is too long for AI summary generation.";
  if (safeStringify(university).length > MAX_UNIVERSITY_CHARS) return "University payload is too large for AI summary generation.";
  if (safeStringify(matchedProgram).length > MAX_PROGRAM_CHARS) return "Matched program payload is too large for AI summary generation.";
  return "";
}

function safeStringify(value) {
  try {
    return JSON.stringify(value || {});
  } catch {
    return "";
  }
}
