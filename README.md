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
| Online stores | `/stores`, `/stores/[slug]`, `/listings/[id]` | Store directory, a store's page and products, a product's details |
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

## The animated background

`components/background/NetworkBackground.tsx` draws BROKA's connected-dots
identity behind every page on one `<canvas>`: drifting nodes, links that fade
with distance, packets travelling along links, pointer and scroll parallax. It
scales its node count to the screen, pauses while the tab is hidden, and under
`prefers-reduced-motion` draws a single still frame. Sections use translucent
tints (`--c-bg-t` and friends in `globals.css`) so it shows through.

## Contact details

Kept in one place, `lib/site.ts` (email, phone, WhatsApp, social links, app
download URL), and the founders' addresses in `data/founders.ts`.

## Not covered yet

- Authentication, bidding, messaging, payments or a database. Those stay in the app.
- ESLint is not installed in this repository (`npm run lint` needs it).
- Link-preview images for shared auctions and stores use the API's image URL
  as is. The main repository's storefront converts them to JPEG for WhatsApp,
  which this site does not yet.
