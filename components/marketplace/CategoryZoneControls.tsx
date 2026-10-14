import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import type { CategoryFilterField, CategoryNode } from "@/lib/api/categories";
import { withQuery } from "@/lib/params";
import {
  MARKETPLACE_CONDITIONS,
  PRICE_MAX_KES,
  PRICE_MIN_KES,
  PRICE_STEP_KES,
  attributeParam,
  facetRowLabel,
  fieldLabel,
  leadingFacetField,
  numberRangeBounds,
  rangeAttribute,
  rendersAsChips,
  scalarAttribute,
  sheetFields,
  sortParam,
  type AttributeValue,
  type MarketplaceCondition,
  type MarketplaceSort,
} from "@/lib/marketplace-filters";

/**
 * The browsing controls, matching the app's category zone and subcategory
 * screens: a subcategory rail, a "shop by make / brand" facet row, a chip row
 * per option field, the condition chips, then the remaining filters (price,
 * location, free-text and range fields) in one form.
 *
 * Which filters exist and what they offer is decided by the API
 * (`GET /categories/{id}/filters`), never here - that is what keeps the web
 * marketplace and the app offering the same choices.
 */

function ChipRow({
  label,
  allLabel,
  route,
  keep,
  paramName,
  values,
  current,
}: {
  label: string;
  allLabel: string;
  route: string;
  keep: Record<string, string | undefined>;
  paramName: string;
  values: string[];
  current: string;
}) {
  return (
    <nav className="category-filter-chip-group" aria-label={label}>
      <span className="category-filter-chip-label">{label}</span>
      <div className="category-filter-chips">
        <Link
          className={`category-filter-chip${!current ? " active" : ""}`}
          href={withQuery(route, { ...keep, [paramName]: undefined })}
          aria-current={!current ? "page" : undefined}
        >
          {allLabel}
        </Link>
        {values.map((value) => (
          <Link
            key={value}
            className={`category-filter-chip${current === value ? " active" : ""}`}
            href={withQuery(route, { ...keep, [paramName]: value })}
            aria-current={current === value ? "page" : undefined}
          >
            {value}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function CategoryZoneControls({
  route,
  category,
  subcategories,
  filters,
  q,
  subcategoryId,
  condition,
  minPrice,
  maxPrice,
  location,
  sort,
  attributes,
  showSubcategories = true,
  facetOnly = false,
}: {
  route: string;
  category: CategoryNode | null;
  subcategories: CategoryNode[];
  filters: CategoryFilterField[];
  q?: string;
  subcategoryId?: string;
  condition?: MarketplaceCondition;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  sort: MarketplaceSort;
  attributes: Record<string, AttributeValue>;
  showSubcategories?: boolean;
  /** Subcategory screens: just "Shop by brand/make"; everything else lives in the filter sheet, as in the app. */
  facetOnly?: boolean;
}) {
  const keep: Record<string, string | undefined> = {
    q,
    condition,
    min_price: minPrice?.toString(),
    max_price: maxPrice?.toString(),
    location,
    sort: sortParam(sort),
    subcategory_id: subcategoryId,
  };
  // The app leads a subcategory with one facet row ("Shop by brand/make") and
  // drops that field from the rest of the list so the same filter cannot be
  // set twice (`subcategory_screen.dart:_sheetFields`).
  const facet = leadingFacetField(filters);
  const fields = sheetFields(filters, facet);
  const chipFields = fields.filter(rendersAsChips);
  const inputFields = fields.filter((field) => !rendersAsChips(field));
  const inputFieldNames = new Set(inputFields.map((field) => field.field_name));
  // Chip fields travel as links, so their current value has to ride along in
  // the form as a hidden input - otherwise applying the form would drop it.
  const hiddenAttributes = Object.entries(attributes).filter(
    ([name, value]) => typeof value === "string" && !inputFieldNames.has(name),
  );
  const activeCount = [
    subcategoryId,
    condition,
    minPrice != null || maxPrice != null ? "price" : undefined,
    location,
    ...Object.values(attributes),
  ].filter(Boolean).length;
  const clearHref = withQuery(route, { q, sort: sortParam(sort), subcategory_id: subcategoryId });
  // Every other attribute has to ride along on a chip link, or picking a brand
  // would silently drop the condition, the price and the other brands.
  const attributeQuery: Record<string, string | undefined> = {};
  for (const [name, value] of Object.entries(attributes)) {
    if (typeof value === "string") {
      attributeQuery[attributeParam(name)] = value;
      continue;
    }
    const { min, max } = rangeAttribute(value);
    if (min != null) attributeQuery[`${attributeParam(name)}_min`] = String(min);
    if (max != null) attributeQuery[`${attributeParam(name)}_max`] = String(max);
  }
  const keepWithAttributes = { ...keep, ...attributeQuery };

  if (facetOnly) {
    if (!facet) return null;
    return (
      <div className="category-zone-controls category-zone-controls--facet">
        <ChipRow
          label={`Shop by ${facet.field_name.toLowerCase()}`}
          allLabel={`All ${facetRowLabel(facet)}`}
          route={route}
          keep={keepWithAttributes}
          paramName={attributeParam(facet.field_name)}
          values={facet.options ?? []}
          current={scalarAttribute(attributes[facet.field_name])}
        />
      </div>
    );
  }
  return (
    <div className="category-zone-controls" aria-label={`${category?.name ?? "Category"} browsing controls`}>
      {showSubcategories && subcategories.length > 0 && (
        <nav className="subcategory-rail" aria-label={`${category?.name ?? "Category"} subcategories`}>
          <Link className={`subcategory-chip${!subcategoryId ? " active" : ""}`} href={withQuery(route, { ...keep })}>All</Link>
          {subcategories.map((sub) => <Link key={sub.id} className={`subcategory-chip${subcategoryId === sub.id ? " active" : ""}`} href={withQuery(route, { ...keep, subcategory_id: sub.id })}>{sub.name}</Link>)}
        </nav>
      )}

      {facet && (
        <ChipRow
          label={`Shop by ${facet.field_name.toLowerCase()}`}
          allLabel={`All ${facetRowLabel(facet)}`}
          route={route}
          keep={keepWithAttributes}
          paramName={attributeParam(facet.field_name)}
          values={facet.options ?? []}
          current={scalarAttribute(attributes[facet.field_name])}
        />
      )}

      {chipFields.map((field) => (
        <ChipRow
          key={field.field_name}
          label={fieldLabel(field.field_name)}
          allLabel="All"
          route={route}
          keep={keepWithAttributes}
          paramName={attributeParam(field.field_name)}
          values={field.options ?? []}
          current={scalarAttribute(attributes[field.field_name])}
        />
      ))}

      <nav className="category-filter-chip-group" aria-label="Filter by condition">
        <span className="category-filter-chip-label">Condition</span>
        <div className="category-filter-chips">
          <Link
            className={`category-filter-chip${!condition ? " active" : ""}`}
            href={withQuery(route, { ...keepWithAttributes, condition: undefined })}
            aria-current={!condition ? "page" : undefined}
          >
            Any
          </Link>
          {MARKETPLACE_CONDITIONS.map((option) => (
            <Link
              key={option.value}
              className={`category-filter-chip${condition === option.value ? " active" : ""}`}
              href={withQuery(route, { ...keepWithAttributes, condition: option.value })}
              aria-current={condition === option.value ? "page" : undefined}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </nav>

      <details className="category-filter-details">
        <summary><SlidersHorizontal size={16} aria-hidden="true" /> Filters{activeCount > 0 && <span>{activeCount}</span>}</summary>
        <form method="get" action={route} className="category-filter-form">
          {q && <input type="hidden" name="q" value={q} />}
          {subcategoryId && <input type="hidden" name="subcategory_id" value={subcategoryId} />}
          {sortParam(sort) && <input type="hidden" name="sort" value={sortParam(sort)} />}
          {condition && <input type="hidden" name="condition" value={condition} />}
          {hiddenAttributes.map(([name, value]) => <input key={name} type="hidden" name={attributeParam(name)} value={value as string} />)}
          {/* The app's price filter is a 0 - 5,000,000 KES range ("Price range (KES)"); both ends go on the wire as min_price / max_price. */}
          <label>Price range (KES) from
            <input name="min_price" type="number" min={PRICE_MIN_KES} max={PRICE_MAX_KES} step={PRICE_STEP_KES} placeholder={String(PRICE_MIN_KES)} defaultValue={minPrice ?? ""} />
          </label>
          <label>to
            <input name="max_price" type="number" min={PRICE_MIN_KES} max={PRICE_MAX_KES} step={PRICE_STEP_KES} placeholder={String(PRICE_MAX_KES)} defaultValue={maxPrice ?? ""} />
          </label>
          <label>Location<input name="location" placeholder="e.g. Nairobi, Kisumu" defaultValue={location ?? ""} /></label>
          {inputFields.map((field) => {
            if (field.field_type === "number_range") {
              const [min, max] = numberRangeBounds(field.field_name);
              const bounds = rangeAttribute(attributes[field.field_name]);
              const label = fieldLabel(field.field_name);
              return (
                <fieldset key={field.field_name}>
                  <legend>{label}</legend>
                  <label>{label} from
                    <input name={`${attributeParam(field.field_name)}_min`} type="number" min={min} max={max} step="any" placeholder={String(min)} defaultValue={bounds.min ?? ""} />
                  </label>
                  <label>{label} to
                    <input name={`${attributeParam(field.field_name)}_max`} type="number" min={min} max={max} step="any" placeholder={String(max)} defaultValue={bounds.max ?? ""} />
                  </label>
                </fieldset>
              );
            }
            const label = fieldLabel(field.field_name);
            return (
              <label key={field.field_name}>{label}
                <input name={attributeParam(field.field_name)} type="text" defaultValue={scalarAttribute(attributes[field.field_name])} placeholder={`Any ${label.toLowerCase()}`} />
              </label>
            );
          })}
          <button type="submit">Apply filters</button>
        </form>
      </details>

      {activeCount > 0 && <Link href={clearHref} className="category-zone-clear">Clear filters</Link>}
    </div>
  );
}
