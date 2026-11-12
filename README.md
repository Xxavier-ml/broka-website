# BROKA Web

The public website for BROKA: what it is, how it works, and a read-only window
onto direct-price marketplace products and online stores.

## Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind-compatible CSS architecture (custom CSS in `app/*.css`)
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Checks: `npm run lint` (ESLint), and `npm run build` followed by
`npm run test:a11y` (Playwright with axe, the same run as the GitHub
Actions workflow; install the browser once with
`npx playwright install chromium`).

## What is on the site

| Section | Routes | Notes |
|---|---|---|
| About BROKA | `/`, `/what-is-broka`, `/how-it-works`, `/zeno`, `/technology`, `/vision`, `/founders`, `/roadmap`, `/faq` | Marketing content |
| Marketplace | `/browse`, `/browse/[category]`, `/categories` | Direct-price products, category search, filters and seller context |
| Online stores | `/stores`, `/stores/[slug]`, `/listings/[id]` | Store directory, a store's page and products, a product's details |
| Store links | `/store/*` | Served by the web storefront, a separate deployment (below) |
| Search | `/search` | Legacy search addresses route to `/browse` |
| Get the app | `/download` | Android APK hosted by this website at `/downloads/app-arm64-v8a-release.apk` |
| Contact | `/contact` | Email, phone, WhatsApp and the co-founders' addresses, plus an email form |
| Legal | `/privacy`, `/terms` | Review with a lawyer before launch |

The website is **view-only**. Making offers, chatting, calling and paying are
in the mobile app, and every listing page says so and links to `/download`.
The homepage uses generated category artwork to guide visitors into `/browse`;
it does not show live product cards. Old marketplace addresses redirect to the
current product catalogue.

## Where the listing data comes from

Server components read the BROKA API's public, unauthenticated `GET`
endpoints (`lib/api/`): `/listings/`,
`/listings/{id}`, `/stores`, `/stores/slug/{slug}`, `/stores/{id}/listings`,
`/stores/{id}/categories`. Responses are cached for 30 to 60 seconds, so a
busy page costs the API about one request a minute. The browser never calls the
API. If the API is down, list pages say so and keep working; detail pages show
an error page with a retry.

Nothing private is shown: no phone numbers or user ids.

Settings are in `.env.example`.

## Store links: the web storefront

Every store link the app shares is `broka.co.ke/store/<name>` (with
`/about` and `/p/<product>` below it). Those pages are the **web storefront**,
the main repository's `web/`, deployed as its own Vercel project: it counts
visits and shares for the store owner's stats, makes WhatsApp link previews and
shows the "Open in the app" banner. This site passes its paths on to it
(Next.js multi-zones): `/store/*`, `/og/*`, `/.well-known/*` and its files under
`/store-assets/*` in `next.config.ts`, and `/api/stores/*` in `middleware.ts`,
which also tells it the visitor's address. Settings (`lib/storefront.ts`):

- `STOREFRONT_URL`: the storefront project's own address, by default
  `https://broka-flax.vercel.app` (`lib/storefront.ts`). Set to `none`,
  `/store/*` links show this site's `/stores/*` and `/listings/*` pages
  instead, so they never 404.
- `STOREFRONT_PROXY_KEY`: the same random value (32+ characters) in both
  projects.

Both are read at build time: redeploy after changing them. Links from the
storefront back to `/` are plain `<a>` tags, since they cross to this site.

## Look and feel

The app's near-black navy (`#05060d`) and its living network, with BROKA violet
into electric blue and a cyan edge. One type system for every page: Space
Grotesk for headlines and prices, DM Sans for reading text, Inter for dense UI,
JetBrains Mono for small instrument labels; Montserrat only draws the wordmark.
Base tokens are at the top of `app/globals.css`; the site-wide look (glass
surfaces with lit edges, pill buttons, the floating header, the footer and the
page heroes) is `app/experience.css`, loaded last. Text never animates through
opacity (axe would read it mid-fade): entrances use transform, blur and
clip-path, and everything holds still under `prefers-reduced-motion`.

**The 3D background** (`components/background/NetworkBackground.tsx`) is raw
WebGL, no library: glowing nodes at real depths in front of a perspective
camera, links that fade with distance, packets travelling between nodes, a
starfield, and a navy sky (the app's colour) drawn at quarter resolution. The camera sways
toward the mouse and flies through the network as the page scrolls. Node
counts scale with the screen, it pauses in hidden tabs, and with
`prefers-reduced-motion` it draws one still frame. Without WebGL the CSS
gradient on `.netbg` shows instead.

**The home page** (`components/home/`, styles in `app/home.css`): a centred
promise over the real marketplace search (with a typed hint), then a product
stage: a phone playing a sample Zeno conversation (`HeroStage.tsx`, labelled
"Sample", paused off screen) with an orbit passing behind and in front of it.
Below: rails of all categories, an eight-category bento of the editorial art,
the three steps, Zeno in his orbit with one worked example, the seller story,
the app panel with a QR code for visitors on a computer (`components/ui/QrCode.tsx`,
drawn on the server by `lib/qrcode.ts`), the trust answers with the dotted Kenya
map, four FAQ answers from `data/faq.ts`, and the closing call to action. Phones
get a dock for browse, sell and the app. Category art and chat content are
illustrative; live products are shown on `/browse`. Sections rise in on CSS
scroll timelines where the browser supports them.

## Contact details

Kept in one place, `lib/site.ts` (email, phone, WhatsApp, social links, app
download URL), and the founders' addresses in `data/founders.ts`.

## Not covered yet

- Authentication, messaging, payments or a database. Those stay in the app.
- Link-preview images for shared products and stores use the API's image URL
  as is. The main repository's storefront converts them to JPEG for WhatsApp,
  which this site does not yet.
