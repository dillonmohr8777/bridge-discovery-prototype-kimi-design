import Link from "next/link";
import { SavedStrip } from "./saved-strip";

const metrics = [["Profile views", "184", "+18%"], ["Search appearances", "726", "+9%"], ["Contact requests", "12", "+3"], ["Saved by members", "31", "+6"]];

const notifications = [
  { title: "Harbor Dispensary accepted your request", time: "2h ago", unread: true },
  { title: "Verification renewed for Cascade Canna Co.", time: "Yesterday", unread: true },
  { title: "New feature: saved profiles now sync to your dashboard", time: "Jul 9", unread: false },
];

export default function DashboardPage() {
  return (
    <section className="page shell">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">Brand dashboard</p>
          <h1>Good morning, Tori.</h1>
          <p className="lede">Here is what is happening around your profile. All metrics, requests, and notifications below are fictional sample data.</p>
        </div>
        <button className="button secondary" disabled title="Profile editing opens in the post-decision build" type="button">Edit profile</button>
      </div>
      <div className="metric-grid">{metrics.map(([label, value, delta]) => <article className="metric-card" key={label}><span>{label}</span><strong>{value}</strong><small>{delta} this month</small></article>)}</div>
      <div className="dashboard-grid">
        <article className="content-card">
          <div className="section-heading compact-heading"><div><p className="eyebrow">Inbox</p><h2>Contact requests</h2></div><span className="status-chip pending">3 new</span></div>
          {[["Harbor Dispensary", "Retail partnership", "2h"], ["Northstar Sales Group", "Territory representation", "Yesterday"], ["Mosaic Market", "Wholesale catalog", "Jul 8"]].map(([name, type, time]) => <div className="request-row" key={name}><span className="avatar small">{name.split(" ").map(x => x[0]).join("").slice(0,2)}</span><div><strong>{name}</strong><small>{type}</small></div><span className="muted">{time}</span><button disabled title="Request review opens in the post-decision build" type="button">Review</button></div>)}
          <p className="form-hint">Accepting or declining requests opens in the post-decision build.</p>

          <div className="section-heading compact-heading spaced"><div><p className="eyebrow">Notifications</p><h2>Recent activity</h2></div></div>
          {notifications.map((item) => (
            <div className="request-row" key={item.title}>
              <span className={item.unread ? "signal-dot" : "signal-dot off"} aria-hidden="true" />
              <div><strong>{item.title}</strong></div>
              <span className="muted">{item.time}</span>
              {item.unread ? <span className="status-chip pending">New</span> : <span className="muted" />}
            </div>
          ))}
        </article>
        <aside className="checklist-card">
          <div className="content-card">
            <p className="eyebrow">Profile strength</p>
            <div className="score-row"><strong>82%</strong><span>Strong</span></div>
            <div className="progress" aria-label="Profile strength 82 percent"><span style={{ width: "82%" }} /></div>
            <ul className="checklist"><li className="done">Business details</li><li className="done">License verification</li><li className="done">Logo and cover</li><li>Add product categories</li><li>Publish first announcement</li></ul>
            <Link className="button secondary full" href="/profile/cascade-canna">View public profile</Link>
          </div>
          <div className="content-card">
            <div className="section-heading compact-heading"><div><p className="eyebrow">Saved</p><h2>Saved profiles</h2></div></div>
            <SavedStrip />
          </div>
        </aside>
      </div>
    </section>
  );
}
