export interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  /** Their BROKA address, shown on the founders page and the contact page. */
  email: string;
  photo?: string;
  social: { twitter?: string; linkedin?: string; github?: string };
}

export const founders: Founder[] = [
  {
    id: "xavier",
    name: "Xavier",
    role: "Co-Founder",
    initials: "X",
    email: "xavier@broka.co.ke",
    bio: "Biography coming soon.",
    photo: undefined,
    social: {},
  },
  {
    id: "arnold",
    name: "Arnold Ochieng",
    role: "Co-Founder",
    initials: "AO",
    email: "arnold@broka.co.ke",
    bio: "Biography coming soon.",
    photo: undefined,
    social: {},
  },
];
