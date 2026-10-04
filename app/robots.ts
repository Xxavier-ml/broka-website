import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search result pages are endless combinations of words, not content.
    // /api/ is the web storefront's (passed on to it), for its pages' scripts.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/search", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
