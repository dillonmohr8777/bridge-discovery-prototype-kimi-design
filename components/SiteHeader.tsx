import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <BrandMark />
        <nav aria-label="Main navigation">
          <Link href="/directory">Directory</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/directions">Design</Link>
          <Link href="/join">Join</Link>
        </nav>
        <ThemeSwitcher compact />
      </div>
    </header>
  );
}
