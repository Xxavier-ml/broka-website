import type { AuctionOutcome, AuctionStatus } from "@/lib/api/types";

export type Tone = "live" | "upcoming" | "ended" | "warn";

export const STATUS_BADGE: Record<AuctionStatus, { label: string; tone: Tone }> = {
  live: { label: "Live", tone: "live" },
  upcoming: { label: "Upcoming", tone: "upcoming" },
  ended: { label: "Ended", tone: "ended" },
};

/** What happened when an auction closed, in words a bidder would use. */
export function outcomeLabel(outcome: AuctionOutcome, hasWinner = false): string | null {
  switch (outcome) {
    case "won":
      return "Sold";
    case "no_bids":
      return "Closed with no bids";
    case "reserve_not_met":
      return "Reserve not met";
    case "unpaid":
      return "Winner did not pay";
    default:
      return hasWinner ? "Sold" : null;
  }
}

/** Price label + amount for a card: the number a bidder cares about in each state. */
export function priceFor(a: {
  status: AuctionStatus;
  current_bid: number | null;
  starting_price: number | null;
  winning_amount: number | null;
}): { label: string; amount: number | null } {
  if (a.status === "ended") {
    if (a.winning_amount) return { label: "Sold for", amount: a.winning_amount };
    return { label: "Final bid", amount: a.current_bid };
  }
  if (a.status === "upcoming") return { label: "Starting price", amount: a.starting_price };
  return a.current_bid
    ? { label: "Current bid", amount: a.current_bid }
    : { label: "Starting price", amount: a.starting_price };
}
