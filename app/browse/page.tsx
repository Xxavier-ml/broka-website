import type { Metadata } from "next";
import { BrowseView, parseBrowseCategory, parseBrowseCondition, parseBrowsePrice, parseBrowseSort } from "@/components/marketplace/BrowseView";
import { listListings } from "@/lib/api/listings";
import { orFallback } from "@/lib/api/client";
import { categoryPageContent } from "@/lib/category-pages";
import { firstParam, type SearchParams } from "@/lib/params";

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams;
  const category = parseBrowseCategory(firstParam(sp.category));
  const content = category ? categoryPageContent(category) : null;
  if (content) {
    return { title: content.title, description: content.description };
  }
  return {
    title: "Browse the marketplace",
    description: "Discover marketplace listings and stores, and compare useful seller context on BROKA.",
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
  // `location` is the API's parameter, and it is what the app sends.
  // `county` is what this page sent before it matched the app: the API has no
  // such parameter, so the old links are folded into the working one.
  const location = firstParam(sp.location) ?? firstParam(sp.county);
  // 20 to a page, like the app (`listings_repository.dart`).
  const response = await orFallback(() => listListings({ search: q, category: category ?? undefined, sort, condition, minPrice, maxPrice, location, limit: 20 }), { items: [], total: 0 });
  return <BrowseView q={q} category={category ?? undefined} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} location={location} result={response.data} failed={response.failed} />;
}
