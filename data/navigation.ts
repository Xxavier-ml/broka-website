export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavLink[];
}

// Commerce-first navigation: the marketing story remains available through About.
export const navLinks: NavGroup[] = [
  { label: "Browse", href: "/browse" },
  {
    label: "Explore",
    href: "/auctions",
    children: [
      { label: "All products", href: "/browse" },
      { label: "Auction House", href: "/auctions" },
      { label: "Stores", href: "/stores" },
    ],
  },
  { label: "Sell", href: "/sell" },
  { label: "Zeno", href: "/zeno" },
  {
    label: "About",
    href: "/what-is-broka",
    children: [
      { label: "What is BROKA", href: "/what-is-broka" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Technology", href: "/technology" },
      { label: "Vision", href: "/vision" },
      { label: "Founders", href: "/founders" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];
