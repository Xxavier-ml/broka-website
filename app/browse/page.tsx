import type { Metadata } from "next";
import { BrowseView, parseBrowseCategory, parseBrowseCondition, parseBrowsePrice, parseBrowseSort } from "@/components/marketplace/BrowseView";
import { listListings } from "@/lib/api/listings";
import { orFallback } from "@/lib/api/client";
import { firstParam, type SearchParams } from "@/lib/params";

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams;
  if (parseBrowseCategory(firstParam(sp.category)) === "Gaming") {
    return { title: "Gaming Zone", description: "Explore gaming listings from Kenyan sellers on BROKA." };
  }
  return {
    title: "Browse the marketplace",
    description: "Discover products, stores, and smarter deals on BROKA.",
  };
}

export default async function BrowsePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = firstParam(sp.q);
  const category = parseBrowseCategory(firstParam(sp.category));
  const sort = parseBrowseSort(firstParam(sp.sort));
  const condition = parseBrowseCondition(firstParam(sp.condition));
  const minPrice = parseBrowsePrice(firstParam(sp.min_price));
  const maxPrice = parseBrowsePrice(firstParam(sp.max_price));
  const county = firstParam(sp.county) || undefined;
  const response = await orFallback(() => listListings({ search: q, category: category ?? undefined, sort, condition, minPrice, maxPrice, county, limit: 24 }), { items: [], total: 0 });
  return <BrowseView q={q} category={category ?? undefined} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} county={county} result={response.data} failed={response.failed} />;
}
