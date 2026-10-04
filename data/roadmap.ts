export type RoadmapStatus = "current" | "building" | "exploring";

export interface RoadmapPhase {
  id: string;
  label: string;
  status: RoadmapStatus;
  description: string;
  items: string[];
}

export const roadmap: RoadmapPhase[] = [
  {
    id: "now",
    label: "Now",
    status: "current",
    description: "What we are shipping",
    items: [
      "Peer-to-peer marketplace",
      "Zeno AI companion",
      "Buyer & seller discovery",
      "AI-assisted negotiation",
      "Mobile app (iOS & Android)",
      "Seller stores & business identity",
      "Real-time messaging",
      "WebRTC audio / video calls",
    ],
  },
  {
    id: "next",
    label: "Next",
    status: "building",
    description: "What we are building toward",
    items: [
      "Auction infrastructure",
      "Integrated payments",
      "Escrow layer",
      "Dispute resolution",
      "Trust & verification layer",
      "Fraud detection systems",
    ],
  },
  {
    id: "later",
    label: "Later",
    status: "exploring",
    description: "Where the vision expands",
    items: [
      "Multilingual commerce (Swahili + more)",
      "Voice-based interaction",
      "Delivery infrastructure",
      "East African expansion",
      "Enterprise commerce tools",
    ],
  },
];
