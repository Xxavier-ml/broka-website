import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { AuctionCard } from "@/components/marketplace/AuctionCard";
import { StoreCard } from "@/components/marketplace/StoreCard";
import { SearchForm } from "@/components/marketplace/SearchForm";
import { AppCta } from "@/components/marketplace/AppCta";
import { ApiNotice, EmptyState } from "@/components/marketplace/StateMessage";
import { listAuctions } from "@/lib/api/auctions";
import { orFallback } from "@/lib/api/client";
import { listStores } from "@/lib/api/stores";
import { canonicalCategory } from "@/lib/categories";
import { plural } from "@/lib/format";
import { firstParam, withQuery, type SearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Search",
  description: "Search BROKA's auctions and online stores.",
  // Result pages are endless combinations of words; search engines should index the sections, not them.
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const q = firstParam(sp.q);
  const category = canonicalCategory(firstParam(sp.category));
  const needle = q?.toLowerCase();
  const searching = Boolean(q || category);

  const [live, upcoming, stores] = searching
    ? await Promise.all([
        orFallback(() => listAuctions("live"), []),
        orFallback(() => listAuctions("upcoming"), []),
        orFallback(() => listStores({ search: q, category: category ?? undefined, limit: 6 }), { items: [], total: 0 }),
      ])
    : [null, null, null];

  const failed = Boolean(live?.failed && upcoming?.failed && stores?.failed);
  const auctions = searching
    ? [...(live?.data ?? []), ...(upcoming?.data ?? [])].filter(
        (a) =>
          (!category || a.category?.toLowerCase() === category.toLowerCase()) &&
          (!needle || `${a.name} ${a.category ?? ""} ${a.location_name ?? ""}`.toLowerCase().includes(needle)),
      )
    : [];
  const storeHits = stores?.data.items ?? [];

  return (
    <>
      <PageHero
        eyebrow="Search"
        headline={q ? `Results for “${q}”` : category ? category : "Search BROKA"}
        sub="Auctions and online stores in one search. Details are here; bidding and buying happen in the app."
      />
      <section className="sec-sm listing-sec" aria-label="Search results">
        <div className="wrap">
          <div className="toolbar toolbar-single">
            <SearchForm
              action="/search"
              value={q}
              placeholder="Search phones, cars, land, houses…"
              hidden={{ category: category ?? undefined }}
              label="Search BROKA"
            />
          </div>

          {!searching ? (
            <EmptyState emoji="🔍" title="What are you looking for?">
              Type a word above, or browse the <Link href="/auctions">Auction House</Link> and{" "}
              <Link href="/stores">online stores</Link>.
            </EmptyState>
          ) : failed ? (
            <ApiNotice retryHref={withQuery("/search", { q, category: category ?? undefined })} />
          ) : auctions.length === 0 && storeHits.length === 0 ? (
            <EmptyState emoji="🔎" title="Nothing matches yet">
              Try a shorter or different word. New auctions and stores appear every day.
            </EmptyState>
          ) : (
            <>
              {auctions.length > 0 && (
                <div className="result-block">
                  <h2 className="detail-h">Auctions · {plural(auctions.length, "result")}</h2>
                  <div className="lgrid">
                    {auctions.slice(0, 12).map((a) => (
                      <AuctionCard key={a.id} auction={a} />
                    ))}
                  </div>
                </div>
              )}
              {storeHits.length > 0 && (
                <div className="result-block">
                  <h2 className="detail-h">Stores · {plural(stores?.data.total ?? storeHits.length, "result")}</h2>
                  <div className="lgrid">
                    {storeHits.map((s) => (
                      <StoreCard key={s.id} store={s} />
                    ))}
                  </div>
                  {(stores?.data.total ?? 0) > storeHits.length && (
                    <p className="result-more">
                      <Link href={withQuery("/stores", { q, category: category ?? undefined })} className="preview-link">
                        See all matching stores →
                      </Link>
                    </p>
                  )}
                </div>
              )}
            </>
          )}
          <AppCta kind="general" variant="banner" className="listing-cta" />
        </div>
      </section>
    </>
  );
}
