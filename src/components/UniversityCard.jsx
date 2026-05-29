import { ExternalLink, Plus, X } from "lucide-react";
import Button from "./Button";
import { getWhyThisMatch } from "../utils/matching";
import { addToCompare, isInCompare, removeFromCompare } from "../utils/storage";

function UniversityCard({ university, profile, onCompareChange }) {
  const inCompare = isInCompare(university.id);
  const match = getWhyThisMatch(profile, university);
  const program = university.programs.find((item) => item.programName === match.matchedProgram) || university.programs[0];

  function handleCompare() {
    if (inCompare) {
      removeFromCompare(university.id);
    } else {
      addToCompare(university.id);
    }
    onCompareChange?.();
  }

  return (
    <article className="university-card">
      <div className="card-topline">
        <span className={`category-pill ${university.category}`}>{university.categoryLabel}</span>
        <span>{university.country}</span>
      </div>
      <h3>{university.name}</h3>
      <p className="location">{university.city}, {university.region}</p>
      <p><strong>Matched program:</strong> {match.matchedProgram}</p>
      <p><strong>Tuition:</strong> {program.tuition.display}</p>
      <div className="mini-score-row">
        <span>City {university.insights.criteriaScores.cityStudentConvenience}/10</span>
        <span>Cost {university.insights.criteriaScores.tuitionAffordability}/10</span>
        <span>Industry {university.insights.criteriaScores.industryLinks}/10</span>
      </div>
      <div className="why-list">
        {match.reasons.slice(0, 2).map((reason) => <span key={reason}>{reason}</span>)}
      </div>
      <div className="tag-list">
        {university.strongFor.slice(0, 3).map((area) => (
          <span key={area}>{area}</span>
        ))}
      </div>
      <div className="card-actions">
        <Button to={`/university/${university.id}`} variant="primary">View Details</Button>
        <Button variant="secondary" onClick={handleCompare}>
          {inCompare ? <X size={16} /> : <Plus size={16} />}
          {inCompare ? "Remove" : "Add"}
        </Button>
        <a className="icon-link" href={university.officialUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
          Official Website
        </a>
      </div>
    </article>
  );
}

export default UniversityCard;
