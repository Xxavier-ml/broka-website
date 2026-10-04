import Link from "next/link";
import { CATEGORIES, categorySlug } from "@/lib/categories";
import { withQuery } from "@/lib/params";

/** A scrollable rail of category links, like the app's Home. "All" clears the filter. */
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
  return (
    <nav className={`chips${className ? ` ${className}` : ""}`} aria-label="Categories">
      <Link
        href={withQuery(basePath, keep)}
        className={`chip${!active ? " active" : ""}`}
        aria-current={!active ? "page" : undefined}
        scroll={false}
      >
        All
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.name}
          href={withQuery(`/browse/${categorySlug(c.name)}`, keep)}
          className={`chip${active === c.name ? " active" : ""}`}
          aria-current={active === c.name ? "page" : undefined}
          scroll={false}
        >
          <span aria-hidden="true">{c.emoji}</span> {c.name}
        </Link>
      ))}
    </nav>
  );
}
