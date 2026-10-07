export interface MusicInstrumentsSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const MUSIC_INSTRUMENTS_SUBCATEGORY_ARTWORK: Record<string, MusicInstrumentsSubcategoryArtwork> = {
  guitars: { image: "/assets/music-instruments-subcategories/guitars.jpg", gradient: ["#ec4899", "#8b5cf6"] },
  "keyboards & pianos": { image: "/assets/music-instruments-subcategories/keyboards-pianos.jpg", gradient: ["#8b5cf6", "#3b82f6"] },
  "drums & percussion": { image: "/assets/music-instruments-subcategories/drums-percussion.jpg", gradient: ["#f43f5e", "#8b5cf6"] },
  "wind instruments": { image: "/assets/music-instruments-subcategories/wind-instruments.jpg", gradient: ["#f59e0b", "#ec4899"] },
  "traditional instruments": { image: "/assets/music-instruments-subcategories/traditional-instruments.jpg", gradient: ["#10b981", "#8b5cf6"] },
  "dj & studio equipment": { image: "/assets/music-instruments-subcategories/dj-studio-equipment.jpg", gradient: ["#22d3ee", "#ec4899"] },
  "pa & sound systems": { image: "/assets/music-instruments-subcategories/pa-sound-systems.jpg", gradient: ["#3b82f6", "#8b5cf6"] },
  accessories: { image: "/assets/music-instruments-subcategories/accessories.jpg", gradient: ["#ec4899", "#f59e0b"] },
};

export function musicInstrumentsSubcategoryArtwork(name: string): MusicInstrumentsSubcategoryArtwork | null {
  return MUSIC_INSTRUMENTS_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
