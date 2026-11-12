/**
 * The sample listings shown in the app preview (home screen cards and the
 * listing screen opened from them). Everything here is illustrative.
 *
 * Images are the site's AI-generated category pictures, in their small webp
 * sizes: `image` (640 px, about 15 KB) for the cards and `photo` (1024 px,
 * about 35 KB) for the listing screen.
 */
export type PreviewListing = {
  id: string;
  title: string;
  price: string;
  place: string;
  age: string;
  /** Matches one of the category tiles on the home screen. */
  category: "Electronics" | "Automobiles" | "Fashion";
  categoryEmoji: string;
  image: string;
  photo: string;
  tag?: string;
  shop: string;
  owner: string;
  since: string;
  stock: string;
  views: number;
  details: { label: string; value: string }[];
  about: string[];
};

export const PREVIEW_LISTINGS: PreviewListing[] = [
  {
    id: "router",
    title: "Airtel 5G router",
    price: "KES 1,500",
    place: "Juja, Kiambu",
    age: "1w ago",
    category: "Electronics",
    categoryEmoji: "📱",
    image: "/assets/electronics-subcategories/webp/networking-640.webp",
    photo: "/assets/electronics-subcategories/webp/networking-1024.webp",
    tag: "AI Showcase",
    shop: "Clanix",
    owner: "Xavier Bravin Odhaimbo",
    since: "Oct 2026",
    stock: "Only 1 available",
    views: 254,
    details: [
      { label: "Condition", value: "New" },
      { label: "Brand", value: "Airtel" },
      { label: "Type", value: "Router" },
    ],
    about: ["What’s included: A four hours long backup battery", "Age / how long used: Not used"],
  },
  {
    id: "phone",
    title: "Galaxy A54 128GB",
    price: "KES 28,500",
    place: "Westlands, Nairobi",
    age: "2d ago",
    category: "Electronics",
    categoryEmoji: "📱",
    image: "/assets/electronics-subcategories/webp/phones-640.webp",
    photo: "/assets/electronics-subcategories/webp/phones-1024.webp",
    shop: "Mumbi Tech",
    owner: "Mumbi Wanjiru",
    since: "Mar 2026",
    stock: "2 available",
    views: 118,
    details: [
      { label: "Condition", value: "Used, good" },
      { label: "Brand", value: "Samsung" },
      { label: "Storage", value: "128 GB" },
    ],
    about: ["What’s included: Charger and a clear case", "Age / how long used: 8 months"],
  },
  {
    id: "car",
    title: "Toyota Axio 2016",
    price: "KES 1,250,000",
    place: "Kitengela, Kajiado",
    age: "3d ago",
    category: "Automobiles",
    categoryEmoji: "🚘",
    image: "/assets/automobile-subcategories/webp/cars-640.webp",
    photo: "/assets/automobile-subcategories/webp/cars-1024.webp",
    shop: "Savanna Motors",
    owner: "Peter Kimani",
    since: "Jan 2026",
    stock: "Only 1 available",
    views: 407,
    details: [
      { label: "Condition", value: "Used, very good" },
      { label: "Make", value: "Toyota" },
      { label: "Year", value: "2016" },
    ],
    about: ["What’s included: Logbook and spare key", "Age / how long used: 9 years"],
  },
  {
    id: "shoes",
    title: "Running shoes, size 42",
    price: "KES 3,200",
    place: "Nairobi CBD",
    age: "5d ago",
    category: "Fashion",
    categoryEmoji: "✳",
    image: "/assets/fashion-subcategories/webp/shoes-640.webp",
    photo: "/assets/fashion-subcategories/webp/shoes-1024.webp",
    shop: "Step Out Kenya",
    owner: "Achieng Otieno",
    since: "Jun 2026",
    stock: "3 available",
    views: 86,
    details: [
      { label: "Condition", value: "New" },
      { label: "Size", value: "42" },
      { label: "Type", value: "Running" },
    ],
    about: ["What’s included: Original box", "Age / how long used: Not used"],
  },
];
