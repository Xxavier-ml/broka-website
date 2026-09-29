export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavLink[];
}

// Five top-level entries, like the mockup's header (Home, Browse, Zeno,
// About...): everything else lives in the two dropdowns, so the bar fits
// without wrapping down to tablet widths.
export const navLinks: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Browse",
    href: "/auctions",
    children: [
      { label: "Auction House", href: "/auctions" },
      { label: "Online stores", href: "/stores" },
      { label: "Search", href: "/search" },
    ],
  },
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
      { label: "Roadmap", href: "/roadmap" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Contact", href: "/contact" },
];
