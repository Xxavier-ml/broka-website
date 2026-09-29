import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: []
  },
  // The app and the API hand every seller a link of the form
  // broka.co.ke/store/<name> (STORE_LINK_BASE in the main repository), and
  // those links are already on flyers and in bios. This site keeps its stores
  // at /stores/<name>, so without these every shared store link was a 404.
  // Rewrites, not redirects: the address the seller shared stays in the bar,
  // and a later switch to the dedicated storefront is a change here, not one
  // browsers have cached. The query (?via=whatsapp) passes through.
  async rewrites() {
    return [
      { source: "/store", destination: "/stores" },
      { source: "/store/:name", destination: "/stores/:name" },
      // The store's details are on its main page here.
      { source: "/store/:name/about", destination: "/stores/:name" },
      // One of the store's products, as the app shares it.
      { source: "/store/:name/p/:id", destination: "/listings/:id" },
    ];
  },
};

export default nextConfig;
