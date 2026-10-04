// Turning the API's image fields into something an <img> can load.
import { API_URL } from "./client";
import type { ImageSizes } from "./types";

/**
 * A loadable URL for an image value from the API:
 *  - absolute URLs (Cloudflare R2) as they are;
 *  - paths ("/media/i/...", images stored in the database) on the API;
 *  - data URIs as they are;
 *  - bare base64 (rows the media backfill has not converted yet) as a data URI.
 */
export function resolveImage(value: string | null | undefined): string | null {
  const v = value?.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v) || v.startsWith("data:image/")) return v;
  if (v.startsWith("/")) return `${API_URL}${v}`;
  if (/^[A-Za-z0-9+/=\s]+$/.test(v) && v.length > 32) {
    const mime = v.startsWith("iVBOR") ? "image/png" : v.startsWith("UklGR") ? "image/webp" : "image/jpeg";
    return `data:${mime};base64,${v.replace(/\s/g, "")}`;
  }
  return null;
}

export interface ResolvedImage {
  thumb: string;
  medium: string;
  large: string;
  /** srcset over the three sizes (480, 960 and 1600 px wide at most). */
  srcSet: string;
}

export function resolveSizes(sizes: ImageSizes | null | undefined): ResolvedImage | null {
  if (!sizes) return null;
  const thumb = resolveImage(sizes.thumb);
  const medium = resolveImage(sizes.medium);
  const large = resolveImage(sizes.large);
  if (!thumb || !medium || !large) return null;
  return { thumb, medium, large, srcSet: `${thumb} 480w, ${medium} 960w, ${large} 1600w` };
}

/** A single legacy image field as a resolved image (no smaller sizes exist). */
export function resolveLegacy(value: string | null | undefined): ResolvedImage | null {
  const src = resolveImage(value);
  return src ? { thumb: src, medium: src, large: src, srcSet: src } : null;
}

/** The first legacy base64 photo of a comma-separated `verified_photos` value. */
function firstLegacyPhoto(photos: string | null | undefined): string | null {
  const first = photos?.split(",").map((p) => p.trim()).find(Boolean);
  return first || null;
}

interface Imaged {
  cover: ImageSizes | null;
  photos: ImageSizes[];
  showcase_image_url: string | null;
  verified_photos: string | null;
}

/** What a card shows: the cover asset, else a legacy showcase or first photo. */
export function coverImage(l: Imaged): ResolvedImage | null {
  return (
    resolveSizes(l.cover) ??
    resolveLegacy(l.showcase_image_url) ??
    resolveLegacy(firstLegacyPhoto(l.verified_photos))
  );
}

/** Every photo of a listing, for the detail gallery. Legacy rows carry them as base64. */
export function galleryImages(l: Imaged): ResolvedImage[] {
  const assets = l.photos.map(resolveSizes).filter((i): i is ResolvedImage => i !== null);
  if (assets.length) {
    // The showcase (an AI cover) leads when there is one, like on the listing card.
    const cover = l.cover && l.cover.kind === "showcase" ? resolveSizes(l.cover) : null;
    return cover ? [cover, ...assets] : assets;
  }
  const legacy = (l.verified_photos ?? "")
    .split(",")
    .map((p) => resolveLegacy(p))
    .filter((i): i is ResolvedImage => i !== null);
  const showcase = resolveLegacy(l.showcase_image_url);
  return showcase ? [showcase, ...legacy] : legacy;
}
