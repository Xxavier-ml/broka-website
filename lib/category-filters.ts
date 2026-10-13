import type { CategoryFilterField } from "./api/categories";

/**
 * Filter fields, straight from the API.
 *
 * The app renders whatever `GET /categories/{id}/filters` returns, with no
 * curation at all (`filter_bottom_sheet.dart`, `_buildFieldInput`). This module
 * used to swap in its own brand/make lists per subcategory, which let a visitor
 * pick a value the app never offers and, in several cases, one no listing could
 * match - a filter that looked broken rather than absent. Those lists are gone
 * on purpose: the API's options are the marketplace's options, for the app and
 * for the web alike.
 *
 * Both functions are kept because the category pages already call them.
 */
export function filtersForSubcategory(_category: string, _slug: string, filters: CategoryFilterField[]): CategoryFilterField[] {
  return filters;
}

export function filtersForCategory(_category: string, filters: CategoryFilterField[]): CategoryFilterField[] {
  return filters;
}
