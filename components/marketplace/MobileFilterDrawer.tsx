"use client";

import { useEffect, useState, useTransition } from "react";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import type { CategoryFilterField } from "@/lib/api/categories";
import {
  DEFAULT_MARKETPLACE_SORT,
  MARKETPLACE_CONDITIONS,
  MARKETPLACE_SORT_OPTIONS,
  PRICE_MAX_KES,
  PRICE_MIN_KES,
  PRICE_STEP_KES,
  attributeParam,
  fieldLabel,
  numberRangeBounds,
  rangeAttribute,
  rendersAsChips,
  scalarAttribute,
  sortParam,
  type AttributeValue,
  type MarketplaceSort,
} from "@/lib/marketplace-filters";

/**
 * Filters and sort in one sheet, on the same four controls the app's filter
 * sheet offers: price range (KES), condition, location and sort. Everything
 * else a category supports comes from the category page's own filter list.
 *
 * The values it writes are the API's parameters exactly as the app writes
 * them (`sort`, `condition`, `min_price`, `max_price`, `location`) - notably
 * `location`, not the `county` this sheet used to send, which the API has no
 * parameter for.
 */

type FilterState = { condition: string; minPrice: string; maxPrice: string; location: string; sort: MarketplaceSort };

export type MobileFilterDrawerProps = {
  action?: string;
  q?: string;
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  sort: MarketplaceSort;
  iconOnly?: boolean;
  deferApply?: boolean;
  /**
   * The category's own filter fields (storage, RAM, mileage...), shown in the
   * sheet as the app's filter sheet shows them, and the attributes currently
   * applied. Every applied attribute rides along on apply, so changing the
   * price can no longer silently drop the brand.
   */
  fields?: CategoryFilterField[];
  attributes?: Record<string, AttributeValue>;
  subcategoryId?: string;
};

function priceField(value?: number): string {
  return value != null ? String(value) : "";
}

function priceParam(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return undefined;
  return Math.min(Math.round(parsed), PRICE_MAX_KES);
}

export function MobileFilterDrawer({
  action,
  q,
  category,
  condition,
  minPrice,
  maxPrice,
  location,
  sort,
  iconOnly = false,
  deferApply = false,
  fields = [],
  attributes = {},
  subcategoryId,
}: MobileFilterDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const initial: FilterState = {
    condition: condition ?? "",
    minPrice: priceField(minPrice),
    maxPrice: priceField(maxPrice),
    location: location ?? "",
    sort: sort || DEFAULT_MARKETPLACE_SORT,
  };
  const [local, setLocal] = useState<FilterState>(initial);
  const [attrs, setAttrs] = useState<Record<string, AttributeValue>>(attributes);
  const attrKey = JSON.stringify(attributes);
  const fieldNames = new Set(fields.map((field) => field.field_name));
  const appliedFieldCount = Object.entries(attributes).filter(([name, value]) => fieldNames.has(name) && (typeof value === "string" ? value : value.min != null || value.max != null)).length;
  const activeCount = (deferApply
    ? [local.condition, local.minPrice || local.maxPrice, local.location, sortParam(local.sort)].filter(Boolean).length
    : [condition, minPrice != null || maxPrice != null, location, sortParam(sort)].filter(Boolean).length) + appliedFieldCount;

  useEffect(() => {
    setLocal({
      condition: condition ?? "",
      minPrice: priceField(minPrice),
      maxPrice: priceField(maxPrice),
      location: location ?? "",
      sort: sort || DEFAULT_MARKETPLACE_SORT,
    });
    setAttrs(JSON.parse(attrKey) as Record<string, AttributeValue>);
  }, [condition, minPrice, maxPrice, location, sort, attrKey]);

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

  const navigate = (next: FilterState, nextAttrs: Record<string, AttributeValue> = attrs) => {
    const target = action ?? pathname;
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category && pathname === "/browse") params.set("category", category);
    if (next.condition) params.set("condition", next.condition);
    // Both ends are the price filter; the app's slider bounds them at 5,000,000 KES.
    const min = priceParam(next.minPrice);
    const max = priceParam(next.maxPrice);
    if (min != null) params.set("min_price", String(min));
    if (max != null) params.set("max_price", String(max));
    if (next.location.trim()) params.set("location", next.location.trim());
    const sortValue = sortParam(next.sort);
    if (sortValue) params.set("sort", sortValue);
    if (subcategoryId) params.set("subcategory_id", subcategoryId);
    for (const [name, value] of Object.entries(nextAttrs)) {
      if (typeof value === "string") {
        if (value) params.set(attributeParam(name), value);
        continue;
      }
      if (value.min != null) params.set(`${attributeParam(name)}_min`, String(value.min));
      if (value.max != null) params.set(`${attributeParam(name)}_max`, String(value.max));
    }
    startTransition(() => router.replace(`${target}${params.toString() ? `?${params}` : ""}`, { scroll: false }));
  };

  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const next = { ...local, [key]: value };
    setLocal(next);
    if (!deferApply) navigate(next);
  };

  const setAttr = (name: string, value: AttributeValue | undefined) => {
    const next = { ...attrs };
    if (value === undefined || value === "") delete next[name];
    else next[name] = value;
    setAttrs(next);
  };
  const clear = () => {
    const next: FilterState = { condition: "", minPrice: "", maxPrice: "", location: "", sort: DEFAULT_MARKETPLACE_SORT };
    // Fields outside the sheet (the brand row) are not the sheet's to clear.
    const kept = Object.fromEntries(Object.entries(attrs).filter(([name]) => !fieldNames.has(name)));
    setLocal(next);
    setAttrs(kept);
    if (!deferApply) navigate(next, kept);
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
      {open && createPortal(
        <div className="mobile-filter-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="mobile-filter-drawer" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title">
            <header className="mobile-filter-header">
              <div><span className="t-eyebrow">Refine results</span><h2 id="mobile-filter-title">Filters & sort</h2></div>
              <button type="button" className="mobile-filter-close" onClick={() => setOpen(false)} aria-label="Close filters"><X size={19} /></button>
            </header>
            <div className="mobile-filter-body">
              <label className="mobile-filter-field">Sort by
                <select value={local.sort} onChange={(event) => update("sort", event.target.value as MarketplaceSort)}>
                  {MARKETPLACE_SORT_OPTIONS.map((option) => <option key={option.key} value={option.key}>{option.label}</option>)}
                </select>
              </label>
              <fieldset className="mobile-filter-field">
                <legend>Condition</legend>
                <div className="mobile-filter-chips">
                  {MARKETPLACE_CONDITIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`mobile-filter-chip${local.condition === option.value ? " active" : ""}`}
                      aria-pressed={local.condition === option.value}
                      onClick={() => update("condition", local.condition === option.value ? "" : option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="mobile-filter-field">
                <legend>Price range (KES)</legend>
                <div className="mobile-filter-price">
                  <label>From
                    <input value={local.minPrice} onChange={(event) => update("minPrice", event.target.value)} placeholder={String(PRICE_MIN_KES)} inputMode="numeric" type="number" min={PRICE_MIN_KES} max={PRICE_MAX_KES} step={PRICE_STEP_KES} />
                  </label>
                  <label>To
                    <input value={local.maxPrice} onChange={(event) => update("maxPrice", event.target.value)} placeholder={String(PRICE_MAX_KES)} inputMode="numeric" type="number" min={PRICE_MIN_KES} max={PRICE_MAX_KES} step={PRICE_STEP_KES} />
                  </label>
                </div>
              </fieldset>
              <label className="mobile-filter-field">Location <span className="mobile-filter-optional">optional</span>
                <input value={local.location} onChange={(event) => setLocal((current) => ({ ...current, location: event.target.value }))} placeholder="e.g. Nairobi, Kisumu" inputMode="text" />
              </label>
              {fields.map((field) => {
                const label = fieldLabel(field.field_name);
                if (rendersAsChips(field)) {
                  const current = scalarAttribute(attrs[field.field_name]);
                  return (
                    <fieldset key={field.field_name} className="mobile-filter-field">
                      <legend>{label}</legend>
                      <div className="mobile-filter-chips">
                        {(field.options ?? []).map((option) => (
                          <button key={option} type="button" className={`mobile-filter-chip${current === option ? " active" : ""}`} aria-pressed={current === option} onClick={() => setAttr(field.field_name, current === option ? undefined : option)}>{option}</button>
                        ))}
                      </div>
                    </fieldset>
                  );
                }
                if (field.field_type === "number_range") {
                  const [lo, hi] = numberRangeBounds(field.field_name);
                  const range = rangeAttribute(attrs[field.field_name]);
                  const setBound = (which: "min" | "max", raw: string) => {
                    const merged = { ...range, [which]: raw.trim() === "" ? undefined : Number(raw) };
                    setAttr(field.field_name, merged.min == null && merged.max == null ? undefined : merged);
                  };
                  return (
                    <fieldset key={field.field_name} className="mobile-filter-field">
                      <legend>{label}</legend>
                      <div className="mobile-filter-price">
                        <label>From<input type="number" inputMode="numeric" min={lo} max={hi} step="any" placeholder={String(lo)} value={range.min ?? ""} onChange={(event) => setBound("min", event.target.value)} /></label>
                        <label>To<input type="number" inputMode="numeric" min={lo} max={hi} step="any" placeholder={String(hi)} value={range.max ?? ""} onChange={(event) => setBound("max", event.target.value)} /></label>
                      </div>
                    </fieldset>
                  );
                }
                return (
                  <label key={field.field_name} className="mobile-filter-field">{label}
                    <input value={scalarAttribute(attrs[field.field_name])} onChange={(event) => setAttr(field.field_name, event.target.value)} placeholder={`Any ${label.toLowerCase()}`} />
                  </label>
                );
              })}
              {pending && <p className="mobile-filter-status" role="status">Updating listings…</p>}
            </div>
            <footer className="mobile-filter-footer">
              <button type="button" className="btn btn-ghost" onClick={clear}><RotateCcw size={15} /> Clear all</button>
              <button type="button" className="btn btn-primary" onClick={() => { navigate(local); setOpen(false); }}><Check size={15} /> View results</button>
            </footer>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}
