import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="brand-mark" href="/" aria-label="Bridge home">
      <svg aria-hidden="true" viewBox="0 0 42 42" role="img">
        <rect width="42" height="42" rx="12" fill="var(--brand)" />
        <path d="M8 27h26M11 27c1.4-9 6-13 10-13s8.6 4 10 13M13 27v-5M29 27v-5" fill="none" stroke="var(--on-brand)" strokeLinecap="round" strokeWidth="2.8" />
      </svg>
      <span>Bridge</span>
    </Link>
  );
}
