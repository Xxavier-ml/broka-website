import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrowseView, parseBrowseCategory, parseBrowseCondition, parseBrowsePrice, parseBrowseSort } from "@/components/marketplace/BrowseView";
import { listListings } from "@/lib/api/listings";
import { orFallback } from "@/lib/api/client";
import { firstParam, type SearchParams } from "@/lib/params";

type Props = { params: Promise<{ category: string }>; searchParams: SearchParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: raw } = await params;
  const category = parseBrowseCategory(raw.replace(/-/g, " "));
  return category
    ? { title: `${category} marketplace`, description: `Browse ${category.toLowerCase()} listings on BROKA.` }
    : { title: "Category not found" };
}

export default async function CategoryBrowsePage({ params, searchParams }: Props) {
  const { category: raw } = await params;
  const category = parseBrowseCategory(raw.replace(/-/g, " "));
  if (!category) notFound();
  const sp = await searchParams;
  const q = firstParam(sp.q);
  const sort = parseBrowseSort(firstParam(sp.sort));
  const condition = parseBrowseCondition(firstParam(sp.condition));
  const minPrice = parseBrowsePrice(firstParam(sp.min_price));
  const maxPrice = parseBrowsePrice(firstParam(sp.max_price));
  const county = firstParam(sp.county) || undefined;
  const response = await orFallback(() => listListings({ search: q, category, sort, condition, minPrice, maxPrice, county, limit: 24 }), { items: [], total: 0 });
  return <BrowseView q={q} category={category} sort={sort} condition={condition} minPrice={minPrice} maxPrice={maxPrice} county={county} result={response.data} failed={response.failed} />;
}
