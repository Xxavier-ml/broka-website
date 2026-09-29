import { categoryVisual } from "@/lib/categories";
import type { ResolvedImage } from "@/lib/api/images";
import { RemoteImage } from "@/components/ui/RemoteImage";

/**
 * A card's picture: the photo when there is one, otherwise a tile tinted
 * with the category's colours and its emoji, like the app's cards.
 */
export function Media({
  image,
  category,
  alt,
  emoji,
  sizes,
}: {
  image: ResolvedImage | null;
  category: string | null | undefined;
  alt: string;
  /** Overrides the category emoji (an auction with no category shows a gavel). */
  emoji?: string;
  sizes?: string;
}) {
  if (image) return <RemoteImage image={image} alt={alt} sizes={sizes} className="lmedia-img" />;
  const v = categoryVisual(category);
  return (
    <div
      className="lmedia-fallback"
      role="img"
      aria-label={alt}
      style={{ background: `linear-gradient(135deg, ${v.gradient[0]}55, ${v.gradient[1]}55)` }}
    >
      <span aria-hidden="true">{emoji ?? v.emoji}</span>
    </div>
  );
}
