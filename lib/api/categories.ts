import { apiGet } from "./client";

export interface CategoryNode {
  id: string;
  name: string;
  icon: string | null;
  parent_id: string | null;
  subcategories: CategoryNode[];
}

export interface CategoryFilterField {
  field_name: string;
  field_type: string;
  options: string[] | null;
}

export async function getCategoryFilters(categoryId: string): Promise<CategoryFilterField[]> {
  return (await apiGet<CategoryFilterField[]>(`/categories/${encodeURIComponent(categoryId)}/filters`, { revalidate: 300 })) ?? [];
}

export async function getCategoryTree(): Promise<CategoryNode[]> {
  return (await apiGet<CategoryNode[]>("/categories/tree", { revalidate: 300 })) ?? [];
}

export async function getCategoryZone(name: string): Promise<{ category: CategoryNode | null; subcategories: CategoryNode[]; filters: CategoryFilterField[] }> {
  const tree = await getCategoryTree();
  const category = tree.find((node) => node.name.toLowerCase() === name.toLowerCase()) ?? null;
  if (!category) return { category: null, subcategories: [], filters: [] };
  const filters = await getCategoryFilters(category.id);
  return { category, subcategories: category.subcategories, filters };
}
