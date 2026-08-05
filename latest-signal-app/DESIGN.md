# Bridge Phase 2 Design Context

## Direction

Bridge should feel like a trusted industry operating layer: dark, editorial, energetic, and clearly more considered than a generic social feed. Purple remains the signature color, but the experience uses photography, texture, structured white space, and purposeful motion so the brand is not carried by gradients alone.

## Visual system

- **Primary dark:** near-black plum surfaces for Home and Explore.
- **Signature purple:** violet-to-plum treatments for primary actions, focus, active navigation, and verified-network energy.
- **Editorial light:** pale lavender and warm white surfaces for Community News, Create, and My Profile.
- **Trust accents:** muted green for verified states; restrained rose for identity badges; never rely on color alone.
- **Typography:** Poppins for display hierarchy, Montserrat for compact labels and subheads, Inter for body and controls. All fonts are local.
- **Imagery:** use approved Bridge assets as story-led content, not decorative filler. Keep readable overlays and meaningful alt text.
- **Shape:** medium-to-large radii, strong panel edges, restrained borders, and crisp control states.

## Interaction system

- The five product spaces use consistent icon-and-label navigation.
- Hover and focus may lift or brighten cards, but all meaning remains available without hover.
- Motion should clarify entry, selection, and relationships. Respect `prefers-reduced-motion` and never make animation required to understand state.
- Primary controls expose selected state through text and `aria-pressed`, not color alone.
- Protected audience rules must be visible at the point of creation.
- Public and B2B profile modes must state what changed when the view changes.

## Responsive rules

- Desktop uses a left product rail on internal routes and a horizontal brand header on Home.
- Mobile uses a persistent four-item dock for Community News, Create, My Profile, and Explore.
- Navigation, filters, and forms collapse into single-column controls at narrow widths.
- Editorial cards retain hierarchy without fixed widths; horizontal document overflow is a release blocker.
- Essential actions remain at least 44 pixels tall when practical.

## Component inventory

- Product navigation with a local SVG icon sprite.
- Visual story strip on Home.
- Feed-layout switcher and responsive news-card grid.
- Daily Signal prompt.
- Asset upload, audience selector, protected-content notice, and live creative preview.
- First-login contact confirmation card and public/B2B profile modes.
- Explore filters, result cards, favorites, a synchronized five-view illustrative 3D map theater, consumer utility links, and permissioned introduction actions.
- Opportunity, methodology, and signal-ledger cards for deeper discovery.

## Quality floor

- Never publish remote font dependencies, secret values, production-looking false data, or unlabelled prototype records.
- Preserve visible focus treatment, semantic headings, form labels, and reduced-motion behavior.
- Avoid oversized display type that prevents reviewers from seeing product utility in the first viewport.
- Avoid excessive pill-shaped containers and generic gradient-only sections.
- Validate desktop and 390-pixel mobile layouts in the Codex in-app browser before completion.
