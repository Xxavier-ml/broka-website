export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavLink[];
}

export const navLinks: NavGroup[] = [
  { label: "What is BROKA", href: "/what-is-broka" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Zeno", href: "/zeno" },
  { label: "Technology", href: "/technology" },
  { label: "Vision", href: "/vision" },
  {
    label: "Company",
    href: "/founders",
    children: [
      { label: "Founders", href: "/founders" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
