import { orFallback } from "./client";
import { listAuctions, type AuctionCardData } from "./auctions";
import { getListingStats } from "./listings";
import { listStores } from "./stores";
import type { Store } from "./types";

export interface HomeData {
  /** Live auctions that close soonest. */
  auctions: AuctionCardData[];
  /** How many live auctions there are (the API returns at most 20 at a time). */
  liveAuctionCount: number | null;
  stores: Store[];
  storeCount: number | null;
  activeListings: number | null;
  /** True when the API answered nothing at all, so the page can say so instead of showing empty shelves. */
  unavailable: boolean;
}

/** Everything the home page's marketplace section needs. Each part fails on its own. */
export async function getHomeData(): Promise<HomeData> {
  const [auctions, stores, stats] = await Promise.all([
    orFallback(() => listAuctions("ending"), [] as AuctionCardData[]),
    orFallback(() => listStores({ limit: 3 }), { items: [], total: 0 }),
    orFallback(() => getListingStats(), null),
  ]);
  return {
    auctions: auctions.data.slice(0, 3),
    liveAuctionCount: auctions.failed ? null : auctions.data.length,
    stores: stores.data.items,
    storeCount: stores.failed ? null : stores.data.total,
    activeListings: stats.data?.active ?? null,
    unavailable: auctions.failed && stores.failed && stats.failed,
  };
}
