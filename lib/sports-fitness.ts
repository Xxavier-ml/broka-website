export interface SportsFitnessSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const SPORTS_FITNESS_SUBCATEGORY_ARTWORK: Record<string, SportsFitnessSubcategoryArtwork> = {
  "fitness equipment": { image: "/assets/sports-fitness-subcategories/fitness-equipment.jpg", gradient: ["#10b981", "#22c9f0"] },
  "team sports": { image: "/assets/sports-fitness-subcategories/team-sports.jpg", gradient: ["#22c9f0", "#10b981"] },
  cycling: { image: "/assets/sports-fitness-subcategories/cycling.jpg", gradient: ["#3b82f6", "#10b981"] },
  sportswear: { image: "/assets/sports-fitness-subcategories/sportswear.jpg", gradient: ["#22c9f0", "#7c5cff"] },
  "racket sports": { image: "/assets/sports-fitness-subcategories/racket-sports.jpg", gradient: ["#10b981", "#3b82f6"] },
  "outdoor & camping": { image: "/assets/sports-fitness-subcategories/outdoor-camping.jpg", gradient: ["#10b981", "#22c9f0"] },
  swimming: { image: "/assets/sports-fitness-subcategories/swimming.jpg", gradient: ["#22c9f0", "#3b82f6"] },
};

export function sportsFitnessSubcategoryArtwork(name: string): SportsFitnessSubcategoryArtwork | null {
  return SPORTS_FITNESS_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
