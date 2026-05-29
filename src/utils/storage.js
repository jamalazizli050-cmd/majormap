const QUIZ_KEY = "unisearch.studentProfile";
const COMPARE_KEY = "unisearch.compareList";
const RESULTS_KEY = "unisearch.lastResults";
const LEGACY_KEYS = {
  [QUIZ_KEY]: "majormap.studentProfile",
  [COMPARE_KEY]: "majormap.compareList",
  [RESULTS_KEY]: "majormap.lastResults",
};
const MAX_COMPARE = 4;

function readJson(key, fallback) {
  try {
    const current = localStorage.getItem(key);
    if (current) return JSON.parse(current) ?? fallback;
    const legacy = localStorage.getItem(LEGACY_KEYS[key]);
    if (legacy) {
      localStorage.setItem(key, legacy);
      return JSON.parse(legacy) ?? fallback;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export function saveQuizAnswers(answers) {
  localStorage.setItem(QUIZ_KEY, JSON.stringify(answers));
}

export function getQuizAnswers() {
  return readJson(QUIZ_KEY, null);
}

export function saveStudentProfile(profile) {
  saveQuizAnswers(profile);
}

export function getStudentProfile() {
  return getQuizAnswers();
}

export function saveLastResults(ids) {
  localStorage.setItem(RESULTS_KEY, JSON.stringify(ids));
}

export function getLastResults() {
  return readJson(RESULTS_KEY, []);
}

export function getCompareList() {
  return readJson(COMPARE_KEY, []);
}

function saveCompareList(ids) {
  localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("compareChanged"));
}

export function addToCompare(universityId) {
  const list = getCompareList();
  if (list.includes(universityId)) return list;
  if (list.length >= MAX_COMPARE) {
    alert("You can compare up to 4 universities.");
    return list;
  }
  const next = [...list, universityId];
  saveCompareList(next);
  return next;
}

export function removeFromCompare(universityId) {
  const next = getCompareList().filter((id) => id !== universityId);
  saveCompareList(next);
  return next;
}

export function clearCompareList() {
  saveCompareList([]);
}

export function isInCompare(universityId) {
  return getCompareList().includes(universityId);
}
