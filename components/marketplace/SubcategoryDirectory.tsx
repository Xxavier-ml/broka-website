import Link from "next/link";
import type { CSSProperties } from "react";
import type { CategoryNode } from "@/lib/api/categories";
import { categoryArtworkSources } from "@/lib/category-assets";
import { categorySlug, categoryVisual } from "@/lib/categories";
import { automobileSubcategoryArtwork, automobileSubcategorySlug } from "@/lib/automobiles";
import { propertySubcategoryArtwork } from "@/lib/property";
import { landSubcategoryArtwork } from "@/lib/land";
import { ELECTRONICS_SUBCATEGORIES, matchElectronicsSubcategory } from "@/lib/electronics";
import { withQuery } from "@/lib/params";

export function SubcategoryDirectory({ category, subcategories }: { category: string; subcategories: CategoryNode[] }) {
  const visual = categoryVisual(category);
  const isElectronics = category.toLowerCase() === "electronics";
  const isAutomobiles = category.toLowerCase() === "automobiles";
  const isProperty = category.toLowerCase() === "property";
  const isLand = category.toLowerCase() === "land";
  const items = subcategories.map((node) => {
    const electronicsConfig = isElectronics ? ELECTRONICS_SUBCATEGORIES.find((config) => matchElectronicsSubcategory(node, config)) : null;
    const automobileArtwork = isAutomobiles ? automobileSubcategoryArtwork(node.name) : null;
    const propertyArtwork = isProperty ? propertySubcategoryArtwork(node.name) : null;
    const landArtwork = isLand ? landSubcategoryArtwork(node.name) : null;
    const image = electronicsConfig?.image ?? automobileArtwork?.image ?? propertyArtwork?.image ?? landArtwork?.image ?? visual.backgroundArt;
    const gradient = electronicsConfig?.gradient ?? automobileArtwork?.gradient ?? propertyArtwork?.gradient ?? landArtwork?.gradient ?? visual.gradient;
    const href = electronicsConfig
      ? `/browse/electronics/${electronicsConfig.slug}`
      : isAutomobiles
        ? `/browse/automobiles/${automobileSubcategorySlug(node.name)}`
        : withQuery(`/browse/${categorySlug(category)}`, { subcategory_id: node.id });
    return { node, image, gradient, href };
  });

  return (
    <nav className="category-directory-grid" aria-label={`${category} subcategories`}>
      {items.map(({ node, image, gradient, href }) => {
        const artwork = categoryArtworkSources(image);
        return (
          <Link
            key={node.id}
            href={href}
            className="category-directory-card"
            aria-label={`Browse ${node.name}`}
            style={{ "--category-card-start": gradient[0], "--category-card-end": gradient[1] } as CSSProperties}
          >
            <span className="category-directory-art" aria-hidden="true">
              {artwork && (
                <picture>
                  {artwork.srcSet && <source type="image/webp" srcSet={artwork.srcSet} sizes="(max-width: 700px) 100vw, 50vw" />}
                  <img src={artwork.fallback} alt="" loading="lazy" decoding="async" />
                </picture>
              )}
            </span>
            <span className="category-directory-shade" aria-hidden="true" />
            <span className="category-directory-copy">
              <span className="category-directory-icon" aria-hidden="true">{node.icon || visual.emoji}</span>
              <span className="category-directory-name">{node.name}</span>
              <span className="category-directory-arrow" aria-hidden="true">↗</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
