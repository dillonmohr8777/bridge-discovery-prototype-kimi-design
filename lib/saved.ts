"use client";

import { useCallback, useSyncExternalStore } from "react";

// Prototype-only "saved profiles" store. Kept in localStorage so the concept
// is testable in the walkthrough without a backend; nothing leaves the
// browser and no real member data is involved (all profiles are fictional).
const STORAGE_KEY = "bridge-saved-profiles";
const SAVED_EVENT = "bridge-saved-changed";

export function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeSaved(slugs: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent<string[]>(SAVED_EVENT, { detail: slugs }));
}

function subscribe(onChange: () => void) {
  window.addEventListener(SAVED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(SAVED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

let cachedRaw: string | null = null;
let cachedSnapshot: string[] = [];

// useSyncExternalStore requires a stable snapshot reference between reads
// unless the underlying value actually changed.
function getSnapshot(): string[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = readSaved();
  }
  return cachedSnapshot;
}

const EMPTY: string[] = [];
const getServerSnapshot = () => EMPTY;

export function useSavedProfiles() {
  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    const current = readSaved();
    writeSaved(current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  }, []);

  return { saved, toggle };
}
