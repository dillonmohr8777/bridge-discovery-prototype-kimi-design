import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <span className="brand-word">Bridge</span>
          <p>
            A discovery prototype for a verified cannabis industry directory and professional network.
            Every profile, metric, and request on this site is fictional sample content.
          </p>
        </div>
        <div className="footer-col">
          <h4>Prototype</h4>
          <ul>
            <li><Link href="/directory">Directory</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/join">Create a profile</Link></li>
            <li><Link href="/admin/verification">Admin verification</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Design lab</h4>
          <ul>
            <li><Link href="/directions">Visual directions</Link></li>
            <li><Link href="/design-system">Design system</Link></li>
          </ul>
        </div>
      </div>
      <div className="shell footer-legal">
        <span>Bridge discovery prototype · isolated design lab</span>
        <span className="status-chip">Provisional identity · pending approval</span>
      </div>
    </footer>
  );
}
