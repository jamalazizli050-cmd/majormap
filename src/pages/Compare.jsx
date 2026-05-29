import Button from "../components/Button";
import CompareCharts from "../components/CompareCharts";
import CompareTable from "../components/CompareTable";
import { universities } from "../data/universities";
import { clearCompareList, getCompareList, getStudentProfile } from "../utils/storage";

function Compare() {
  const selectedIds = getCompareList();
  const selectedUniversities = selectedIds.map((id) => universities.find((item) => item.id === id)).filter(Boolean);
  const profile = getStudentProfile();

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Compare</span>
        <h1>University comparison</h1>
        <p>Compare up to four universities using the same program guidance used in your results.</p>
        {!!selectedUniversities.length && (
          <div className="hero-actions">
            <Button onClick={() => { clearCompareList(); window.location.reload(); }} variant="secondary">Clear comparison</Button>
          </div>
        )}
      </section>

      <section className="page-section">
        {!selectedUniversities.length ? (
          <div className="empty-state">
            <h2>No universities selected yet.</h2>
            <p>Go to Results and add universities to compare.</p>
            <Button to="/results">Go to Results</Button>
          </div>
        ) : (
          <>
            <CompareCharts universities={selectedUniversities} profile={profile} />
            <CompareTable universities={selectedUniversities} profile={profile} />
          </>
        )}
      </section>
    </main>
  );
}

export default Compare;
