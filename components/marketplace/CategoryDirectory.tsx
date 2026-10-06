import Link from "next/link";
import type { CSSProperties } from "react";
import { CATEGORIES, categorySlug } from "@/lib/categories";
import { categoryArtworkSources } from "@/lib/category-assets";

export function CategoryDirectory() {
  return (
    <nav className="category-directory-grid" aria-label="All marketplace categories">
      {CATEGORIES.map((category) => {
        const artwork = categoryArtworkSources(category.backgroundArt);
        return (
          <Link
            key={category.name}
            href={`/browse/${categorySlug(category.name)}`}
            className="category-directory-card"
            aria-label={`Browse ${category.name}`}
            style={{ "--category-card-start": category.gradient[0], "--category-card-end": category.gradient[1] } as CSSProperties}
          >
            <span className="category-directory-art" aria-hidden="true">
              {artwork && (
                <picture>
                  {artwork.srcSet && (
                    <source
                      type="image/webp"
                      srcSet={artwork.srcSet}
                      sizes="(max-width: 700px) 100vw, 50vw"
                    />
                  )}
                  <img src={artwork.fallback} alt="" loading="lazy" decoding="async" />
                </picture>
              )}
            </span>
            <span className="category-directory-shade" aria-hidden="true" />
            <span className="category-directory-copy">
              <span className="category-directory-icon" aria-hidden="true">{category.emoji}</span>
              <span className="category-directory-name">{category.name}</span>
              <span className="category-directory-arrow" aria-hidden="true">↗</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
