import type { Metadata } from "next";
import { AppCta } from "@/components/marketplace/AppCta";
import { Pagination } from "@/components/marketplace/Pagination";
import { ApiNotice, EmptyState } from "@/components/marketplace/StateMessage";
import { StoreDirectoryCard } from "@/components/marketplace/StoreDirectoryCard";
import { StoreDirectoryExperience } from "@/components/marketplace/StoreDirectoryExperience";
import { orFallback } from "@/lib/api/client";
import { STORES_PAGE_SIZE, listStores } from "@/lib/api/stores";
import type { Store } from "@/lib/api/types";
import { canonicalCategory } from "@/lib/categories";
import { firstParam, withQuery, type SearchParams } from "@/lib/params";
import { hasSearchParams, pageMetadata } from "@/lib/seo";

const WHOLESALE_FACET = "Wholesale and General";

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams;
  return pageMetadata({
    title: "Online stores across Kenya",
    description: "Discover online stores from Kenyan sellers. Browse their listings, contact sellers directly, and arrange purchases and payment with them.",
    path: "/stores",
    noIndex: hasSearchParams(sp),
  });
}

export default async function StoresPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = firstParam(sp.q);
  const rawCategory = firstParam(sp.category);
  const category = rawCategory?.trim().toLowerCase() === WHOLESALE_FACET.toLowerCase()
    ? WHOLESALE_FACET
    : canonicalCategory(rawCategory);
  const county = firstParam(sp.county);
  const subcounty = firstParam(sp.subcounty);
  const page = Math.max(1, Math.min(500, Number.parseInt(firstParam(sp.page, 6) ?? "1", 10) || 1));

  const { data, failed } = await orFallback(
    () => listStores({
      search: q,
      category: category ?? undefined,
      county,
      subcounty,
      offset: (page - 1) * STORES_PAGE_SIZE,
      limit: STORES_PAGE_SIZE,
    }),
    { items: [], total: 0 },
  );
  const pageCount = Math.max(1, Math.ceil(data.total / STORES_PAGE_SIZE));
  const filtered = Boolean(q || category || county || subcounty);
  const here = withQuery("/stores", {
    q,
    category: category ?? undefined,
    county,
    subcounty,
    page: page > 1 ? page : undefined,
  });

  const counties = Array.from(new Set([
    ...data.items.map((store) => store.county).filter((value): value is string => Boolean(value)),
    ...(county ? [county] : []),
  ])).sort((a, b) => a.localeCompare(b, "en"));
  const areasByCounty: Record<string, string[]> = {};
  for (const store of data.items) {
    if (!store.county || !store.subcounty) continue;
    areasByCounty[store.county] ??= [];
    if (!areasByCounty[store.county].includes(store.subcounty)) areasByCounty[store.county].push(store.subcounty);
  }
  for (const areas of Object.values(areasByCounty)) areas.sort((a, b) => a.localeCompare(b, "en"));
  if (county && subcounty) {
    areasByCounty[county] ??= [];
    if (!areasByCounty[county].includes(subcounty)) areasByCounty[county].push(subcounty);
  }

  const cards = failed ? (
    <ApiNotice retryHref={here} />
  ) : data.items.length === 0 ? (
    <EmptyState
      emoji="🏬"
      title={filtered ? "No stores match" : "No stores yet"}
      actions={
        filtered
          ? [{ label: "Clear filters", href: "/stores" }]
          : [
              { label: "Browse all products", href: "/browse" },
              { label: "Get the app", href: "/download" },
            ]
      }
    >
      {filtered
        ? "Try a different store name, category, or location."
        : "New stores open on BROKA every week. Browse marketplace products in the meantime."}
    </EmptyState>
  ) : (
    data.items.map((store: Store) => <StoreDirectoryCard key={store.id} store={store} />)
  );

  const pagination = !failed && data.items.length > 0 ? (
    <Pagination
      page={page}
      pageCount={pageCount}
      hrefFor={(nextPage) => withQuery("/stores", {
        q,
        category: category ?? undefined,
        county,
        subcounty,
        page: nextPage > 1 ? nextPage : undefined,
      })}
    />
  ) : undefined;

  return (
    <StoreDirectoryExperience
      q={q ?? undefined}
      category={category ?? undefined}
      county={county ?? undefined}
      subcounty={subcounty ?? undefined}
      total={data.total}
      failed={failed}
      counties={counties}
      areasByCounty={areasByCounty}
      cards={cards}
      pagination={pagination}
      footer={<AppCta kind="store" variant="banner" className="listing-cta" />}
    />
  );
}
