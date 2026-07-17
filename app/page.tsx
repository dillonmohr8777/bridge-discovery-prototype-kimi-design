import Link from "next/link";
import { ProfileCard } from "@/components/ProfileCard";
import { profiles } from "@/lib/data";

const roles = [
  { index: "01", name: "Brands", note: "Show products, markets, and wholesale terms to verified buyers." },
  { index: "02", name: "Dispensaries", note: "Find brands and reps that fit your shelf and your customers." },
  { index: "03", name: "Retailers", note: "Build a verified organization profile for partner discovery." },
  { index: "04", name: "Sales reps", note: "Represent territories, lines, and relationships in one place." },
];

export default function Home() {
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow reveal">Verified cannabis industry network</p>
          <h1 className="reveal reveal-1">The industry&rsquo;s <em>professional ledger.</em></h1>
          <p className="lede reveal reveal-2">
            Bridge is a directory of verified brands, dispensaries, retailers, and sales
            representatives — built so the right businesses can find each other, check each
            other, and start a real conversation.
          </p>
          <div className="button-row reveal reveal-3">
            <Link className="button primary" href="/directory">Explore the directory <span aria-hidden="true" className="arrow">→</span></Link>
            <Link className="button secondary" href="/join">Create a profile</Link>
          </div>
          <div className="trust-row" aria-describedby="trust-row-note">
            <span><strong>420+</strong> sample profiles</span>
            <span><strong>28</strong> markets</span>
            <span><strong>71%</strong> verified</span>
          </div>
          <p className="form-hint" id="trust-row-note">Illustrative figures for the discovery prototype — not real network data.</p>
        </div>
        <div className="hero-panel" aria-label="Example connection workflow">
          <p className="panel-caption">Introduction ledger · entry 0142</p>
          <div className="mini-card offset-left"><span className="avatar">CC</span><div><strong>Cascade Canna Co.</strong><small>Brand · Portland</small></div></div>
          <div className="bridge-line"><span>Verified connection</span></div>
          <div className="mini-card offset-right"><span className="avatar alt">HD</span><div><strong>Harbor Dispensary</strong><small>Dispensary · Baltimore</small></div></div>
          <div className="panel-note"><span className="signal-dot" /> Contact request accepted</div>
        </div>
      </section>

      <section className="stats-band" aria-label="Network snapshot">
        <div className="shell">
          <div className="stat"><strong>4</strong><span>Member roles, one standard</span></div>
          <div className="stat"><strong>2-step</strong><span>Structured introductions</span></div>
          <div className="stat"><strong>100%</strong><span>Fictional sample content</span></div>
        </div>
        <p className="stats-note shell">All profiles and figures in this prototype are invented for the design walkthrough.</p>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div><p className="eyebrow">Explore the network</p><h2>Featured members</h2></div>
          <Link className="text-link" href="/directory">Browse all <span aria-hidden="true">→</span></Link>
        </div>
        <div className="card-grid">{profiles.slice(0, 3).map((profile) => <ProfileCard key={profile.slug} profile={profile} />)}</div>
      </section>

      <section className="section value-section">
        <div className="shell">
          <div className="section-heading narrow"><div><p className="eyebrow">Built around trust</p><h2>A professional layer for a fragmented industry.</h2></div></div>
          <div className="value-grid">
            <article><span className="number">01</span><h3>Find the right fit</h3><p>Search by role, location, market, specialty, and verification status — with filters that explain themselves.</p></article>
            <article><span className="number">02</span><h3>Know who is real</h3><p>Business and licensing checks create a clearer starting point for outreach, reviewed in an admin queue.</p></article>
            <article><span className="number">03</span><h3>Make a warm introduction</h3><p>Send structured contact requests with a reason and a note. Details stay private until both sides agree.</p></article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading narrow"><div><p className="eyebrow">Who Bridge serves</p><h2>One directory, four ways of working.</h2></div></div>
        <div className="roles-strip">
          {roles.map((role) => (
            <div className="role-tile" key={role.name}>
              <span className="mono">{role.index}</span>
              <strong>{role.name}</strong>
              <small>{role.note}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="cta-band">
          <p className="eyebrow">Design preview</p>
          <h2>Put your business in the ledger.</h2>
          <p>Start a profile in four guided steps. Verification, save-and-resume, and accounts arrive in the post-decision build.</p>
          <div className="button-row">
            <Link className="button primary" href="/join">Create a profile <span aria-hidden="true" className="arrow">→</span></Link>
            <Link className="button ghost" href="/directions">Compare visual directions</Link>
          </div>
        </div>
      </section>
    </>
  );
}
