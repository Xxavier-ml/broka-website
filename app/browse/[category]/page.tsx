import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryLanding } from "@/components/marketplace/CategoryLanding";
import { listListings } from "@/lib/api/listings";
import { categoryFromSlug, categorySlug } from "@/lib/categories";
import { categoryPageContent } from "@/lib/category-pages";
import { getCategoryFilters, getCategoryZone } from "@/lib/api/categories";
import { orFallback } from "@/lib/api/client";
import { firstParam, type SearchParams } from "@/lib/params";
import { filtersForCategory, filtersForSubcategory } from "@/lib/category-filters";
import {
  attributesFromParams,
  parseMarketplaceCondition,
  parseMarketplaceSort,
  parsePriceKes,
} from "@/lib/marketplace-filters";

type Props = { params: Promise<{ category: string }>; searchParams: SearchParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: raw } = await params;
  const category = categoryFromSlug(raw);
  const content = category ? categoryPageContent(category) : null;
  return content ? { title: content.title, description: content.description } : { title: "Category not found" };
}

export default async function CategoryBrowsePage({ params, searchParams }: Props) {
  const { category: raw } = await params;
  const category = categoryFromSlug(raw);
  if (!category) notFound();
  const sp = await searchParams;
  const q = firstParam(sp.q);
  const sort = parseMarketplaceSort(firstParam(sp.sort));
  const condition = parseMarketplaceCondition(firstParam(sp.condition));
  const minPrice = parsePriceKes(firstParam(sp.min_price));
  const maxPrice = parsePriceKes(firstParam(sp.max_price));
  const location = firstParam(sp.location) ?? firstParam(sp.county);
  const subcategoryId = firstParam(sp.subcategory_id);
  const zoneResponse = await orFallback(() => getCategoryZone(category), { category: null, subcategories: [], filters: [] });
  const selectedSubcategory = zoneResponse.data.subcategories.find((item) => item.id === subcategoryId);
  const childFilters = selectedSubcategory
    ? await orFallback(() => getCategoryFilters(selectedSubcategory.id), [])
    : { data: zoneResponse.data.filters, failed: false };
  const filters = selectedSubcategory
    ? filtersForSubcategory(category, categorySlug(selectedSubcategory.name), childFilters.data)
    : filtersForCategory(category, zoneResponse.data.filters);
  // Every filter that is not condition, price, location, sort or search is an
  // attribute, built exactly as the app builds it (`category_zone_screen.dart`).
  const attributes = attributesFromParams(sp, filters);
  const response = await orFallback(
    () => listListings({
      search: q,
      // One scope per request, the app's way: a chosen subcategory stands
      // alone, otherwise the category id (which the API expands to its
      // children). The name rides along only as a fallback for when the
      // category tree is unreachable.
      categoryId: selectedSubcategory ? undefined : zoneResponse.data.category?.id,
      subcategoryId,
      category,
      attributes,
      sort,
      condition,
      minPrice,
      maxPrice,
      location,
      limit: 20,
    }),
    { items: [], total: 0 },
  );
  return <CategoryLanding category={category} subcategoryName={selectedSubcategory?.name} q={q} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} location={location} result={response.data} failed={response.failed || zoneResponse.failed || childFilters.failed} categoryNode={zoneResponse.data.category} subcategories={zoneResponse.data.subcategories} filters={filters} subcategoryId={subcategoryId} attributes={attributes} />;
}
