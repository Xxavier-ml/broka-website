import type { CategoryFilterField, CategoryNode } from "@/lib/api/categories";

export interface ElectronicsSubcategoryConfig {
  slug: string;
  legacySlugs?: string[];
  name: string;
  aliases: string[];
  description: string;
  image: string;
  gradient: [string, string];
}

/** Presentation metadata for every subcategory currently returned by the Electronics category tree. */
export const ELECTRONICS_SUBCATEGORIES: ElectronicsSubcategoryConfig[] = [
  { slug: "phones", name: "Phones", aliases: ["phones", "mobile phones", "smartphones", "mobile devices"], description: "Smartphones, feature phones, and mobile devices.", image: "/assets/electronics-subcategories/phones.jpg", gradient: ["#7c5cff", "#22c9f0"] },
  { slug: "laptops-tablets", name: "Laptops & Computers", aliases: ["laptops & tablets", "laptops and tablets", "laptops & computers", "computers & laptops", "computers"], description: "Laptops, monitors, and computing essentials.", image: "/assets/electronics-subcategories/laptops-tablets.jpg", gradient: ["#3b82f6", "#22d3ee"] },
  { slug: "tablets", name: "Tablets", aliases: ["tablets", "tablet computers"], description: "Portable tablets for work, study, and entertainment.", image: "/assets/electronics-subcategories/laptops-tablets.jpg", gradient: ["#22d3ee", "#8b5cf6"] },
  { slug: "tvs", name: "TVs", aliases: ["tvs", "televisions", "tv & audio", "tvs & home audio"], description: "Smart TVs, screens, projectors, and home cinema displays.", image: "/assets/electronics-subcategories/tv-audio.jpg", gradient: ["#6366f1", "#ec4899"] },
  { slug: "audio", name: "Audio", aliases: ["audio", "home audio", "speakers", "headphones"], description: "Speakers, headphones, soundbars, and listening gear.", image: "/assets/electronics-subcategories/tv-audio.jpg", gradient: ["#ec4899", "#6366f1"] },
  { slug: "wearables", name: "Smartwatches & Wearables", aliases: ["smartwatches & wearables", "wearables", "smart watches", "smartwatches"], description: "Smartwatches, fitness trackers, and connected accessories.", image: "/assets/category-backgrounds/electronics.jpg", gradient: ["#8b5cf6", "#10b981"] },
  { slug: "cameras", name: "Cameras", aliases: ["cameras", "cameras & photography", "photography"], description: "Cameras, lenses, tripods, and photography equipment.", image: "/assets/electronics-subcategories/cameras.jpg", gradient: ["#f59e0b", "#f472b6"] },
  { slug: "solar-power-backup", legacySlugs: ["power-charging"], name: "Solar & Power Backup", aliases: ["solar & power backup", "power & charging", "power banks", "chargers", "power", "solar"], description: "Solar systems, power banks, inverters, and backup power.", image: "/assets/electronics-subcategories/power-charging.jpg", gradient: ["#fbbf24", "#f97316"] },
  { slug: "printers-scanners", name: "Printers & Scanners", aliases: ["printers & scanners", "printers", "scanners"], description: "Printers, scanners, cartridges, and office imaging equipment.", image: "/assets/category-backgrounds/electronics.jpg", gradient: ["#0ea5e9", "#64748b"] },
  { slug: "computer-components", name: "Computer Components", aliases: ["computer components", "computer components & parts", "pc components", "components"], description: "PC parts, memory, storage, graphics, and upgrades.", image: "/assets/category-backgrounds/electronics.jpg", gradient: ["#64748b", "#8b5cf6"] },
  { slug: "networking", name: "Networking", aliases: ["networking", "network devices", "routers & networking"], description: "Routers, switches, modems, Wi-Fi, and network equipment.", image: "/assets/category-backgrounds/electronics.jpg", gradient: ["#06b6d4", "#2563eb"] },
  { slug: "gaming", name: "Gaming", aliases: ["gaming", "gaming consoles & games", "consoles", "video games"], description: "Consoles, controllers, games, and gaming accessories.", image: "/assets/category-backgrounds/gaming.jpg", gradient: ["#ec4899", "#8b5cf6"] },
  { slug: "accessories", name: "Accessories", aliases: ["accessories", "accessories & cables", "phone accessories", "electronics accessories"], description: "Cases, cables, earbuds, chargers, and everyday add-ons.", image: "/assets/electronics-subcategories/accessories.jpg", gradient: ["#10b981", "#22c9f0"] },
];

export function electronicsSubcategoryFromSlug(slug: string) {
  const normalized = decodeURIComponent(slug).toLowerCase();
  return ELECTRONICS_SUBCATEGORIES.find((item) => item.slug === normalized || item.legacySlugs?.includes(normalized)) ?? null;
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
