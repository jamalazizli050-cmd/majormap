import { Check } from "lucide-react";

function QuizOption({ label, selected, multi, onClick }) {
  return (
    <button className={`quiz-option ${selected ? "selected" : ""}`} type="button" onClick={onClick}>
      <span className="option-indicator">{selected && <Check size={16} />}</span>
      <span>{label}</span>
      {multi && <span className="option-type">Select</span>}
    </button>
  );
}

export default QuizOption;
