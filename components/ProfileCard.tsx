import Link from "next/link";
import type { Profile } from "@/lib/types";
import { SaveButton } from "./SaveButton";
import { StatusChip } from "./StatusChip";

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <article className="profile-card">
      <div className="card-topline">
        <span className="avatar" aria-hidden="true">{profile.initials}</span>
        <StatusChip verified={profile.verified} />
      </div>
      <p className="eyebrow">{profile.role}</p>
      <h3>{profile.name}</h3>
      <p className="muted">{profile.location}</p>
      <p>{profile.description}</p>
      <div className="tag-row" aria-label="Specialties">
        {profile.specialties.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
      </div>
      <div className="card-actions">
        <Link className="text-link" href={`/profile/${profile.slug}`}>
          View profile <span aria-hidden="true" className="arrow">→</span>
        </Link>
        <SaveButton slug={profile.slug} name={profile.name} />
      </div>
    </article>
  );
}
