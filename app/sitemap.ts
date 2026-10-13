import type { MetadataRoute } from "next";
import { orFallback } from "@/lib/api/client";
import { listStores } from "@/lib/api/stores";
import { SITE_URL } from "@/lib/site";

// Re-built hourly, so new stores reach search engines without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "", "/browse", "/categories", "/what-is-broka", "/how-it-works", "/zeno",
    "/technology", "/vision", "/founders", "/roadmap", "/faq", "/contact",
    "/stores", "/download", "/privacy", "/terms",
  ];
  const now = new Date();
  const entries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/stores" ? ("hourly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : route === "/browse" || route === "/stores" ? 0.9 : 0.8,
  }));

  // Detail pages come from the API. If it is unreachable (say, during a build
  // without network access) the sitemap simply lists the fixed pages.
  const { data: stores } = await orFallback(() => listStores({ limit: 100 }), { items: [], total: 0 });
  for (const s of stores.items) {
    entries.push({ url: `${SITE_URL}/stores/${s.slug}`, lastModified: now, changeFrequency: "daily", priority: 0.7 });
  }
  return entries;
}
