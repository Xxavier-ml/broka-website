import type { CategoryNode } from "@/lib/api/categories";
import { categorySlug } from "@/lib/categories";

export interface HomeFurnitureSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const HOME_FURNITURE_SUBCATEGORY_ARTWORK: Record<string, HomeFurnitureSubcategoryArtwork> = {
  "living room": { image: "/assets/home-furniture-subcategories/living-room.jpg", gradient: ["#3B82F6", "#8B5CF6"] },
  bedroom: { image: "/assets/home-furniture-subcategories/bedroom.jpg", gradient: ["#8B5CF6", "#22D3EE"] },
  "beds & mattresses": { image: "/assets/home-furniture-subcategories/beds-mattresses.jpg", gradient: ["#22D3EE", "#8B5CF6"] },
  "kitchen & dining": { image: "/assets/home-furniture-subcategories/kitchen-dining.jpg", gradient: ["#F59E0B", "#F472B6"] },
  "kitchenware & cookware": { image: "/assets/home-furniture-subcategories/kitchenware-cookware.jpg", gradient: ["#64748B", "#F59E0B"] },
  appliances: { image: "/assets/home-furniture-subcategories/appliances.jpg", gradient: ["#3B82F6", "#64748B"] },
  "home décor": { image: "/assets/home-furniture-subcategories/home-decor.jpg", gradient: ["#F472B6", "#8B5CF6"] },
  "bedding & curtains": { image: "/assets/home-furniture-subcategories/bedding-curtains.jpg", gradient: ["#22D3EE", "#F472B6"] },
  lighting: { image: "/assets/home-furniture-subcategories/lighting.jpg", gradient: ["#FBBF24", "#8B5CF6"] },
  "office furniture": { image: "/assets/home-furniture-subcategories/office-furniture.jpg", gradient: ["#3B82F6", "#22D3EE"] },
  "outdoor & garden": { image: "/assets/home-furniture-subcategories/outdoor-garden.jpg", gradient: ["#10B981", "#22D3EE"] },
  "storage & organization": { image: "/assets/home-furniture-subcategories/storage-organization.jpg", gradient: ["#64748B", "#8B5CF6"] },
};

export function homeFurnitureSubcategoryArtwork(name: string): HomeFurnitureSubcategoryArtwork | null {
  return HOME_FURNITURE_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}

export function homeFurnitureSubcategorySlug(name: string): string {
  return categorySlug(name);
}

export function findHomeFurnitureSubcategory(subcategories: CategoryNode[], rawSlug: string): CategoryNode | null {
  const slug = rawSlug.toLowerCase();
  return subcategories.find((node) => homeFurnitureSubcategorySlug(node.name) === slug) ?? null;
}
