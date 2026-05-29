import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Award, BadgeDollarSign, Building2, Clock3, MapPinned, Target } from "lucide-react";
import { getBestProgramForMajor } from "../utils/matching";

const palette = ["#2563eb", "#0f766e", "#b45309", "#7c3aed"];

const criteria = [
  ["City", "cityStudentConvenience"],
  ["Cost", "tuitionAffordability"],
  ["Length", "programLengthClarity"],
  ["Alumni", "studentReviewsAndAlumniOutcomes"],
  ["Industry", "industryLinks"],
  ["Realism", "acceptanceSelectivityTransparency"],
];

function CompareCharts({ universities, profile }) {
  const items = universities.map((university, index) => {
    const program = getBestProgramForMajor(university, profile).program;
    return {
      university,
      program,
      color: palette[index % palette.length],
      scores: university.insights.criteriaScores,
      tuitionAmount: program?.tuition?.amount || 0,
      tuitionCurrency: program?.tuition?.currency || "",
      durationYears: getDurationYears(university, program),
      selectivityDifficulty: 11 - university.insights.criteriaScores.acceptanceSelectivityTransparency,
    };
  });

  const radarData = criteria.map(([label, key]) => {
    const row = { criterion: label };
    items.forEach(({ university, scores }) => {
      row[university.name] = scores[key];
    });
    return row;
  });

  const tuitionData = items.map(({ university, program, tuitionAmount, tuitionCurrency, color }) => ({
    name: shortName(university.name),
    tuition: tuitionAmount,
    affordability: university.insights.criteriaScores.tuitionAffordability,
    display: program.tuition.display,
    currency: tuitionCurrency,
    precision: program.tuition.precision,
    color,
  }));

  const scatterData = items.map(({ university, program, scores, tuitionAmount, color, selectivityDifficulty }) => ({
    name: shortName(university.name),
    fullName: university.name,
    affordability: scores.tuitionAffordability,
    selectivityDifficulty,
    tuitionAmount,
    tuition: program.tuition.display,
    color,
  }));

  const winners = getWinners(items);

  return (
    <section className="compare-dashboard">
      <div className="winner-grid">
        {winners.map(({ label, value, Icon }) => (
          <div className="winner-card" key={label}>
            <Icon size={20} />
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="chart-grid">
        <article className="chart-card large">
          <div className="chart-heading">
            <h2>Score radar</h2>
            <p>Six normalized 1-10 planning criteria from the local university dataset.</p>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="criterion" tick={{ fill: "#334155", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 11 }} />
                {items.map(({ university, color }) => (
                  <Radar
                    key={university.id}
                    name={shortName(university.name)}
                    dataKey={university.name}
                    stroke={color}
                    fill={color}
                    fillOpacity={0.14}
                    strokeWidth={2}
                  />
                ))}
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="chart-card">
          <div className="chart-heading">
            <h2>Tuition affordability</h2>
            <p>Normalized 1-10 score. Tooltip and table show the exact original-currency tuition.</p>
          </div>
          <div className="chart-box short">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tuitionData} layout="vertical" margin={{ left: 18, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={92} tick={{ fill: "#334155", fontSize: 11 }} />
                <Tooltip content={<TuitionTooltip />} />
                <Bar dataKey="affordability" radius={[0, 8, 8, 0]}>
                  {tuitionData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="chart-card">
          <div className="chart-heading">
            <h2>Cost vs selectivity</h2>
            <p>Right is more affordable. Higher is more selective/difficult.</p>
          </div>
          <div className="chart-box short">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="affordability" name="Affordability" domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis type="number" dataKey="selectivityDifficulty" name="Selectivity" domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 11 }} />
                <ZAxis range={[90, 160]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<ScatterTooltip />} />
                {scatterData.map((point) => (
                  <Scatter key={point.fullName} name={point.name} data={[point]} fill={point.color} />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      <article className="chart-card duration-card">
        <div className="chart-heading">
          <h2>Program duration timeline</h2>
          <p>Typical undergraduate length for the matched route. Co-op, foundation, placement, or integrated master routes can change this.</p>
        </div>
        <div className="timeline-list">
          {items.map(({ university, program, durationYears, color }) => (
            <div className="timeline-item" key={university.id}>
              <div className="timeline-label">
                <strong>{shortName(university.name)}</strong>
                <span>{program.programName}</span>
              </div>
              <div className="timeline-track">
                <span style={{ width: `${Math.min(100, (durationYears / 5) * 100)}%`, background: color }} />
              </div>
              <strong>{durationYears} yrs</strong>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function getWinners(items) {
  const best = (label, selector, Icon, formatter = (item) => shortName(item.university.name)) => {
    const winner = [...items].sort((a, b) => selector(b) - selector(a))[0];
    return { label, value: formatter(winner), Icon };
  };

  return [
    best("Best city", (item) => item.scores.cityStudentConvenience, MapPinned),
    best("Best cost", (item) => item.scores.tuitionAffordability, BadgeDollarSign),
    best("Strongest prestige", (item) => item.scores.studentReviewsAndAlumniOutcomes, Award),
    best("Best industry", (item) => item.scores.industryLinks, Building2),
    best("Most realistic", (item) => item.scores.acceptanceSelectivityTransparency, Target),
    best("Shortest route", (item) => 10 - item.durationYears, Clock3, (item) => `${shortName(item.university.name)} (${item.durationYears} yrs)`),
  ];
}

function getDurationYears(university, program) {
  const text = `${university.insights.programLength.note} ${program.programName}`.toLowerCase();
  if (text.includes("5") || text.includes("co-op")) return 5;
  if (text.includes("3.5")) return 3.5;
  if (text.includes("3 years") || text.includes("usually 3")) return 3;
  return 4;
}

function shortName(name) {
  const map = {
    "Massachusetts Institute of Technology": "MIT",
    "Carnegie Mellon University": "CMU",
    "University of Toronto": "UofT",
    "University of British Columbia": "UBC",
    "National University of Singapore": "NUS",
    "Nanyang Technological University": "NTU",
    "University of Washington": "UW",
    "Imperial College London": "Imperial",
  };
  return map[name] || name.replace("University of ", "").replace(" University", "");
}

function TuitionTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <strong>{data.name}</strong>
      <span>{data.display}</span>
      <span>{data.currency} · {data.precision}</span>
    </div>
  );
}

function ScatterTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <strong>{data.fullName}</strong>
      <span>Affordability: {data.affordability}/10</span>
      <span>Selectivity difficulty: {data.selectivityDifficulty}/10</span>
      <span>{data.tuition}</span>
    </div>
  );
}

export default CompareCharts;
