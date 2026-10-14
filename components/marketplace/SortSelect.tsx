"use client";

import { useRouter } from "next/navigation";
import { MARKETPLACE_SORT_OPTIONS, type MarketplaceSort } from "@/lib/marketplace-filters";

/**
 * The app's sort dropdown (`feed_sort_row.dart`). Each option is a prebuilt
 * href that already carries every active filter, so changing the sort never
 * throws one away. Without JavaScript the links in the sibling <noscript> nav
 * still work.
 */
export function SortSelect({ value, hrefs, label }: { value: MarketplaceSort; hrefs: Record<MarketplaceSort, string>; label: string }) {
  const router = useRouter();
  return (
    <>
      <label className="sort-select">
        <span className="sr-only">{label}</span>
        <select value={value} onChange={(event) => router.push(hrefs[event.target.value as MarketplaceSort], { scroll: false })}>
          {MARKETPLACE_SORT_OPTIONS.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
        </select>
      </label>
      <noscript>
        <nav className="browse-sort" aria-label={label}>
          {MARKETPLACE_SORT_OPTIONS.map((option) => <a key={option.key} href={hrefs[option.key]}>{option.label}</a>)}
        </nav>
      </noscript>
    </>
  );
}
