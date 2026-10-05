// The shapes the BROKA API returns, as far as the website reads them.
// Mirrors backend/api/domains/{listings,stores,auctions} in the main
// repository (`_listing_dict`, `_store_dict`, AuctionsService). Only public
// fields are listed: the website is read-only and never sees private ones.

/** One stored image in three sizes (URLs, or paths on the API). */
export interface ImageSizes {
  id: string;
  thumb: string;
  medium: string;
  large: string;
  /** Set on a listing's cover: "showcase" or "photo". */
  kind?: string | null;
}

export interface Listing {
  id: string;
  name: string;
  description: string | null;
  category: string;
  condition: string | null;
  attributes: Record<string, unknown> | null;
  price: number;
  /** What one unit of `price` is ("bag"); null when it is for the whole item. */
  price_unit: string | null;
  quantity: number | null;
  price_negotiable: boolean;
  delivery_available: boolean | null;
  delivery_note: string | null;
  location_name: string | null;
  location_county: string | null;
  location_subcounty: string | null;
  listing_type: "direct" | "auction" | string;
  status: string;
  views: number;
  target_bidders: number | null;
  auction_date: string | null;
  photos: ImageSizes[];
  cover: ImageSizes | null;
  /** Legacy base64 photos, comma-separated, for listings not converted yet. */
  verified_photos: string | null;
  showcase_image_url: string | null;
  is_featured: boolean;
  created_at: string | null;
  seller_name: string | null;
  seller_verified: boolean;
  seller_rating: number | null;
  seller_completed_deals: number;
  /** Buyer-facing snapshot from the public listing-detail response. */
  seller_dcr?: number | null;
  seller_dcr_provisional?: boolean;
  seller_response_minutes?: number | null;
  seller_standing_as_of?: string | null;
  seller_avg_deal_time_minutes?: number | null;
  seller_timed_deals?: number;
  store_id: string | null;
  store_name: string | null;
  store_slug: string | null;
}

export type AuctionStatus = "upcoming" | "live" | "ended";
export type AuctionOutcome = "won" | "no_bids" | "reserve_not_met" | "unpaid" | null;

/** The auction grid's row (GET /auctions). */
export interface AuctionSummary {
  id: string;
  listing_id: string;
  name: string;
  location_name: string | null;
  target_bidders: number | null;
  auction_date: string | null;
  status: AuctionStatus;
  current_bid: number | null;
  bid_count: number;
  min_bid_increment: number | null;
  min_next_bid: number | null;
  starting_price: number | null;
  starts_at: string | null;
  ends_at: string | null;
  server_time: string;
  seconds_remaining: number | null;
  has_reserve: boolean;
  reserve_met: boolean | null;
  outcome: AuctionOutcome;
  winning_amount: number | null;
}

export interface Bid {
  bidder_name: string;
  amount: number;
  created_at: string | null;
}

/** One auction (GET /auctions/{id}). */
export interface AuctionDetail extends Omit<AuctionSummary, "winning_amount"> {
  winning_amount: number | null;
  winner_name: string | null;
  bid_history: Bid[];
}

export interface StoreOwner {
  name?: string | null;
  verified: boolean;
  rating: number | null;
  completed_deals: number;
  member_since: string | null;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  /** The store's public link, e.g. https://broka.co.ke/store/clanix. */
  url: string;
  category: string | null;
  description: string | null;
  country: string;
  county: string | null;
  subcounty: string | null;
  location_description: string | null;
  /** Present only once the store has proven the address. */
  business_email: string | null;
  business_email_verified: boolean;
  logo: ImageSizes | null;
  cover: ImageSizes | null;
  photo_images: ImageSizes[];
  /** Legacy: an image URL, or base64 for a store not converted yet. */
  logo_url: string | null;
  photos: string[];
  owner: StoreOwner | null;
  is_active: boolean;
  listing_count: number;
  created_at: string | null;
}

export interface StoreCategory {
  name: string;
  count: number;
}

export type SortKey = "featured" | "newest" | "price_low" | "price_high";
