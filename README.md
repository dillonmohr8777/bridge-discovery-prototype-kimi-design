# Bridge discovery prototype

A decision-ready front-end prototype for Monday's product session with Tori. It is built in Next.js, React, and TypeScript and uses mock data only.

## What is included

- Responsive landing and directory experiences
- Working search, role, and verification filters
- Role selection/onboarding direction
- Member profile and permission-based contact request
- Brand dashboard
- Admin verification queue
- Three switchable visual directions
- Provisional brand kit and reusable design-system page
- Monday meeting package, product definition, evidence audit, and Claude workflow

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. Important routes:

- `/directory`
- `/join`
- `/profile/cascade-canna`
- `/dashboard`
- `/admin/verification`
- `/directions`
- `/design-system`

## Status and boundaries

This is a discovery prototype, not production software. There is no Supabase connection, authentication, persistent data, email delivery, or real license verification. All profiles and metrics are fictional. The brand identity is provisional because no approved Bridge brand kit or delivered Tori prototype was found in the accessible project history.

## Verification

```powershell
npm run typecheck
npm run lint
npm run build
```
