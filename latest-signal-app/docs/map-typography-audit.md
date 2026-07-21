# Bridge map and typography audit

Reviewed July 21, 2026 against the supplied branding guide, legal strategy, business verification requirements, and original Bridge HTML concepts.

## Decision

The map makes directional sense as geographic discovery. Tori's original landing concept uses connected state nodes and promises state-by-state coverage. Her legal strategy also requires age, location, license, advertising, delivery, and geofencing rules to adapt by jurisdiction.

The documents do not request a Google 3D map and do not provide live regional percentages. The prototype should therefore present the map as a discovery and jurisdiction interface, not as measured market intelligence. Precise percentages and response counts were removed from the map.

## Brand typography decision

The branding guide is explicit:

- Poppins for headlines
- Montserrat Semibold for subheads and controls
- Inter Regular for body copy and UI text

The family choice was correct. The implementation was causing the visual problem through tight headline tracking, compressed line height, 8px to 11px text, low-contrast gray copy, and remote font swapping. The revision keeps the brand families, self-hosts the Latin webfont files, normalizes headline spacing, raises body and metadata sizes, and strengthens contrast.

## Ten relevant GitHub skills found

Curated from the results returned by `npx skills find` on July 21, 2026. The first four are broad frontend quality systems. The remaining six directly target web type, scale, and critique. Install count is a discovery signal, not an independent quality score.

1. `anthropics/skills@frontend-design`, 688.4K installs
2. `vercel-labs/agent-skills@web-design-guidelines`, 479.1K installs
3. `leonxlnx/taste-skill@design-taste-frontend`, 275.9K installs
4. `pbakaus/impeccable@frontend-design`, 54.1K installs
5. `wondelai/skills@web-typography`, 5.4K installs
6. `jakubkrehel/skills@better-typography`, 1.7K installs
7. `owl-listener/designer-skills@typography-scale`, 1.1K installs
8. `bencium/bencium-claude-code-design-skill@ui-typography`, 589 installs
9. `owl-listener/designer-skills@critique-typography`, 519 installs
10. `mblode/agent-skills@typography-audit`, 416 installs

The applied workflow used the installed local brand-guidelines, design-taste-frontend, and a11y-audit skills. That combination was sufficient and avoided adding overlapping project dependencies. Impeccable's detector is used as a final independent design lint pass.

## Source boundary

The live Google view and four-city selection remain prototype choices. The defensible North Star is the behavior underneath them: discover by geography, respect jurisdiction rules, distinguish external listings from Bridge verification, and avoid unsupported data claims.
