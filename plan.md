# BROKA conversion redesign — implementation plan

## Goal

Turn the existing BROKA public website into a premium, conversion-first entry point for buyers, sellers, and curious product visitors while preserving the existing connected-network background, route contracts, real marketplace data, app boundary, accessibility behavior, and first-party brand assets.

The primary conversion action is to move a visitor into the app or live marketplace. The homepage should make the choice obvious within the first screen: **Find a deal**, **Sell with context**, or **Meet Zeno**. The marketplace preview should use real API-backed inventory whenever available and remain honest when data is unavailable.

## Research-backed decisions

- Marketplace UX must reduce friction between intent and fulfillment, keep navigation clear, and establish trust throughout the journey. The site will therefore pair concise value propositions with real inventory, seller context, protection language, and visible next steps rather than relying on decorative claims.
- The value proposition will state a specific customer outcome, a pain point addressed, and BROKA's distinction: helping buyers and sellers reach clearer, fairer deals with context carried through the transaction. Copy will prioritize clarity and benefits over hype.
- The visual direction uses restrained retrofuturism: dark mode, bold typography, luminous violet/cyan accents, depth, and motion used as orientation rather than decoration. The existing network background remains the brand's signature infrastructure.

## Product and implementation approach

1. **Homepage conversion architecture**
   - Replace the current welcome-first hero with a sharper promise and three clear routes: buyer, seller, and Zeno.
   - Keep the existing Zeno orbit and network field, but frame it as a live intelligence interface instead of a purely atmospheric illustration.
   - Bring a live marketplace proof rail into the first meaningful scroll: real featured listing cards, auctions/stores when returned by the API, and honest empty/unavailable states.
   - Add a compact trust strip based only on real product capabilities already present in the app/site: escrow/protected payments, seller context, Zeno assistance, and mobile-first access.
   - Keep the deeper narrative sections, but tighten them around outcomes and scannable decision points.

2. **Marketplace conversion layer**
   - Retain all existing browse/store/auction/listing routes and query behavior.
   - Upgrade the marketplace preview, browse hero, store directory, and product-card hierarchy so photography, KES price, seller/location context, and the app handoff are the visual priority.
   - Make the app boundary explicit at the moment of intent: browse remains read-only; negotiating, messaging, bidding, and paying happen in the app.
   - Preserve live-vs-simulated disclosures and never invent marketplace counts, ratings, testimonials, or performance metrics.

3. **Visual system**
   - Preserve canvas `#05060d`, the supplied BROKA logo/mark, Zeno character, and animated network background.
   - Use a quieter surface hierarchy: ink-navy panels, hairline borders, violet primary actions, cyan information signals, and amber only for commerce urgency/protection cues.
   - Use Montserrat for display and prices, Inter for UI, and Noto Serif only for occasional editorial emphasis.
   - Use an asymmetrical editorial layout: left-aligned decision copy, an offset intelligence core, product proof shelves, and signal-line dividers instead of a centered template grid.
   - Signature elements: the connected network field, a violet/cyan “signal path” treatment, and premium instrument-style micro-labels for live/simulated states.
   - Interaction: hover/focus states should feel like a signal locking onto a target; transitions stay in the 160–240ms range, with no new perpetual motion beyond the existing background and restrained ambient accents. Reduced-motion users receive the same hierarchy without animation.

4. **Brand positioning and voice**
   - Positioning: “BROKA is the intelligent commerce layer for buyers and sellers who want clearer discovery, fairer negotiation, and more trust in every deal.”
   - Personality: **precise, luminous, grounded**.
   - Voice: direct, confident, locally grounded, never inflated. Example lines: “Find the signal in the market.” and “Sell what you know, with the context buyers need.”
   - Wordmark/mark: keep the supplied BROKA mark and wordmark; use the connected-node field as the ownable visual signature rather than replacing the logo.
   - Ownable color: BROKA Violet `#8b75ff`, carried by a violet-to-blue signal gradient.

## Planned source structure

- `app/page.tsx`: homepage composition and conversion ordering.
- `components/home/HomeHero.tsx`: first-screen promise, route choices, Zeno intelligence panel, and truthful stats.
- `components/home/CommerceNarrative.tsx`: outcome-led journey, trust, and seller sections.
- `components/marketplace/LiveMarketplace.tsx`: proof rail and app handoff treatment.
- `app/redesign.css`: reversible presentation layer for homepage and marketplace surfaces; existing business logic remains untouched.
- `app/globals.css`, `app/home.css`, `app/marketplace.css`: only targeted token/responsive corrections if needed after visual review.
- `public/manus-routes.json`: complete static page route manifest for the current App Router route set.
- `app.config.ts`: literal durable `logoUrl` for project metadata.
- `plan.md` and `TODO.md`: implementation record and acceptance outcomes.

## Constraints preserved

- Existing background color and connected network remain.
- Existing route paths, navigation labels, form names, query strings, API data contracts, legal language, SEO metadata, and accessibility semantics remain.
- No new purchase, bid, listing, chat, payment, or authentication behavior is added to the marketing site.
- All claims and visible marketplace signals stay grounded in existing data or clearly marked as simulated.

## Delivery

- Run dependency install, typecheck/build, and the existing accessibility suite.
- Start the local Next server and inspect desktop/mobile rendering at the homepage and key marketplace routes.
- Commit the finished source and push it to `main` on `Xxavier-ml/broka-website`.
- Produce a source bundle zip as a backup deliverable, excluding `.git` and dependency caches.
