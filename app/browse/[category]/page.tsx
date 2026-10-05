import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryLanding } from "@/components/marketplace/CategoryLanding";
import { listListings } from "@/lib/api/listings";
import { categoryFromSlug } from "@/lib/categories";
import { categoryPageContent } from "@/lib/category-pages";
import { getCategoryZone } from "@/lib/api/categories";
import { orFallback } from "@/lib/api/client";
import { firstParam, type SearchParams } from "@/lib/params";

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
  const sortValue = firstParam(sp.sort);
  const sort = sortValue === "recent" || sortValue === "price_low" || sortValue === "price_high" ? sortValue : "featured";
  const conditionValue = firstParam(sp.condition);
  const condition = conditionValue === "new" || conditionValue === "used" || conditionValue === "refurbished" ? conditionValue : undefined;
  const parsePrice = (value?: string) => { const n = value ? Number(value) : NaN; return Number.isFinite(n) && n >= 0 ? n : undefined; };
  const minPrice = parsePrice(firstParam(sp.min_price));
  const maxPrice = parsePrice(firstParam(sp.max_price));
  const county = firstParam(sp.county);
  const subcategoryId = firstParam(sp.subcategory_id);
  const zoneResponse = await orFallback(() => getCategoryZone(category), { category: null, subcategories: [], filters: [] });
  const attributes: Record<string, string> = {};
  for (const [key, value] of Object.entries(sp)) {
    if (key.startsWith("attribute_")) {
      const field = key.slice("attribute_".length);
      const selected = firstParam(value);
      if (field && selected) attributes[field] = selected;
    }
  }
  const response = await orFallback(
    () => listListings({ search: q, category, categoryId: zoneResponse.data.category?.id, subcategoryId, attributes, sort, condition, minPrice, maxPrice, county, limit: 24 }),
    { items: [], total: 0 },
  );
  return <CategoryLanding category={category} q={q} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} county={county} result={response.data} failed={response.failed || zoneResponse.failed} categoryNode={zoneResponse.data.category} subcategories={zoneResponse.data.subcategories} filters={zoneResponse.data.filters} subcategoryId={subcategoryId} attributes={attributes} />;
}
