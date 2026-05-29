function StepProgress({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="step-progress" aria-label={`Step ${current + 1} of ${total}`}>
      <div className="step-progress-row">
        <span>Step {current + 1}</span>
        <span>{total} questions</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default StepProgress;
