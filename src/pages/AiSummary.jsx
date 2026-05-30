import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Cell, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Button from "../components/Button";
import { universities } from "../data/universities";
import { getBestProgramForMajor } from "../utils/matching";
import { AI_MODEL_LABEL, getAiSummaryCacheKey, readCachedAiReport, requestAiFitSummary, splitAiSummary, writeCachedAiReport } from "../utils/aiSummary";
import { getStudentProfile } from "../utils/storage";

function AiSummary() {
  const { id } = useParams();
  const university = universities.find((item) => item.id === id);
  const profile = getStudentProfile();
  const { program } = university ? getBestProgramForMajor(university, profile) : { program: null };
  const cacheKey = getAiSummaryCacheKey(university, program, profile);
  const cachedReport = cacheKey ? readCachedAiReport(cacheKey) : null;
  const [state, setState] = useState(() => ({
    loading: false,
    error: "",
    summary: cachedReport?.summary || "",
    model: cachedReport?.model || AI_MODEL_LABEL,
    fitEstimatePercent: cachedReport?.fitEstimatePercent || null,
    fitEstimateLabel: cachedReport?.fitEstimateLabel || "",
    fitEstimateReason: cachedReport?.fitEstimateReason || "",
    acceptanceBaselinePercent: cachedReport?.acceptanceBaselinePercent || null,
    fromCache: Boolean(cachedReport),
  }));

  const summarySections = useMemo(() => splitAiSummary(state.summary), [state.summary]);

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

  async function generateSummary() {
    if (cacheKey) {
      const cached = readCachedAiReport(cacheKey);
      if (cached) {
        setState({
          loading: false,
          error: "",
          summary: cached.summary || "",
          model: cached.model || AI_MODEL_LABEL,
          fitEstimatePercent: cached.fitEstimatePercent || null,
          fitEstimateLabel: cached.fitEstimateLabel || "",
          fitEstimateReason: cached.fitEstimateReason || "",
          acceptanceBaselinePercent: cached.acceptanceBaselinePercent || null,
          fromCache: true,
        });
        return;
      }
    }

    setState((current) => ({ ...current, loading: true, error: "" }));
    try {
      const data = await requestAiFitSummary({ profile, university, program });
      if (cacheKey) writeCachedAiReport(cacheKey, data);
      setState({
        loading: false,
        error: "",
        summary: data.summary,
        model: data.model || AI_MODEL_LABEL,
        fitEstimatePercent: data.fitEstimatePercent || null,
        fitEstimateLabel: data.fitEstimateLabel || "",
        fitEstimateReason: data.fitEstimateReason || "",
        acceptanceBaselinePercent: data.acceptanceBaselinePercent || null,
        fromCache: false,
      });
    } catch (error) {
      setState((current) => ({ ...current, loading: false, error: error.message, fromCache: false }));
    }
  }

  return (
    <main>
      <section className="ai-summary-hero">
        <div>
          <Link className="back-link" to={`/university/${university.id}`}>
            <ArrowLeft size={16} />
            Back to university
          </Link>
          <span className="ai-model-pill"><Sparkles size={15} /> Powered by {state.model}</span>
          <h1>{university.name} AI Fit Summary</h1>
          <p>{program.programName} for a student from {profile?.studentCountry || "your profile"}.</p>
        </div>
        <div className="ai-hero-actions">
          <Button onClick={() => generateSummary()} disabled={state.loading || !profile || Boolean(state.summary)}>
            {state.loading ? "Generating..." : state.summary ? "Report generated" : "Generate full AI summary"}
          </Button>
        </div>
      </section>

      <section className="ai-report-layout">
        <div className="ai-report-main">
          {!profile && <div className="notice">Complete the student profile quiz before generating an AI fit summary.</div>}
          {state.fromCache && <div className="notice">Loaded from local cache for this exact student profile.</div>}
          {state.error && <div className="error-box">{state.error}</div>}

          <div className="ai-metric-grid">
            <Metric
              label="AI fit estimate"
              value={state.fitEstimatePercent ? `${state.fitEstimatePercent}%` : "Generate report"}
              note={state.fitEstimatePercent ? `${state.fitEstimateLabel}. ${state.fitEstimateReason || "AI estimate, not an admission guarantee."}` : "Gemini estimates this after reading your profile and the university selectivity baseline."}
            />
            <Metric
              label="Acceptance baseline"
              value={state.acceptanceBaselinePercent ? `${state.acceptanceBaselinePercent}%` : "After AI run"}
              note="The AI estimate is capped close to this baseline, not allowed to jump unrealistically high."
            />
            <Metric label="Tuition" value={program.tuition.display} note={`${program.tuition.year} - ${program.tuition.precision}`} />
          </div>

          <div className="ai-chart-grid">
            <article className="chart-card">
              <div className="chart-heading">
                <h2>Admission fit estimate</h2>
                <p>Generated by AI from the acceptance/selectivity baseline and your profile evidence. This is not official.</p>
              </div>
              <div className="chart-box short">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="68%" outerRadius="100%" data={[{ name: "Fit", value: state.fitEstimatePercent || 0, fill: "#f97316" }]} startAngle={180} endAngle={-180}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={10} background />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="chart-center-value">
                      {state.fitEstimatePercent ? `${state.fitEstimatePercent}%` : "--"}
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="chart-card">
              <div className="chart-heading">
                <h2>Cost and planning signals</h2>
                <p>Normalized 1-10 scores from UniSearch university intelligence.</p>
              </div>
              <div className="chart-box short">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getPlanningBars(university)} layout="vertical" margin={{ left: 8, right: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" width={88} tick={{ fill: "#334155", fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                      {getPlanningBars(university).map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </div>

          <article className="ai-report-card">
            <div className="report-heading">
              <h2>AI counselor report</h2>
              <p>Based on your saved student profile, matched program data, and university facts in UniSearch.</p>
            </div>
            {!state.summary && !state.loading && <div className="empty-report">Generate the report to see a full, human-readable fit summary here.</div>}
            {state.loading && <div className="empty-report">Building your report...</div>}
            {state.summary && (
              <div className="ai-section-list">
                {summarySections.map((section) => (
                  <section className="ai-summary-section" key={section.title}>
                    <h3>{section.title}</h3>
                    {section.body.split("\n").filter(Boolean).map((line) => <p key={line}>{line}</p>)}
                  </section>
                ))}
              </div>
            )}
          </article>
        </div>

        <aside className="ai-facts-panel">
          <h2>Official facts to verify</h2>
          <a href={university.officialUrl} target="_blank" rel="noreferrer">
            University website <ExternalLink size={14} />
          </a>
          <a href={program.programUrl} target="_blank" rel="noreferrer">
            Program page <ExternalLink size={14} />
          </a>
          <Fact label="Academic requirements" value={program.academicRequirements} />
          <Fact label="English requirements" value={program.englishRequirements} />
          <Fact label="Admissions tests" value={program.admissionTests} />
          <Fact label="Tuition source" value={program.tuition.note} />
        </aside>
      </section>
    </main>
  );
}

function Metric({ label, value, note }) {
  return (
    <article className="ai-metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

function Fact({ label, value }) {
  return (
    <div className="fact-item">
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

function getPlanningBars(university) {
  const scores = university.insights.criteriaScores;
  return [
    { name: "Realism", score: scores.acceptanceSelectivityTransparency, color: "#f97316" },
    { name: "Cost", score: scores.tuitionAffordability, color: "#2563eb" },
    { name: "Industry", score: scores.industryLinks, color: "#0f766e" },
    { name: "City", score: scores.cityStudentConvenience, color: "#7c3aed" },
  ];
}

export default AiSummary;
