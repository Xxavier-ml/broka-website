import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import type { Listing } from "@/lib/api/types";
import { coverImage, resolveLegacy } from "@/lib/api/images";
import { categoryVisual } from "@/lib/categories";
import { conditionLabel, formatUnitPrice, placeLine } from "@/lib/format";
import { Media } from "./Media";

export function ProductCard({ listing: l, headingLevel = 2 }: { listing: Listing; headingLevel?: 2 | 3 }) {
  const condition = conditionLabel(l.condition);
  const place = placeLine(l.location_name, l.location_county);
  const sellerName = l.store_name?.trim() || l.seller_name?.trim() || null;
  const sellerPhoto = resolveLegacy(l.seller_avatar_url) ?? resolveLegacy(l.seller_profile_photo);
  const sellerRating = l.store_name
    ? l.store_rating ?? l.seller_standing?.overall_rating ?? l.seller_rating
    : l.seller_standing?.overall_rating ?? l.seller_rating;
  const sellerRatingLabel = typeof sellerRating === "number" && Number.isFinite(sellerRating)
    ? `${sellerRating.toFixed(1)}/10`
    : null;
  const sellerInitial = sellerName?.charAt(0).toUpperCase() || "?";
  const isAgriculture = l.category.toLowerCase() === "agriculture";
  const agricultureAttributes = l.attributes ?? {};
  const agricultureCue = isAgriculture
    ? ["crop", "variety", "product_type", "brand", "grade"]
        .map((key) => agricultureAttributes[key])
        .find((value): value is string => typeof value === "string" && value.trim().length > 0)
    : null;
  const available = isAgriculture && typeof l.quantity === "number" && l.quantity > 0
    ? `${l.quantity.toLocaleString("en-KE")} available`
    : null;
  const Title = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={`/listings/${l.id}`} className={`lcard lcard-product${isAgriculture ? " lcard-agriculture" : ""}`} prefetch={false}>
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
        {isAgriculture && (agricultureCue || available) && (
          <div className="lcard-agri-meta" aria-label="Agriculture listing details">
            {agricultureCue && <span className="lcard-agri-tag">{agricultureCue}</span>}
            {available && <span>{available}</span>}
          </div>
        )}
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
        {(sellerName || sellerPhoto || sellerRatingLabel) && (
          <div className="lcard-seller">
            <span className="lcard-seller-avatar" aria-hidden="true">
              <span className="lcard-seller-initial">{sellerInitial}</span>
              {sellerPhoto && <Media image={sellerPhoto} category={null} alt="" sizes="24px" />}
            </span>
            {sellerName && <span className="lcard-seller-name">{sellerName}</span>}
            {sellerRatingLabel && (
              <span className="lcard-seller-rating" role="img" aria-label={`Seller rating ${sellerRatingLabel}`}>
                <span aria-hidden="true">★</span>{sellerRatingLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
