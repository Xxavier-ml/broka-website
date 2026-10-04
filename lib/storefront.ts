// The web storefront: the main repository's web/, deployed as its own
// Vercel project. It serves every store link (broka.co.ke/store/<name>)
// with the owner's visit and share counts, WhatsApp link previews and the
// "Open in the app" banner; this site passes its paths on to it
// (next.config.ts, middleware.ts). Read at build time by next.config.ts, so
// changing either setting needs a redeploy.

/** The storefront project's own Vercel address. Not a secret, so it is here
 *  rather than only in Vercel's settings; STOREFRONT_URL overrides it, and
 *  STOREFRONT_URL=none turns the pass-on off (store links then show this
 *  site's own store pages). */
const DEFAULT_STOREFRONT_URL = "https://broka-flax.vercel.app";
const configured = process.env.STOREFRONT_URL?.trim() || DEFAULT_STOREFRONT_URL;
export const STOREFRONT_URL = configured === "none" ? "" : configured.replace(/\/+$/, "");

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
