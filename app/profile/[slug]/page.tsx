import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactRequestForm } from "@/components/ContactRequestForm";
import { SaveButton } from "@/components/SaveButton";
import { StatusChip } from "@/components/StatusChip";
import { getProfile, profiles } from "@/lib/data";

type ProfilePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = getProfile(slug);
  return { title: profile ? `${profile.name} — Bridge` : "Member not found — Bridge" };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const profile = getProfile(slug);
  if (!profile) notFound();

  return (
    <section className="page shell profile-page">
      <Link className="text-link back-link" href="/directory"><span aria-hidden="true">←</span> Back to directory</Link>
      <div className="profile-hero">
        <div className="profile-identity">
          <span className="avatar xlarge" aria-hidden="true">{profile.initials}</span>
          <div>
            <p className="eyebrow">{profile.role}</p>
            <h1>{profile.name}</h1>
            <p>{profile.location} · {profile.serving}</p>
          </div>
        </div>
        <StatusChip verified={profile.verified} />
      </div>
      <div className="profile-layout">
        <article className="content-card">
          <h2>About {profile.name}</h2>
          <p className="lede small">{profile.about}</p>
          <dl className="meta-list">
            <div><dt>Member type</dt><dd>{profile.role}</dd></div>
            <div><dt>Location</dt><dd>{profile.location}</dd></div>
            <div><dt>Serving</dt><dd>{profile.serving}</dd></div>
            <div><dt>Status</dt><dd>{profile.verified ? "Verified business" : "Verification pending review"}</dd></div>
          </dl>
          <h3>What we are looking for</h3>
          <div className="tag-row">
            {profile.lookingFor.map((item) => <span className="tag" key={item}>{item}</span>)}
          </div>
          {profile.announcement && (
            <>
              <h3>Recent announcement</h3>
              <div className="announcement">
                <span className="signal-dot" />
                <div>
                  <strong>{profile.announcement.title}</strong>
                  <p>{profile.announcement.body}</p>
                </div>
              </div>
            </>
          )}
          <p className="form-hint">Fictional sample member for the discovery prototype.</p>
        </article>
        <aside className="contact-card">
          <ContactRequestForm profileName={profile.name} profileSlug={profile.slug} />
          <SaveButton slug={profile.slug} name={profile.name} />
        </aside>
      </div>
    </section>
  );
}
