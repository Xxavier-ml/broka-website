import type { CategoryNode } from "@/lib/api/categories";
import { categorySlug } from "@/lib/categories";

export interface FashionSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const FASHION_SUBCATEGORY_ARTWORK: Record<string, FashionSubcategoryArtwork> = {
  "mtumba (second-hand clothes)": { image: "/assets/fashion-subcategories/mtumba-second-hand-clothes.jpg", gradient: ["#8B5CF6", "#F472B6"] },
  "men's clothing": { image: "/assets/fashion-subcategories/mens-clothing.jpg", gradient: ["#3B82F6", "#8B5CF6"] },
  "women's clothing": { image: "/assets/fashion-subcategories/womens-clothing.jpg", gradient: ["#F472B6", "#8B5CF6"] },
  "kids' clothing": { image: "/assets/fashion-subcategories/kids-clothing.jpg", gradient: ["#22D3EE", "#F472B6"] },
  shoes: { image: "/assets/fashion-subcategories/shoes.jpg", gradient: ["#8B5CF6", "#3B82F6"] },
  "bags & accessories": { image: "/assets/fashion-subcategories/bags-accessories.jpg", gradient: ["#F59E0B", "#F472B6"] },
  "jewelry & watches": { image: "/assets/fashion-subcategories/jewelry-watches.jpg", gradient: ["#FBBF24", "#F472B6"] },
  "traditional wear": { image: "/assets/fashion-subcategories/traditional-wear.jpg", gradient: ["#F59E0B", "#8B5CF6"] },
  "wedding wear": { image: "/assets/fashion-subcategories/wedding-wear.jpg", gradient: ["#F472B6", "#22D3EE"] },
  "uniforms & workwear": { image: "/assets/fashion-subcategories/uniforms-workwear.jpg", gradient: ["#3B82F6", "#F59E0B"] },
  "fabrics & textiles": { image: "/assets/fashion-subcategories/fabrics-textiles.jpg", gradient: ["#22D3EE", "#8B5CF6"] },
};

export function fashionSubcategoryArtwork(name: string): FashionSubcategoryArtwork | null {
  return FASHION_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}

export function fashionSubcategorySlug(name: string): string {
  return categorySlug(name);
}

export function findFashionSubcategory(subcategories: CategoryNode[], rawSlug: string): CategoryNode | null {
  const slug = rawSlug.toLowerCase();
  return subcategories.find((node) => fashionSubcategorySlug(node.name) === slug) ?? null;
}
