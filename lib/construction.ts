import type { CategoryNode } from "@/lib/api/categories";
import { categorySlug } from "@/lib/categories";

export interface ConstructionSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const CONSTRUCTION_SUBCATEGORY_ARTWORK: Record<string, ConstructionSubcategoryArtwork> = {
  "building materials": { image: "/assets/construction-subcategories/materials.jpg", gradient: ["#F59E0B", "#3B82F6"] },
  "roofing materials": { image: "/assets/construction-subcategories/structure.jpg", gradient: ["#F59E0B", "#8B5CF6"] },
  "steel & metal works": { image: "/assets/construction-subcategories/structure.jpg", gradient: ["#3B82F6", "#8B5CF6"] },
  "doors, windows & gates": { image: "/assets/construction-subcategories/doors-windows.jpg", gradient: ["#F59E0B", "#22D3EE"] },
  "tiles & flooring": { image: "/assets/construction-subcategories/finishes.jpg", gradient: ["#22D3EE", "#8B5CF6"] },
  "plumbing & electrical": { image: "/assets/construction-subcategories/finishes.jpg", gradient: ["#22D3EE", "#F59E0B"] },
  "paint & hardware": { image: "/assets/construction-subcategories/finishes.jpg", gradient: ["#F59E0B", "#F472B6"] },
  "hand & power tools": { image: "/assets/construction-subcategories/tools-machinery.jpg", gradient: ["#3B82F6", "#F59E0B"] },
  "heavy machinery": { image: "/assets/construction-subcategories/tools-machinery.jpg", gradient: ["#F59E0B", "#3B82F6"] },
  "scaffolding & safety gear": { image: "/assets/construction-subcategories/structure.jpg", gradient: ["#8B5CF6", "#F59E0B"] },
};

export function constructionSubcategoryArtwork(name: string): ConstructionSubcategoryArtwork | null {
  return CONSTRUCTION_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}

export function constructionSubcategorySlug(name: string): string {
  return categorySlug(name);
}

export function findConstructionSubcategory(subcategories: CategoryNode[], rawSlug: string): CategoryNode | null {
  const slug = rawSlug.toLowerCase();
  return subcategories.find((node) => constructionSubcategorySlug(node.name) === slug) ?? null;
}
