# Tori Feedback Implementation Checklist

**Source:** July 23, 2026 prototype review, approximately 39 minutes  
**Reviewed prototype:** current static Bridge suite in `site/`

| Tori feedback | Phase 2 treatment | Evidence | Status |
| --- | --- | --- | --- |
| Keep the dark purple direction | Preserved signature purple and dark Bridge surfaces with improved hierarchy | Home and Explore | Implemented |
| Use more imagery, motion, and hover | Added a visual story strip, richer news cards, card lift/focus, entry motion, and reduced-motion fallback | Home, Community News, shared CSS | Implemented |
| Reduce giant hero typography | Reduced and bounded desktop headline scale; product utility now enters the first viewport | Home | Implemented |
| Show photos in a horizontal strip | Added three story-led product moments using approved local assets | Home | Implemented |
| Do not imply metrics are bad | Reframed copy around useful, privacy-conscious insight and signal context | Home, Explore | Implemented |
| Make navigation clear | Standardized Community News, Create, My Profile, Explore, and Home with consistent icons | All routes | Implemented |
| Rename Exchange to Explore | Primary route and navigation now use Explore | Explore and all navigation | Implemented |
| Rename Business to My Profile / home base | Primary route and navigation now use My Profile and verified home-base language | My Profile and all navigation | Implemented |
| Simplify search | Uses direct search inputs with scoped filters and a consistent global search treatment | Community News, Explore, headers | Implemented |
| Compare a Pinterest/newspaper feed with Instagram-style vertical feed | Added News grid and Classic feed switcher using the same content | Community News | Prototyped; default needs Tori approval |
| Support PNG, PDF, and images | Added local PNG/JPEG/WebP/PDF picker, size/type validation, status, and preview | Create | Implemented in prototype |
| Add Promotion content type | Promotion is the default content type | Create | Implemented |
| Allow multiple audiences | Added Adults 21+, Verified retailers, and Industry professionals | Create | Implemented in prototype |
| Protect wholesale/business detail by verified role | Protected toggle disables public audience and explains verified-only access | Create | Prototyped; server rules still required |
| Keep and refine the current creator | Preserved the brief, audience, market, compliance, and preview workflow | Create | Implemented |
| Show correct sales rep and accounting contact | Added separate responsible-contact blocks | My Profile | Implemented with illustrative records |
| Confirm contacts on first login and repeatedly by email | Added first-login confirmation state, 90-day cadence, dates, and confirm/update actions | My Profile | Prototyped; email integration pending |
| Separate public/member from EIN-verified business access | Added Public and B2B modes plus a field-level visibility contract | My Profile, product contract | Prototyped; final policy approval needed |
| Decide vendor-to-vendor visibility | Deny-by-default recommendation documented | Product contract decision record | Decision needed |
| Expand directory beyond cannabis brands | Added illustrative bank, transport, lab, construction/HVAC/electrical, dispensary, and brand records | Explore | Implemented in prototype |
| Support nationwide state discovery | Added all 50 states and D.C. to the state selector; kept the current Maryland, Massachusetts, New Jersey, and Virginia records explicitly labeled as illustrative coverage | Explore | Nationwide filter implemented; live data coverage pending |
| Add filters for state, product, brands, strains, and categories | Added composable search plus State, Category, and Product controls; search covers brand/strain/service terms | Explore | Implemented in prototype |
| Add favorites | Added record save state and Favorites only filtering | Explore | Implemented |
| Consumer dispensary profile should expose menu/order/maps/social/Leafly | Added a Common Ground consumer-utility example | Explore | Prototyped; provider decisions pending |
| Treat $349-$350 pricing as exploratory | Removed pricing from the product experience and documented it as unresolved | Product contract | Correctly deferred |
| Recruit major brands and launch both sides of the marketplace | Captured as launch/business work, not represented as completed product capability | Backlog | Business work pending |
| Do not rush the launch | Added stakeholder, technical, data, compliance, and test exit gates | Product contract | Implemented as governance |
| Keep HR concept for later | Explicitly excluded HR from Phase 2 MVP pending legal/privacy discovery | Product contract and backlog | Future only |

## Prototype evidence already exercised

- Community News toggles between News grid and Classic feed with selected-state feedback.
- Create accepts a real local PNG during QA and surfaces the file name and size.
- Protected content removes the public audience and limits the preview to verified audiences.
- My Profile confirms the current contact cycle and hides protected contact blocks in Public view.
- Explore filters Industry services to three illustrative records, then Favorites only to one saved record.
- All five primary routes render at desktop and 390-pixel mobile widths without document overflow.

## Evidence boundary

Illustrative organizations, contact names, result counts, credentials, menu/order links, signals, and opportunity records are prototype data. They demonstrate interaction and visibility rules; they do not establish live integrations or current business facts.
