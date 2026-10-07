export interface BabyKidsSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const BABY_KIDS_SUBCATEGORY_ARTWORK: Record<string, BabyKidsSubcategoryArtwork> = {
  "toys & games": { image: "/assets/baby-kids-subcategories/toys-games.jpg", gradient: ["#ec4899", "#22c9f0"] },
  "strollers & car seats": { image: "/assets/baby-kids-subcategories/strollers-car-seats.jpg", gradient: ["#3b82f6", "#22c9f0"] },
  "cots & baby furniture": { image: "/assets/baby-kids-subcategories/cots-baby-furniture.jpg", gradient: ["#f472b6", "#7c5cff"] },
  "feeding & nursing": { image: "/assets/baby-kids-subcategories/feeding-nursing.jpg", gradient: ["#22c9f0", "#10b981"] },
  "diapers & baby care": { image: "/assets/baby-kids-subcategories/diapers-baby-care.jpg", gradient: ["#22d3ee", "#f472b6"] },
  maternity: { image: "/assets/baby-kids-subcategories/maternity.jpg", gradient: ["#ec4899", "#8b5cf6"] },
};

export function babyKidsSubcategoryArtwork(name: string): BabyKidsSubcategoryArtwork | null {
  return BABY_KIDS_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
