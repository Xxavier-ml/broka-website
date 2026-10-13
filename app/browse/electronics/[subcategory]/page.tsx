import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryLanding } from "@/components/marketplace/CategoryLanding";
import { electronicsSubcategoryFromSlug, matchElectronicsSubcategory } from "@/lib/electronics";
import { getCategoryFilters, getCategoryZone } from "@/lib/api/categories";
import { filtersForSubcategory } from "@/lib/category-filters";
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

async function resolvePhonePage(rawSlug: string) {
  const config = electronicsSubcategoryFromSlug(rawSlug);
  if (!config) return null;
  const zoneResponse = await orFallback(() => getCategoryZone("Electronics"), { category: null, subcategories: [], filters: [] });
  const subcategory = zoneResponse.data.subcategories.find((node) => matchElectronicsSubcategory(node, config));
  if (!zoneResponse.data.category || !subcategory) return null;
  return { config, zoneResponse, subcategory };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory: raw } = await params;
  const resolved = await resolvePhonePage(raw);
  return resolved
    ? { title: `${resolved.config.name} | Electronics | BROKA`, description: `${resolved.config.description} Browse Electronics listings on BROKA.` }
    : { title: "Electronics subcategory not found" };
}

export default async function ElectronicsSubcategoryPage({ params, searchParams }: Props) {
  const { subcategory: raw } = await params;
  const resolved = await resolvePhonePage(raw);
  if (!resolved) notFound();
  const { config, zoneResponse, subcategory } = resolved;
  const sp = await searchParams;
  const q = firstParam(sp.q);
  const sort = parseMarketplaceSort(firstParam(sp.sort));
  const condition = parseMarketplaceCondition(firstParam(sp.condition));
  const minPrice = parsePriceKes(firstParam(sp.min_price));
  const maxPrice = parsePriceKes(firstParam(sp.max_price));
  const location = firstParam(sp.location) ?? firstParam(sp.county);
  const childFilters = await orFallback(() => getCategoryFilters(subcategory.id), []);
  const filters = filtersForSubcategory("Electronics", config.slug, childFilters.data);
  const attributes = attributesFromParams(sp, filters);
  const response = await orFallback(
    // A subcategory stands alone, as it does on the app's subcategory screen
    // (`subcategory_screen.dart` sends `subcategory_id` and nothing else).
    () => listListings({ search: q, subcategoryId: subcategory.id, attributes, sort, condition, minPrice, maxPrice, location, limit: 20 }),
    { items: [], total: 0 },
  );
  return <CategoryLanding category="Electronics" routeOverride={`/browse/electronics/${config.slug}`} heroArt={config.image} subcategoryName={config.name} q={q} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} location={location} result={response.data} failed={response.failed || zoneResponse.failed || childFilters.failed} categoryNode={zoneResponse.data.category} subcategories={zoneResponse.data.subcategories} filters={filters} subcategoryId={subcategory.id} attributes={attributes} />;
}
