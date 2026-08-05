# Bridge Phase 2 Prototype

This folder contains the authoritative Bridge prototype source recovered from the July 21, 2026 build and completed against Tori's July 23 feedback review.

## Contents

- `site/` is the complete static five-route prototype.
- `site/signal/` is the nationwide Explore experience.
- `scripts/verify-site.ps1` runs the structural checks for the prototype.
- `PRODUCT.md` and `DESIGN.md` preserve product and visual-system decisions.
- `docs/phase2-product-contract.md` contains the route map, visibility matrix, journeys, integration contract, and decision record.
- `docs/phase2-feedback-implementation-checklist.md` traces every material transcript point to its disposition.
- `docs/phase2-phased-backlog.md` separates the production path, launch work, future work, and Dillon-owned actions.
- `netlify.toml` records the original static-site publish configuration.

## Routes

- `/`
- `/community/`
- `/studio/`
- `/business/`
- `/signal/`

The original local source was:

`C:\Users\dillo\Documents\Codex\2026-07-20\bridge-prototype-really-need-optimized-for`

To review locally:

```powershell
python -m http.server 4173 --directory site
```

Then open `http://localhost:4173/`.

To verify the static package:

```powershell
.\scripts\verify-site.ps1
```

All records, contacts, signals, credentials, menu/order states, and opportunities in this prototype are illustrative unless an external source is explicitly named.
