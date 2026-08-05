# Bridge Unified Phase 2 Deployment Record

**Deployed:** August 5, 2026
**Environment:** Existing unified Bridge review site  
**Status:** Live and verified

## Exact target

- URL: `https://bridge-connected-signal.netlify.app`
- Netlify project: `bridge-connected-signal`
- Netlify site ID: `3087fe90-74de-40ee-b4dc-042afe1bc8ae`
- Production deploy ID: `6a72bd466f5d1047322165bb`
- Deploy permalink: `https://6a72bd466f5d1047322165bb--bridge-connected-signal.netlify.app`
- Deployed site source commit: `b2315e5`
- GitHub repository: `dillonmohr8777/bridge-discovery-prototype-kimi-design`
- Previous production deploy retained for rollback: `6a72b30619a971a6adad683b`

The target was resolved from two current sources before deployment: the authenticated Netlify account returned the exact site ID and URL, and the July 27 Bridge deliverables register identified `bridge-connected-signal.netlify.app` as the officially branded five-route connected suite. The three `bridge-preview-*` sites are provisional direction comparisons and were not changed.

## Deployment method

The verified static `site/` package and Netlify function folder were uploaded directly with the authenticated Netlify CLI using `--prod --no-build`. `--no-build` is intentional: the existing Netlify project retained an obsolete Next.js build command, while the Phase 2 suite is a complete static output with its own structural verifier.

## Live QA evidence

- `/`, `/community/`, `/studio/`, `/business/`, and `/signal/` returned the expected page identity and meaningful content.
- All five routes had zero horizontal overflow at 1440 by 900 and 390 by 844.
- No framework error overlay appeared.
- Community News switched to Classic feed and reported its selected state.
- Create enforced verified-only access when protected business details were enabled.
- My Profile hid protected fields in Public view.
- Explore exposed all 50 states and D.C.; California produced a clearly labeled no-sample-data state, and Maryland returned three illustrative records.
- Explore retained honest coverage language: the geographic selector is nationwide while the current prototype records span four states.
- A five-view 3D theater now includes the corridor plus Maryland, Massachusetts, New Jersey, and Virginia, with every scene explicitly labeled as illustrative.
- The state selector and 3D theater synchronized in both directions; a state without a bespoke render preserved its filter while returning the theater to the corridor overview.
- The final clean browser session reported no console warnings or errors.

## Production-only correction

The first live QA pass exposed `BillingNotEnabledMapError` from the existing Google Maps project. Because a live paid-map dependency is not required for this prototype and the designed regional fallback is complete, automatic Maps loading was disabled unless the map mount is explicitly configured with `data-live-map="enabled"`. This removed the broken network call while preserving city selection and external Google Maps search links.

## Boundary

This deployment publishes the review prototype. It does not claim production authentication, authorization, storage, verification, menu/order data, messaging, or live marketplace records. Slack delivery remains separate and requires approval for the exact attachment and caption.
