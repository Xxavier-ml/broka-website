import { orFallback } from "./client";
import { listAuctions, type AuctionCardData } from "./auctions";
import { getListingStats, listListings } from "./listings";
import { listStores } from "./stores";
import type { Store } from "./types";

export interface HomeData {
  /** Live auctions that close soonest. */
  auctions: AuctionCardData[];
  /** How many live auctions there are (the API returns at most 20 at a time). */
  liveAuctionCount: number | null;
  stores: Store[];
  storeCount: number | null;
  featuredListings: Awaited<ReturnType<typeof listListings>>["items"];
  activeListings: number | null;
  /** True when the API answered nothing at all, so the page can say so instead of showing empty shelves. */
  unavailable: boolean;
}

/** Everything the home page's marketplace section needs. Each part fails on its own. */
export async function getHomeData(): Promise<HomeData> {
  const [auctions, stores, stats, listings] = await Promise.all([
    orFallback(() => listAuctions("ending"), [] as AuctionCardData[]),
    // Fetch a wider sample so the homepage can omit empty storefronts without
    // hiding stocked ones that fall just beyond the newest three.
    orFallback(() => listStores({ limit: 6 }), { items: [], total: 0 }),
    orFallback(() => getListingStats(), null),
    orFallback(() => listListings({ sort: "featured", limit: 6 }), { items: [], total: 0 }),
  ]);
  return {
    auctions: auctions.data.slice(0, 3),
    liveAuctionCount: auctions.failed ? null : auctions.data.length,
    stores: stores.data.items,
    storeCount: stores.failed ? null : stores.data.total,
    featuredListings: listings.data.items,
    activeListings: stats.data?.active ?? null,
    unavailable: auctions.failed && stores.failed && stats.failed && listings.failed,
  };
}
