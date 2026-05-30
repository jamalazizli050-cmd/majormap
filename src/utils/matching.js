export function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

export function getSelectedMajors(profile) {
  if (Array.isArray(profile?.majors)) return profile.majors;
  if (profile?.major) return [profile.major];
  return [];
}

export function getSelectedRegions(profile) {
  if (Array.isArray(profile?.regions)) return profile.regions;
  if (profile?.region) return [profile.region];
  return ["All regions"];
}

export function majorMatchesUniversity(profileOrMajor, university) {
  const majors = Array.isArray(profileOrMajor) ? profileOrMajor : getSelectedMajors(profileOrMajor);
  if (!majors.length || majors.includes("Not sure yet")) return true;

  return majors.some((selectedMajor) => {
    const selected = normalizeText(selectedMajor);
    return university.strongFor.some((major) => {
      const strong = normalizeText(major);
      return strong.includes(selected) || selected.includes(strong);
    });
  });
}

export function regionMatches(profileOrRegion, university) {
  const regions = Array.isArray(profileOrRegion) ? profileOrRegion : getSelectedRegions(profileOrRegion);
  return !regions.length || regions.includes("All regions") || regions.includes(university.region);
}

function achievementScore(profile) {
  const text = normalizeText(profile?.achievements);
  let score = 0;
  if (/(olympiad|competition|bronze|silver|gold|award|wmtc|aimo)/.test(text)) score += 8;
  if (/(project|react|bot|website|github|automation|research)/.test(text)) score += 8;
  if (/(volunteer|leader|club|internship)/.test(text)) score += 4;
  return score;
}

function examScore(profile, university) {
  const exams = profile?.completedExams || [];
  const scores = profile?.examScores || {};
  let score = 0;
  if (exams.includes("IELTS") && /\b(7|7\.5|8|8\.5|9)\b/.test(scores.IELTS || "")) score += 8;
  if (exams.includes("TOEFL")) score += isStrongToeflScore(scores.TOEFL) ? 8 : 5;
  if (exams.includes("Duolingo")) score += 5;
  if (university.region === "United States" && exams.includes("SAT")) score += 8;
  if (["United Kingdom", "United States"].includes(university.region) && exams.includes("AP")) score += 8;
  if (exams.includes("IB") || exams.includes("A-levels")) score += 8;
  return score;
}

function profileEvidenceScore(profile) {
  if (!profile) return 0;
  const scores = profile.examScores || {};
  const completedExams = profile.completedExams || [];
  let score = 0;

  if (normalizeText(profile.grades)) score += 14;
  if (normalizeText(profile.qualification)) score += 8;
  if (normalizeText(profile.achievements)) score += Math.min(18, achievementScore(profile));
  if (completedExams.length) score += Math.min(18, completedExams.length * 5);
  if (Object.values(scores).some((value) => normalizeText(value))) score += 10;
  if (completedExams.some((exam) => ["AP", "IB", "A-levels", "SAT", "ACT"].includes(exam))) score += 10;
  if (completedExams.some((exam) => ["IELTS", "TOEFL", "Duolingo"].includes(exam))) score += 8;

  return score;
}

function categoryPenaltyFromProfile(profile, category) {
  const evidence = profileEvidenceScore(profile);
  if (evidence >= 58) return { high: 0, mid: 2, safer: 7 }[category] ?? 3;
  if (evidence >= 36) return { high: 5, mid: 0, safer: 4 }[category] ?? 3;
  return { high: 12, mid: 4, safer: 0 }[category] ?? 4;
}

function isStrongToeflScore(value) {
  const text = normalizeText(value);
  const numbers = text.match(/\d+(\.\d+)?/g)?.map(Number) || [];
  return numbers.some((score) => (score <= 6 ? score >= 5 : score >= 95));
}

export function getBestProgramForMajor(university, profileOrMajors) {
  if (!university?.programs?.length) return { program: null, isExactMatch: false };
  const majors = Array.isArray(profileOrMajors) ? profileOrMajors : getSelectedMajors(profileOrMajors);
  if (!majors.length || majors.includes("Not sure yet")) {
    return { program: university.programs.find((program) => program.programId === "general") || university.programs[0], isExactMatch: false };
  }

  const normalizedMajors = majors.map(normalizeText);
  const program = university.programs.find((item) =>
    item.relatedMajors.some((major) => normalizedMajors.includes(normalizeText(major))),
  );

  return { program: program || university.programs.find((item) => item.programId === "general") || university.programs[0], isExactMatch: Boolean(program) };
}

export function getWhyThisMatch(profile, university) {
  const { program } = getBestProgramForMajor(university, profile);
  const majors = getSelectedMajors(profile).filter((major) => major !== "Not sure yet");
  const reasons = [];

  if (regionMatches(profile, university)) reasons.push(`Matches your selected region: ${university.region}`);
  if (majors.length) reasons.push(`Strong for ${university.strongFor.filter((area) => majors.includes(area)).join(" and ") || majors.join(" and ")}`);
  if ((profile?.completedExams || []).includes("IELTS")) reasons.push("Your IELTS result may support English proof, but exact requirements must be checked");
  if ((profile?.completedExams || []).includes("SAT") && university.region === "United States") reasons.push("Your SAT score can strengthen a US application depending on test policy");
  if (achievementScore(profile) > 0) reasons.push("Your projects or competitions may strengthen this application");
  if (university.category === "high") reasons.push("This is a reach option and should be balanced with target and backup choices");

  return {
    matchedProgram: program?.programName || "General undergraduate guidance",
    reasons: reasons.slice(0, 4),
  };
}

export function getRecommendedUniversities(profile, universities) {
  const answers = profile || {};
  const strict = universities.filter(
    (university) =>
      regionMatches(answers, university) &&
      majorMatchesUniversity(answers, university),
  );

  const regionalFallback = universities.filter((university) => regionMatches(answers, university));
  const pool = strict.length >= 18 ? strict : [...new Map([...strict, ...regionalFallback].map((item) => [item.id, item])).values()];
  const selectedRegions = getSelectedRegions(answers);
  const limit = selectedRegions.includes("All regions") || selectedRegions.length > 1 ? 36 : 18;

  return pool
    .map((university) => ({
      ...university,
      score:
        (majorMatchesUniversity(answers, university) ? 35 : 0) +
        (regionMatches(answers, university) ? 20 : 0) +
        examScore(answers, university) +
        achievementScore(answers) -
        categoryPenaltyFromProfile(answers, university.category),
    }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function groupByRegionAndCategory(universities) {
  return universities.reduce((acc, university) => {
    acc[university.region] ??= { high: [], mid: [], safer: [] };
    acc[university.region][university.category].push(university);
    return acc;
  }, {});
}

export function groupByCategory(universities) {
  return {
    high: universities.filter((university) => university.category === "high"),
    mid: universities.filter((university) => university.category === "mid"),
    safer: universities.filter((university) => university.category === "safer"),
  };
}
