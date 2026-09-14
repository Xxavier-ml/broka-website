export interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  photo?: string;
  social: { twitter?: string; linkedin?: string; github?: string };
}

export const founders: Founder[] = [
  {
    id: "xavier",
    name: "Xavier",
    role: "Co-Founder",
    initials: "X",
    bio: "Biography coming soon.",
    photo: undefined,
    social: {},
  },
  {
    id: "arnold",
    name: "Arnold Ochieng",
    role: "Co-Founder",
    initials: "AO",
    bio: "Biography coming soon.",
    photo: undefined,
    social: {},
  },
];
