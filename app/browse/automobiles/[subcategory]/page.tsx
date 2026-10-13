import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryLanding } from "@/components/marketplace/CategoryLanding";
import { automobileSubcategoryArtwork, findAutomobileSubcategory } from "@/lib/automobiles";
import { getCategoryFilters, getCategoryZone } from "@/lib/api/categories";
import { filtersForSubcategory } from "@/lib/category-filters";
import { automobileSubcategorySlug } from "@/lib/automobiles";
import { listListings } from "@/lib/api/listings";
import { orFallback } from "@/lib/api/client";
import { firstParam, type SearchParams } from "@/lib/params";
import {
  attributesFromParams,
  parseMarketplaceCondition,
  parseMarketplaceSort,
  parsePriceKes,
} from "@/lib/marketplace-filters";

type Props = { params: Promise<{ subcategory: string }>; searchParams: SearchParams };

async function resolveAutomobilePage(rawSlug: string) {
  const zoneResponse = await orFallback(() => getCategoryZone("Automobiles"), { category: null, subcategories: [], filters: [] });
  const subcategory = findAutomobileSubcategory(zoneResponse.data.subcategories, rawSlug);
  if (!zoneResponse.data.category || !subcategory) return null;
  return { zoneResponse, subcategory };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory: raw } = await params;
  const resolved = await resolveAutomobilePage(raw);
  return resolved
    ? { title: `${resolved.subcategory.name} | Automobiles | BROKA`, description: `Browse ${resolved.subcategory.name} listings on BROKA.` }
    : { title: "Automobile subcategory not found" };
}

export default async function AutomobileSubcategoryPage({ params, searchParams }: Props) {
  const { subcategory: raw } = await params;
  const resolved = await resolveAutomobilePage(raw);
  if (!resolved) notFound();
  const { zoneResponse, subcategory } = resolved;
  const heroArt = automobileSubcategoryArtwork(subcategory.name)?.image;
  const sp = await searchParams;
  const q = firstParam(sp.q);
  const sort = parseMarketplaceSort(firstParam(sp.sort));
  const condition = parseMarketplaceCondition(firstParam(sp.condition));
  const minPrice = parsePriceKes(firstParam(sp.min_price));
  const maxPrice = parsePriceKes(firstParam(sp.max_price));
  const location = firstParam(sp.location) ?? firstParam(sp.county);
  const childFilters = await orFallback(() => getCategoryFilters(subcategory.id), []);
  const filters = filtersForSubcategory("Automobiles", automobileSubcategorySlug(subcategory.name), childFilters.data);
  const attributes = attributesFromParams(sp, filters);
  const response = await orFallback(
    // A subcategory stands alone, as it does on the app's subcategory screen.
    () => listListings({ search: q, subcategoryId: subcategory.id, attributes, sort, condition, minPrice, maxPrice, location, limit: 20 }),
    { items: [], total: 0 },
  );
  return <CategoryLanding category="Automobiles" routeOverride={`/browse/automobiles/${raw}`} heroArt={heroArt} subcategoryName={subcategory.name} q={q} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} location={location} result={response.data} failed={response.failed || zoneResponse.failed || childFilters.failed} categoryNode={zoneResponse.data.category} subcategories={zoneResponse.data.subcategories} filters={filters} subcategoryId={subcategory.id} attributes={attributes} />;
}
