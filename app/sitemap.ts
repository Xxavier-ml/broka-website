import type { MetadataRoute } from "next";
import { orFallback } from "@/lib/api/client";
import { listAuctions } from "@/lib/api/auctions";
import { listStores } from "@/lib/api/stores";
import { SITE_URL } from "@/lib/site";

// Re-built hourly, so new stores and auctions reach search engines without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "", "/what-is-broka", "/how-it-works", "/zeno",
    "/technology", "/vision", "/founders", "/roadmap", "/faq", "/contact",
    "/auctions", "/stores", "/download", "/privacy", "/terms",
  ];
  const now = new Date();
  const entries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/auctions" || route === "/stores" ? ("hourly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/auctions" || route === "/stores" ? 0.9 : 0.8,
  }));

  // Detail pages come from the API. If it is unreachable (say, during a build
  // without network access) the sitemap simply lists the fixed pages.
  const [stores, live, upcoming] = await Promise.all([
    orFallback(() => listStores({ limit: 100 }), { items: [], total: 0 }),
    orFallback(() => listAuctions("live"), []),
    orFallback(() => listAuctions("upcoming"), []),
  ]);
  for (const s of stores.data.items) {
    entries.push({ url: `${SITE_URL}/stores/${s.slug}`, lastModified: now, changeFrequency: "daily", priority: 0.7 });
  }
  for (const a of [...live.data, ...upcoming.data]) {
    entries.push({ url: `${SITE_URL}/auctions/${a.id}`, lastModified: now, changeFrequency: "hourly", priority: 0.6 });
  }
  return entries;
}
