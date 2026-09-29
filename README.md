# BROKA Web

The public website for BROKA: what it is, how it works, and a read-only window
onto the marketplace (auctions and online stores).

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

## What is on the site

| Section | Routes | Notes |
|---|---|---|
| About BROKA | `/`, `/what-is-broka`, `/how-it-works`, `/zeno`, `/technology`, `/vision`, `/founders`, `/roadmap`, `/faq` | Marketing content |
| Auction House | `/auctions`, `/auctions/[id]` | Live, ending soon, upcoming and completed auctions, with the current bid, countdown and bid history |
| Online stores | `/stores`, `/stores/[slug]`, `/listings/[id]` | Store directory, a store's page and products, a product's details. The links the app shares (`/store/<name>`, `/store/<name>/about`, `/store/<name>/p/<id>`) are rewritten to these in `next.config.ts` |
| Search | `/search` | One search across auctions and stores |
| Get the app | `/download` | Android APK from the BROKA GitHub releases |
| Contact | `/contact` | Email, phone, WhatsApp and the co-founders' addresses, plus an email form |
| Legal | `/privacy`, `/terms` | Review with a lawyer before launch |

The website is **view-only**. Bidding, making offers, chatting, calling and
paying are in the mobile app, and every listing page says so and links to
`/download`. Only auctions and online-store products appear on the site: a
personal listing outside a store answers 404 here.

## Where the listing data comes from

Server components read the BROKA API's public, unauthenticated `GET`
endpoints (`lib/api/`): `/auctions`, `/auctions/{id}`, `/listings/`,
`/listings/{id}`, `/stores`, `/stores/slug/{slug}`, `/stores/{id}/listings`,
`/stores/{id}/categories`. Responses are cached for 30 to 60 seconds, so a
busy page costs the API about one request a minute. The browser never calls the
API. If the API is down, list pages say so and keep working; detail pages show
an error page with a retry.

Nothing private is shown: no phone numbers, no user ids, no reserve prices
(the API does not send them), and bidder names are shortened ("J*** W.").

Settings are in `.env.example`.

## Look and feel

Built to the BROKA mockup: the app's near-black navy, Montserrat for headlines and numbers,
Noto Serif for reading text, Inter for small UI labels, violet-to-blue
gradient pill buttons. Tokens are at the top of `app/globals.css`.

**The 3D background** (`components/background/NetworkBackground.tsx`) is raw
WebGL, no library: glowing nodes at real depths in front of a perspective
camera, links that fade with distance, packets travelling between nodes, a
starfield, and a navy sky (the app's colour) drawn at quarter resolution. The camera sways
toward the mouse and flies through the network as the page scrolls. Node
counts scale with the screen, it pauses in hidden tabs, and with
`prefers-reduced-motion` it draws one still frame. Without WebGL the CSS
gradient on `.netbg` shows instead.

**The home hero** (`components/home/`): Zeno (`public/assets/zeno-full.webp`,
from the app's assets) in a glowing ring with an orbit passing behind and in
front of him, category tiles, a dotted Kenya map with a Nairobi beacon, and
live stats from the API. The scene tilts toward the mouse in 3D and sways
gently on touch screens. Large glows animate as HTML layers so the GPU runs
them without repainting the SVG.

## Contact details

Kept in one place, `lib/site.ts` (email, phone, WhatsApp, social links, app
download URL), and the founders' addresses in `data/founders.ts`.

## Not covered yet

- Authentication, bidding, messaging, payments or a database. Those stay in the app.
- ESLint is not installed in this repository (`npm run lint` needs it).
- Link-preview images for shared auctions and stores use the API's image URL
  as is. The main repository's storefront converts them to JPEG for WhatsApp,
  which this site does not yet.
