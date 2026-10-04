import { canonicalCategory } from "./categories";

export interface CategoryPageContent {
  category: string;
  title: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  intro: string;
  searchPlaceholder: string;
}

const CATEGORY_COPY: Record<string, { subject: string; searchPlaceholder: string }> = {
  Automobiles: { subject: "vehicles", searchPlaceholder: "Search cars, makes, models…" },
  Property: { subject: "property and real estate", searchPlaceholder: "Search homes, rentals, property…" },
  Land: { subject: "land", searchPlaceholder: "Search land and plots…" },
  Electronics: { subject: "electronics", searchPlaceholder: "Search phones, laptops, electronics…" },
  Fashion: { subject: "fashion and accessories", searchPlaceholder: "Search clothing and accessories…" },
  Agriculture: { subject: "agricultural goods and equipment", searchPlaceholder: "Search farm supplies and equipment…" },
  "Home & Furniture": { subject: "home and furniture", searchPlaceholder: "Search furniture and home goods…" },
  "Food & Beverages": { subject: "food and beverages", searchPlaceholder: "Search food and beverages…" },
  Construction: { subject: "construction goods and equipment", searchPlaceholder: "Search tools and construction supplies…" },
  "Beauty & Personal Care": { subject: "beauty and personal care", searchPlaceholder: "Search beauty and personal care…" },
  "Health & Medical": { subject: "health and medical goods", searchPlaceholder: "Search health and medical listings…" },
  "Baby & Kids": { subject: "baby and kids listings", searchPlaceholder: "Search baby and kids products…" },
  Gaming: { subject: "gaming gear", searchPlaceholder: "Search consoles, games, accessories…" },
  "Sports & Fitness": { subject: "sports and fitness gear", searchPlaceholder: "Search sports and fitness gear…" },
  "Books & Education": { subject: "books and education materials", searchPlaceholder: "Search books and education…" },
  "Music & Instruments": { subject: "music and instruments", searchPlaceholder: "Search music and instruments…" },
  "Arts & Crafts": { subject: "art and craft listings", searchPlaceholder: "Search arts and crafts…" },
  "Business & Industrial": { subject: "business and industrial goods", searchPlaceholder: "Search business and industrial listings…" },
  "Pets & Animals": { subject: "pet and animal listings", searchPlaceholder: "Search pets and animal supplies…" },
  Services: { subject: "services", searchPlaceholder: "Search services…" },
  Other: { subject: "other marketplace listings", searchPlaceholder: "Search other listings…" },
};

/** Shared, category-specific copy for the dedicated marketplace landing pages. */
export function categoryPageContent(name: string): CategoryPageContent | null {
  const category = canonicalCategory(name);
  if (!category) return null;
  const copy = CATEGORY_COPY[category];
  if (!copy) return null;

  const titleLead = category === "Other" ? "More to" : category;
  const titleAccent = category === "Other" ? "Explore" : "Zone";
  const title = `${titleLead} ${titleAccent}`;
  return {
    category,
    title,
    titleLead,
    titleAccent,
    description: `Browse ${copy.subject} on BROKA. Explore listings from Kenyan sellers and providers.`,
    intro: `Explore ${copy.subject} from Kenyan sellers on BROKA.`,
    searchPlaceholder: copy.searchPlaceholder,
  };
}
