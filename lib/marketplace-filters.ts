import type { CategoryFilterField } from "@/lib/api/categories";
import { firstParam } from "@/lib/params";

// The marketplace filter model, ported from the BROKA app so this site browses
// the way the app does. Source of truth: Xxavier-ml/broka @ main
//   flutter_app/lib/features/categories/presentation/filter_bottom_sheet.dart
//   flutter_app/lib/features/categories/presentation/widgets/feed_sort_row.dart
//   flutter_app/lib/features/categories/presentation/category_zone_screen.dart
//   flutter_app/lib/features/categories/presentation/subcategory_screen.dart
//   backend/api/domains/listings/router.py, service.py
//
// Two rules matter for parity, and both are easy to regress:
//
//  1. Filter fields and their options come from `GET /categories/{id}/filters`.
//     Nothing is curated on this side: the app renders whatever the API
//     returns, and so does this site.
//  2. Only `condition`, `min_price`, `max_price`, `location`, `search`, `sort`,
//     `category_id` / `subcategory_id` and paging are their own parameters.
//     Every other filter - brand, make, year, storage, mileage - travels in ONE
//     `attributes` JSON object, exactly as `category_zone_screen.dart` builds
//     it. There is no `county`, no `listing_type` and no `status` parameter on
//     `GET /listings/`; a filter this site invents is a filter the API ignores.

/**
 * The `sort` values the API understands. Any other value - including
 * `newest` - falls into the backend's own ranking (`service.py:797`), which is
 * what the app's "Top ranked" is.
 */
export const MARKETPLACE_SORT_OPTIONS = [
  { key: "newest", label: "Top ranked" },
  { key: "recent", label: "Most Recent" },
  { key: "price_low", label: "Price: Low to High" },
  { key: "price_high", label: "Price: High to Low" },
] as const;

export type MarketplaceSort = (typeof MARKETPLACE_SORT_OPTIONS)[number]["key"];

/** The app's default (`feed_sort_row.dart`: "Top ranked" is the first entry). */
export const DEFAULT_MARKETPLACE_SORT: MarketplaceSort = "newest";

/**
 * A sort key from a URL. `featured` is what this site sent before the app's
 * model landed, so links already in the wild keep working; anything unknown
 * means the default ranking, just as an unknown value does on the API.
 */
export function parseMarketplaceSort(value?: string): MarketplaceSort {
  const normalized = value === "featured" ? "newest" : value;
  return MARKETPLACE_SORT_OPTIONS.some((option) => option.key === normalized)
    ? (normalized as MarketplaceSort)
    : DEFAULT_MARKETPLACE_SORT;
}

/** The value to put on the wire; the default ranking needs no parameter. */
export function sortParam(sort: MarketplaceSort): string | undefined {
  return sort === DEFAULT_MARKETPLACE_SORT ? undefined : sort;
}

export type MarketplaceCondition = "new" | "used" | "refurbished";

/** The app's condition chips, labels included (`filter_bottom_sheet.dart:71`). */
export const MARKETPLACE_CONDITIONS: { value: MarketplaceCondition; label: string }[] = [
  { value: "new", label: "New" },
  { value: "used", label: "Used" },
  { value: "refurbished", label: "Refurbished" },
];

/** `condition` is matched exactly and case-sensitively server-side. */
export function parseMarketplaceCondition(value?: string): MarketplaceCondition | undefined {
  return MARKETPLACE_CONDITIONS.some((condition) => condition.value === value)
    ? (value as MarketplaceCondition)
    : undefined;
}

/** The app's price slider ("Price range (KES)"): 0 to 5,000,000 in steps of 100,000. */
export const PRICE_MIN_KES = 0;
export const PRICE_MAX_KES = 5_000_000;
export const PRICE_STEP_KES = 100_000;

/** A KES price from a URL, clamped to the app's ceiling; undefined when unusable. */
export function parsePriceKes(value?: string): number | undefined {
  if (value === undefined || value.trim() === "") return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return undefined;
  return Math.min(Math.round(parsed), PRICE_MAX_KES);
}

/**
 * One attribute value. The app's chips write a string; its `number_range`
 * sliders write `{"min": x, "max": y}` (`category_zone_screen.dart:418`).
 */
export type AttributeValue = string | { min?: number; max?: number };

/** The app's `_titleCase` for a field name: first letter up, `_` to a space. */
export function fieldLabel(fieldName: string): string {
  const words = fieldName.split("_").filter(Boolean);
  if (words.length === 0) return fieldName;
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

/**
 * `number_range` slider bounds. The API sends the field's type but not its
 * range, so the app hardcodes them by field name (`filter_bottom_sheet.dart`,
 * `_numberRangeBounds`) with 0..100 for anything it does not know.
 */
const NUMBER_RANGE_BOUNDS: Record<string, [number, number]> = {
  year: [1980, new Date().getFullYear() + 1],
  mileage: [0, 500000],
  bedrooms: [0, 10],
  bathrooms: [0, 10],
  acreage: [0, 100],
  land_size_acres: [0, 50],
  screen_size: [0, 100],
  seating_capacity: [1, 30],
  square_footage: [0, 10000],
  battery_health: [0, 100],
  power_rating_watts: [0, 5000],
  size: [15, 50],
  hours_used: [0, 20000],
  size_ml: [0, 5000],
  experience_years: [0, 50],
};

export function numberRangeBounds(fieldName: string): [number, number] {
  return NUMBER_RANGE_BOUNDS[fieldName] ?? [0, 100];
}

/** `select` fields, and `text` fields that carry options, render as chips. */
export function rendersAsChips(field: CategoryFilterField): boolean {
  return field.field_type === "select" || (field.field_type === "text" && Boolean(field.options?.length));
}

function fieldWithOptions(fields: CategoryFilterField[], name: string): CategoryFilterField | null {
  return fields.find((field) => field.field_name.toLowerCase() === name && Boolean(field.options?.length)) ?? null;
}

/**
 * The facet a subcategory leads with - "Shop by make" on the app's subcategory
 * screen: `make` when it has options, else `brand`, else the first select field
 * that does (`subcategory_screen.dart:53-60`). Its value is sent inside
 * `attributes`, and the field is dropped from the rest of the list so the same
 * filter cannot be set twice.
 */
export function leadingFacetField(fields: CategoryFilterField[]): CategoryFilterField | null {
  return fieldWithOptions(fields, "make")
    ?? fieldWithOptions(fields, "brand")
    ?? fields.find((field) => field.field_type === "select" && Boolean(field.options?.length))
    ?? null;
}

/** "Makes" / "Brands" / the field's own label, as the app's facet row shows it. */
export function facetRowLabel(field: CategoryFilterField): string {
  const name = field.field_name.toLowerCase();
  if (name === "make") return "Makes";
  if (name === "brand") return "Brands";
  return `${fieldLabel(field.field_name)}s`;
}

/** The remaining fields, in API order, without the facet row's field. */
export function sheetFields(fields: CategoryFilterField[], facet: CategoryFilterField | null): CategoryFilterField[] {
  return fields.filter((field) => field.field_name !== facet?.field_name);
}

/** The URL parameter one attribute is carried in. */
export function attributeParam(fieldName: string): string {
  return `attribute_${fieldName}`;
}

/** A scalar attribute's current value, when it has one. */
export function scalarAttribute(value: AttributeValue | undefined): string {
  return typeof value === "string" ? value : "";
}

/** A range attribute's current bounds, when it has any. */
export function rangeAttribute(value: AttributeValue | undefined): { min?: number; max?: number } {
  return typeof value === "object" && value !== null ? value : {};
}

/**
 * The app's `attributes` object, built from `attribute_*` query parameters.
 *
 * A `number_range` field is carried as `attribute_<field>_min` and
 * `attribute_<field>_max` so both bounds can be typed in one GET form; the two
 * are combined into `{"min", "max"}` here, which is the shape the API matches
 * numerically.
 */
export function attributesFromParams(
  params: Record<string, string | string[] | undefined>,
  fields: CategoryFilterField[],
): Record<string, AttributeValue> {
  const byName = new Map(fields.map((field) => [field.field_name, field]));
  const out: Record<string, AttributeValue> = {};
  for (const [key, value] of Object.entries(params)) {
    if (!key.startsWith("attribute_")) continue;
    const name = key.slice("attribute_".length);
    const selected = firstParam(value);
    if (!name || !selected) continue;
    const bound = /^(.*)_(min|max)$/.exec(name);
    if (bound) {
      const [base, which] = [bound[1], bound[2]];
      const field = base ? byName.get(base) : undefined;
      if (base && (which === "min" || which === "max") && field?.field_type === "number_range") {
        const numeric = Number(selected);
        if (!Number.isFinite(numeric)) continue;
        const current = out[base];
        const range: { min?: number; max?: number } = typeof current === "object" && current !== null ? { ...current } : {};
        range[which] = numeric;
        out[base] = range;
        continue;
      }
    }
    const field = byName.get(name);
    if (field?.field_type === "number_range") {
      const numeric = Number(selected);
      if (Number.isFinite(numeric)) out[name] = { min: numeric, max: numeric };
      continue;
    }
    out[name] = selected;
  }
  return out;
}
