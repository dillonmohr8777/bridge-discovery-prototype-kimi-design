import { JoinForm } from "./join-form";

const steps = ["Role", "Details", "Verification", "Review"];

export default function JoinPage() {
  return (
    <section className="page shell form-page">
      <div className="page-heading">
        <p className="eyebrow">Step 1 of 4</p>
        <h1>How do you work in cannabis?</h1>
        <p className="lede">Your role shapes profile fields, verification requirements, and the dashboard experience.</p>
      </div>
      <div className="step-indicator" aria-label="Onboarding progress: step 1 of 4">
        {steps.map((step, index) => (
          <span className={index === 0 ? "current" : undefined} key={step}>{`0${index + 1} · ${step}`}</span>
        ))}
      </div>
      <JoinForm />
    </section>
  );
}
