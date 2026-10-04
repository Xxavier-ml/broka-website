import Link from "next/link";
import Image from "next/image";
import { Smartphone } from "lucide-react";

type Kind = "auction" | "store" | "product" | "general";

// The website only shows listings. Everything that involves an account, a
// conversation or money happens in the app, and these panels say so plainly
// wherever a visitor might expect a "Bid" or "Buy" button.
const COPY: Record<Kind, { title: string; body: string; points: string[] }> = {
  auction: {
    title: "Bid in the BROKA app",
    body: "This page is for looking. Placing bids, following an auction live and paying if you win all happen in the app.",
    points: ["Place and track your bids", "Live updates as the bidding moves", "Pay safely through escrow"],
  },
  store: {
    title: "Shop this store in the app",
    body: "Browse the details here. To make an offer, message the seller or buy, open the store in the BROKA app.",
    points: ["Chat with the seller", "Negotiate with Zeno, BROKA's AI broker", "Pay safely through escrow"],
  },
  product: {
    title: "Make an offer in the app",
    body: "You can see everything about this listing here. Offers, chat and payment happen in the BROKA app.",
    points: ["Make an offer or negotiate with Zeno", "Message the seller", "Pay safely through escrow"],
  },
  general: {
    title: "The rest happens in the app",
    body: "The website shows auctions and online stores. Bidding, buying, chatting and paying are in the BROKA app.",
    points: ["Bid and negotiate with Zeno", "Chat and call sellers", "Pay safely through escrow"],
  },
};

export function AppCta({
  kind = "general",
  variant = "panel",
  className = "",
}: {
  kind?: Kind;
  variant?: "panel" | "banner";
  className?: string;
}) {
  const c = COPY[kind];
  return (
    <aside className={`appcta appcta-${variant} ${className}`.trim()} aria-label="Get the BROKA app">
      <Image src="/assets/zeno-icon.png" alt="" width={56} height={56} className="appcta-zeno" />
      <div className="appcta-body">
        <h2 className="appcta-title">{c.title}</h2>
        <p className="appcta-text">{c.body}</p>
        <ul className="appcta-points">
          {c.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
      <div className="appcta-actions">
        <Link href="/download" className="btn btn-primary">
          <Smartphone size={16} aria-hidden="true" /> Get the app
        </Link>
      </div>
    </aside>
  );
}
