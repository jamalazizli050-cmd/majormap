import { ArrowRight, BookOpen, ClipboardCheck, ExternalLink, GitCompare, GraduationCap, MapPinned } from "lucide-react";
import Button from "../components/Button";
import SectionTitle from "../components/SectionTitle";

const features = [
  ["Academic requirements", ClipboardCheck],
  ["Recommended exams", BookOpen],
  ["University suggestions", GraduationCap],
  ["University comparison", GitCompare],
  ["Official links", ExternalLink],
  ["Program-specific guidance", MapPinned],
];

function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <span className="eyebrow">UniSearch</span>
          <h1>Find your university path abroad.</h1>
          <p>
            UniSearch helps students understand academic requirements, recommended exams, university options, and official
            admission links based on their chosen major and profile.
          </p>
          <div className="hero-actions">
            <Button to="/quiz">
              Start your pathway
              <ArrowRight size={18} />
            </Button>
            <Button to="/results" variant="secondary">Explore universities</Button>
          </div>
        </div>
        <div className="hero-panel" aria-label="UniSearch recommendation preview">
          <div className="panel-header">
            <span>Pathway snapshot</span>
            <span className="live-dot">MVP</span>
          </div>
          <div className="metric-grid">
            <div><strong>108</strong><span>universities</span></div>
            <div><strong>6</strong><span>regions</span></div>
            <div><strong>3</strong><span>admission tiers</span></div>
          </div>
          <div className="mini-list">
            <span>Computer Science</span>
            <span>United Kingdom</span>
            <span>IELTS + A-levels</span>
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionTitle eyebrow="What it covers" title="A practical planning workspace">
          UniSearch keeps the early admissions research process focused, comparable, and tied to official next steps.
        </SectionTitle>
        <div className="feature-grid">
          {features.map(([title, Icon]) => (
            <article className="feature-card" key={title}>
              <Icon size={24} />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
