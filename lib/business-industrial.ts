export interface BusinessIndustrialSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const BUSINESS_INDUSTRIAL_SUBCATEGORY_ARTWORK: Record<string, BusinessIndustrialSubcategoryArtwork> = {
  "wholesale & bulk stock": { image: "/assets/business-industrial-subcategories/wholesale-bulk-stock.jpg", gradient: ["#3b82f6", "#f59e0b"] },
  "office equipment": { image: "/assets/business-industrial-subcategories/office-equipment.jpg", gradient: ["#22d3ee", "#3b82f6"] },
  "industrial machinery": { image: "/assets/business-industrial-subcategories/industrial-machinery.jpg", gradient: ["#3b82f6", "#f59e0b"] },
  "restaurant & catering equipment": { image: "/assets/business-industrial-subcategories/restaurant-catering-equipment.jpg", gradient: ["#f59e0b", "#ef4444"] },
  "retail & shop fixtures": { image: "/assets/business-industrial-subcategories/retail-shop-fixtures.jpg", gradient: ["#8b5cf6", "#3b82f6"] },
  "printing & branding equipment": { image: "/assets/business-industrial-subcategories/printing-branding-equipment.jpg", gradient: ["#22d3ee", "#8b5cf6"] },
  "welding & workshop equipment": { image: "/assets/business-industrial-subcategories/welding-workshop-equipment.jpg", gradient: ["#f59e0b", "#ef4444"] },
  "safety & security equipment": { image: "/assets/business-industrial-subcategories/safety-security-equipment.jpg", gradient: ["#10b981", "#3b82f6"] },
  "packaging supplies": { image: "/assets/business-industrial-subcategories/packaging-supplies.jpg", gradient: ["#f59e0b", "#3b82f6"] },
};

export function businessIndustrialSubcategoryArtwork(name: string): BusinessIndustrialSubcategoryArtwork | null {
  return BUSINESS_INDUSTRIAL_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
