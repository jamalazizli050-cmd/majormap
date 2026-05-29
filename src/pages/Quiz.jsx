import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import QuizOption from "../components/QuizOption";
import StepProgress from "../components/StepProgress";
import { saveStudentProfile } from "../utils/storage";

const countryOptions = ["Azerbaijan", "Turkey", "Kazakhstan", "India", "Russia", "Other"];
const majorOptions = ["Computer Science", "Artificial Intelligence", "Data Science", "Engineering", "Business", "Economics", "Medicine", "Design", "Mathematics", "Not sure yet"];
const regionOptions = ["United Kingdom", "United States", "Canada", "Europe", "Asia", "Turkey", "All regions"];
const qualificationOptions = ["National diploma / Attestat", "IB", "A-levels", "AP-based profile", "Other"];
const examOptions = ["IELTS", "TOEFL", "Duolingo", "SAT", "ACT", "AP", "IB", "A-levels", "National exam", "Other", "None yet"];
const competitivenessOptions = ["Ambitious", "Balanced", "Safer / backup", "Mixed"];

const initialProfile = {
  studentCountry: "",
  majors: [],
  regions: [],
  qualification: "",
  grades: "",
  completedExams: [],
  examScores: {
    IELTS: "",
    TOEFL: "",
    Duolingo: "",
    SAT: "",
    ACT: "",
    AP: "",
    IB: "",
    ALevels: "",
    "National exam": "",
    Other: "",
  },
  achievements: "",
  competitiveness: "",
};

function toggleExclusive(list, option, exclusiveOption) {
  if (option === exclusiveOption) return list.includes(option) ? [] : [option];
  const withoutExclusive = list.filter((item) => item !== exclusiveOption);
  return withoutExclusive.includes(option)
    ? withoutExclusive.filter((item) => item !== option)
    : [...withoutExclusive, option];
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(initialProfile);
  const [otherCountry, setOtherCountry] = useState("");
  const [otherQualification, setOtherQualification] = useState("");
  const navigate = useNavigate();
  const totalSteps = 8;

  function update(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function updateScore(exam, value) {
    setProfile((current) => ({
      ...current,
      examScores: { ...current.examScores, [exam === "A-levels" ? "ALevels" : exam]: value },
    }));
  }

  function canContinue() {
    if (step === 0) return profile.studentCountry && (profile.studentCountry !== "Other" || otherCountry.trim());
    if (step === 1) return profile.majors.length > 0;
    if (step === 2) return profile.regions.length > 0;
    if (step === 3) return profile.qualification && (profile.qualification !== "Other" || otherQualification.trim()) && profile.grades.trim();
    if (step === 4) return profile.completedExams.length > 0;
    if (step === 5) return true;
    if (step === 6) return true;
    return Boolean(profile.competitiveness);
  }

  function finishProfile() {
    const completedExams = profile.completedExams.includes("None yet") ? [] : profile.completedExams;
    const finalProfile = {
      ...profile,
      studentCountry: profile.studentCountry === "Other" ? otherCountry.trim() : profile.studentCountry,
      qualification: profile.qualification === "Other" ? otherQualification.trim() : profile.qualification,
      completedExams,
    };
    saveStudentProfile(finalProfile);
    navigate("/results");
  }

  function next() {
    if (step < totalSteps - 1) setStep((current) => current + 1);
    else finishProfile();
  }

  return (
    <main className="narrow-page">
      <section className="quiz-shell">
        <StepProgress current={step} total={totalSteps} />

        {step === 0 && (
          <QuizStep title="Where are you applying from?">
            <div className="quiz-options">
              {countryOptions.map((country) => (
                <QuizOption key={country} label={country} selected={profile.studentCountry === country} onClick={() => update("studentCountry", country)} />
              ))}
            </div>
            {profile.studentCountry === "Other" && (
              <input className="text-input" value={otherCountry} onChange={(event) => setOtherCountry(event.target.value)} placeholder="Enter your country" />
            )}
          </QuizStep>
        )}

        {step === 1 && (
          <QuizStep title="What do you want to study?">
            <div className="quiz-options">
              {majorOptions.map((major) => (
                <QuizOption
                  key={major}
                  label={major}
                  multi
                  selected={profile.majors.includes(major)}
                  onClick={() => update("majors", toggleExclusive(profile.majors, major, "Not sure yet"))}
                />
              ))}
            </div>
          </QuizStep>
        )}

        {step === 2 && (
          <QuizStep title="Where do you want to study?">
            <div className="quiz-options">
              {regionOptions.map((region) => (
                <QuizOption
                  key={region}
                  label={region}
                  multi
                  selected={profile.regions.includes(region)}
                  onClick={() => update("regions", toggleExclusive(profile.regions, region, "All regions"))}
                />
              ))}
            </div>
          </QuizStep>
        )}

        {step === 3 && (
          <QuizStep title="Academic qualification and grades">
            <label className="field-label">What school qualification do you have?</label>
            <div className="quiz-options compact">
              {qualificationOptions.map((qualification) => (
                <QuizOption key={qualification} label={qualification} selected={profile.qualification === qualification} onClick={() => update("qualification", qualification)} />
              ))}
            </div>
            {profile.qualification === "Other" && (
              <input className="text-input" value={otherQualification} onChange={(event) => setOtherQualification(event.target.value)} placeholder="Enter your qualification" />
            )}
            <label className="field-label">Describe your grades</label>
            <textarea
              className="text-area"
              value={profile.grades}
              onChange={(event) => update("grades", event.target.value)}
              placeholder="Example: red diploma, all grades 5, GPA 4.0, strong math grades, top of class"
            />
          </QuizStep>
        )}

        {step === 4 && (
          <QuizStep title="Which exams have you already taken or already have scores for?">
            <p className="helper-text">Only select completed exams. Do not include planned exams.</p>
            <div className="quiz-options">
              {examOptions.map((exam) => (
                <QuizOption
                  key={exam}
                  label={exam}
                  multi
                  selected={profile.completedExams.includes(exam)}
                  onClick={() => update("completedExams", toggleExclusive(profile.completedExams, exam, "None yet"))}
                />
              ))}
            </div>
          </QuizStep>
        )}

        {step === 5 && (
          <QuizStep title="Enter your completed exam scores">
            {!profile.completedExams.length || profile.completedExams.includes("None yet") ? (
              <div className="notice">No completed exams selected. You can continue and UniSearch will recommend exams based on your regions.</div>
            ) : (
              <div className="score-grid">
                {profile.completedExams.map((exam) => {
                  const key = exam === "A-levels" ? "ALevels" : exam;
                  return (
                    <label className="input-card" key={exam}>
                      <span>{exam} score/details</span>
                      <input
                        className="text-input"
                        value={profile.examScores[key] || ""}
                        onChange={(event) => updateScore(exam, event.target.value)}
                        placeholder={getScorePlaceholder(exam)}
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </QuizStep>
        )}

        {step === 6 && (
          <QuizStep title="Achievements and projects">
            <textarea
              className="text-area tall"
              value={profile.achievements}
              onChange={(event) => update("achievements", event.target.value)}
              placeholder="Example: Olympiad awards, coding projects, Telegram bot, research paper, student club, volunteering"
            />
          </QuizStep>
        )}

        {step === 7 && (
          <QuizStep title="What kind of university list do you want?">
            <div className="quiz-options">
              {competitivenessOptions.map((option) => (
                <QuizOption key={option} label={option} selected={profile.competitiveness === option} onClick={() => update("competitiveness", option)} />
              ))}
            </div>
          </QuizStep>
        )}

        <div className="quiz-actions">
          <Button variant="secondary" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>
            Back
          </Button>
          <Button onClick={next} disabled={!canContinue()}>{step === totalSteps - 1 ? "See results" : "Continue"}</Button>
        </div>
      </section>
    </main>
  );
}

function QuizStep({ title, children }) {
  return (
    <>
      <div className="quiz-question">
        <span className="eyebrow">Student profile</span>
        <h1>{title}</h1>
      </div>
      {children}
    </>
  );
}

function getScorePlaceholder(exam) {
  const placeholders = {
    IELTS: "Example: 7.5 overall, all bands 7+",
    TOEFL: "Example: 5.0 overall on the new TOEFL iBT 1-6 scale, or legacy 102/120 during transition",
    Duolingo: "Example: 135 overall",
    SAT: "Example: 1490, Math 800, English 690",
    ACT: "Example: 33 composite",
    AP: "Example: AP Calculus BC 5, AP Computer Science A 5, AP Physics 1 4",
    IB: "Example: HL Math 7, HL Physics 6, total 40",
    "A-levels": "Example: Mathematics A*, Further Mathematics A, Physics A",
    "National exam": "Example: national exam subjects and scores",
    Other: "Example: exam name, date, score, subjects",
  };
  return placeholders[exam] || "Enter score details";
}

export default Quiz;
