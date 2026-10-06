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
  const sortValue = firstParam(sp.sort);
  const sort = sortValue === "recent" || sortValue === "price_low" || sortValue === "price_high" ? sortValue : "featured";
  const conditionValue = firstParam(sp.condition);
  const condition = conditionValue === "new" || conditionValue === "used" || conditionValue === "refurbished" ? conditionValue : undefined;
  const parsePrice = (value?: string) => { const n = value ? Number(value) : NaN; return Number.isFinite(n) && n >= 0 ? n : undefined; };
  const minPrice = parsePrice(firstParam(sp.min_price));
  const maxPrice = parsePrice(firstParam(sp.max_price));
  const county = firstParam(sp.county);
  const attributes: Record<string, string> = {};
  for (const [key, value] of Object.entries(sp)) {
    if (key.startsWith("attribute_")) {
      const field = key.slice("attribute_".length);
      const selected = firstParam(value);
      if (field && selected) attributes[field] = selected;
    }
  }
  const childFilters = await orFallback(() => getCategoryFilters(subcategory.id), []);
  const filters = filtersForSubcategory("Automobiles", automobileSubcategorySlug(subcategory.name), childFilters.data);
  const response = await orFallback(
    () => listListings({ search: q, category: "Automobiles", categoryId: zoneResponse.data.category?.id, subcategoryId: subcategory.id, attributes, sort, condition, minPrice, maxPrice, county, limit: 24 }),
    { items: [], total: 0 },
  );
  return <CategoryLanding category="Automobiles" routeOverride={`/browse/automobiles/${raw}`} heroArt={heroArt} subcategoryName={subcategory.name} q={q} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} county={county} result={response.data} failed={response.failed || zoneResponse.failed || childFilters.failed} categoryNode={zoneResponse.data.category} subcategories={zoneResponse.data.subcategories} filters={filters} subcategoryId={subcategory.id} attributes={attributes} />;
}
