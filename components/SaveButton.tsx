"use client";

import { useSavedProfiles } from "@/lib/saved";

export function SaveButton({ slug, name }: { slug: string; name: string }) {
  const { saved, toggle } = useSavedProfiles();
  const isSaved = saved.includes(slug);

  return (
    <button
      aria-label={isSaved ? `Remove ${name} from saved profiles` : `Save ${name} for later`}
      aria-pressed={isSaved}
      className="save-button"
      onClick={() => toggle(slug)}
      title="Prototype: saved profiles live in this browser only"
      type="button"
    >
      <span aria-hidden="true">{isSaved ? "★" : "☆"}</span>
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
