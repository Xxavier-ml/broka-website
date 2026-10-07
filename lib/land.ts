import type { CategoryNode } from "@/lib/api/categories";
import { categorySlug } from "@/lib/categories";

export interface LandSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const LAND_SUBCATEGORY_ARTWORK: Record<string, LandSubcategoryArtwork> = {
  "residential plots": { image: "/assets/land-subcategories/residential-plots.jpg", gradient: ["#F59E0B", "#10B981"] },
  "agricultural land": { image: "/assets/land-subcategories/agricultural-land.jpg", gradient: ["#10B981", "#FBBF24"] },
  "commercial land": { image: "/assets/land-subcategories/commercial-land.jpg", gradient: ["#3B82F6", "#F59E0B"] },
  "industrial land": { image: "/assets/land-subcategories/industrial-land.jpg", gradient: ["#64748B", "#3B82F6"] },
  "beach & waterfront land": { image: "/assets/land-subcategories/beach-waterfront-land.jpg", gradient: ["#22D3EE", "#3B82F6"] },
  "ranches & large tracts": { image: "/assets/land-subcategories/ranches-large-tracts.jpg", gradient: ["#10B981", "#F59E0B"] },
  "land for lease": { image: "/assets/land-subcategories/land-for-lease.jpg", gradient: ["#8B5CF6", "#10B981"] },
};

export function landSubcategoryArtwork(name: string): LandSubcategoryArtwork | null {
  return LAND_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}

export function landSubcategorySlug(name: string): string {
  return categorySlug(name);
}

export function findLandSubcategory(subcategories: CategoryNode[], rawSlug: string): CategoryNode | null {
  const slug = rawSlug.toLowerCase();
  return subcategories.find((node) => landSubcategorySlug(node.name) === slug) ?? null;
}
