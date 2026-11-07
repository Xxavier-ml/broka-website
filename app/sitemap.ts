import type { MetadataRoute } from "next";
import { orFallback } from "@/lib/api/client";
import { listListings } from "@/lib/api/listings";
import { listStores } from "@/lib/api/stores";
import { CATEGORIES, categorySlug } from "@/lib/categories";
import { SITE_URL, storeWebsiteUrl } from "@/lib/site";

// Re-built hourly, so new stores reach search engines without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "", "/browse", "/categories", "/what-is-broka", "/how-it-works", "/zeno",
    "/technology", "/vision", "/founders", "/roadmap", "/faq", "/contact",
    "/stores", "/download", "/app-preview", "/sell", "/sell/listing", "/privacy", "/terms",
  ];
  const entries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "/stores" ? ("hourly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/browse" || route === "/stores" ? 0.9 : 0.8,
  }));

  for (const category of CATEGORIES) {
    entries.push({
      url: `${SITE_URL}/browse/${categorySlug(category.name)}`,
      changeFrequency: "daily",
      priority: 0.8,
    });
  }

  // Detail pages come from the API. If it is unreachable (say, during a build
  // without network access) the sitemap simply lists the fixed pages.
  const [storeResult, listingResult] = await Promise.all([
    orFallback(() => listStores({ limit: 100 }), { items: [], total: 0 }),
    orFallback(() => listListings({ limit: 100 }), { items: [], total: 0 }),
  ]);
  for (const store of storeResult.data.items) {
    entries.push({ url: storeWebsiteUrl(store.slug), changeFrequency: "daily", priority: 0.7 });
  }
  for (const listing of listingResult.data.items) {
    // Only direct listings resolve to public detail pages; other listing types
    // have no matching storefront detail route.
    if (listing.listing_type !== "direct") continue;
    entries.push({
      url: `${SITE_URL}/listings/${encodeURIComponent(listing.id)}`,
      changeFrequency: "daily",
      priority: 0.7,
    });
  }
  return entries;
}
