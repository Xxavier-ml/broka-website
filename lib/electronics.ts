import type { CategoryNode } from "@/lib/api/categories";
import type { CategoryFilterField } from "@/lib/api/categories";

export interface ElectronicsSubcategoryConfig {
  slug: string;
  name: string;
  aliases: string[];
  description: string;
  image: string;
  gradient: [string, string];
}

export const ELECTRONICS_SUBCATEGORIES: ElectronicsSubcategoryConfig[] = [
  { slug: "phones", name: "Phones", aliases: ["phones", "mobile phones", "smartphones", "mobile devices"], description: "Smartphones, feature phones, and mobile devices.", image: "/assets/electronics-subcategories/phones.jpg", gradient: ["#7c5cff", "#22c9f0"] },
  { slug: "laptops-tablets", name: "Laptops & Computers", aliases: ["laptops & tablets", "laptops and tablets", "laptops & computers", "computers & laptops", "computers"], description: "Laptops, monitors, and computing essentials.", image: "/assets/electronics-subcategories/laptops-tablets.jpg", gradient: ["#3b82f6", "#22d3ee"] },
  { slug: "tablets", name: "Tablets", aliases: ["tablets", "tablet computers"], description: "Portable tablets for work, study, and entertainment.", image: "/assets/electronics-subcategories/laptops-tablets.jpg", gradient: ["#22d3ee", "#8b5cf6"] },
  { slug: "tv-audio", name: "TVs & Home Audio", aliases: ["tvs & home audio", "tv & audio", "tvs", "televisions", "audio"], description: "Televisions, speakers, soundbars, and home cinema gear.", image: "/assets/electronics-subcategories/tv-audio.jpg", gradient: ["#6366f1", "#ec4899"] },
  { slug: "cameras", name: "Cameras & Photography", aliases: ["cameras & photography", "cameras", "photography"], description: "Cameras, lenses, tripods, and photography accessories.", image: "/assets/electronics-subcategories/cameras.jpg", gradient: ["#f59e0b", "#f472b6"] },
  { slug: "accessories", name: "Accessories & Cables", aliases: ["accessories & cables", "phone accessories", "electronics accessories", "accessories"], description: "Cases, cables, earbuds, chargers, and everyday add-ons.", image: "/assets/electronics-subcategories/accessories.jpg", gradient: ["#10b981", "#22d3ee"] },
  { slug: "power-charging", name: "Power & Charging", aliases: ["power & charging", "solar & power backup", "power banks", "chargers", "power"], description: "Power banks, adapters, chargers, and backup power.", image: "/assets/electronics-subcategories/power-charging.jpg", gradient: ["#fbbf24", "#f97316"] },
  { slug: "wearables", name: "Smartwatches & Wearables", aliases: ["smartwatches & wearables", "wearables", "smart watches"], description: "Smartwatches, fitness trackers, and connected accessories.", image: "/assets/category-backgrounds/electronics.jpg", gradient: ["#8b5cf6", "#10b981"] },
  { slug: "gaming", name: "Gaming Consoles & Games", aliases: ["gaming consoles & games", "gaming", "consoles", "video games"], description: "Consoles, controllers, games, and gaming accessories.", image: "/assets/category-backgrounds/gaming.jpg", gradient: ["#ec4899", "#8b5cf6"] },
];

export function electronicsSubcategoryFromSlug(slug: string) {
  return ELECTRONICS_SUBCATEGORIES.find((item) => item.slug === slug.toLowerCase()) ?? null;
}

export function matchElectronicsSubcategory(node: CategoryNode, config: ElectronicsSubcategoryConfig) {
  const name = node.name.trim().toLowerCase();
  return config.aliases.some((alias) => alias.toLowerCase() === name);
}

export function electronicsBrandFilter(): CategoryFilterField {
  return {
    field_name: "brand",
    field_type: "select",
    options: ["Samsung", "Tecno", "Apple", "Xiaomi", "Infinix", "Oppo", "Nokia", "Huawei"],
  };
}
