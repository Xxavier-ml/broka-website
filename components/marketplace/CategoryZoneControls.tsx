import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import type { CategoryFilterField, CategoryNode } from "@/lib/api/categories";
import { withQuery } from "@/lib/params";

function labelFor(value: string) {
  const labels: Record<string, string> = {
    ram: "RAM",
    smart_tv: "Smart TV",
    compatible_with: "Compatible with",
    screen_size: "Screen size",
    engine_size: "Engine size",
    seating_capacity: "Seating capacity",
    payload_capacity: "Payload capacity",
    storage_capacity: "Storage capacity",
    storage_type: "Storage type",
    battery_health: "Battery health",
    length_ft: "Length (ft)",
  };
  if (labels[value]) return labels[value];
  return value.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
  county,
  sort,
  attributes,
  showSubcategories = true,
}: {
  route: string;
  category: CategoryNode | null;
  subcategories: CategoryNode[];
  filters: CategoryFilterField[];
  q?: string;
  subcategoryId?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  county?: string;
  sort: string;
  attributes: Record<string, string>;
  showSubcategories?: boolean;
}) {
  const keep = { q, condition, min_price: minPrice?.toString(), max_price: maxPrice?.toString(), county, sort: sort === "featured" ? undefined : sort, subcategory_id: subcategoryId };
  const attributeQuery = Object.fromEntries(Object.entries(attributes).map(([field, value]) => [`attribute_${field}`, value]));
  const optionFilters = filters.filter((field) => field.options?.length);
  const activeCount = [subcategoryId, condition, minPrice != null || maxPrice != null ? "price" : undefined, county, ...Object.values(attributes)].filter(Boolean).length;
  const clearHref = withQuery(route, { q, sort: sort === "featured" ? undefined : sort, subcategory_id: subcategoryId });
  return (
    <div className="category-zone-controls" aria-label={`${category?.name ?? "Category"} browsing controls`}>
      {showSubcategories && subcategories.length > 0 && (
        <nav className="subcategory-rail" aria-label={`${category?.name ?? "Category"} subcategories`}>
          <Link className={`subcategory-chip${!subcategoryId ? " active" : ""}`} href={withQuery(route, { ...keep })}>All</Link>
          {subcategories.map((sub) => <Link key={sub.id} className={`subcategory-chip${subcategoryId === sub.id ? " active" : ""}`} href={withQuery(route, { ...keep, subcategory_id: sub.id })}>{sub.name}</Link>)}
        </nav>
      )}
      {optionFilters.map((field) => {
        const fieldLabel = labelFor(field.field_name);
        const currentValue = attributes[field.field_name];
        return (
          <nav key={field.field_name} className="category-filter-chip-group" aria-label={`Filter by ${fieldLabel}`}>
            <span className="category-filter-chip-label">{fieldLabel}</span>
            <div className="category-filter-chips">
              <Link
                className={`category-filter-chip${!currentValue ? " active" : ""}`}
                href={withQuery(route, { ...keep, ...attributeQuery, [`attribute_${field.field_name}`]: undefined })}
                aria-current={!currentValue ? "page" : undefined}
              >
                All
              </Link>
              {field.options?.map((option) => (
                <Link
                  key={option}
                  className={`category-filter-chip${currentValue === option ? " active" : ""}`}
                  href={withQuery(route, { ...keep, ...attributeQuery, [`attribute_${field.field_name}`]: option })}
                  aria-current={currentValue === option ? "page" : undefined}
                >
                  {option}
                </Link>
              ))}
            </div>
          </nav>
        );
      })}
      <details className="category-filter-details">
        <summary><SlidersHorizontal size={16} aria-hidden="true" /> Filters{activeCount > 0 && <span>{activeCount}</span>}</summary>
        <form method="get" action={route} className="category-filter-form">
          {q && <input type="hidden" name="q" value={q} />}
          {subcategoryId && <input type="hidden" name="subcategory_id" value={subcategoryId} />}
          {sort !== "featured" && <input type="hidden" name="sort" value={sort} />}
          <label>Condition<select name="condition" defaultValue={condition ?? ""}><option value="">Any condition</option><option value="new">New</option><option value="used">Used</option><option value="refurbished">Refurbished</option></select></label>
          <label>Minimum price<input name="min_price" type="number" min="0" placeholder="Any" defaultValue={minPrice ?? ""} /></label>
          <label>Maximum price<input name="max_price" type="number" min="0" placeholder="Any" defaultValue={maxPrice ?? ""} /></label>
          <label>County<input name="county" placeholder="e.g. Nairobi" defaultValue={county ?? ""} /></label>
          {filters.filter((field) => !field.options?.length).map((field) => {
            const name = `attribute_${field.field_name}`;
            const label = labelFor(field.field_name);
            if (field.options?.length) {
              return <label key={field.field_name}>{label}<select name={name} defaultValue={attributes[field.field_name] ?? ""}><option value="">Any</option>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
            }
            return <label key={field.field_name}>{label}<input name={name} type={field.field_type === "number_range" ? "number" : "text"} inputMode={field.field_type === "number_range" ? "numeric" : undefined} min={field.field_type === "number_range" ? 0 : undefined} step={field.field_type === "number_range" ? "any" : undefined} defaultValue={attributes[field.field_name] ?? ""} placeholder={`Any ${label.toLowerCase()}`} /></label>;
          })}
          <button type="submit">Apply filters</button>
        </form>
      </details>
      {activeCount > 0 && <Link href={clearHref} className="category-zone-clear">Clear filters</Link>}
    </div>
  );
}
