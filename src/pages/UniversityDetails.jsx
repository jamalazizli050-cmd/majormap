import { ExternalLink, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const aiCacheKey = university && program ? `aiSummary_${university.id}_${program.programId}` : "";
  const [aiState, setAiState] = useState(() => ({
    loading: false,
    error: "",
    summary: aiCacheKey ? localStorage.getItem(aiCacheKey) || "" : "",
    fromCache: Boolean(aiCacheKey && localStorage.getItem(aiCacheKey)),
  }));

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

  async function generateFitSummary({ force = false } = {}) {
    if (!force && aiCacheKey) {
      const cachedSummary = localStorage.getItem(aiCacheKey);
      if (cachedSummary) {
        setAiState({ loading: false, error: "", summary: cachedSummary, fromCache: true });
        return;
      }
    }

    setAiState({ loading: true, error: "", summary: "" });
    try {
      const response = await fetch("/api/ai-fit-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentProfile: profile, university, matchedProgram: program }),
      });
      const data = await readJsonResponse(response);
      if (!response.ok) throw new Error(data.error || "AI request failed");
      if (aiCacheKey) localStorage.setItem(aiCacheKey, data.summary);
      setAiState({ loading: false, error: "", summary: data.summary, fromCache: false });
    } catch (error) {
      setAiState({ loading: false, error: error.message, summary: "", fromCache: false });
    }
  }

  async function readJsonResponse(response) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) return response.json();

    const body = await response.text();
    const detail = body ? ` Server returned: ${body.slice(0, 120)}` : "";
    throw new Error(`AI API did not return JSON. Check that /api/ai-fit-summary is deployed on Vercel.${detail}`);
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

          <article className="insight-card">
            <h2>University intelligence</h2>
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
                <span>International tuition for matched program</span>
                <strong>{program.tuition.display}</strong>
                <p>{program.tuition.year} - {program.tuition.precision}. {program.tuition.note}</p>
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
            <div className="notice">{university.insights.dataFreshness}</div>
          </article>

        </div>
        <aside className="detail-sidebar">
          <article className="ai-card">
            <h2>Personalized AI Fit Summary</h2>
            <p>Generated only when you click. Cached summaries are shown immediately and do not call Gemini again.</p>
            <div className="ai-actions">
              {!aiState.summary && (
                <Button onClick={() => generateFitSummary()} disabled={aiState.loading || !profile}>
                  {aiState.loading ? "Generating..." : "Generate AI Fit Summary"}
                </Button>
              )}
              {aiState.summary && (
                <Button onClick={() => generateFitSummary({ force: true })} disabled={aiState.loading || !profile} variant="secondary">
                  {aiState.loading ? "Regenerating..." : "Regenerate summary"}
                </Button>
              )}
            </div>
            {!profile && <div className="notice">Complete the student profile quiz before generating an AI fit summary.</div>}
            {aiState.fromCache && <div className="notice">Loaded from local cache. Regenerate only if you want to spend another AI call.</div>}
            {aiState.error && <div className="error-box">{aiState.error}</div>}
            {aiState.summary && <div className="ai-output">{aiState.summary}</div>}
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

export default UniversityDetails;
