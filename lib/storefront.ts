// The web storefront: the main repository's web/, deployed as its own
// Vercel project. It serves every store link (broka.co.ke/store/<name>)
// with the owner's visit and share counts, WhatsApp link previews and the
// "Open in the app" banner; this site passes its paths on to it
// (next.config.ts, middleware.ts). Read at build time by next.config.ts, so
// changing either setting needs a redeploy.

/** The storefront deployment's own address, e.g. https://broka-store.vercel.app. Empty = none. */
export const STOREFRONT_URL = (process.env.STOREFRONT_URL?.trim() ?? "").replace(/\/+$/, "");

/**
 * Shared with the storefront (its STOREFRONT_PROXY_KEY). Requests passed on
 * reach the storefront from this site's servers, so it can't see who the
 * visitor is; this site tells it, and the key proves the address came from
 * here. Without it the storefront's visit counts are limited per server of
 * this site rather than per visitor.
 */
export const STOREFRONT_PROXY_KEY = process.env.STOREFRONT_PROXY_KEY?.trim() ?? "";

/**
 * The paths the storefront serves, besides /api/stores/* (middleware.ts):
 * store and product pages, link-preview images, the app-link files
 * (assetlinks.json), and its own scripts, styles and images, which it keeps
 * under /store-assets (ASSET_PREFIX in web/src/lib/links.ts) so they don't
 * collide with this site's /_next/.
 */
export const STOREFRONT_PATHS = ["/store/:path+", "/og/:path+", "/.well-known/:path+", "/store-assets/:path+"];
