import { StatusChip } from "@/components/StatusChip";

export default function DesignSystemPage() {
  return (
    <section className="page shell">
      <div className="page-heading"><p className="eyebrow">Provisional UI system</p><h1>Bridge building blocks.</h1><p className="lede">A small, reusable system for rapid iteration after Monday’s decisions.</p></div>
      <div className="system-stack">
        <section className="content-card"><p className="eyebrow">Color tokens</p><div className="token-grid">{[["Brand", "var(--brand)"], ["Accent", "var(--accent)"], ["Signal", "var(--signal)"], ["Canvas", "var(--canvas)"], ["Surface", "var(--surface)"], ["Text", "var(--text)"]].map(([name, color]) => <div className="token" key={name}><span style={{ background: color }} /><strong>{name}</strong><small>{color}</small></div>)}</div></section>
        <section className="content-card"><p className="eyebrow">Typography</p><div className="type-samples"><h1>Connect with confidence.</h1><h2>Find a verified partner.</h2><h3>Profile overview</h3><p>Bridge helps cannabis businesses discover credible relationships through clear information and intentional introductions.</p><small>Supporting metadata · Updated July 11</small></div></section>
        <section className="content-card"><p className="eyebrow">Controls and states</p><div className="component-row"><button className="button primary" type="button">Primary action</button><button className="button secondary" type="button">Secondary action</button><button className="button secondary" disabled type="button">Disabled</button><StatusChip verified /><StatusChip verified={false} /><span className="status-chip warning">Needs attention</span></div><div className="field-row"><label>Business name<input defaultValue="Cascade Canna Co." /></label><label>Member type<select defaultValue="Brand"><option>Brand</option><option>Dispensary</option></select></label></div></section>
        <section className="content-card"><p className="eyebrow">Voice principles</p><div className="value-grid compact-values"><article><span className="number">01</span><h3>Direct</h3><p>Tell members what happens next.</p></article><article><span className="number">02</span><h3>Credible</h3><p>Avoid hype and unsupported claims.</p></article><article><span className="number">03</span><h3>Human</h3><p>Use industry language without sounding institutional.</p></article></div></section>
      </div>
    </section>
  );
}
