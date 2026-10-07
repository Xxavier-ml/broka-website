export interface ArtsCraftsSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const ARTS_CRAFTS_SUBCATEGORY_ARTWORK: Record<string, ArtsCraftsSubcategoryArtwork> = {
  "paintings & wall art": { image: "/assets/arts-crafts-subcategories/paintings-wall-art.jpg", gradient: ["#8b5cf6", "#f59e0b"] },
  "carvings & sculptures": { image: "/assets/arts-crafts-subcategories/carvings-sculptures.jpg", gradient: ["#f59e0b", "#8b5cf6"] },
  beadwork: { image: "/assets/arts-crafts-subcategories/beadwork.jpg", gradient: ["#ec4899", "#8b5cf6"] },
  "baskets & weaving": { image: "/assets/arts-crafts-subcategories/baskets-weaving.jpg", gradient: ["#f59e0b", "#10b981"] },
  "antiques & collectibles": { image: "/assets/arts-crafts-subcategories/antiques-collectibles.jpg", gradient: ["#f59e0b", "#8b5cf6"] },
  "art & craft supplies": { image: "/assets/arts-crafts-subcategories/art-craft-supplies.jpg", gradient: ["#8b5cf6", "#ec4899"] },
};

export function artsCraftsSubcategoryArtwork(name: string): ArtsCraftsSubcategoryArtwork | null {
  return ARTS_CRAFTS_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
