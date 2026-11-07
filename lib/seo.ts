import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

const DEFAULT_SHARE_IMAGE = `${SITE_URL}/opengraph-image`;
const PUBLIC_ORIGIN = new URL(SITE_URL).origin;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  noIndex?: boolean;
};

function canonicalUrl(path: string): string {
  const localPath = `/${path.replace(/^\/+/, "")}`;
  const url = new URL(localPath, SITE_URL);
  if (url.origin !== PUBLIC_ORIGIN) {
    throw new Error("BROKA metadata paths must remain on the configured public origin.");
  }
  return url.toString();
}

function shareImageUrl(image?: string | null): string {
  if (!image) return DEFAULT_SHARE_IMAGE;
  try {
    const url = new URL(image, SITE_URL);
    return url.protocol === "https:" ? url.toString() : DEFAULT_SHARE_IMAGE;
  } catch {
    return DEFAULT_SHARE_IMAGE;
  }
}

/** Build route-specific metadata without relying on browser-side path detection. */
export function pageMetadata({ title, description, path, image, noIndex = false }: PageMetadataOptions): Metadata {
  const canonical = canonicalUrl(path);
  const shareImage = shareImageUrl(image);
  const socialTitle = title.endsWith(` | ${SITE_NAME}`) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_KE",
      images: [{ url: shareImage, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [shareImage],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Search/filter query variants share canonical content and should not be indexed. */
export function hasSearchParams(params: Record<string, string | string[] | undefined>): boolean {
  return Object.values(params).some((value) => value !== undefined);
}
