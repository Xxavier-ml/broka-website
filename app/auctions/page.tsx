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
        eyebrow="Auction House"
        headline="Live auctions across Kenya."
        sub="Vehicles, land, electronics and more, sold to the highest bidder. See the current bid and the time left here. Bidding happens in the BROKA app."
        atmosphere="atm-amber"
      />

      <section className="sec-sm listing-sec" aria-label="Auctions">
        <div className="wrap">
          <div className="toolbar">
            <FilterTabs tabs={tabs} active={filter} label="Auction status" />
            <SearchForm
              action="/auctions"
              value={q}
              placeholder="Search auctions — cars, land, phones…"
              hidden={{ status: filter === "live" ? undefined : filter, category: category ?? undefined }}
              label="Search auctions"
            />
          </div>
          <CategoryChips
            basePath="/auctions"
            active={category}
            keep={{ status: filter === "live" ? undefined : filter, q }}
          />

          {failed ? (
            <ApiNotice retryHref={here} />
          ) : auctions.length === 0 ? (
            <EmptyState
              emoji="🔨"
              title={filtered ? "No auctions match" : emptyTitle(filter)}
              actionHref={filtered ? withQuery("/auctions", { status: filter === "live" ? undefined : filter }) : undefined}
              actionLabel={filtered ? "Clear search" : undefined}
            >
              {filtered
                ? "Try a different word or category."
                : "Nothing is listed under this status right now. Check the other tabs, or come back soon."}
            </EmptyState>
          ) : (
            <>
              <p className="result-count" role="status">
                {auctions.length} {auctions.length === 1 ? "auction" : "auctions"}
              </p>
              <div className="lgrid">
                {auctions.map((a) => (
                  <AuctionCard key={a.id} auction={a} />
                ))}
              </div>
            </>
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
