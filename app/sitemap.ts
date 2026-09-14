import type { MetadataRoute } from "next";

const BASE = "https://www.broka.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/what-is-broka", "/how-it-works", "/zeno",
    "/technology", "/vision", "/founders", "/roadmap", "/faq", "/contact",
  ];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
