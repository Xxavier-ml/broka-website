import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { AppCta } from "@/components/marketplace/AppCta";
import { CategoryChips } from "@/components/marketplace/CategoryChips";
import { Pagination } from "@/components/marketplace/Pagination";
import { SearchForm } from "@/components/marketplace/SearchForm";
import { ApiNotice, EmptyState } from "@/components/marketplace/StateMessage";
import { StoreCard } from "@/components/marketplace/StoreCard";
import { orFallback } from "@/lib/api/client";
import { STORES_PAGE_SIZE, listStores } from "@/lib/api/stores";
import { canonicalCategory } from "@/lib/categories";
import { plural } from "@/lib/format";
import { firstParam, withQuery, type SearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Online stores in Kenya",
  description:
    "Discover BROKA online stores: verified Kenyan sellers with their own storefronts. Browse what each store sells here, then make an offer or buy in the BROKA app.",
  alternates: { canonical: "https://www.broka.co.ke/stores" },
};

export default async function StoresPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = firstParam(sp.q);
  const category = canonicalCategory(firstParam(sp.category));
  const page = Math.max(1, Math.min(500, Number.parseInt(firstParam(sp.page, 6) ?? "1", 10) || 1));

  const { data, failed } = await orFallback(
    () => listStores({ search: q, category: category ?? undefined, offset: (page - 1) * STORES_PAGE_SIZE }),
    { items: [], total: 0 },
  );
  const pageCount = Math.max(1, Math.ceil(data.total / STORES_PAGE_SIZE));
  const filtered = Boolean(q || category);
  const here = withQuery("/stores", { q, category: category ?? undefined, page: page > 1 ? page : undefined });

  return (
    <>
      <PageHero
        eyebrow="Online stores"
        headline="Shops you can trust, all in one place."
        sub="Every BROKA store is run by a real seller with their own link. Look around, read the details and see what is in stock. To make an offer or buy, open the store in the BROKA app."
        atmosphere="atm-violet"
      />

      <section className="sec-sm listing-sec" aria-label="Stores">
        <div className="wrap">
          <div className="filter-panel">
            <div className="toolbar toolbar-single">
              <SearchForm
                action="/stores"
                value={q}
                placeholder="Search stores by name…"
                hidden={{ category: category ?? undefined }}
                label="Search stores"
              />
            </div>
            <CategoryChips basePath="/stores" active={category} keep={{ q }} />
          </div>

          {failed ? (
            <ApiNotice retryHref={here} />
          ) : data.items.length === 0 ? (
            <EmptyState
              emoji="🏬"
              title={filtered ? "No stores match" : "No stores yet"}
              actions={
                filtered
                  ? [{ label: "Clear search", href: "/stores" }]
                  : [
                      { label: "Browse all products", href: "/browse" },
                      { label: "See the Auction House", href: "/auctions" },
                      { label: "Get the app", href: "/download" },
                    ]
              }
            >
              {filtered
                ? "Try a different name or category."
                : "New stores open on BROKA every week. In the meantime the catalogue has every listing on the platform."}
            </EmptyState>
          ) : (
            <>
              <p className="result-count" role="status">
                {plural(data.total, "store")}
                {category ? ` in ${category}` : ""}
              </p>
              <div className="lgrid">
                {data.items.map((s) => (
                  <StoreCard key={s.id} store={s} />
                ))}
              </div>
              <Pagination
                page={page}
                pageCount={pageCount}
                hrefFor={(p) => withQuery("/stores", { q, category: category ?? undefined, page: p > 1 ? p : undefined })}
              />
            </>
          )}

          <AppCta kind="store" variant="banner" className="listing-cta" />
        </div>
      </section>
    </>
  );
}
