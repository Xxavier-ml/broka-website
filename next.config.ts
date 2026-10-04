import type { NextConfig } from "next";
import { STOREFRONT_PATHS, STOREFRONT_URL } from "./lib/storefront";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: []
  },
  // The app and the API hand every seller a link of the form
  // broka.co.ke/store/<name> (STORE_LINK_BASE in the main repository), and
  // those links are already on flyers and in bios. They belong to the web
  // storefront (the main repository's web/), a separate deployment: with
  // STOREFRONT_URL set, its paths are passed on to it (Next.js "multi-zones").
  // /api/stores/* goes through middleware.ts instead, which adds the
  // visitor's address. Rewrites, not redirects: the address the seller shared
  // stays in the bar, and the query (?via=whatsapp) passes through.
  async rewrites() {
    // The storefront has no page at bare /store; the directory is here.
    const directory = { source: "/store", destination: "/stores" };
    if (STOREFRONT_URL) {
      return [
        directory,
        ...STOREFRONT_PATHS.map((path) => ({ source: path, destination: `${STOREFRONT_URL}${path}` })),
      ];
    }
    // No storefront deployed: answer the links with this site's own store
    // pages, so a shared link never lands on the 404 page.
    return [
      directory,
      { source: "/store/:name", destination: "/stores/:name" },
      // The store's details are on its main page here.
      { source: "/store/:name/about", destination: "/stores/:name" },
      // One of the store's products, as the app shares it.
      { source: "/store/:name/p/:id", destination: "/listings/:id" },
    ];
  },
};

export default nextConfig;
