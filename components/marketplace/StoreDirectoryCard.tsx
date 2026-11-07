"use client";

import { BadgeCheck, ArrowRight, Info, Map, MapPin, Package, Star } from "lucide-react";
import type { Store } from "@/lib/api/types";
import { resolveLegacy, resolveSizes } from "@/lib/api/images";
import { categoryVisual } from "@/lib/categories";
import { placeLine, plural } from "@/lib/format";
import { storeWebsiteUrl } from "@/lib/site";
import styles from "./StoreDirectory.module.css";

export function StoreDirectoryCard({ store }: { store: Store }) {
  const cover = resolveSizes(store.cover) ?? resolveSizes(store.photo_images?.[0]) ?? resolveLegacy(store.photos?.[0]);
  const logo = resolveSizes(store.logo) ?? resolveLegacy(store.logo_url);
  const visual = categoryVisual(store.category);
  const categories = store.categories?.filter(Boolean) ?? [];
  const visibleCategories = categories.length ? categories : store.category ? [store.category] : [];
  const moreCategories = visibleCategories.length > 1 ? ` +${visibleCategories.length - 1}` : "";
  const virtual = store.store_type === "virtual";
  const physicalPlace = placeLine(store.subcounty, store.county);
  const deliveryPlace = store.service_areas?.length
    ? `Delivers to ${store.service_areas.slice(0, 2).join(", ")}${store.service_areas.length > 2 ? ` +${store.service_areas.length - 2}` : ""}`
    : "Online store";
  const place = virtual ? deliveryPlace : (store.location_description || physicalPlace);
  const presence = store.owner?.online ? "Online now" : store.owner?.last_active;
  const destination = storeWebsiteUrl(store.slug);
  const hasMapPoint = !virtual && store.has_location && store.approx_lat != null && store.approx_lng != null;
  const mapUrl = hasMapPoint
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.approx_lat},${store.approx_lng}`)}`
    : null;
  const description = store.description?.trim();

  return (
    <article className={styles.storeCard}>
      <a className={styles.cardHitArea} href={destination} aria-label={`Visit ${store.name} storefront`} />
      <div className={styles.storePhoto} style={!cover ? { background: `linear-gradient(135deg, ${visual.gradient[0]}55, ${visual.gradient[1]}70)` } : undefined}>
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover.medium} srcSet={cover.srcSet} sizes="(max-width: 640px) 42vw, 280px" alt="" loading="lazy" decoding="async" className={styles.storePhotoImage} />
        ) : (
          <span className={styles.photoFallback} aria-hidden="true">{visual.emoji}</span>
        )}
        <span className={styles.photoShade} aria-hidden="true" />
        {presence && <span className={styles.presence}><i aria-hidden="true" />{presence}</span>}
        <span className={styles.storeLogo} aria-hidden="true">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo.medium} srcSet={logo.srcSet} sizes="48px" alt="" loading="lazy" decoding="async" />
          ) : <span>B</span>}
        </span>
      </div>

      <div className={styles.storeFacts}>
        <div className={styles.storeIdentity}>
          <h3 className={styles.storeName}>{store.name}{store.owner?.verified && <BadgeCheck size={16} aria-label="Verified seller" />}</h3>
          {store.rating != null && (
            <span className={styles.storeRating} aria-label={`Store rating ${store.rating.toFixed(1)} out of 10`}>
              <Star size={13} fill="currentColor" aria-hidden="true" /> {store.rating.toFixed(1)}/10
            </span>
          )}
        </div>

        {(place || store.distance_label) && (
          <p className={styles.storeLocation}>
            {virtual ? <MapPin size={15} aria-hidden="true" /> : <MapPin size={15} aria-hidden="true" />}
            <span>{place}{place && store.distance_label ? " · " : ""}{store.distance_label}</span>
          </p>
        )}

        {visibleCategories.length > 0 && (
          <p className={styles.storeCategory}>
            <span aria-hidden="true">{categoryVisual(visibleCategories[0]).emoji}</span>
            {visibleCategories[0]}{moreCategories}
          </p>
        )}

        <div className={styles.storeProductCount}>
          <Package size={16} aria-hidden="true" />
          <span>{plural(store.listing_count, "product")}</span>
        </div>

        <div className={styles.storeActions}>
          {mapUrl ? (
            <a className={`${styles.iconAction} ${styles.mapAction}`} href={mapUrl} target="_blank" rel="noreferrer" aria-label={`View ${store.name} on map`}>
              <Map size={20} aria-hidden="true" />
            </a>
          ) : (
            <button className={`${styles.iconAction} ${styles.mapAction}`} type="button" disabled aria-label="Map location unavailable">
              <Map size={20} aria-hidden="true" />
            </button>
          )}

          <details className={styles.storeDetails}>
            <summary className={`${styles.iconAction} ${styles.infoAction}`} aria-label={`More about ${store.name}`}>
              <Info size={20} aria-hidden="true" />
            </summary>
            <div className={styles.detailsPopover}>
              <strong>{store.name}</strong>
              <p>{description || (virtual ? deliveryPlace : place || "Store details are available on the public storefront.")}</p>
              <a href={destination}>Open storefront <ArrowRight size={14} aria-hidden="true" /></a>
            </div>
          </details>

          <a className={styles.visitButton} href={destination}>
            Visit <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
