import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { AuctionCard } from "@/components/marketplace/AuctionCard";
import { AppCta } from "@/components/marketplace/AppCta";
import { FilterTabs } from "@/components/marketplace/FilterTabs";
import { SearchForm } from "@/components/marketplace/SearchForm";
import { ApiNotice, EmptyState } from "@/components/marketplace/StateMessage";
import { CategoryChips } from "@/components/marketplace/CategoryChips";
import { AUCTION_FILTERS, listAuctions, parseAuctionFilter } from "@/lib/api/auctions";
import { orFallback } from "@/lib/api/client";
import { canonicalCategory } from "@/lib/categories";
import { firstParam, withQuery, type SearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Auction House — live auctions in Kenya",
  description:
    "Browse live, upcoming and completed auctions on BROKA: vehicles, land, electronics and more. See the current bid and the time left, then bid in the BROKA app.",
  alternates: { canonical: "https://www.broka.co.ke/auctions" },
};

export default async function AuctionsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const filter = parseAuctionFilter(sp.status);
  const q = firstParam(sp.q);
  const category = canonicalCategory(firstParam(sp.category));

  const { data, failed } = await orFallback(() => listAuctions(filter), []);
  const needle = q?.toLowerCase();
  const auctions = data.filter(
    (a) =>
      (!category || a.category?.toLowerCase() === category.toLowerCase()) &&
      (!needle ||
        `${a.name} ${a.category ?? ""} ${a.location_name ?? ""}`.toLowerCase().includes(needle)),
  );

  const keep = { q, category: category ?? undefined };
  const tabs = AUCTION_FILTERS.map((f) => ({
    key: f.key,
    label: f.label,
    href: withQuery("/auctions", { status: f.key === "live" ? undefined : f.key, ...keep }),
  }));
  const here = withQuery("/auctions", { status: filter === "live" ? undefined : filter, ...keep });
  const filtered = Boolean(q || category);

  return (
    <>
      <PageHero
        headline="Live auctions"
        sub="Vehicles, land and more. Bidding takes place in the BROKA app."
        atmosphere="atm-amber"
        className="listing-page-hero"
      />

      <section className="sec-sm listing-sec" aria-label="Auctions">
        <div className="wrap">
          <div className="listing-route-controls">
            <CategoryChips
              basePath="/auctions"
              active={category}
              keep={{ status: filter === "live" ? undefined : filter, q }}
            />
            <SearchForm
              action="/auctions"
              value={q}
              placeholder="Search cars, land, phones…"
              hidden={{ status: filter === "live" ? undefined : filter, category: category ?? undefined }}
              label="Search auctions"
              className="sform-lg browse-search browse-search-v0 listing-route-search"
            />
          </div>

          <div className="listing-v0-toolbar auction-listing-toolbar">
            <p className="browse-count" role="status">
              {failed ? "Auctions unavailable" : `${auctions.length} ${auctions.length === 1 ? "auction" : "auctions"}`}
            </p>
            <FilterTabs tabs={tabs} active={filter} label="Auction status" />
          </div>

          {failed ? (
            <ApiNotice retryHref={here} />
          ) : auctions.length === 0 ? (
            <EmptyState
              emoji="🔨"
              title={filtered ? "No auctions match" : emptyTitle(filter)}
              actions={
                filtered
                  ? [{ label: "Clear search", href: withQuery("/auctions", { status: filter === "live" ? undefined : filter }) }]
                  : [
                      { label: "Browse all products", href: "/browse" },
                      { label: "See online stores", href: "/stores" },
                      { label: "Get the app", href: "/download" },
                    ]
              }
            >
              {filtered
                ? "Try another search or category."
                : "No auctions under this status right now. Try another status or browse all products."}
            </EmptyState>
          ) : (
            <div className="lgrid">
              {auctions.map((a) => (
                <AuctionCard key={a.id} auction={a} />
              ))}
            </div>
          )}

          <AppCta kind="auction" variant="banner" className="listing-cta" />
        </div>
      </section>
    </>
  );
}

function emptyTitle(filter: string) {
  switch (filter) {
    case "upcoming":
      return "No upcoming auctions yet";
    case "ended":
      return "No completed auctions yet";
    case "ending":
      return "Nothing is ending soon";
    default:
      return "No live auctions right now";
  }
}
