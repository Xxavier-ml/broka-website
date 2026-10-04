"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const conditions = [
  { value: "", label: "Any condition" },
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "refurbished", label: "Refurbished" },
] as const;
const priceRanges = [
  { value: "", label: "Any price", min: undefined, max: undefined },
  { value: "0-5000", label: "Under KSh 5,000", min: 0, max: 5000 },
  { value: "5000-25000", label: "KSh 5,000 – 25,000", min: 5000, max: 25000 },
  { value: "25000-100000", label: "KSh 25,000 – 100,000", min: 25000, max: 100000 },
  { value: "100000-", label: "Over KSh 100,000", min: 100000, max: undefined },
] as const;
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "recent", label: "Newest first" },
  { value: "price_low", label: "Price: low to high" },
  { value: "price_high", label: "Price: high to low" },
] as const;
const CUSTOM_PRICE_KEY = "custom" as const;
type PriceKey = (typeof priceRanges)[number]["value"] | typeof CUSTOM_PRICE_KEY;
type FilterState = { condition: string; price: PriceKey; county: string; sort: string };

function priceKey(min?: number, max?: number): PriceKey {
  return priceRanges.find((range) => range.min === min && range.max === max)?.value
    ?? (min != null || max != null ? CUSTOM_PRICE_KEY : "");
}

export type MobileFilterDrawerProps = {
  action?: string;
  q?: string;
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  county?: string;
  sort: string;
  iconOnly?: boolean;
  deferApply?: boolean;
};

export function MobileFilterDrawer({
  action,
  q,
  category,
  condition,
  minPrice,
  maxPrice,
  county,
  sort,
  iconOnly = false,
  deferApply = false,
}: MobileFilterDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const initialPrice = useMemo(() => priceKey(minPrice, maxPrice), [minPrice, maxPrice]);
  const [local, setLocal] = useState<FilterState>({ condition: condition ?? "", price: initialPrice, county: county ?? "", sort: sort || "featured" });
  const activeCount = deferApply
    ? [local.condition, local.price, local.county, local.sort !== "featured"].filter(Boolean).length
    : [condition, minPrice != null || maxPrice != null, county, sort !== "featured"].filter(Boolean).length;

  useEffect(() => {
    setLocal({ condition: condition ?? "", price: initialPrice, county: county ?? "", sort: sort || "featured" });
  }, [condition, county, initialPrice, sort]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navigate = (next: typeof local) => {
    const target = action ?? pathname;
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category && pathname === "/browse") params.set("category", category);
    if (next.condition) params.set("condition", next.condition);
    if (next.price === CUSTOM_PRICE_KEY) {
      if (minPrice != null) params.set("min_price", String(minPrice));
      if (maxPrice != null) params.set("max_price", String(maxPrice));
    } else {
      const price = priceRanges.find((range) => range.value === next.price);
      if (price?.min != null) params.set("min_price", String(price.min));
      if (price?.max != null) params.set("max_price", String(price.max));
    }
    if (next.county.trim()) params.set("county", next.county.trim());
    if (next.sort && next.sort !== "featured") params.set("sort", next.sort);
    startTransition(() => router.replace(`${target}${params.toString() ? `?${params}` : ""}`, { scroll: false }));
  };

  const update = (key: keyof typeof local, value: string) => {
    const next = { ...local, [key]: value };
    setLocal(next);
    if (!deferApply) navigate(next);
  };

  const clear = () => {
    const next: FilterState = { condition: "", price: "", county: "", sort: "featured" };
    setLocal(next);
    if (!deferApply) navigate(next);
  };

  return (
    <>
      <button
        type="button"
        className={`mobile-filter-trigger${iconOnly ? " mobile-filter-trigger--icon" : ""}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={iconOnly ? `Filters and sort${activeCount ? `, ${activeCount} active` : ""}` : undefined}
      >
        <SlidersHorizontal size={17} aria-hidden="true" />
        <span className={iconOnly ? "sr-only" : undefined}>Filters & sort</span>
        {activeCount > 0 && <span className="mobile-filter-count">{activeCount}</span>}
      </button>
      {open && (
        <div className="mobile-filter-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="mobile-filter-drawer" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title">
            <header className="mobile-filter-header">
              <div><span className="t-eyebrow">Refine results</span><h2 id="mobile-filter-title">Filters & sort</h2></div>
              <button type="button" className="mobile-filter-close" onClick={() => setOpen(false)} aria-label="Close filters"><X size={19} /></button>
            </header>
            <div className="mobile-filter-body">
              <label className="mobile-filter-field">Sort by
                <select value={local.sort} onChange={(event) => update("sort", event.target.value)}>
                  {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="mobile-filter-field">Condition
                <select value={local.condition} onChange={(event) => update("condition", event.target.value)}>
                  {conditions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="mobile-filter-field">Price range
                <select value={local.price} onChange={(event) => update("price", event.target.value)}>
                  {local.price === CUSTOM_PRICE_KEY && <option value={CUSTOM_PRICE_KEY} disabled>Current custom range</option>}
                  {priceRanges.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
              <label className="mobile-filter-field">County <span className="mobile-filter-optional">optional</span>
                <input value={local.county} onChange={(event) => setLocal((current) => ({ ...current, county: event.target.value }))} placeholder="e.g. Nairobi" inputMode="text" />
              </label>
              {pending && <p className="mobile-filter-status" role="status">Updating listings…</p>}
            </div>
            <footer className="mobile-filter-footer">
              <button type="button" className="btn btn-ghost" onClick={clear}><RotateCcw size={15} /> Clear all</button>
              <button type="button" className="btn btn-primary" onClick={() => { navigate(local); setOpen(false); }}><Check size={15} /> View results</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
