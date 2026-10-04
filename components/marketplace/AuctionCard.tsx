import Link from "next/link";
import { MapPin, Gavel, ShieldCheck } from "lucide-react";
import type { AuctionCardData } from "@/lib/api/auctions";
import { formatKes } from "@/lib/format";
import { categoryVisual } from "@/lib/categories";
import { Countdown } from "./Countdown";
import { Media } from "./Media";
import { STATUS_BADGE, outcomeLabel, priceFor } from "./auction-utils";

export function AuctionCard({ auction: a }: { auction: AuctionCardData }) {
  const badge = STATUS_BADGE[a.status];
  const price = priceFor(a);
  const outcome = a.status === "ended" ? outcomeLabel(a.outcome, Boolean(a.winning_amount)) : null;
  const cat = a.category ? categoryVisual(a.category) : null;

  return (
    <Link href={`/auctions/${a.id}`} className="lcard" prefetch={false}>
      <div className="lcard-media">
        <Media image={a.cover} category={a.category} alt={a.name} emoji={cat ? undefined : "🔨"} />
        <span className={`lbadge lbadge-${badge.tone}`}>
          {a.status === "live" && <i className="lbadge-dot" aria-hidden="true" />}
          {badge.label}
        </span>
        {a.has_reserve && a.status !== "ended" && (
          <span className="lbadge lbadge-corner" title={a.reserve_met ? "The seller's reserve price has been met" : "The seller has set a reserve price"}>
            <ShieldCheck size={12} aria-hidden="true" /> {a.reserve_met ? "Reserve met" : "Reserve"}
          </span>
        )}
      </div>
      <div className="lcard-body">
        {a.category && (
          <span className="lcard-cat">
            <span aria-hidden="true">{cat?.emoji}</span> {a.category}
          </span>
        )}
        <h3 className="lcard-title">{a.name}</h3>
        <div className="lcard-price">
          <span className="lcard-price-label">{price.label}</span>
          <span className="lcard-price-amount">{formatKes(price.amount)}</span>
        </div>
        <div className="lcard-meta">
          <Countdown status={a.status} startsAt={a.starts_at} endsAt={a.ends_at} className="lcard-time" />
          <span className="lcard-bids">
            <Gavel size={13} aria-hidden="true" /> {a.bid_count} {a.bid_count === 1 ? "bid" : "bids"}
          </span>
        </div>
        {outcome && <p className="lcard-outcome">{outcome}</p>}
        {a.location_name && (
          <p className="lcard-place">
            <MapPin size={13} aria-hidden="true" /> {a.location_name}
          </p>
        )}
      </div>
    </Link>
  );
}
