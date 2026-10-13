import Link from "next/link";
import Image from "next/image";
import { Smartphone } from "lucide-react";

type Kind = "store" | "product" | "general";

// The website is for browsing. The app adds account and conversation features;
// buyers and sellers arrange purchases and payments directly with each other.
const COPY: Record<Kind, { title: string; body: string; points: string[] }> = {
  store: {
    title: "Explore this store in the app",
    body: "Browse more from this seller or start a conversation in the BROKA app. Any purchase and payment are arranged directly between you and the seller.",
    points: ["Explore more seller listings", "Message or call the seller", "Agree any purchase directly"],
  },
  product: {
    title: "Continue with this listing",
    body: "Review the listing and seller context, then contact the seller directly if you have questions. BROKA does not process or hold payments.",
    points: ["Review the listing details", "Message or call the seller", "Arrange next steps directly"],
  },
  general: {
    title: "Take the next step in the app",
    body: "Browse products and stores, use Zeno for context, and contact sellers. Buyers and sellers arrange any transaction directly.",
    points: ["Explore marketplace listings", "Chat or call sellers", "Arrange payments and delivery directly"],
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
