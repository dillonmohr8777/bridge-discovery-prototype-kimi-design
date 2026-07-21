# Latest Bridge Signal App

This folder contains the newest recovered Bridge prototype source, copied from the July 21, 2026 local build so Claude can inspect and continue it.

## Contents

- `site/` is the complete static five-route prototype.
- `site/signal/` is the Signal Exchange page.
- `scripts/verify-site.ps1` runs the structural checks for the prototype.
- `docs/` contains the source project documentation.
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
