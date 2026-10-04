# BROKA website redesign — brand specification

## Design read

- **Artifact:** Full public website and marketplace refresh.
- **Audience:** Buyers, sellers, and partners exploring BROKA in Kenya and East Africa.
- **Visual language:** Connected commerce — the existing nocturne canvas remains, while page content becomes quieter, more editorial, and easier to scan. Marketplace controls read as product UI rather than floating neon.
- **Mode:** Redesign · Overhaul, with brand and behavior preserved.
- **Dials:** Visual variance 6/10; motion 4/10; information density 5/10; asset dependence 7/10; brand fidelity 9/10.

## Invariants and contracts

- Keep the existing background color **`#05060d`** and the living violet/blue network of glowing connected points. Reduce competition behind copy, not its recognizable color or topology.
- Keep the supplied BROKA symbol and wordmark, and the existing Zeno character. Do not substitute generated lettering, stock imagery, or a generic mascot.
- Preserve route paths, navigation labels, form names and submission/query behavior, marketplace data, legal/privacy language, accessibility semantics, reduced-motion support, SEO metadata, and live-versus-simulated disclosures.
- No purchase, checkout, listing, bid, or app actions are added to the marketing website; the existing app boundary remains explicit.

## Supplied identity assets

- Primary symbol: `public/assets/broka-mark.png`
- Logo/wordmark: `public/assets/broka-logo.png`
- Zeno character: `public/assets/zeno-full.webp`
- Zeno application icon: `public/assets/zeno-icon.png`
- Approved 3D-logo still: `docs/broka-mark-3d-concept.png` (transparent PNG).
- Silent 1080p logo-reveal master: `docs/broka-logo-reveal-preview.mp4`.
- Website rendition: `public/assets/broka-logo-reveal.mp4` (640×360, 5 seconds, silent).
- Real catalogue photographs remain from the existing BROKA listing-media endpoint and current `Media`/`ProductCard` components.
- The public page screenshots captured during baseline review are references only; existing source code and first-party assets take precedence. External image-search results were unrelated and are not used.

## Visual system

- **Canvas:** Preserve `#05060d`; dark navy/near-black surfaces provide readable contrast over the network.
- **Core accents:** BROKA violet `#8b75ff` and electric blue `#608cff`; cyan and warm amber remain secondary status accents.
- **Text:** Near-white primary; high-contrast cool gray secondary; muted labels remain legible against dark surfaces.
- **Typography:** Montserrat for display headings and price emphasis; Inter for navigation, controls, and dense UI; Noto Serif reserved for a small number of editorial storytelling moments.
- **Spacing:** 8px base rhythm, with page gutters and section spacing fluidly clamped to viewport width.
- **Shape:** 12px control radius, 18px card radius, 24px feature surfaces. Pill shape is reserved for compact category/status controls and the app CTA.
- **Elevation:** Thin neutral borders and restrained shadow; one calm surface hierarchy rather than layered glow on every card.
- **Motion:** Short 160–240ms state transitions and restrained hero motion. Preserve the existing network animation, respect `prefers-reduced-motion`, and avoid new perpetual UI animation. The silent logo reveal appears only at the homepage closing CTA, is loaded near the viewport, and falls back to the supplied static mark for reduced-motion/data-saving cases.

## Rollback note

The main visual changes live in `app/redesign.css`, loaded after the existing stylesheets. Removing that import in `app/layout.tsx` cleanly restores the prior styling without touching route logic or the existing component contracts.
