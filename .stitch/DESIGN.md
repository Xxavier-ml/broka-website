---
name: BROKA Connected Commerce
colors:
  background: '#05060d'
  on-background: '#f7f7fc'
  surface: '#080a14'
  surface-container: '#0c1020'
  surface-container-high: '#13182b'
  surface-container-highest: '#1a2035'
  on-surface: '#f7f7fc'
  on-surface-variant: '#c5cada'
  primary: '#8b75ff'
  on-primary: '#ffffff'
  primary-container: 'rgba(139, 117, 255, 0.16)'
  on-primary-container: '#ded8ff'
  secondary: '#54d7e9'
  on-secondary: '#05060d'
  tertiary: '#dbb75d'
  on-tertiary: '#05060d'
  outline: 'rgba(195, 202, 226, 0.13)'
  outline-variant: 'rgba(195, 202, 226, 0.22)'
typography:
  display:
    fontFamily: Montserrat
    fontSize: 'clamp(36px, 6vw, 76px)'
    fontWeight: '800'
    lineHeight: '1.04'
    letterSpacing: '-0.035em'
  heading:
    fontFamily: Montserrat
    fontSize: 'clamp(26px, 3.5vw, 44px)'
    fontWeight: '700'
    lineHeight: '1.12'
    letterSpacing: '-0.03em'
  body:
    fontFamily: Inter
    fontSize: '16px'
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  ui-label:
    fontFamily: Inter
    fontSize: '12px'
    fontWeight: '600'
    lineHeight: '1.35'
    letterSpacing: '0.01em'
rounded:
  control: '14px'
  card: '18px'
  panel: '20px'
  pill: '9999px'
spacing:
  unit: '4px'
  rhythm: '8px'
  page-gutter: 'clamp(20px, 4vw, 52px)'
  content-max: '1280px'
  section: 'clamp(76px, 8vw, 112px)'
---

# Design System: BROKA Connected Commerce

## Brand & Style

BROKA's visual world is a deep, ink-navy marketplace illuminated by the same connected field that defines the brand: linked points of light, restrained violet energy, and a small cyan counter-accent. The moving network is atmospheric infrastructure, not decoration competing with the content; page surfaces stay dark enough for real product photos, prices, and controls to remain legible over it.

The product should feel confident and locally grounded rather than like a generic neon template. Montserrat gives the brand statements and product names a clear, sturdy silhouette; Inter keeps search, filters, prices, and location metadata fast to scan. Listing pages should privilege real marketplace inventory: a concise heading, an obvious search action, compact navigation, then product imagery and price—without a second marketing pitch between the shopper and the results.

## Colors

### Primary Foundation

- **Ink Navy** — `#05060d`: page canvas, intentionally preserved during the listing refresh.
- **Deep Surface** — `#080a14`: quiet inset surfaces and the shared header.
- **Night Slate** — `#0c1020`: raised filter and card surfaces.
- **Graphite Navy** — `#13182b` and `#1a2035`: higher surface steps, product-card fallbacks, and hover states.
- **Network Backdrop** — `#030518`: base behind the persistent particle/video field; keep the existing connected glowing dots visible.

### Accent & Interactive

- **BROKA Violet** — `#8b75ff`: primary action, selected category, and focused controls.
- **Soft Violet** — `#b3a7ff`: secondary highlights and category-rail text accents.
- **Pale Violet** — `#ded8ff`: high-contrast text on violet-tinted surfaces.
- **Signal Cyan** — `#54d7e9`: supporting information and the cool edge of the brand gradient.
- **Commerce Amber** — `#dbb75d`: warm accent for auction/price states, used sparingly.
- **Brand Gradient** — violet into blue; reserve for primary actions and small identity accents, not large content backgrounds.

### Typography & Text Hierarchy

- **Bright Ivory** — `#f7f7fc`: primary text and high-priority product names.
- **Lavender Grey** — `#c5cada`: body copy, descriptive content, and secondary metadata.
- **Cool Muted Slate** — `#9ba4bc`: tertiary metadata such as location, timestamps, and quiet hints.
- **Hairline Outline** — `rgba(195, 202, 226, 0.13)`: quiet card and control borders.
- **Raised Outline** — `rgba(195, 202, 226, 0.22)`: clearer hover/focus boundaries.

### Functional States

- **Live / confirmed**: use the existing emerald status color and a readable text label; never rely on a glowing dot alone.
- **Urgent / ending soon**: use warm amber as a restrained secondary cue.
- **Focus**: a visible two-pixel violet outline with a three-pixel offset.
- **Muted / unavailable**: keep labels legible in the tertiary text role; do not reduce opacity until contrast is lost.

## Typography

### Hierarchy & Weights

- **Montserrat** is the display face, loaded with Next Font in weights 600, 700, and 800. Use it for page titles, section titles, product names, and price amounts. Display text is heavy, tightly tracked, and deliberately compact; use fluid sizes rather than hard-coded oversized headlines on listing pages.
- **Inter** is the functional face, loaded at weights 400–600. Use it for search, category labels, tabs, buttons, counts, and product metadata. Its open forms and sturdy small-size rendering suit mobile commerce scanning.
- **Noto Serif** is available for editorial reading passages where a more reflective register is useful; it is not the default for compact listing controls.
- Keep body line-height near 1.6 for longer prose. Use roughly 1.1–1.25 for display and card headings; prices should remain visually stronger than location metadata.

### Spacing Principles

- Use a **4px base unit**, with an **8px working rhythm**. Compact listing controls typically use 8–16px gaps; avoid large hero-to-results voids.
- The content wrapper caps at 1280px with fluid page gutters (`clamp(20px, 4vw, 52px)`). Marketing sections remain spacious, while discovery pages intentionally compress vertical rhythm around search and results.
- Keep phone controls comfortably tappable (about 44px high or more), while retaining compact visual padding around their labels.

## Component Stylings

### Buttons

Primary actions use the violet-to-blue brand gradient, white text, and a 14px radius, with a soft violet shadow and a subtle inner highlight. Secondary actions are dark, lightly outlined, and quieter. Hover effects are restrained and transform/color transitions should remain short; focus must be visible independently of hover.

### Cards & Product Surfaces

Product cards are image-led, edge-to-edge, and information-dense: a 4:3 product photograph, an optional condition badge over the image, then category, product name, price, and location. Use an 18px desktop radius (14px on small screens), a fine outline, and modest elevation rather than a heavy glow. Preserve real listing photography and existing API-backed card behavior; never replace product imagery with generic art.

Store and auction cards share the same card silhouette. Auction state, reserve status, bid count, and countdown remain separate readable labels; a glow is never the sole signal.

### Navigation

The shared header is a compact, fixed dark-glass bar with a fine lower divider, BROKA mark, horizontal desktop navigation, and a mobile menu. Keep its height and mobile affordances stable while tightening page content below it.

 ### Inputs & Forms

 Search is the primary control on discovery routes: a dark, pill-shaped field with a restrained cool-blue edge, clear focus ring, and a leading magnifier that can submit the query. Place a separate compact square sliders button immediately beside it; do not put a text “Search” button inside the field. The sliders open the existing filter sheet and show an active-count badge when relevant. On the home page, keep filter edits as a draft until “View results” sends the typed query and selected filters to browse. Preserve GET submission, autocomplete, analytics, and existing query parameters on listing routes.

 ### Marketplace Category Rail

 Category options are compact pill links. The refinement removes the surrounding panel and redundant category heading/count/hint; the unboxed rail sits after the concise page title/support copy and before search. On motion-enabled displays, a slow, continuous horizontal marquee (56–168 seconds per loop, depending on item count) uses transform-only CSS animation; users can pause/resume it, hover/focus pauses it, duplicates are hidden from assistive technology, and reduced-motion users receive a static, natively scrollable rail. Keep the active state unmistakable without enclosing the whole rail in a card.

 ## Layout Principles

 ### Grid & Structure

 - Main content width: 1280px maximum.
 - Use CSS Grid for product catalogues; desktop columns expand to available space, while phones retain a comfortable two-column photo grid when cards can sustain legible names and prices.
- Core discovery sequence: concise page title + useful one-line context → open category rail → upgraded search → compact results/filter row → listing grid.
- Apply the listing-first treatment to dedicated browse/category/search, auction, and store-directory pages, plus product grids inside seller storefronts. Individual product/auction detail pages remain detail views.
- Keep the homepage's brand/story hero distinct. Homepage product shelves are outside this approved refinement scope.

 ### Whitespace Strategy

Marketing and editorial pages use generous section rhythm; browse, category, auction, store-directory, and seller-product pages use tighter 8–16px control spacing. The listing grid should begin substantially earlier than in the current mobile browse layout. Keep context-setting copy when it helps shoppers, but shorten it; remove only duplicate eyebrow/paragraph/category-panel framing that repeats the title or listing count.

 ### Alignment & Visual Balance

 Align page title, search, category rail, result count, filters, and card grid to the same content gutter. Search should be easy to locate; the eye should reach product photographs and prices immediately after the compact controls. Keep glow behind content and avoid a separate framed box around categories.

 ### Responsive Behavior & Touch

The system uses fluid gutters and breakpoint-driven CSS, with key commerce changes around 1024px, 700px, and 460–640px. At phone widths, keep category labels in a single horizontal lane, maintain readable two-column product cards, prevent horizontal page overflow, and preserve controls' real hit area. When reduced motion is requested, stop the automatic category movement and expose normal horizontal scrolling instead.

## Design System Notes for Stitch Generation

### Language to Use

Describe the interface as **ink-navy connected commerce**, **real-product-first**, **quietly luminous**, **compact and scannable**, and **mobile-first**. The violet and cyan network should support—not obscure—inventory.

 ### Color References

 Use Ink Navy `#05060d`, Deep Surface `#080a14`, BROKA Violet `#8b75ff`, Signal Cyan `#54d7e9`, Bright Ivory `#f7f7fc`, and Cool Muted Slate `#9ba4bc`. Preserve the existing living network background and its linked luminous points.

 ### Component Prompts

1. “Design a BROKA browse page with a compact Montserrat title, one useful support line, an unboxed horizontal category lane above a prominent dark pill search field, and a separate square sliders button immediately to its right. Keep real Kenyan marketplace product cards close below the controls. Preserve the deep navy network background, violet focus/active states, cyan accents, and two-column mobile inventory grid.”
2. “Create a lightweight BROKA listing flow: concise title/context, category strip before search, then a compact result count and filters. The category lane should move slowly and continuously after a brief initial settle, with an unobtrusive pause control, visible keyboard focus, and a reduced-motion static-scroll fallback.”
 3. “Refine product cards for fast phone scanning: full-bleed real product photo, small condition badge, compact category label, bold product name and KES price, then quiet location metadata. Keep the existing dark glass treatment restrained so photography remains the main feature.”

 ### Incremental Iteration

Change hierarchy and spacing before introducing new colors or illustration. Keep listing logic, filter/query contracts, product photography, and the connected background intact. Test the smallest phone width first, then tablet and desktop. Add motion only to the category rail; use transform-only animation, pause/resume, a short initial settle, and a reduced-motion fallback. This document captures the current source-driven design language and the implemented listing refinement.
