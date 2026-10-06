import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryLanding } from "@/components/marketplace/CategoryLanding";
import { electronicsSubcategoryFromSlug, matchElectronicsSubcategory } from "@/lib/electronics";
import { getCategoryFilters, getCategoryZone } from "@/lib/api/categories";
import { filtersForSubcategory } from "@/lib/category-filters";
import { listListings } from "@/lib/api/listings";
import { orFallback } from "@/lib/api/client";
import { firstParam, type SearchParams } from "@/lib/params";

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
  const filters = filtersForSubcategory("Electronics", config.slug, childFilters.data);
  const response = await orFallback(
    () => listListings({ search: q, category: "Electronics", categoryId: zoneResponse.data.category?.id, subcategoryId: subcategory.id, attributes, sort, condition, minPrice, maxPrice, county, limit: 24 }),
    { items: [], total: 0 },
  );
  return <CategoryLanding category="Electronics" routeOverride={`/browse/electronics/${config.slug}`} heroArt={config.image} subcategoryName={config.name} q={q} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} county={county} result={response.data} failed={response.failed || zoneResponse.failed || childFilters.failed} categoryNode={zoneResponse.data.category} subcategories={zoneResponse.data.subcategories} filters={filters} subcategoryId={subcategory.id} attributes={attributes} />;
}
