import type { ResolvedImage } from "@/lib/api/images";

/**
 * A photo from the BROKA API. A plain <img> on purpose: the images live on the
 * API and its object storage (hosts that vary by deployment, and legacy rows
 * carry data URIs), so next/image's remote-host allow-list would have to be
 * kept in step with the backend for no gain — the API already serves resized
 * WebP in three sizes, which `srcSet` picks between.
 */
export function RemoteImage({
  image,
  alt,
  sizes = "(max-width: 640px) 100vw, 400px",
  priority = false,
  className,
}: {
  image: ResolvedImage;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.medium}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
