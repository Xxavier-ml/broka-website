import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import type { CategoryFilterField, CategoryNode } from "@/lib/api/categories";
import { withQuery } from "@/lib/params";

function labelFor(value: string) {
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
  const keep = { q, condition, min_price: minPrice?.toString(), max_price: maxPrice?.toString(), county, sort: sort === "featured" ? undefined : sort };
  const activeCount = [subcategoryId, condition, minPrice != null || maxPrice != null ? "price" : undefined, county, ...Object.values(attributes)].filter(Boolean).length;
  const clearHref = withQuery(route, { q, sort: sort === "featured" ? undefined : sort });
  return (
    <div className="category-zone-controls" aria-label={`${category?.name ?? "Category"} browsing controls`}>
      {showSubcategories && subcategories.length > 0 && (
        <nav className="subcategory-rail" aria-label={`${category?.name ?? "Category"} subcategories`}>
          <Link className={`subcategory-chip${!subcategoryId ? " active" : ""}`} href={withQuery(route, { ...keep })}>All</Link>
          {subcategories.map((sub) => <Link key={sub.id} className={`subcategory-chip${subcategoryId === sub.id ? " active" : ""}`} href={withQuery(route, { ...keep, subcategory_id: sub.id })}>{sub.name}</Link>)}
        </nav>
      )}
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
          {filters.map((field) => {
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
