import Link from "next/link";
import { StatusChip } from "@/components/StatusChip";

const tokens: [string, string][] = [
  ["Brand", "var(--brand)"],
  ["Accent", "var(--accent)"],
  ["Signal", "var(--signal)"],
  ["Canvas", "var(--canvas)"],
  ["Surface", "var(--surface)"],
  ["Text", "var(--text)"],
];

export default function DesignSystemPage() {
  return (
    <section className="page shell">
      <div className="page-heading">
        <p className="eyebrow">Provisional UI system</p>
        <h1>Bridge building blocks.</h1>
        <p className="lede">The Ledger system: editorial type, hairline structure, and one confident signal color. Tokens switch across the three provisional directions.</p>
      </div>
      <div className="system-stack">
        <section className="content-card">
          <p className="eyebrow">Color tokens</p>
          <div className="token-grid">
            {tokens.map(([name, color]) => <div className="token" key={name}><span style={{ background: color }} /><strong>{name}</strong><small>{color}</small></div>)}
          </div>
          <p className="form-hint">Swatches resolve live from the active direction — switch themes in the header to compare.</p>
        </section>

        <section className="content-card">
          <p className="eyebrow">Typography</p>
          <div className="type-samples">
            <p className="eyebrow">Eyebrow · mono micro-label</p>
            <h1>Connect with <em>confidence.</em></h1>
            <h2>Find a verified partner.</h2>
            <h3>Profile overview</h3>
            <p>Body copy uses the system sans at 16px with a 1.6 line height. Display type uses the platform serif stack — Iowan Old Style, Palatino, Georgia — for an editorial voice that no competitor in the category is using.</p>
            <small className="muted">Supporting metadata · Updated July 14</small>
          </div>
        </section>

        <section className="content-card">
          <p className="eyebrow">Controls and states</p>
          <div className="component-row">
            <button className="button primary" type="button">Primary action</button>
            <button className="button secondary" type="button">Secondary action</button>
            <button className="button secondary" disabled type="button">Disabled</button>
            <Link className="text-link" href="/design-system">Text link <span aria-hidden="true">→</span></Link>
          </div>
          <div className="component-row">
            <StatusChip verified />
            <StatusChip verified={false} />
            <span className="status-chip warning">Needs attention</span>
            <span className="tag">Edibles</span>
            <span className="tag">Wholesale</span>
          </div>
          <div className="field-row">
            <label>Business name<input defaultValue="Cascade Canna Co." /></label>
            <label>Member type<select defaultValue="Brand"><option>Brand</option><option>Dispensary</option></select></label>
          </div>
          <div className="field-row">
            <label>With hint<input placeholder="Portland, Oregon" aria-describedby="ds-hint" /><p className="form-hint" id="ds-hint">Hints sit 12px below the field in muted 12.5px type.</p></label>
            <label>With error<input defaultValue="bad@entry" aria-invalid="true" aria-describedby="ds-error" /><p className="form-error" id="ds-error">Enter a valid business email.</p></label>
          </div>
        </section>

        <section className="content-card">
          <p className="eyebrow">Voice principles</p>
          <div className="value-grid compact-values">
            <article><span className="number">01</span><h3>Direct</h3><p>Tell members what happens next.</p></article>
            <article><span className="number">02</span><h3>Credible</h3><p>Avoid hype and unsupported claims.</p></article>
            <article><span className="number">03</span><h3>Human</h3><p>Use industry language without sounding institutional.</p></article>
          </div>
        </section>

        <section className="content-card">
          <p className="eyebrow">Motion and accessibility</p>
          <div className="value-grid compact-values">
            <article><span className="number">01</span><h3>Reveals</h3><p>Hero elements rise 16px with a 0.7s ease-out, staggered by 80ms.</p></article>
            <article><span className="number">02</span><h3>Reduced motion</h3><p>All animation and smooth scrolling switch off under prefers-reduced-motion.</p></article>
            <article><span className="number">03</span><h3>Focus</h3><p>Every interactive element carries a 2px accent focus ring with a 3px offset.</p></article>
          </div>
        </section>
      </div>
    </section>
  );
}
