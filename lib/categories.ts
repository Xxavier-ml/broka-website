// BROKA's 21 top-level categories with the emoji and colours the app uses for
// them (flutter_app/lib/features/categories/domain/category_visual.dart in the
// main repository), in the order the backend serves them.

export interface CategoryVisual {
  name: string;
  emoji: string;
  /** Two colours for the card's tint. */
  gradient: [string, string];
  /** Optional decorative artwork used behind the dedicated category hero. */
  backgroundArt?: string;
}

const C = {
  violet: "#8B5CF6",
  blue: "#3B82F6",
  green: "#10B981",
  pink: "#F472B6",
  cyan: "#22D3EE",
  warning: "#F59E0B",
  amber: "#FBBF24",
  orange: "#FF6B4A",
} as const;

export const CATEGORIES: CategoryVisual[] = [
  { name: "Automobiles", emoji: "🚗", gradient: [C.orange, C.violet], backgroundArt: "/assets/category-backgrounds/automobiles.jpg" },
  { name: "Property", emoji: "🏠", gradient: [C.blue, C.green], backgroundArt: "/assets/category-backgrounds/property.jpg" },
  { name: "Land", emoji: "🏞️", gradient: [C.amber, C.green], backgroundArt: "/assets/category-backgrounds/land.jpg" },
  { name: "Electronics", emoji: "📱", gradient: [C.cyan, C.blue], backgroundArt: "/assets/category-backgrounds/electronics.jpg" },
  { name: "Fashion", emoji: "👗", gradient: [C.pink, C.violet], backgroundArt: "/assets/category-backgrounds/fashion.jpg" },
  { name: "Agriculture", emoji: "🌾", gradient: [C.green, C.amber], backgroundArt: "/assets/category-backgrounds/agriculture.jpg" },
  { name: "Home & Furniture", emoji: "🛋️", gradient: [C.amber, C.violet], backgroundArt: "/assets/category-backgrounds/home-furniture.jpg" },
  { name: "Food & Beverages", emoji: "🍽️", gradient: [C.orange, C.amber], backgroundArt: "/assets/category-backgrounds/food-beverages.jpg" },
  { name: "Construction", emoji: "🏗️", gradient: [C.orange, C.warning], backgroundArt: "/assets/category-backgrounds/construction.jpg" },
  { name: "Beauty & Personal Care", emoji: "💄", gradient: [C.pink, C.amber], backgroundArt: "/assets/category-backgrounds/beauty-personal-care.jpg" },
  { name: "Health & Medical", emoji: "🏥", gradient: [C.cyan, C.green], backgroundArt: "/assets/category-backgrounds/health-medical.jpg" },
  { name: "Baby & Kids", emoji: "🧸", gradient: [C.pink, C.cyan], backgroundArt: "/assets/category-backgrounds/baby-kids.jpg" },
  { name: "Gaming", emoji: "🎮", gradient: [C.violet, C.pink], backgroundArt: "/assets/category-backgrounds/gaming.jpg" },
  { name: "Sports & Fitness", emoji: "⚽", gradient: [C.green, C.blue], backgroundArt: "/assets/category-backgrounds/sports-fitness.jpg" },
  { name: "Books & Education", emoji: "📚", gradient: [C.violet, C.blue], backgroundArt: "/assets/category-backgrounds/books-education.jpg" },
  // These three use the closest available generated editorial assets until their
  // dedicated variants can be generated: fashion for creative/music, agriculture
  // for pets, and services for the catch-all category.
  { name: "Music & Instruments", emoji: "🎸", gradient: [C.pink, C.violet], backgroundArt: "/assets/category-backgrounds/fashion.jpg" },
  { name: "Arts & Crafts", emoji: "🎨", gradient: [C.violet, C.amber], backgroundArt: "/assets/category-backgrounds/fashion.jpg" },
  { name: "Business & Industrial", emoji: "🏭", gradient: [C.blue, C.warning], backgroundArt: "/assets/category-backgrounds/business-industrial.jpg" },
  { name: "Pets & Animals", emoji: "🐾", gradient: [C.green, C.pink], backgroundArt: "/assets/category-backgrounds/agriculture.jpg" },
  { name: "Services", emoji: "🛠️", gradient: [C.cyan, C.violet], backgroundArt: "/assets/category-backgrounds/services.jpg" },
  { name: "Other", emoji: "🛍️", gradient: [C.violet, C.cyan], backgroundArt: "/assets/category-backgrounds/services.jpg" },
];

const byKey = new Map(CATEGORIES.map((c) => [c.name.toLowerCase(), c]));
// "Vehicles" was renamed "Automobiles" on 2026-09-25; a store or listing saved
// before then may still say it.
byKey.set("vehicles", byKey.get("automobiles")!);

/** The visual for a category name (any case); "Other" for anything unknown. */
export function categoryVisual(name: string | null | undefined): CategoryVisual {
  return byKey.get((name ?? "").trim().toLowerCase()) ?? byKey.get("other")!;
}

/** The canonical spelling of a category name, or null if it is not one. */
export function canonicalCategory(name: string | null | undefined): string | null {
  return byKey.get((name ?? "").trim().toLowerCase())?.name ?? null;
}

/** The categories shown as quick filters: what Kenyans list most. */
export const FEATURED_CATEGORIES = CATEGORIES.slice(0, 6);

/**
 * The URL slug for a category.
 *
 * Category names contain "&", which does not survive a trip through a path
 * segment: the home page used to build the slug by lowercasing the name and
 * percent-encoding it, and /browse/[category] turned the hyphens back into
 * spaces, so "Business & Industrial" arrived as "business %26 industrial" and
 * answered 404. "&" is spelled out as "and" instead, so the slug and the name
 * survive the round trip. categoryFromSlug also accepts the older forms, so
 * links already in the wild still resolve.
 */
export function categorySlug(name: string): string {
  return name.toLowerCase().replace(/\s*&\s*/g, "-and-").replace(/\s+/g, "-");
}

/** The canonical category a slug refers to, or null if it is not one. */
export function categoryFromSlug(slug: string): string | null {
  const decoded = decodeURIComponent(slug).replace(/-and-/g, " & ").replace(/-/g, " ");
  return canonicalCategory(decoded);
}
