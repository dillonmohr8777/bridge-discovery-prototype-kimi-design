"use client";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const directions = [
  {
    name: "01 · Trusted Current",
    id: "current",
    promise: "Credible, useful, and distinctly B2B.",
    rationale: "Navy and teal establish trust without copying category clichés. Amber creates a human signal for introductions and pending actions.",
    colors: ["#12324A", "#0A766E", "#F2A93B", "#F5F8F7"],
    recommendation: true,
  },
  {
    name: "02 · Modern Network",
    id: "network",
    promise: "Bold, connected, and startup-forward.",
    rationale: "Ink, electric violet, and coral make Bridge feel like a modern software network rather than a directory listing site.",
    colors: ["#17152D", "#6556E8", "#F06F5E", "#F7F6FB"],
  },
  {
    name: "03 · Botanical Ledger",
    id: "botanical",
    promise: "Grounded, premium, and industry-aware.",
    rationale: "Forest and sage acknowledge the category while restrained copper keeps the identity professional rather than dispensary-themed.",
    colors: ["#173C2C", "#5D7A63", "#C7773B", "#F6F5EF"],
  },
];

export default function DirectionsPage() {
  function preview(id: string) {
    document.documentElement.setAttribute("data-theme", id);
    window.localStorage.setItem("bridge-theme", id);
    window.dispatchEvent(new CustomEvent("bridge-theme", { detail: id }));
  }

  return (
    <section className="page shell">
      <div className="page-heading split-heading">
        <div><p className="eyebrow">Provisional brand exploration</p><h1>Three directions for Tori to react to.</h1><p className="lede">These are decision tools, not an approved Bridge identity. Choose a direction, then refine it after the prototype walkthrough.</p></div>
        <ThemeSwitcher />
      </div>
      <div className="direction-grid">
        {directions.map((direction) => (
          <article className="direction-card" key={direction.id}>
            <div className="direction-top"><span>{direction.name}</span>{direction.recommendation && <span className="status-chip verified">Recommended</span>}</div>
            <div className={`direction-preview preview-${direction.id}`}>
              <span className="preview-mark">B</span><div><strong>Build better business connections.</strong><small>Verified cannabis industry network</small></div>
            </div>
            <h2>{direction.promise}</h2>
            <p>{direction.rationale}</p>
            <div className="swatches" aria-label={`${direction.name} colors`}>{direction.colors.map((color) => <span key={color} style={{ background: color }} title={color} />)}</div>
            <button className="button secondary full" onClick={() => preview(direction.id)} type="button">Preview across prototype</button>
          </article>
        ))}
      </div>
      <div className="content-card meeting-note"><p className="eyebrow">Monday decision</p><h2>Ask Tori to choose attributes before colors.</h2><p>Start with: “Should Bridge feel most like trusted infrastructure, a modern professional network, or a premium industry platform?” Then use the color directions to confirm—not lead—the conversation.</p></div>
    </section>
  );
}
