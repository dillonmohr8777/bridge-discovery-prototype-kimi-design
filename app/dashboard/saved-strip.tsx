"use client";

import Link from "next/link";
import { profiles } from "@/lib/data";
import { useSavedProfiles } from "@/lib/saved";

export function SavedStrip() {
  const { saved } = useSavedProfiles();
  const savedProfiles = profiles.filter((profile) => saved.includes(profile.slug));

  if (savedProfiles.length === 0) {
    return (
      <p className="form-hint">
        No saved profiles yet. Use the ☆ Save button on any directory card — saved profiles live in
        this browser only for the prototype.
      </p>
    );
  }

  return (
    <div className="saved-strip">
      {savedProfiles.map((profile) => (
        <div className="saved-row" key={profile.slug}>
          <div>
            <span className="avatar small" aria-hidden="true">{profile.initials}</span>
            <div>
              <strong>{profile.name}</strong>
              <small>{profile.role} · {profile.location}</small>
            </div>
          </div>
          <Link className="text-link" href={`/profile/${profile.slug}`}>View <span aria-hidden="true">→</span></Link>
        </div>
      ))}
    </div>
  );
}
