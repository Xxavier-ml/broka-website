import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MapPin, Sparkles, Star } from "lucide-react";
import type { Listing } from "@/lib/api/types";
import { coverImage } from "@/lib/api/images";
import { categoryVisual } from "@/lib/categories";
import { conditionLabel, formatUnitPrice, placeLine } from "@/lib/format";
import { Media } from "./Media";

export function ProductCard({ listing: l, headingLevel = 2 }: { listing: Listing; headingLevel?: 2 | 3 }) {
  const condition = conditionLabel(l.condition);
  const place = placeLine(l.location_name, l.location_county);
  const sellerName = l.seller_name?.trim() || l.store_name?.trim() || "BROKA seller";
  const sellerInitials = sellerName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const sellerNote = l.seller_completed_deals === 0
    ? "New seller"
    : `${l.seller_completed_deals} ${l.seller_completed_deals === 1 ? "deal" : "deals"}`;
  const Title = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={`/listings/${l.id}`} className="lcard lcard-product" prefetch={false}>
      <div className="lcard-media">
        <Media image={coverImage(l)} category={l.category} alt={l.name} />
        {condition && <span className="lbadge lbadge-corner-left">{condition}</span>}
        {l.cover?.kind === "showcase" && (
          <span className="lcard-showcase">
            <Sparkles size={12} aria-hidden="true" /> AI showcase
          </span>
        )}
      </div>
      <div className="lcard-body">
        <span className="lcard-cat">
          <span aria-hidden="true">{categoryVisual(l.category).emoji}</span> {l.category}
        </span>
        <Title className="lcard-title">{l.name}</Title>
        <div className="lcard-price-row">
          <div className="lcard-price">
            <span className="lcard-price-amount">{formatUnitPrice(l.price, l.price_unit)}</span>
          </div>
          <span className="lcard-go" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
        {place && (
          <p className="lcard-place">
            <MapPin size={13} aria-hidden="true" /> {place}
          </p>
        )}
        <div className="lcard-seller">
          <span className="lcard-seller-avatar" aria-hidden="true">{sellerInitials || "B"}</span>
          <span className="lcard-seller-name">
            {sellerName}
            {l.seller_verified && (
              <span className="lcard-seller-verified" role="img" aria-label="Verified seller">
                <BadgeCheck size={14} aria-hidden="true" />
              </span>
            )}
          </span>
          <span className="lcard-seller-note">
            {l.seller_rating !== null && l.seller_rating > 0 && (
              <Star size={11} aria-hidden="true" />
            )}
            {l.seller_rating !== null && l.seller_rating > 0
              ? l.seller_rating.toFixed(1)
              : sellerNote}
          </span>
        </div>
      </div>
    </Link>
  );
}
