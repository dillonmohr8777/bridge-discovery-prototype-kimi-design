"use client";

import { useMemo, useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { profiles } from "@/lib/data";
import { matchesQuery } from "@/lib/search";

type SortId = "featured" | "az" | "verified";

const sortOptions: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "az", label: "Name A–Z" },
  { id: "verified", label: "Verified first" },
];

export function DirectoryClient() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All roles");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortId>("featured");

  const matches = useMemo(() => {
    const filtered = profiles.filter((profile) => {
      const matchesRole = role === "All roles" || profile.role === role;
      return matchesQuery(profile, query) && matchesRole && (!verifiedOnly || profile.verified);
    });
    if (sort === "az") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "verified") return [...filtered].sort((a, b) => Number(b.verified) - Number(a.verified));
    return filtered;
  }, [query, role, verifiedOnly, sort]);

  // When nothing matches, surface members that match the search text but sit
  // outside the role/verified filters — relax verified-only first, then role.
  const nearMisses = useMemo(() => {
    if (matches.length) return [];
    const textMatches = profiles.filter((profile) => matchesQuery(profile, query));
    const sameRole = textMatches.filter((profile) => role === "All roles" || profile.role === role);
    return (sameRole.length ? sameRole : textMatches).slice(0, 3);
  }, [matches, query, role]);

  const hasFilters = Boolean(query.trim()) || role !== "All roles" || verifiedOnly;

  function clearAll() {
    setQuery("");
    setRole("All roles");
    setVerifiedOnly(false);
  }

  return (
    <div className="directory-layout">
      <aside className="filter-panel" aria-label="Directory filters">
        <div>
          <label htmlFor="directory-search">Search</label>
          <input id="directory-search" onChange={(event) => setQuery(event.target.value)} placeholder="Name, city, state, specialty…" type="search" value={query} />
        </div>
        <div>
          <label htmlFor="role-filter">Member type</label>
          <select id="role-filter" onChange={(event) => setRole(event.target.value)} value={role}>
            <option>All roles</option>
            <option>Brand</option>
            <option>Dispensary</option>
            <option>Retailer</option>
            <option>Sales rep</option>
          </select>
        </div>
        <label className="check-row" htmlFor="verified-filter">
          <input checked={verifiedOnly} id="verified-filter" onChange={(event) => setVerifiedOnly(event.target.checked)} type="checkbox" />
          Verified members only
        </label>
        {hasFilters && <button className="text-button" onClick={clearAll} type="button">Clear all filters</button>}
        <p className="form-hint">Directory results are fictional sample members for the prototype.</p>
      </aside>

      <div>
        <div className="result-bar">
          <p className="result-count" role="status">
            {matches.length} {matches.length === 1 ? "member" : "members"}
          </p>
          <div className="active-filters">
            {query.trim() && (
              <span className="filter-chip">
                “{query.trim()}”
                <button aria-label="Clear search" onClick={() => setQuery("")} type="button">×</button>
              </span>
            )}
            {role !== "All roles" && (
              <span className="filter-chip">
                {role}
                <button aria-label="Clear member type filter" onClick={() => setRole("All roles")} type="button">×</button>
              </span>
            )}
            {verifiedOnly && (
              <span className="filter-chip">
                Verified only
                <button aria-label="Clear verified filter" onClick={() => setVerifiedOnly(false)} type="button">×</button>
              </span>
            )}
            <span className="sort-row">
              <label htmlFor="sort-select">Sort</label>
              <select id="sort-select" onChange={(event) => setSort(event.target.value as SortId)} value={sort}>
                {sortOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
              </select>
            </span>
          </div>
        </div>

        {matches.length > 0 ? (
          <div className="card-grid two">
            {matches.map((profile) => <ProfileCard key={profile.slug} profile={profile} />)}
          </div>
        ) : (
          <div className="empty-state">
            <p className="eyebrow">No matches</p>
            <h2>No members fit those filters.</h2>
            <p>Try a broader search, a different member type, or clear verification to see pending profiles.</p>
            <div className="button-row centered">
              <button className="button secondary" onClick={clearAll} type="button">Clear all filters</button>
            </div>
            {nearMisses.length > 0 && (
              <div className="near-miss-bar">
                <h3>Close matches outside your filters</h3>
                <div className="card-grid two">
                  {nearMisses.map((profile) => <ProfileCard key={profile.slug} profile={profile} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
