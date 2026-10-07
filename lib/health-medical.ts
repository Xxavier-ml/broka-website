export interface HealthMedicalSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const HEALTH_MEDICAL_SUBCATEGORY_ARTWORK: Record<string, HealthMedicalSubcategoryArtwork> = {
  "medical equipment": { image: "/assets/health-medical-subcategories/medical-equipment.jpg", gradient: ["#22c9f0", "#3b82f6"] },
  "health monitors": { image: "/assets/health-medical-subcategories/health-monitors.jpg", gradient: ["#22d3ee", "#10b981"] },
  "mobility aids": { image: "/assets/health-medical-subcategories/mobility-aids.jpg", gradient: ["#3b82f6", "#22c9f0"] },
  "first aid & supplies": { image: "/assets/health-medical-subcategories/first-aid-supplies.jpg", gradient: ["#ef4444", "#22c9f0"] },
  "vitamins & supplements": { image: "/assets/health-medical-subcategories/vitamins-supplements.jpg", gradient: ["#10b981", "#22c9f0"] },
};

export function healthMedicalSubcategoryArtwork(name: string): HealthMedicalSubcategoryArtwork | null {
  return HEALTH_MEDICAL_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
