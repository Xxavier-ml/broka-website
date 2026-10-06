import type { CategoryNode } from "@/lib/api/categories";
import { categorySlug } from "@/lib/categories";

export interface AutomobileSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const AUTOMOBILE_SUBCATEGORY_ARTWORK: Record<string, AutomobileSubcategoryArtwork> = {
  cars: { image: "/assets/automobile-subcategories/cars.jpg", gradient: ["#FF6B4A", "#8B5CF6"] },
  "motorcycles & boda bodas": { image: "/assets/automobile-subcategories/motorcycles-boda-bodas.jpg", gradient: ["#22D3EE", "#8B5CF6"] },
  pickups: { image: "/assets/automobile-subcategories/pickups.jpg", gradient: ["#FF6B4A", "#F59E0B"] },
  "buses & matatus": { image: "/assets/automobile-subcategories/buses-matatus.jpg", gradient: ["#22D3EE", "#3B82F6"] },
  trucks: { image: "/assets/automobile-subcategories/trucks.jpg", gradient: ["#3B82F6", "#8B5CF6"] },
  vans: { image: "/assets/automobile-subcategories/vans.jpg", gradient: ["#22D3EE", "#3B82F6"] },
  "tuk-tuks & three-wheelers": { image: "/assets/automobile-subcategories/tuk-tuks-three-wheelers.jpg", gradient: ["#10B981", "#FBBF24"] },
  "agricultural vehicles": { image: "/assets/automobile-subcategories/agricultural-vehicles.jpg", gradient: ["#10B981", "#FBBF24"] },
  trailers: { image: "/assets/automobile-subcategories/trailers.jpg", gradient: ["#8B5CF6", "#3B82F6"] },
  "boats & watercraft": { image: "/assets/automobile-subcategories/boats-watercraft.jpg", gradient: ["#22D3EE", "#8B5CF6"] },
  "parts & accessories": { image: "/assets/automobile-subcategories/parts-accessories.jpg", gradient: ["#FF6B4A", "#8B5CF6"] },
  "tyres & rims": { image: "/assets/automobile-subcategories/tyres-rims.jpg", gradient: ["#8B5CF6", "#3B82F6"] },
};

export function automobileSubcategoryArtwork(name: string): AutomobileSubcategoryArtwork | null {
  return AUTOMOBILE_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}

export function automobileSubcategorySlug(name: string): string {
  return categorySlug(name);
}

export function findAutomobileSubcategory(subcategories: CategoryNode[], rawSlug: string): CategoryNode | null {
  const slug = rawSlug.toLowerCase();
  return subcategories.find((node) => automobileSubcategorySlug(node.name) === slug) ?? null;
}
