import Link from "next/link";
import type { CSSProperties } from "react";
import { CATEGORIES, categorySlug } from "@/lib/categories";
import { withQuery } from "@/lib/params";

/** Shared marketplace category browser. "All" clears only the category selection. */
export function CategoryChips({
  basePath,
  active,
  keep = {},
  className = "",
}: {
  basePath: string;
  active?: string | null;
  /** Other query values to carry over when a category is chosen. */
  keep?: Record<string, string | undefined>;
  className?: string;
}) {
  const items = [
    {
      key: "all",
      href: withQuery(basePath, keep),
      label: "All products",
      emoji: "✦",
      image: undefined,
      gradient: undefined,
      active: !active,
    },
    ...CATEGORIES.map((category) => ({
      key: category.name,
      href: basePath === "/browse"
        ? withQuery(`/browse/${categorySlug(category.name)}`, keep)
        : withQuery(basePath, { ...keep, category: category.name }),
      label: category.name,
      emoji: category.emoji,
      image: category.backgroundArt,
      gradient: category.gradient,
      active: active === category.name,
    })),
  ];

  return (
    <nav
      className={`category-card-grid${className ? ` ${className}` : ""}`}
      aria-label="Marketplace categories"
    >
      {items.map((item) => {
        const webpBase = item.image?.replace(/\.jpg$/, "");
        const webpStem = webpBase?.split("/").pop();
        const webpDirectory = webpBase?.replace(/\/[^/]+$/, "/webp");
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`category-card${item.active ? " active" : ""}`}
            aria-label={item.active ? `${item.label}, selected` : `Browse ${item.label}`}
            aria-current={item.active ? "page" : undefined}
            style={item.image ? { "--category-card-start": item.gradient?.[0], "--category-card-end": item.gradient?.[1] } as CSSProperties : undefined}
          >
            <span className="category-card-art" aria-hidden="true">
              {item.image && webpStem && webpDirectory && (
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${webpDirectory}/${webpStem}-320.webp 320w, ${webpDirectory}/${webpStem}-640.webp 640w, ${webpDirectory}/${webpStem}-1024.webp 1024w`}
                    sizes="(max-width: 620px) 72vw, (max-width: 900px) 33vw, 25vw"
                  />
                  <img src={item.image} alt="" loading="lazy" decoding="async" />
                </picture>
              )}
            </span>
            <span className="category-card-shade" aria-hidden="true" />
            <span className="category-card-copy">
              <span className="category-card-icon" aria-hidden="true">{item.emoji}</span>
              <span className="category-card-name">{item.label}</span>
              <span className="category-card-arrow" aria-hidden="true">↗</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
