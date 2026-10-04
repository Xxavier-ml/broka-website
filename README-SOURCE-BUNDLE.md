# BROKA Website — Complete Source Bundle

This bundle contains the complete tracked source tree for the reorganized BROKA website (Next.js App Router, React, TypeScript), including public assets and `package-lock.json`. The home page opens with “Welcome to BROKA” and the headline “The future of intelligent commerce.”

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm ci
cp .env.example .env.local   # optional; defaults are documented in the example
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm ci
npm run build
npm run start
```

The app uses the public BROKA API server-side by default (`https://api.broka.co.ke`). Review `.env.example` and `README.md` for storefront URL, shared proxy-key and app-download configuration. Do not put real secrets in source control or `NEXT_PUBLIC_*` variables.

## Permanent publication

This source bundle is not itself a deployment. To publish, push/import it into a repository and deploy the Next.js app on a host that supports the Next.js production server. Set any required environment values in the host's protected environment-variable settings, then publish the production build. A working write-enabled GitHub connection and hosting account are needed to publish it directly from Manus.

## Contents

- All 116 tracked repository files at the reorganization commit.
- `docs/BROKA-website-organization-audit.md`: measurements and changes.
- `docs/broka-site-reorganization.patch`: the same one-commit patch for an existing clone.
- No `.git` directory, `node_modules`, `.next` build output, or real environment files/credentials.
