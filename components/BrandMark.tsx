import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="brand-mark" href="/" aria-label="Bridge home">
      <svg aria-hidden="true" viewBox="0 0 42 42" role="img">
        <rect width="42" height="42" rx="11" fill="var(--brand)" />
        <path d="M7 28.5h28M10.5 28.5c1.5-10 6.2-14.5 10.5-14.5s9 4.5 10.5 14.5M13 28.5v-6M29 28.5v-6" fill="none" stroke="var(--on-brand)" strokeLinecap="round" strokeWidth="2.6" />
        <circle cx="21" cy="13.2" r="2" fill="var(--signal-bright)" />
      </svg>
      <span className="brand-word">Bridge</span>
      <span className="brand-badge">Preview</span>
    </Link>
  );
}
