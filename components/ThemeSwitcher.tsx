"use client";

import { useEffect, useState } from "react";

const directions = [
  { id: "current", label: "Current" },
  { id: "network", label: "Network" },
  { id: "botanical", label: "Botanical" },
] as const;

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState("current");

  useEffect(() => {
    const saved = window.localStorage.getItem("bridge-theme") || "current";
    document.documentElement.setAttribute("data-theme", saved);
    const frame = window.requestAnimationFrame(() => setTheme(saved));
    const syncTheme = (event: Event) => {
      const nextTheme = (event as CustomEvent<string>).detail;
      if (nextTheme) setTheme(nextTheme);
    };
    window.addEventListener("bridge-theme", syncTheme);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("bridge-theme", syncTheme);
    };
  }, []);

  function updateTheme(id: string) {
    document.documentElement.setAttribute("data-theme", id);
    window.localStorage.setItem("bridge-theme", id);
    setTheme(id);
    window.dispatchEvent(new CustomEvent("bridge-theme", { detail: id }));
  }

  return (
    <div className={compact ? "theme-switcher compact" : "theme-switcher"} aria-label="Preview visual direction">
      {!compact && <span className="theme-label">Visual direction</span>}
      {directions.map((direction) => (
        <button
          aria-pressed={theme === direction.id}
          className={theme === direction.id ? "active" : ""}
          key={direction.id}
          onClick={() => updateTheme(direction.id)}
          type="button"
        >
          {direction.label}
        </button>
      ))}
    </div>
  );
}
