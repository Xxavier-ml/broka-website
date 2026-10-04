import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Listing } from "@/lib/api/types";
import { coverImage } from "@/lib/api/images";
import { categoryVisual } from "@/lib/categories";
import { conditionLabel, formatUnitPrice, placeLine } from "@/lib/format";
import { Media } from "./Media";

export function ProductCard({ listing: l }: { listing: Listing }) {
  const condition = conditionLabel(l.condition);
  const place = placeLine(l.location_name, l.location_county);
  return (
    <Link href={`/listings/${l.id}`} className="lcard" prefetch={false}>
      <div className="lcard-media">
        <Media image={coverImage(l)} category={l.category} alt={l.name} />
        {condition && <span className="lbadge lbadge-corner-left">{condition}</span>}
      </div>
      <div className="lcard-body">
        <span className="lcard-cat">
          <span aria-hidden="true">{categoryVisual(l.category).emoji}</span> {l.category}
        </span>
        <h3 className="lcard-title">{l.name}</h3>
        <div className="lcard-price">
          <span className="lcard-price-amount">{formatUnitPrice(l.price, l.price_unit)}</span>
        </div>
        {place && (
          <p className="lcard-place">
            <MapPin size={13} aria-hidden="true" /> {place}
          </p>
        )}
      </div>
    </Link>
  );
}
