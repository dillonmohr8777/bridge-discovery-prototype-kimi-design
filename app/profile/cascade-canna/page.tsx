import Link from "next/link";
import { StatusChip } from "@/components/StatusChip";

export default function ProfilePage() {
  return (
    <section className="page shell profile-page">
      <Link className="text-link back-link" href="/directory">← Back to directory</Link>
      <div className="profile-hero">
        <div className="profile-identity">
          <span className="avatar xlarge" aria-hidden="true">CC</span>
          <div><p className="eyebrow">Brand</p><h1>Cascade Canna Co.</h1><p>Portland, Oregon · Serving Oregon and Washington</p></div>
        </div>
        <StatusChip verified />
      </div>
      <div className="profile-layout">
        <article className="content-card">
          <h2>About Cascade</h2>
          <p className="lede small">Cascade creates small-batch edibles for independent dispensaries that want dependable sell-through, transparent ingredients, and responsive wholesale support.</p>
          <h3>What we are looking for</h3>
          <div className="tag-row"><span className="tag">Retail partnerships</span><span className="tag">Regional distributors</span><span className="tag">Event collaboration</span></div>
          <h3>Recent announcement</h3>
          <div className="announcement"><span className="signal-dot" /><div><strong>Now accepting Washington retail partners</strong><p>Our summer wholesale calendar is open through August 31.</p></div></div>
        </article>
        <aside className="contact-card">
          <p className="eyebrow">Make a connection</p>
          <h2>Contact Cascade</h2>
          <p>Share a concise reason for connecting. Direct contact details stay private until accepted.</p>
          <label htmlFor="reason">Reason for contact</label>
          <select id="reason"><option>Retail partnership</option><option>Distribution</option><option>Sales representation</option><option>Other</option></select>
          <label htmlFor="message">Short note</label>
          <textarea id="message" defaultValue="We would like to discuss a potential retail partnership in Maryland." rows={4} />
          <button className="button primary full" type="button">Send contact request</button>
        </aside>
      </div>
    </section>
  );
}
