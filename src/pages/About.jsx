import SectionTitle from "../components/SectionTitle";

function About() {
  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">About UniSearch</span>
        <h1>Admissions planning without the noise.</h1>
        <p>
          UniSearch is a frontend MVP that helps high school students organize early university research by major, region,
          exams, academic profile, and competitiveness preference.
        </p>
      </section>

      <section className="page-section two-column">
        <article className="info-card">
          <h2>The problem</h2>
          <p>
            International admissions research is fragmented across university websites, country-specific systems, exam
            policies, and program pages. Students often need a structured starting point before they can verify details.
          </p>
        </article>
        <article className="info-card">
          <h2>The MVP</h2>
          <p>
            This version uses local data and deterministic matching to produce explainable recommendations, detail pages,
            and comparison tables without a backend or AI integration.
          </p>
        </article>
      </section>

      <section className="page-section">
        <SectionTitle title="Important note">
          UniSearch gives general guidance only. Requirements, admissions tests, scholarship rules, and deadlines change
          every year, so students must verify exact requirements on official university websites.
        </SectionTitle>
      </section>
    </main>
  );
}

export default About;
