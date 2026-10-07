import type { CategoryNode } from "@/lib/api/categories";
import { categorySlug } from "@/lib/categories";

export interface FoodBeveragesSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const FOOD_BEVERAGES_SUBCATEGORY_ARTWORK: Record<string, FoodBeveragesSubcategoryArtwork> = {
  "packaged foods & groceries": { image: "/assets/food-beverages-subcategories/packaged-foods-groceries.jpg", gradient: ["#F59E0B", "#F472B6"] },
  beverages: { image: "/assets/food-beverages-subcategories/beverages.jpg", gradient: ["#22D3EE", "#3B82F6"] },
  "bakery & snacks": { image: "/assets/food-beverages-subcategories/bakery-snacks.jpg", gradient: ["#F59E0B", "#F472B6"] },
  "meat & fish": { image: "/assets/food-beverages-subcategories/meat-fish.jpg", gradient: ["#F472B6", "#8B5CF6"] },
  "spices, oils & condiments": { image: "/assets/food-beverages-subcategories/spices-oils-condiments.jpg", gradient: ["#F59E0B", "#10B981"] },
  "ready meals & catering": { image: "/assets/food-beverages-subcategories/ready-meals-catering.jpg", gradient: ["#F472B6", "#F59E0B"] },
};

export function foodBeveragesSubcategoryArtwork(name: string): FoodBeveragesSubcategoryArtwork | null {
  return FOOD_BEVERAGES_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}

export function foodBeveragesSubcategorySlug(name: string): string {
  return categorySlug(name);
}

export function findFoodBeveragesSubcategory(subcategories: CategoryNode[], rawSlug: string): CategoryNode | null {
  const slug = rawSlug.toLowerCase();
  return subcategories.find((node) => foodBeveragesSubcategorySlug(node.name) === slug) ?? null;
}
