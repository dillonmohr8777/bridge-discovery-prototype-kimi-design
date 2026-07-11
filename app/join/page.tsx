const roles = [
  ["Brand", "Show products, markets, and retail partnership needs."],
  ["Dispensary", "Find brands and representatives aligned with your customers."],
  ["Retailer", "Build a verified organization profile for partner discovery."],
  ["Sales rep", "Represent territories, specialties, and available relationships."],
];

export default function JoinPage() {
  return (
    <section className="page shell form-page">
      <div className="page-heading">
        <p className="eyebrow">Step 1 of 4</p>
        <h1>How do you work in cannabis?</h1>
        <p className="lede">Your role shapes profile fields, verification requirements, and the dashboard experience.</p>
      </div>
      <form className="join-form">
        <fieldset>
          <legend className="sr-only">Choose your member role</legend>
          <div className="role-grid">
            {roles.map(([name, description], index) => (
              <label className="role-card" key={name}>
                <input defaultChecked={index === 0} name="role" type="radio" value={name} />
                <span className="role-icon" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{name}</strong>
                <small>{description}</small>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="form-preview">
          <div><span className="step-label">Next up</span><strong>Organization details</strong><small>Legal name, public name, EIN, license, location, and contact owner.</small></div>
          <button className="button primary" type="button">Continue</button>
        </div>
      </form>
    </section>
  );
}
