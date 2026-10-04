/**
 * One taxonomy for the whole site.
 *
 * Before this file there were two: the header offered "Browse" and an
 * "Explore" menu whose first item was also /browse, while the footer filed
 * Roadmap under Product and Vision under Company. The same page could be
 * reached by two labels, and two labels pointed at the same page.
 *
 * Now there is one grouping — Marketplace, Product, Company, Get started —
 * and the header, the mobile menu and the footer all read from it. A page is
 * added or moved in exactly one place.
 */

export interface NavLink {
  label: string;
  href: string;
  /** The one line under the label in the desktop menu. Omitted for plain links. */
  description?: string;
}

export interface NavGroup {
  label: string;
  /** Where the group label itself goes — the most useful page in the group. */
  href: string;
  children?: NavLink[];
}

/** The header's primary navigation. Four entries, no page listed twice. */
export const navLinks: NavGroup[] = [
  {
    label: "Marketplace",
    href: "/browse",
    children: [
      { label: "Browse all products", href: "/browse", description: "Every listing on BROKA, by category" },
      { label: "Auction House", href: "/auctions", description: "Live, ending soon and upcoming auctions" },
      { label: "Online stores", href: "/stores", description: "Seller storefronts and what they sell" },
    ],
  },
  { label: "Zeno", href: "/zeno" },
  { label: "Sell", href: "/sell" },
  {
    label: "About",
    href: "/what-is-broka",
    children: [
      { label: "What is BROKA", href: "/what-is-broka", description: "The platform in one page" },
      { label: "How it works", href: "/how-it-works", description: "From intent to outcome, step by step" },
      { label: "Technology", href: "/technology", description: "The systems underneath" },
      { label: "Vision", href: "/vision", description: "Kenya, East Africa, then the world" },
      { label: "Founders", href: "/founders", description: "Who is building BROKA" },
      { label: "Roadmap", href: "/roadmap", description: "What has shipped, what comes next" },
    ],
  },
];

/** Pages that belong in the footer and the mobile menu but not the top bar. */
export const navUtility: NavLink[] = [
  { label: "Get the app", href: "/download" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/**
 * The footer's columns. Built from the same groups as the header, so a
 * visitor who learns the site from the top bar can find the same things at
 * the bottom of every page.
 */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Marketplace",
    links: [
      { label: "Browse all products", href: "/browse" },
      { label: "Auction House", href: "/auctions" },
      { label: "Online stores", href: "/stores" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "What is BROKA", href: "/what-is-broka" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Meet Zeno", href: "/zeno" },
      { label: "Technology", href: "/technology" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Vision", href: "/vision" },
      { label: "Founders", href: "/founders" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Get the app", href: "/download" },
      { label: "Sell on BROKA", href: "/sell" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

/** Legal links, kept out of the columns so they never compete with the rest. */
export const navLegal: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
