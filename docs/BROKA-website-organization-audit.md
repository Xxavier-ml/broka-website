# BROKA website — why it felt disorganized, and what I changed

Repository: `Xxavier-ml/broka-website` (branch `main`, commit `0c487ae`)
Work delivered on branch: `reorganize/site-structure`
Change set: **18 files, +541 / −266**
Verified with: `npm run build` (27/27 static pages), `npx tsc --noEmit`, and screenshots of every route at 1440px and 390px.

---

## The short version

Nothing was broken. The problem was that the site had grown **a second structure on top of its first** — two names for one page, two taxonomies for the same pages, three different ways of telling the same four-step story, and a section rhythm so wide that each section read as a separate page.

I counted the symptoms before touching anything:

| Symptom | Measured |
|---|---|
| Empty space between sections | every section carried **144px top + 144px bottom = 288px** of dead space |
| Home page length | **9,661px** tall at 1440px wide |
| Home page sections | **10**, of which 2 restated each other |
| Category rail on `/browse` | a **2,924px** row inside a **1,240px** box — **13 of 21 categories unreachable** on a desktop |
| Catalogue hero | **585px** of marketing before the first product |
| Hero numbers on a quiet day | **"0 Live auctions · 0 Online stores"** — the first thing a visitor saw |
| Category URL round trip | `Business & Industrial` → `/browse/business-%26-industrial` → **404** |

---

## What was actually wrong

### 1. The navigation named one page twice

`data/navigation.ts` had:

```ts
{ label: "Browse",  href: "/browse" },
{ label: "Explore", href: "/auctions", children: [
    { label: "All products", href: "/browse" },   // ← same page as "Browse"
    ...
]},
```

So "Browse" and "Explore → All products" were the same destination under two names, and `/browse` matched both — the nav marked **two entries as current at once**. That single detail is most of why the header felt unsettled.

The header also carried "Sell" in the nav *and* a "Start selling" button to the same page, and the "Search" control looked like a text field but was a link.

### 2. The site had two taxonomies for the same pages

The header grouped pages one way, the footer another:

| Page | Header | Footer |
|---|---|---|
| Roadmap | About | **Product** |
| Vision | About | **Company** |
| FAQ | About | **Company** |
| Social links | — | took a **whole column** |

Two groupings for one set of pages means neither can be learned. Nothing said "Get the app" in the nav either, on a site whose stated purpose is to hand people the app.

### 3. Every section floated in 288px of empty space

`.sec { padding: var(--sp-section) 0 }` with `--sp-section: 144px`. Between one section's last line and the next section's first there were **288px** — and with no rules or dividers, nothing visually held the page together. The home page was **30% padding**.

Section headers were also inconsistent: some left-aligned, some centred, eyebrow spacing ad hoc, and closing links placed with inline `marginTop: 40` / `48` / `60` styles scattered through the JSX.

### 4. Headlines broke into orphans

Headings had hard line breaks (`<br className="br-lg" />`) sitting inside columns narrower than the break assumed, so the browser wrapped *again* and produced single-word lines:

- "Information doesn't / **flow** / where it's needed."
- "Intelligence built / **into** / every transaction."
- "Information rarely / **flows where** / it needs to go."

Measured: a 79px statement in a 900px box rendering as 3 ragged lines.

### 5. The marketplace pages hid their own content

- **`/browse`** opened with a 585px marketing hero, so the first product sat below the fold on a page whose whole job is products.
- The category rail was **2,924px wide inside a 1,240px container**, clipped mid-word at the viewport edge ("Construction", "Be…"). The only affordance was a hint reading **"Swipe to explore"** — on a desktop, where there is no swiping.
- Status tabs, search, categories and sorting floated loose over the starfield as four unrelated controls.

### 6. The home page told the same story three times

The four capabilities were stated as **Discover / Understand / Negotiate / Complete** (home, and again on `/what-is-broka`), as **Find / Negotiate / Complete** (a three-step strip further down the same page), and as an eight-step journey on `/how-it-works`. Also:

- `Intelligence built into every transaction.` was both the home page's `<h2>` and the `/zeno` page's `<h1>`.
- The featured grid showed **4 cards in a 3-column grid**, leaving one orphan card and a hole beside it.
- The hero's live stat bar advertised **"0 Live auctions · 0 Online stores"**.

### 7. Empty states were dead ends

`/auctions` with no live auctions showed a small box in a large void reading "No live auctions right now" and **offered nothing to do next**. Same on `/stores`.

### 8. One category had three names

On the *same screen*, the hero tiles said **"Vehicles"** and **"Businesses"**, the chip rail below said **"Automobiles"** and **"Business & Industrial"**, and Electronics and Fashion had **different emoji** in each place.

---

## What I changed

### Welcome page — one clear idea

The home route now opens with an explicit **“Welcome to BROKA”** label and the requested main idea as its headline: **“The future of intelligent commerce.”** The supporting copy introduces BROKA and its AI-assisted discovery and negotiation, while the site title, description and social-preview metadata use the same positioning. The existing search, popular categories and “Get the app” actions remain in place.

### Navigation — one taxonomy, defined once

`data/navigation.ts` is now the single source: four groups (**Marketplace / Product / Company / Get started**) plus a utility list, and the header, mobile menu and footer all read from it.

- **Marketplace ▾** — Browse all products · Auction House · Online stores
- **Zeno** · **Sell**
- **About ▾** — What is BROKA · How it works · Technology · Vision · Founders · Roadmap
- Header actions: **Search** + one primary CTA, **Get the app**
- Footer: the same four groups; social links moved under the brand, freeing the column
- Desktop menus open **on hover** as well as click, and each item carries **a one-line description**
- Exactly **one** nav entry is current, and it is the most specific match
- Mobile menu shows the same groups under the same headings instead of a flat list

> One judgement call to flag: the header's primary button changed from **"Start selling"** to **"Get the app"**, because "Sell" is already a nav entry and the site is a window onto an app. If seller acquisition matters more, changing that one line in `Header.tsx` switches it back.

### Rhythm — one vertical scale

`--sp-section` 144px → **104px**, `.sec-sm` 80 → 64px, `.sec-lg` 160 → 128px, and one consistent section shape (`.sec-header`: eyebrow → headline → one line of explanation) with `.sec-outro` for closing links. Home page: **9,661px → 7,624px (−21%)**.

### Typography — let the browser break the lines

Removed the hard `<br>` breaks from the home page; `text-wrap: balance` (already in the tokens) now produces even lines at any width.

### Catalogue pages — content above the fold

- `/browse` hero: 585px marketing hero → a compact header
- Category chips now **wrap on wide screens** — all 21 visible, no hidden rail; the swipe hint is hidden where there is nothing to swipe
- Status tabs + search + categories sit in one **`.filter-panel`**
- `/auctions` and `/stores` use the same panel shape

### Home page — one narrative

Reordered and documented in the file: **what BROKA is → what's on it today → why it exists → what we're building → Zeno → the vision → the technology → the founders → what to do next.** The three-step strip is gone (the four capabilities already say it, and `/how-it-works` has the eight-step detail, linked once). The marketplace block was reframed from a second pitch ("Find what matters. Buy with confidence.") into a catalogue window ("What's live right now.").

### Honest numbers

The hero stat bar now shows live counts **only when there is something to count**, topped up to four cells with things that are always true (Escrow · Zeno · 21 categories). On a quiet day: `5 Active listings · Escrow · Zeno · 21 Categories`. No invented figures.

### Empty states

`EmptyState` accepts a list of actions, and `/auctions` / `/stores` now offer **Browse all products · the other marketplace · Get the app** instead of a dead end.

### Categories — one name, one URL

`categorySlug()` / `categoryFromSlug()` in `lib/categories.ts` spell "&" as "and", so the slug survives the round trip. `ZenoOrbit` now takes its labels **and emoji** from the canonical list and links straight to `/browse/<slug>` instead of `/search?category=…`. All **21 category URLs verified 200**, and the parser still accepts the older slug forms so existing links keep working.

### Repo hygiene

`*.tsbuildinfo` added to `.gitignore`.

---

## Verification

| Check | Result |
|---|---|
| `npm run build` | ✅ 27/27 static pages generated |
| `npx tsc --noEmit` | ✅ no errors |
| Section padding, all pages | 288px between sections → **208px** |
| Home page height (1440px) | **9,661px → 7,624px** |
| `/what-is-broka` height | 4,174px → 3,864px |
| `/browse` category rail | **2,924px clipped rail → all 21 chips wrap**; the only horizontally scrollable element left on the page is the closed mobile menu |
| Hero on a quiet day | `0 · 0 · 5 · Escrow` → `5 · Escrow · Zeno · 21` |
| Featured listings grid | 4 cards in 3 columns → **4 in 4** |
| Category URLs | **21 / 21 → 200** |
| Routes screenshotted | 16 routes × desktop + mobile |

---

## How to apply it

The change is a single commit on `reorganize/site-structure`. From a clone of `broka-website`:

```bash
git checkout -b reorganize/site-structure
git am broka-site-reorganization.patch     # keeps the commit and message
# or: git apply broka-site-reorganization.patch   # working-tree changes only
npm install && npm run build
```

`main` was not touched.

The patch was verified against a **fresh clone of the real repository**: it applies
cleanly with `git am` and produces the same 18-file, +541 / −266 change set.

> The GitHub connection available to me is **read-only** (`Resource not accessible
> by integration` on any write), so I could not push the branch or open the pull
> request myself. The patch above is the whole change; applying it takes one
> command. If you would rather I opened the PR directly, the connection needs
> write access to `Xxavier-ml/broka-website`.

**Live preview** of the reorganized site (temporary, served from the sandbox):
`https://8080-ir2ov2e9n037jvnwanln5-1dea4154.us1.manus.computer`

---

## Left alone deliberately — worth a decision

1. **`/search` redirects to `/browse`.** Sensible consolidation, and `robots: noindex` is set, but the header's "Search" control still links to `/browse` rather than a search page. Fine if intentional; worth deciding if you want a real `/search` surface.
2. **Duplicate listings in the API data.** The catalogue shows "Airtle 5G router" and "Airtel 5 G router" as separate products — a data problem, not a layout one, but it reads as a sloppy grid.
3. **Five stylesheets** (`globals`, `marketplace`, `site`, `home`) with some overlap between `globals` and `site` (footer rules in both). Consolidating is a larger, riskier job than this pass; I kept every change in the file that already owned the rule.
4. **The 3D background is the same on every page**, so all pages open on an identical starfield. Page-level identity beyond the hero copy is an open design question.
5. **`/account` is orphaned** — reachable only from `/sell/listing`. It is a placeholder for authentication, which lives in the app; worth deciding whether it should be linked at all.
