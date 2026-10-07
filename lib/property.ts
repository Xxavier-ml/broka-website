import type { CategoryNode } from "@/lib/api/categories";
import { categorySlug } from "@/lib/categories";

export interface PropertySubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const PROPERTY_SUBCATEGORY_ARTWORK: Record<string, PropertySubcategoryArtwork> = {
  houses: { image: "/assets/property-subcategories/houses.jpg", gradient: ["#3B82F6", "#10B981"] },
  apartments: { image: "/assets/property-subcategories/apartments.jpg", gradient: ["#22D3EE", "#3B82F6"] },
  rentals: { image: "/assets/property-subcategories/rentals.jpg", gradient: ["#F59E0B", "#8B5CF6"] },
  "short stays & airbnb": { image: "/assets/property-subcategories/short-stays-airbnb.jpg", gradient: ["#F472B6", "#8B5CF6"] },
  "commercial property": { image: "/assets/property-subcategories/commercial-property.jpg", gradient: ["#3B82F6", "#F59E0B"] },
  offices: { image: "/assets/property-subcategories/offices.jpg", gradient: ["#22D3EE", "#3B82F6"] },
  shops: { image: "/assets/property-subcategories/shops.jpg", gradient: ["#FF6B4A", "#F59E0B"] },
  "warehouses & godowns": { image: "/assets/property-subcategories/warehouses-godowns.jpg", gradient: ["#64748B", "#3B82F6"] },
  farms: { image: "/assets/property-subcategories/farms.jpg", gradient: ["#10B981", "#FBBF24"] },
};

export function propertySubcategoryArtwork(name: string): PropertySubcategoryArtwork | null {
  return PROPERTY_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}

export function propertySubcategorySlug(name: string): string {
  return categorySlug(name);
}

export function findPropertySubcategory(subcategories: CategoryNode[], rawSlug: string): CategoryNode | null {
  const slug = rawSlug.toLowerCase();
  return subcategories.find((node) => propertySubcategorySlug(node.name) === slug) ?? null;
}
