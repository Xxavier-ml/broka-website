export interface GamingSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const GAMING_SUBCATEGORY_ARTWORK: Record<string, GamingSubcategoryArtwork> = {
  consoles: { image: "/assets/gaming-subcategories/consoles.jpg", gradient: ["#22c9f0", "#8b5cf6"] },
  games: { image: "/assets/gaming-subcategories/games.jpg", gradient: ["#ec4899", "#8b5cf6"] },
  controllers: { image: "/assets/gaming-subcategories/controllers.jpg", gradient: ["#6366f1", "#22c9f0"] },
  "pc gaming": { image: "/assets/gaming-subcategories/pc-gaming.jpg", gradient: ["#06b6d4", "#7c3aed"] },
  accessories: { image: "/assets/gaming-subcategories/accessories.jpg", gradient: ["#ec4899", "#6366f1"] },
};

export function gamingSubcategoryArtwork(name: string): GamingSubcategoryArtwork | null {
  return GAMING_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
