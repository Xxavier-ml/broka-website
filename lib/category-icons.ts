import {
  Baby,
  BookOpen,
  Car,
  Dumbbell,
  Factory,
  Gamepad2,
  Guitar,
  HardHat,
  House,
  LandPlot,
  Palette,
  PawPrint,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sofa,
  SprayCan,
  Stethoscope,
  UtensilsCrossed,
  Wheat,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * A line icon for each of the 21 canonical categories (lib/categories.ts), for
 * places where the category art is too heavy to load, like the homepage's
 * category ticker. Unknown names get the generic shopping bag.
 */
const ICONS: Record<string, LucideIcon> = {
  Automobiles: Car,
  Property: House,
  Land: LandPlot,
  Electronics: Smartphone,
  Fashion: Shirt,
  Agriculture: Wheat,
  "Home & Furniture": Sofa,
  "Food & Beverages": UtensilsCrossed,
  Construction: HardHat,
  "Beauty & Personal Care": SprayCan,
  "Health & Medical": Stethoscope,
  "Baby & Kids": Baby,
  Gaming: Gamepad2,
  "Sports & Fitness": Dumbbell,
  "Books & Education": BookOpen,
  "Music & Instruments": Guitar,
  "Arts & Crafts": Palette,
  "Business & Industrial": Factory,
  "Pets & Animals": PawPrint,
  Services: Wrench,
  Other: ShoppingBag,
};

export function categoryIcon(name: string): LucideIcon {
  return ICONS[name] ?? ShoppingBag;
}
