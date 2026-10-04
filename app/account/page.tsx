import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, MessageCircle, PackageCheck, Store, UserRound } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Your BROKA account",
  description: "Manage saved products, negotiations, purchases, and selling activity on BROKA.",
};

const areas = [
  { icon: Heart, title: "Saved products", body: "Keep the listings you want to compare later in one place." },
  { icon: MessageCircle, title: "Negotiations", body: "Return to conversations with sellers and let Zeno keep the context close." },
  { icon: PackageCheck, title: "Purchases and deals", body: "Track the progress of agreements, delivery, and protected transactions." },
  { icon: Store, title: "Seller workspace", body: "Manage your storefront, listings, and buyer interest as the account grows." },
];

export default function AccountPage() {
  return (
    <>
      <PageHero eyebrow="Your space on BROKA" headline="Commerce that remembers what matters." sub="Sign in to keep your saved products, conversations, purchases, and seller activity together." />
      <section className="sec-sm" aria-labelledby="account-options">
        <div className="wrap">
          <div className="account-gate card">
            <span className="account-avatar"><UserRound size={25} /></span>
            <div>
              <h2 className="t-h3" id="account-options">Sign in to your BROKA account</h2>
              <p className="t-body">Authentication and session refresh will use the Railway API. Your account hub is ready for saved products, negotiations, and selling activity.</p>
            </div>
            <Link href="/download" className="btn btn-primary">Open the BROKA app <ArrowRight size={17} /></Link>
          </div>
          <div className="account-grid">
            {areas.map(({ icon: Icon, title, body }) => (
              <article key={title} className="card account-card">
                <Icon size={20} className="account-card-icon" />
                <h3 className="t-h4">{title}</h3>
                <p className="t-body">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
