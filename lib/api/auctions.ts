import { apiGet } from "./client";
import { coverImage, type ResolvedImage } from "./images";
import type { AuctionDetail, AuctionStatus, AuctionSummary, Listing } from "./types";
import { parseUtc } from "../format";

/** The Auction House's rail, same four filters as the app. */
export const AUCTION_FILTERS = [
  { key: "live", label: "Live now", status: "live" },
  { key: "ending", label: "Ending soon", status: "live" },
  { key: "upcoming", label: "Upcoming", status: "upcoming" },
  { key: "ended", label: "Completed", status: "ended" },
] as const satisfies readonly { key: string; label: string; status: AuctionStatus }[];

export type AuctionFilterKey = (typeof AUCTION_FILTERS)[number]["key"];

export function parseAuctionFilter(value: string | string[] | undefined): AuctionFilterKey {
  const v = Array.isArray(value) ? value[0] : value;
  return AUCTION_FILTERS.find((f) => f.key === v)?.key ?? "live";
}

/** An auction on the grid: its state, and the listing's photo and category. */
export interface AuctionCardData extends AuctionSummary {
  cover: ResolvedImage | null;
  category: string | null;
}

/**
 * Photos and categories live on the listing, not the auction summary. One
 * list call for every auction listing gives both, without opening each
 * listing (which would count a view per auction on every refresh).
 */
async function auctionListings(): Promise<Map<string, Listing>> {
  const rows = (await apiGet<Listing[]>("/listings/?listing_type=auction&sort=recent&limit=100")) ?? [];
  return new Map(rows.map((l) => [l.id, l]));
}

export async function listAuctions(filter: AuctionFilterKey): Promise<AuctionCardData[]> {
  const status = AUCTION_FILTERS.find((f) => f.key === filter)!.status;
  const [auctions, listings] = await Promise.all([
    apiGet<AuctionSummary[]>(`/auctions?status=${status}`),
    // The photos are a nicety: without them the cards fall back to an icon
    // rather than hiding the auctions.
    auctionListings().catch(() => new Map<string, Listing>()),
  ]);

  let rows = auctions ?? [];
  if (filter === "ending") {
    rows = rows
      .filter((a) => a.ends_at)
      .sort((a, b) => (parseUtc(a.ends_at)?.getTime() ?? 0) - (parseUtc(b.ends_at)?.getTime() ?? 0));
  }
  return rows.map((a) => {
    const listing = listings.get(a.listing_id);
    return { ...a, cover: listing ? coverImage(listing) : null, category: listing?.category ?? null };
  });
}

export interface AuctionPage {
  auction: AuctionDetail;
  listing: Listing;
}

/** The auction and the listing behind it, or null when either does not exist. */
export async function getAuction(id: string): Promise<AuctionPage | null> {
  if (!/^[A-Za-z0-9-]{1,64}$/.test(id)) return null;
  const [auction, listing] = await Promise.all([
    apiGet<AuctionDetail>(`/auctions/${id}`, { revalidate: 30, tags: [`auction:${id}`] }),
    apiGet<Listing>(`/listings/${id}`, { revalidate: 30, tags: [`listing:${id}`] }),
  ]);
  if (!auction || !listing) return null;
  return { auction, listing };
}
