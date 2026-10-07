export interface ServicesSubcategoryArtwork {
  image: string;
  gradient: [string, string];
}

const SERVICES_SUBCATEGORY_ARTWORK: Record<string, ServicesSubcategoryArtwork> = {
  "home services": { image: "/assets/services-subcategories/home-services.jpg", gradient: ["#22d3ee", "#8b5cf6"] },
  "cleaning services": { image: "/assets/services-subcategories/cleaning-services.jpg", gradient: ["#10b981", "#22d3ee"] },
  "repair & maintenance": { image: "/assets/services-subcategories/repair-maintenance.jpg", gradient: ["#8b5cf6", "#22d3ee"] },
  "construction & renovation": { image: "/assets/services-subcategories/construction-renovation.jpg", gradient: ["#f59e0b", "#8b5cf6"] },
  "transport & moving": { image: "/assets/services-subcategories/transport-moving.jpg", gradient: ["#06b6d4", "#3b82f6"] },
  "automotive services": { image: "/assets/services-subcategories/automotive-services.jpg", gradient: ["#3b82f6", "#8b5cf6"] },
  "beauty & wellness": { image: "/assets/services-subcategories/beauty-wellness.jpg", gradient: ["#f472b6", "#8b5cf6"] },
  "it & tech services": { image: "/assets/services-subcategories/it-tech-services.jpg", gradient: ["#22d3ee", "#3b82f6"] },
  "photography & videography": { image: "/assets/services-subcategories/photography-videography.jpg", gradient: ["#8b5cf6", "#ec4899"] },
  "events & entertainment": { image: "/assets/services-subcategories/events-entertainment.jpg", gradient: ["#f59e0b", "#ec4899"] },
  "tutoring & lessons": { image: "/assets/services-subcategories/tutoring-lessons.jpg", gradient: ["#22d3ee", "#f59e0b"] },
  "professional services": { image: "/assets/services-subcategories/professional-services.jpg", gradient: ["#6366f1", "#22d3ee"] },
};

export function servicesSubcategoryArtwork(name: string): ServicesSubcategoryArtwork | null {
  return SERVICES_SUBCATEGORY_ARTWORK[name.trim().toLowerCase()] ?? null;
}
