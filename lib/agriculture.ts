import type { CategoryNode } from "@/lib/api/categories";
import { categorySlug } from "@/lib/categories";

export interface AgricultureSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const AGRICULTURE_SUBCATEGORY_ARTWORK: Record<string, AgricultureSubcategoryArtwork> = {
  "cereals & grains": { image: "/assets/agriculture-subcategories/produce.jpg", gradient: ["#10B981", "#FBBF24"] },
  "fruits & vegetables": { image: "/assets/agriculture-subcategories/produce.jpg", gradient: ["#10B981", "#F59E0B"] },
  "crops & produce": { image: "/assets/agriculture-subcategories/produce.jpg", gradient: ["#10B981", "#FBBF24"] },
  livestock: { image: "/assets/agriculture-subcategories/livestock.jpg", gradient: ["#10B981", "#3B82F6"] },
  poultry: { image: "/assets/agriculture-subcategories/poultry.jpg", gradient: ["#F59E0B", "#10B981"] },
  "dairy & eggs": { image: "/assets/agriculture-subcategories/livestock.jpg", gradient: ["#FBBF24", "#10B981"] },
  seeds: { image: "/assets/agriculture-subcategories/seeds.jpg", gradient: ["#10B981", "#8B5CF6"] },
  "seedlings & nursery": { image: "/assets/agriculture-subcategories/seeds.jpg", gradient: ["#10B981", "#22D3EE"] },
  "animal feed": { image: "/assets/agriculture-subcategories/livestock.jpg", gradient: ["#F59E0B", "#10B981"] },
  "fertilizers & agrochemicals": { image: "/assets/agriculture-subcategories/seeds.jpg", gradient: ["#8B5CF6", "#10B981"] },
  "farm equipment": { image: "/assets/agriculture-subcategories/equipment.jpg", gradient: ["#F59E0B", "#10B981"] },
  "farm tools": { image: "/assets/agriculture-subcategories/equipment.jpg", gradient: ["#3B82F6", "#10B981"] },
  "irrigation & water tanks": { image: "/assets/agriculture-subcategories/equipment.jpg", gradient: ["#22D3EE", "#3B82F6"] },
  "beekeeping & honey": { image: "/assets/agriculture-subcategories/produce.jpg", gradient: ["#FBBF24", "#F59E0B"] },
  "agricultural supplies": { image: "/assets/agriculture-subcategories/equipment.jpg", gradient: ["#10B981", "#8B5CF6"] },
};

export function agricultureSubcategoryArtwork(name: string): AgricultureSubcategoryArtwork | null {
  return AGRICULTURE_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}

export function agricultureSubcategorySlug(name: string): string {
  return categorySlug(name);
}

export function findAgricultureSubcategory(subcategories: CategoryNode[], rawSlug: string): CategoryNode | null {
  const slug = rawSlug.toLowerCase();
  return subcategories.find((node) => agricultureSubcategorySlug(node.name) === slug) ?? null;
}
