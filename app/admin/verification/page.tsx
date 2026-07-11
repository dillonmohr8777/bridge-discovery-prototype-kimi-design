const queue = [
  ["Northstar Sales Group", "Sales rep", "Illinois", "EIN received", "1 day"],
  ["Union Street Collective", "Dispensary", "Massachusetts", "License mismatch", "2 days"],
  ["Sunroom Wellness", "Brand", "New York", "Ready for review", "3 days"],
  ["Coastal Buyers Co.", "Retailer", "California", "Documents missing", "4 days"],
];

export default function VerificationPage() {
  return (
    <section className="page shell">
      <div className="dashboard-heading"><div><p className="eyebrow">Admin workspace</p><h1>Verification queue</h1><p className="lede">Review business identity, licenses, and profile readiness.</p></div><span className="status-chip pending">14 awaiting review</span></div>
      <div className="admin-layout">
        <aside className="filter-panel admin-nav"><strong>Administration</strong><button className="active" type="button">Verification <span>14</span></button><button type="button">Reported profiles <span>3</span></button><button type="button">Content moderation <span>8</span></button><button type="button">Member management</button></aside>
        <div className="content-card table-card">
          <div className="result-bar"><strong>Applications</strong><button className="text-button" type="button">Oldest first</button></div>
          <div className="table-scroll"><table><thead><tr><th>Organization</th><th>Type</th><th>Market</th><th>Status</th><th>Waiting</th><th><span className="sr-only">Action</span></th></tr></thead><tbody>{queue.map(([name, role, market, status, waiting]) => <tr key={name}><td><strong>{name}</strong></td><td>{role}</td><td>{market}</td><td><span className={status.includes("mismatch") || status.includes("missing") ? "status-chip warning" : "status-chip pending"}>{status}</span></td><td>{waiting}</td><td><button type="button">Open</button></td></tr>)}</tbody></table></div>
        </div>
      </div>
    </section>
  );
}
