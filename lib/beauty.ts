export interface BeautySubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const BEAUTY_SUBCATEGORY_ARTWORK: Record<string, BeautySubcategoryArtwork> = {
  skincare: { image: "/assets/beauty-subcategories/skincare.jpg", gradient: ["#e879a9", "#7c5cff"] },
  haircare: { image: "/assets/beauty-subcategories/haircare.jpg", gradient: ["#7c5cff", "#d946ef"] },
  "wigs & hair extensions": { image: "/assets/beauty-subcategories/wigs-hair-extensions.jpg", gradient: ["#3b82f6", "#7c5cff"] },
  makeup: { image: "/assets/beauty-subcategories/makeup.jpg", gradient: ["#f472b6", "#8b5cf6"] },
  fragrances: { image: "/assets/beauty-subcategories/fragrances.jpg", gradient: ["#f59e0b", "#ec4899"] },
  nails: { image: "/assets/beauty-subcategories/nails.jpg", gradient: ["#ec4899", "#8b5cf6"] },
  "men's grooming": { image: "/assets/beauty-subcategories/mens-grooming.jpg", gradient: ["#3b82f6", "#c08457"] },
  "personal hygiene": { image: "/assets/beauty-subcategories/personal-hygiene.jpg", gradient: ["#22c9f0", "#7c5cff"] },
  "salon & spa equipment": { image: "/assets/beauty-subcategories/salon-spa-equipment.jpg", gradient: ["#8b5cf6", "#f472b6"] },
};

export function beautySubcategoryArtwork(name: string): BeautySubcategoryArtwork | null {
  return BEAUTY_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
