import { CategoryRail } from "./CategoryRail";
import type { CategoryRailItem } from "./CategoryRail";
import { CATEGORIES, categorySlug } from "@/lib/categories";
import { withQuery } from "@/lib/params";

/** Shared marketplace category rail. "All" clears only the category selection. */
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
  const items: CategoryRailItem[] = [
    { key: "all", href: withQuery(basePath, keep), label: "All", active: !active },
    ...CATEGORIES.map((category) => ({
      key: category.name,
      href: basePath === "/browse"
        ? withQuery(`/browse/${categorySlug(category.name)}`, keep)
        : withQuery(basePath, { ...keep, category: category.name }),
      label: category.name,
      emoji: category.emoji,
      active: active === category.name,
    })),
  ];

  return (
    <CategoryRail
      items={items}
      ariaLabel="Marketplace categories"
      className={`listing-category-rail${className ? ` ${className}` : ""}`}
    />
  );
}
