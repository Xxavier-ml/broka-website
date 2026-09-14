# BROKA Web

The first frontend foundation for BROKA's web marketplace.

## Stack

- Next.js
- React
- TypeScript
- Tailwind-compatible CSS architecture (custom CSS in this initial visual foundation)
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current scope

This version is intentionally frontend-only and uses mock listing/trader data.

It does not:
- connect to the BROKA API
- contain a database
- implement authentication
- process payments
- implement real negotiation, messaging, calls or auctions
- configure Cloudflare or deployment

The next engineering phase should inspect the existing FastAPI routes in
`Xxavier-ml/broka` and create a precise web API mapping before integration.
