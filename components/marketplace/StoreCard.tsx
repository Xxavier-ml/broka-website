import Link from "next/link";
import { MapPin, BadgeCheck, Star } from "lucide-react";
import type { Store } from "@/lib/api/types";
import { resolveLegacy, resolveSizes } from "@/lib/api/images";
import { categoryVisual } from "@/lib/categories";
import { placeLine, plural } from "@/lib/format";
import { RemoteImage } from "@/components/ui/RemoteImage";

export function storeCover(store: Store) {
  return resolveSizes(store.cover) ?? resolveSizes(store.photo_images[0]) ?? resolveLegacy(store.photos[0]);
}
export function storeLogo(store: Store) {
  return resolveSizes(store.logo) ?? resolveLegacy(store.logo_url);
}

export function StoreCard({ store }: { store: Store }) {
  const cover = storeCover(store);
  const logo = storeLogo(store);
  const v = categoryVisual(store.category);
  const place = placeLine(store.subcounty, store.county);

  return (
    <Link href={`/stores/${store.slug}`} className="lcard scard" prefetch={false}>
      <div
        className="lcard-media scard-cover"
        style={cover ? undefined : { background: `linear-gradient(135deg, ${v.gradient[0]}55, ${v.gradient[1]}55)` }}
      >
        {cover ? (
          <RemoteImage image={cover} alt="" className="lmedia-img" sizes="(max-width: 640px) 100vw, 400px" />
        ) : (
          <span className="scard-cover-emoji" aria-hidden="true">
            {v.emoji}
          </span>
        )}
      </div>
      <div className="scard-logo" aria-hidden="true">
        {logo ? (
          <RemoteImage image={logo} alt="" className="lmedia-img" sizes="64px" />
        ) : (
          <span>{store.name.slice(0, 1).toUpperCase()}</span>
        )}
      </div>
      <div className="lcard-body scard-body">
        <h3 className="lcard-title">
          {store.name}
          {store.owner?.verified && <BadgeCheck size={16} className="scard-verified" aria-label="Verified seller" />}
        </h3>
        {store.category && (
          <span className="lcard-cat">
            <span aria-hidden="true">{v.emoji}</span> {store.category}
          </span>
        )}
        {store.description && <p className="scard-desc">{store.description}</p>}
        <div className="lcard-meta">
          <span className="lcard-bids">{plural(store.listing_count, "product")}</span>
          {store.owner?.rating ? (
            <span className="lcard-bids">
              <Star size={13} aria-hidden="true" /> {store.owner.rating.toFixed(1)}
            </span>
          ) : null}
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
