import { useEffect, useState } from "react";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";
import UniversityCard from "../components/UniversityCard";
import { disclaimer, universities } from "../data/universities";
import { getRecommendedUniversities, groupByRegionAndCategory } from "../utils/matching";
import { getStudentProfile, saveLastResults } from "../utils/storage";

const categoryLabels = { high: "High / Reach", mid: "Mid / Target", safer: "Safer / Backup" };

function Results() {
  const [, setVersion] = useState(0);
  const [showAllUniversities, setShowAllUniversities] = useState(false);
  const profile = getStudentProfile();
  const recommendations = getRecommendedUniversities(profile, universities);
  const displayedUniversities = showAllUniversities ? universities : recommendations;
  const grouped = groupByRegionAndCategory(displayedUniversities);

  useEffect(() => {
    saveLastResults(displayedUniversities.map((university) => university.id));
  }, [displayedUniversities]);

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Recommended universities</span>
        <h1>Your UniSearch results</h1>
        {!profile && <p>No student profile found yet. You can explore a mixed list or start the profile quiz.</p>}
        {profile && <p>Recommendations are ranked automatically from your grades, exams, achievements, target majors, and target regions.</p>}
        <div className="hero-actions">
          <Button to="/quiz" variant="secondary">Update profile</Button>
          <Button onClick={() => setShowAllUniversities((value) => !value)} variant={showAllUniversities ? "primary" : "secondary"}>
            {showAllUniversities ? "Show recommendations" : "View all universities"}
          </Button>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle title="Profile Summary" />
        <ProfileSummary profile={profile} />
      </section>

      <section className="two-column page-section">
        <article className="info-card">
          <h2>Academic Requirements</h2>
          {getAcademicRequirements(profile).map((item) => <p key={item}>{item}</p>)}
        </article>
        <article className="info-card">
          <h2>Recommended Exams</h2>
          {getExamGuidance(profile).map((item) => <p key={item}>{item}</p>)}
        </article>
      </section>

      <section className="page-section">
        <SectionTitle title={showAllUniversities ? "All Universities" : "University Suggestions"}>
          {showAllUniversities
            ? "Showing the full local university database. Use recommendations to return to the ranked shortlist."
            : "Suggestions use the local university database and are ranked from the student's profile strength. Safer / Backup means a planning backup, never guaranteed admission."}
        </SectionTitle>
        {Object.entries(grouped).map(([region, categories]) => (
          <div className="region-group" key={region}>
            <h2>{region}</h2>
            {Object.entries(categories).map(([category, items]) => (
              items.length > 0 && (
                <div className="result-group" key={`${region}-${category}`}>
                  <h3>{categoryLabels[category]}</h3>
                  <div className="university-grid">
                    {items.map((university) => (
                      <UniversityCard key={university.id} university={university} profile={profile} onCompareChange={() => setVersion((v) => v + 1)} />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        ))}
      </section>

      <section className="page-section">
        <SectionTitle title="Next Steps" />
        <div className="next-steps-grid">
          {[
            "Verify official requirements",
            "Check qualification recognition for your country",
            "Confirm English requirement",
            "Prepare needed exams",
            "Build and organize project evidence",
            "Shortlist 6-10 universities",
            "Compare options",
          ].map((step) => <div className="next-step" key={step}>{step}</div>)}
        </div>
      </section>
    </main>
  );
}

function ProfileSummary({ profile }) {
  const scores = profile?.completedExams?.length
    ? profile.completedExams.map((exam) => `${exam}: ${profile.examScores?.[exam === "A-levels" ? "ALevels" : exam] || "score not entered"}`).join("; ")
    : "None yet";
  const items = [
    ["Student country", profile?.studentCountry || "Not selected"],
    ["Target majors", profile?.majors?.join(", ") || "Not selected"],
    ["Target regions", profile?.regions?.join(", ") || "All regions"],
    ["Qualification", profile?.qualification || "Not selected"],
    ["Grades", profile?.grades || "Not entered"],
    ["Completed exams and scores", scores],
    ["Achievements", profile?.achievements || "Not entered"],
  ];

  return (
    <div className="summary-grid wide">
      {items.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function getAcademicRequirements(profile) {
  const regions = profile?.regions || ["All regions"];
  const qualification = profile?.qualification || "your qualification";
  const majors = profile?.majors?.join(", ") || "your selected majors";
  const lines = [
    `For ${majors}, universities usually review strong grades, relevant prerequisite subjects, English proof, and program-specific requirements. Your current qualification is listed as ${qualification}.`,
  ];

  if (profile?.studentCountry === "Azerbaijan" && regions.includes("United Kingdom")) {
    lines.push("For applicants from Azerbaijan, the national diploma / attestat may not always be enough for direct Year 1 entry at some UK universities. Some students may need AP, IB, A-levels, an accepted foundation route, or another recognized qualification depending on university and program.");
  }
  if (regions.includes("United States")) {
    lines.push("For the United States, universities often use holistic review: translated transcripts, essays, recommendations, English proof, SAT/ACT policies, activities, projects, and awards can all matter depending on the institution.");
  }
  if (regions.includes("Canada")) {
    lines.push("For Canada, strong grades, prerequisite subjects, English proof, and supplementary applications may matter for competitive programs.");
  }
  if (regions.includes("Europe")) {
    lines.push("For Europe, recognized secondary qualification rules, English-taught program requirements, country-specific admissions rules, and sometimes technical or math entrance tests may apply.");
  }
  if (regions.includes("Asia")) {
    lines.push("For Asia, strong academics, English proof, possible interviews or assessments, and scholarship competitiveness often matter.");
  }
  if (regions.includes("Turkey")) {
    lines.push("For Turkey, universities may review high-school diploma recognition, transcript grades, SAT/ACT/IB/AP/A-levels or TR-YOS/YOS-style exams, English-medium program requirements, and scholarship competitiveness depending on the university.");
  }
  lines.push(disclaimer);
  return lines;
}

function getExamGuidance(profile) {
  const regions = profile?.regions || ["All regions"];
  const exams = profile?.completedExams || [];
  const scores = profile?.examScores || {};
  const majors = profile?.majors || [];
  const lines = [];

  if (!exams.length) {
    lines.push("No completed exams were selected. Based on target regions, students often consider IELTS/TOEFL/Duolingo for English proof and region-specific academic exams such as SAT/ACT, AP, IB, A-levels, national exams, or foundation routes.");
  }
  if (exams.includes("IELTS")) {
    const strong = /\b(7|7\.5|8|8\.5|9)\b/.test(scores.IELTS || "");
    lines.push(strong ? "Your IELTS result looks strong enough to likely cover English proof for many universities, but each program's exact score and band rules must be checked." : "Your IELTS is listed, but the score should be checked against each university's minimum and band requirements.");
  }
  if (exams.includes("TOEFL")) {
    lines.push("Your TOEFL result should be read using the current TOEFL iBT 1-6 band scale if taken under the new format, or the legacy 0-120 comparable score during the transition period. Universities may still publish requirements in either format, so verify the exact scale on the official page.");
  } else if (regions.some((region) => ["United Kingdom", "United States", "Canada", "Europe", "Asia", "Turkey"].includes(region))) {
    lines.push("If you do not already have accepted English proof, IELTS, TOEFL, or Duolingo may be needed depending on university policy.");
  }
  if (regions.includes("United States")) {
    lines.push(exams.includes("SAT") ? "Your SAT can strengthen a US application depending on each university's test policy." : "SAT/ACT may be optional at some US universities, but a strong score can still help depending on policy and program.");
  }
  if (regions.includes("United Kingdom") && majors.some((major) => ["Computer Science", "Artificial Intelligence", "Mathematics"].includes(major))) {
    lines.push("For competitive UK CS, AI, or Mathematics routes, AP/IB/A-levels and sometimes TMUA/MAT/STEP-style preparation may be relevant depending on university and course.");
  }
  if (exams.includes("AP")) {
    lines.push(`Your AP record (${scores.AP || "details not entered"}) should be compared with each university's accepted qualification policy.`);
  }
  if (regions.includes("Turkey")) {
    lines.push("For Turkey, SAT, ACT, IB, AP, A-levels, national diploma grades, and TR-YOS/YOS-style exams may be relevant depending on university. Private universities may also use scholarship review based on the full profile.");
  }
  lines.push(disclaimer);
  return lines;
}

export default Results;
