"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { CATEGORIES, categorySlug, FEATURED_CATEGORIES } from "@/lib/categories";
import { categoryArtworkSources } from "@/lib/category-assets";

type SortKey = "featured" | "az" | "za";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Popular first" },
  { key: "az", label: "Alphabetical: A–Z" },
  { key: "za", label: "Alphabetical: Z–A" },
];

export function CategoryDirectory() {
  const [sort, setSort] = useState<SortKey>("featured");
  const featuredOrder = useMemo(() => new Map(FEATURED_CATEGORIES.map((category, index) => [category.name, index])), []);
  const categories = useMemo(() => {
    return [...CATEGORIES].sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name, "en");
      if (sort === "za") return b.name.localeCompare(a.name, "en");
      return (featuredOrder.get(a.name) ?? CATEGORIES.length) - (featuredOrder.get(b.name) ?? CATEGORIES.length);
    });
  }, [featuredOrder, sort]);

  return (
    <>
      <div className="category-directory-toolbar">
        <span className="category-directory-count">{categories.length} categories</span>
        <label className="category-directory-sort-label">
          <span>Sort by</span>
          <select
            className="category-directory-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            {SORT_OPTIONS.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
          </select>
        </label>
      </div>
      <nav className="category-directory-grid" aria-label="All marketplace categories">
        {categories.map((category) => {
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
    </>
  );
}
