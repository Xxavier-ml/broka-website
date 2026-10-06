import Link from "next/link";
import type { CSSProperties } from "react";
import type { CategoryNode } from "@/lib/api/categories";
import { categoryArtworkSources } from "@/lib/category-assets";
import { ELECTRONICS_SUBCATEGORIES, matchElectronicsSubcategory } from "@/lib/electronics";

export function ElectronicsSubcategoryGrid({ subcategories }: { subcategories: CategoryNode[] }) {
  const available = ELECTRONICS_SUBCATEGORIES.map((config) => ({
    config,
    node: subcategories.find((node) => matchElectronicsSubcategory(node, config)),
  })).filter((entry): entry is { config: typeof ELECTRONICS_SUBCATEGORIES[number]; node: CategoryNode } => Boolean(entry.node));

  if (available.length === 0) return null;

  return (
    <section className="electronics-subcategory-zone" aria-labelledby="electronics-subcategory-title">
      <div className="electronics-subcategory-heading">
        <div>
          <span className="category-kicker">ELECTRONICS / SHOP BY TYPE</span>
          <h2 className="electronics-subcategory-title" id="electronics-subcategory-title">Find the right kind of tech.</h2>
        </div>
        <p>Start with a product family, then narrow down the listings with focused filters.</p>
      </div>
      <div className="electronics-subcategory-grid">
        {available.map(({ config, node }) => {
          const artwork = categoryArtworkSources(config.image);
          return (
            <Link
              key={node.id}
              href={`/browse/electronics/${config.slug}`}
              className="electronics-subcategory-card"
              style={{ "--electronics-start": config.gradient[0], "--electronics-end": config.gradient[1] } as CSSProperties}
              aria-label={`Browse ${config.name}`}
            >
              <span className="electronics-subcategory-art" aria-hidden="true">
                {artwork && (
                  <picture>
                    {artwork.srcSet && <source type="image/webp" srcSet={artwork.srcSet} sizes="(max-width: 700px) 100vw, 50vw" />}
                    <img src={artwork.fallback} alt="" loading="lazy" decoding="async" />
                  </picture>
                )}
              </span>
              <span className="electronics-subcategory-shade" aria-hidden="true" />
              <span className="electronics-subcategory-copy">
                <span className="electronics-subcategory-name">{config.name}</span>
                <span className="electronics-subcategory-description">{config.description}</span>
                <span className="electronics-subcategory-arrow" aria-hidden="true">↗</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
