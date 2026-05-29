import { ExternalLink } from "lucide-react";
import { getBestProgramForMajor } from "../utils/matching";

function CompareTable({ universities, profile }) {
  const programFor = (university) => getBestProgramForMajor(university, profile).program;
  const decisionFor = (university) => buildDecisionRows(university, programFor(university), profile);
  const rows = [
    ["University", (u) => u.name],
    ["Country", (u) => u.country],
    ["City", (u) => u.city],
    ["Category", (u) => u.categoryLabel],
    ["Overall ranking signal", (u) => u.insights.rankings.overallBand],
    ["Matched program", (u) => programFor(u)?.programName],
    ["Faculty / subject ranking", (u) => programFor(u)?.subjectRanking?.display],
    ["International tuition", (u) => (
      <div className="stacked-cell">
        <strong>{programFor(u)?.tuition?.display}</strong>
        <span>{programFor(u)?.tuition?.year} · {programFor(u)?.tuition?.precision}</span>
        <a href={programFor(u)?.tuition?.sourceUrl} target="_blank" rel="noreferrer">Fee source</a>
      </div>
    )],
    ["Tuition note", (u) => programFor(u)?.tuition?.note],
    ["Strong areas", (u) => u.strongFor.join(", ")],
    ["City convenience", (u) => `${u.insights.criteriaScores.cityStudentConvenience}/10 - ${u.insights.city.note}`],
    ["Length of study", (u) => `${u.insights.criteriaScores.programLengthClarity}/10 - ${u.insights.programLength.note}`],
    ["Reviews / alumni outcomes", (u) => `${u.insights.criteriaScores.studentReviewsAndAlumniOutcomes}/10 - ${u.insights.reviewsAndAlumni.note}`],
    ["Company ecosystem", (u) => `${u.insights.criteriaScores.industryLinks}/10 - ${u.insights.industry.ecosystemCompanies.join(", ")}`],
    ["Acceptance / selectivity", (u) => `${u.insights.criteriaScores.acceptanceSelectivityTransparency}/10 - ${u.insights.acceptance.note}`],
    ["Entry route risk", (u) => <CompareInsightCell items={decisionFor(u).entryRoute} />],
    ["English proof", (u) => <CompareInsightCell items={decisionFor(u).englishProof} />],
    ["Subject / tests focus", (u) => <CompareInsightCell items={decisionFor(u).testsFocus} />],
    ["Application edge", (u) => <CompareInsightCell items={decisionFor(u).applicationEdge} />],
    ["What to verify", (u) => <CompareInsightCell items={decisionFor(u).verify} />],
    [
      "Official link",
      (u) => (
        <a href={u.officialUrl} target="_blank" rel="noreferrer" className="icon-link">
          <ExternalLink size={16} />
          Open
        </a>
      ),
    ],
  ];

  return (
    <div className="table-wrap">
      <table className="compare-table">
        <tbody>
          {rows.map(([label, render]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {universities.map((university) => (
                <td key={university.id}>{render(university)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareInsightCell({ items }) {
  return (
    <div className="compare-insight-cell">
      {items.map((item) => (
        <span className={`compare-chip ${item.tone || "neutral"}`} key={item.text}>{item.text}</span>
      ))}
    </div>
  );
}

function buildDecisionRows(university, program, profile) {
  return {
    entryRoute: getEntryRoute(university, profile),
    englishProof: getEnglishProof(profile),
    testsFocus: getTestsFocus(university, program),
    applicationEdge: getApplicationEdge(university, program, profile),
    verify: getVerificationFocus(university, program),
  };
}

function getEntryRoute(university, profile) {
  const items = [];
  if (profile?.studentCountry === "Azerbaijan" && university.region === "United Kingdom") {
    items.push({ text: "Attestat route needs careful check", tone: "warning" });
    items.push({ text: "Foundation/AP/IB/A-levels may matter", tone: "warning" });
  } else if (university.region === "United States") {
    items.push({ text: "Holistic review", tone: "info" });
    items.push({ text: "Essays + recommendations matter", tone: "neutral" });
  } else if (university.region === "Canada") {
    items.push({ text: "Prerequisite grades matter", tone: "info" });
    items.push({ text: "Program cutoff can change", tone: "warning" });
  } else if (university.region === "Europe") {
    items.push({ text: "Qualification recognition check", tone: "warning" });
    items.push({ text: "Country rules vary", tone: "neutral" });
  } else {
    items.push({ text: "Program-specific screening", tone: "info" });
    items.push({ text: "Scholarship competition can be high", tone: "warning" });
  }

  if (university.category === "high") items.push({ text: "Reach-level evidence expected", tone: "danger" });
  if (university.category === "safer") items.push({ text: "Backup, not guaranteed", tone: "good" });
  return items.slice(0, 3);
}

function getEnglishProof(profile) {
  const exams = profile?.completedExams || [];
  const scores = profile?.examScores || {};
  if (exams.includes("IELTS")) {
    return [
      { text: `IELTS: ${scores.IELTS || "score not entered"}`, tone: "good" },
      { text: "Check band minimums", tone: "warning" },
    ];
  }
  if (exams.includes("TOEFL")) {
    return [
      { text: `TOEFL: ${scores.TOEFL || "score not entered"}`, tone: "good" },
      { text: "Check accepted tests", tone: "warning" },
    ];
  }
  if (exams.includes("Duolingo")) {
    return [
      { text: `Duolingo: ${scores.Duolingo || "score not entered"}`, tone: "good" },
      { text: "Some universities may not accept it", tone: "warning" },
    ];
  }
  return [
    { text: "English proof missing", tone: "danger" },
    { text: "IELTS/TOEFL/Duolingo likely needed", tone: "warning" },
  ];
}

function getTestsFocus(university, program) {
  const programId = program?.programId;
  const items = [];
  if (["computing", "mathematics"].includes(programId)) {
    items.push({ text: "Advanced math evidence", tone: "info" });
    if (university.region === "United Kingdom" && university.category === "high") {
      items.push({ text: "TMUA/MAT/STEP-style prep", tone: "danger" });
    }
    if (university.region === "United States") {
      items.push({ text: "SAT/AP can strengthen", tone: "good" });
    }
    if (university.region === "Canada") {
      items.push({ text: "Calculus/prerequisites", tone: "warning" });
    }
  } else if (programId === "engineering") {
    items.push({ text: "Math + physics", tone: "info" });
    items.push({ text: "Lab/project evidence helps", tone: "good" });
  } else if (programId === "business-economics") {
    items.push({ text: "Quantitative profile", tone: "info" });
    items.push({ text: "Leadership/essays matter", tone: "good" });
  } else if (programId === "health-design") {
    items.push({ text: "Portfolio or health screening", tone: "warning" });
    items.push({ text: "Interviews likely", tone: "info" });
  } else {
    items.push({ text: "Course-specific requirements", tone: "neutral" });
  }
  return items.slice(0, 3);
}

function getApplicationEdge(university, program, profile) {
  const achievements = `${profile?.achievements || ""}`.toLowerCase();
  const items = [];
  if (/(olympiad|wmtc|aimo|competition|award|bronze|silver|gold)/.test(achievements)) {
    items.push({ text: "Olympiad/competition edge", tone: "good" });
  }
  if (/(react|project|bot|website|github|research|automation)/.test(achievements)) {
    items.push({ text: "Project portfolio edge", tone: "good" });
  }
  if (university.insights.industry.score?.startsWith("10") || university.insights.criteriaScores.industryLinks >= 9) {
    items.push({ text: "Very strong employer ecosystem", tone: "info" });
  }
  if (program?.tuition?.precision?.includes("estimate")) {
    items.push({ text: "Cost needs exact verification", tone: "warning" });
  }
  if (!items.length) items.push({ text: "Add projects/awards to stand out", tone: "warning" });
  return items.slice(0, 3);
}

function getVerificationFocus(university, program) {
  const items = [
    { text: "Exact tuition year", tone: program?.tuition?.precision === "official" ? "good" : "warning" },
    { text: "Accepted qualification", tone: "warning" },
  ];
  if (university.region === "United States") items.push({ text: "Test policy + CDS admit rate", tone: "info" });
  else items.push({ text: "Course-level entry rules", tone: "info" });
  return items;
}

export default CompareTable;
