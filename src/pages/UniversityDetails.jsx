import { ExternalLink, Plus, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Cell, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Button from "../components/Button";
import { universities } from "../data/universities";
import { getBestProgramForMajor } from "../utils/matching";
import { addToCompare, getLastResults, getStudentProfile, isInCompare, removeFromCompare } from "../utils/storage";

function DetailBlock({ title, children }) {
  return (
    <article className="detail-block">
      <h2>{title}</h2>
      <p>{children}</p>
    </article>
  );
}

function ScoreItem({ label, value, note }) {
  return (
    <div className="score-item">
      <div>
        <span>{label}</span>
        <strong>{value}/10</strong>
      </div>
      <p>{note}</p>
    </div>
  );
}

function UniversityDetails() {
  const { id } = useParams();
  const [, setVersion] = useState(0);
  const university = universities.find((item) => item.id === id);
  const profile = getStudentProfile();
  const lastResults = getLastResults();
  const { program, isExactMatch } = getBestProgramForMajor(university, profile);

  const nav = useMemo(() => {
    const index = lastResults.indexOf(id);
    return {
      previous: index > 0 ? lastResults[index - 1] : null,
      next: index >= 0 && index < lastResults.length - 1 ? lastResults[index + 1] : null,
    };
  }, [id, lastResults]);

  if (!university) {
    return (
      <main className="narrow-page">
        <section className="empty-state">
          <h1>University not found</h1>
          <Button to="/results">Back to results</Button>
        </section>
      </main>
    );
  }

  const inCompare = isInCompare(university.id);

  function toggleCompare() {
    if (inCompare) removeFromCompare(university.id);
    else addToCompare(university.id);
    setVersion((value) => value + 1);
  }

  return (
    <main>
      <section className="page-hero detail-hero">
        <div className="detail-nav">
          <Button to="/results" variant="secondary">Back to Results</Button>
          {nav.previous && <Button to={`/university/${nav.previous}`} variant="ghost">Previous university</Button>}
          {nav.next && <Button to={`/university/${nav.next}`} variant="ghost">Next university</Button>}
        </div>
        <span className={`category-pill ${university.category}`}>{university.categoryLabel}</span>
        <h1>{university.name}</h1>
        <p>{university.city}, {university.country} - {university.region}</p>
        <div className="tag-list centered">
          {university.strongFor.map((area) => <span key={area}>{area}</span>)}
        </div>
        <div className="hero-actions">
          <Button onClick={toggleCompare} variant="primary">
            {inCompare ? <X size={16} /> : <Plus size={16} />}
            {inCompare ? "Remove from Compare" : "Add to Compare"}
          </Button>
          <Button href={university.officialUrl} variant="secondary">
            <ExternalLink size={16} />
            Official university website
          </Button>
        </div>
      </section>

      <section className="page-section detail-layout">
        <div>
          <DetailBlock title="Overview">{university.overview}</DetailBlock>
          <DetailBlock title="Matched program">{program.programName}</DetailBlock>
          {!isExactMatch && (
            <div className="notice">
              Program-specific data is limited for your selected major. This is general guidance. Always verify exact requirements on the official course page.
            </div>
          )}
          <DetailBlock title="Academic requirements">{program.academicRequirements}</DetailBlock>
          <DetailBlock title="English requirements">{program.englishRequirements}</DetailBlock>
          <DetailBlock title="Recommended exams">{program.recommendedExams}</DetailBlock>
          <DetailBlock title="Admission tests">{program.admissionTests}</DetailBlock>
          <DetailBlock title="Application notes">{program.applicationNotes}</DetailBlock>
        </div>
        <aside className="detail-sidebar">
          <article className="ai-card">
            <h2>Personalized AI Fit Summary</h2>
            <p>Open a full AI report with fit analysis, cost signals, official links, and planning charts.</p>
            <div className="ai-actions">
              <Button to={`/university/${university.id}/ai-summary`} disabled={!profile}>
                <Sparkles size={16} />
                Open AI report
              </Button>
            </div>
            {!profile && <div className="notice">Complete the student profile quiz before generating an AI fit summary.</div>}
          </article>
          <article className="insight-card compact-insight-card">
            <h2>University intelligence</h2>
            <div className="detail-chart-grid">
              <div className="detail-chart-box">
                <span>Admission realism</span>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="68%"
                    outerRadius="100%"
                    data={[{ name: "Realism", value: university.insights.criteriaScores.acceptanceSelectivityTransparency * 10, fill: "#f97316" }]}
                    startAngle={180}
                    endAngle={-180}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={10} background />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="detail-chart-value">
                      {university.insights.criteriaScores.acceptanceSelectivityTransparency}/10
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="detail-chart-box wide">
                <span>Planning scores</span>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getPlanningBars(university)} layout="vertical" margin={{ left: 0, right: 20, top: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 10 }} />
                    <YAxis dataKey="name" type="category" width={72} tick={{ fill: "#334155", fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                      {getPlanningBars(university).map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="ranking-grid">
              <div>
                <span>Overall ranking signal</span>
                <strong>{university.insights.rankings.overallBand}</strong>
              </div>
              <div>
                <span>Faculty / subject ranking</span>
                <strong>{program.subjectRanking.display}</strong>
                <p>{program.subjectRanking.note}</p>
              </div>
              <div>
                <span>International tuition</span>
                <strong>{program.tuition.display}</strong>
                <p>{program.tuition.year} - {program.tuition.precision}</p>
                <a href={program.tuition.sourceUrl} target="_blank" rel="noreferrer">Open fee source</a>
              </div>
            </div>
            <div className="score-grid-detail">
              <ScoreItem label="City convenience" value={university.insights.criteriaScores.cityStudentConvenience} note={university.insights.city.note} />
              <ScoreItem label="Tuition affordability" value={university.insights.criteriaScores.tuitionAffordability} note={university.insights.tuition.note} />
              <ScoreItem label="Length clarity" value={university.insights.criteriaScores.programLengthClarity} note={university.insights.programLength.note} />
              <ScoreItem label="Reviews / alumni outcomes" value={university.insights.criteriaScores.studentReviewsAndAlumniOutcomes} note={university.insights.reviewsAndAlumni.note} />
              <ScoreItem label="Company ecosystem" value={university.insights.criteriaScores.industryLinks} note={university.insights.industry.note} />
              <ScoreItem label="Acceptance transparency" value={university.insights.criteriaScores.acceptanceSelectivityTransparency} note={`${university.insights.acceptance.note} ${university.insights.acceptance.nameSpecificNote}`} />
            </div>
            <div className="company-list">
              {university.insights.industry.ecosystemCompanies.map((company) => <span key={company}>{company}</span>)}
            </div>
          </article>
          <article className="side-panel">
            <h2>Official links</h2>
            <a href={university.officialUrl} target="_blank" rel="noreferrer">University website</a>
            <a href={program.programUrl} target="_blank" rel="noreferrer">Program/admissions page</a>
            <Link to="/compare">Open comparison</Link>
          </article>
        </aside>
      </section>
    </main>
  );
}

function getPlanningBars(university) {
  const scores = university.insights.criteriaScores;
  return [
    { name: "City", score: scores.cityStudentConvenience, color: "#2563eb" },
    { name: "Cost", score: scores.tuitionAffordability, color: "#0f766e" },
    { name: "Industry", score: scores.industryLinks, color: "#7c3aed" },
    { name: "Realism", score: scores.acceptanceSelectivityTransparency, color: "#f97316" },
  ];
}

export default UniversityDetails;
