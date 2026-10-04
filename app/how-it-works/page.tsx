import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "How it Works",
  description: "Walk through a complete BROKA transaction — from intent and discovery to negotiation, agreement, payment and trust.",
};

const steps = [
  { num: "01", title: "Intent", status: "current", badge: "Live",
    body: "A user describes what they need in plain language. No rigid forms, no complex filters — just what they want, at what price, in what condition.",
    example: '"I need a used MacBook in good condition under KES 80,000 — prefer Nairobi."' },
  { num: "02", title: "Discovery", status: "current", badge: "Live",
    body: "BROKA surfaces relevant sellers and listings that match the request, with useful context about each — seller history, product condition, location, verified status.",
    example: null },
  { num: "03", title: "Context", status: "current", badge: "Live",
    body: "Both buyer and seller get the information they need to make a good decision. Seller reputation, comparable prices, product details — all available before committing.",
    example: null },
  { num: "04", title: "Negotiation", status: "building", badge: "Building",
    body: "Zeno can assist the negotiation process — helping the buyer frame their offer, providing the seller with relevant context, and helping both parties move toward a fair agreement.",
    example: '"Ask the seller if they can do KES 72,000. We found two comparable listings at that price."' },
  { num: "05", title: "Agreement", status: "building", badge: "Building",
    body: "Both sides reach agreement on price, condition, delivery and timing. The platform creates a record of what was agreed and holds both parties accountable to it.",
    example: null },
  { num: "06", title: "Payment", status: "building", badge: "Building",
    body: "Integrated payment flow — including M-Pesa and local payment rails — with escrow to protect both sides. Funds are released when both parties confirm the transaction.",
    example: null },
  { num: "07", title: "Delivery", status: "exploring", badge: "Later",
    body: "Delivery coordination, handover confirmation and post-transaction review. Both parties confirm completion before the transaction is closed.",
    example: null },
  { num: "08", title: "Trust & resolution", status: "building", badge: "Building",
    body: "If something goes wrong, BROKA provides a dispute resolution path. Seller ratings and buyer feedback accumulate into a reputation system that makes future transactions easier.",
    example: null },
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        headline="From intent to outcome."
        sub="A complete transaction journey — the way BROKA is designed to work when all pieces are in place. We label what is live today, what we are building toward, and what is on the longer-term roadmap."
        atmosphere="atm-violet"
      />

      <section className="sec bg-1 grid-bg" aria-labelledby="journey-h">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 80, alignItems: "start" }}>
            {/* Legend */}
            <div className="journey-legend">
              <h2 className="t-h3" id="journey-h" style={{ marginBottom: 32 }}>The transaction journey</h2>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { status: "current", badge: "Live", desc: "Available on BROKA today" },
                  { status: "building", badge: "Building", desc: "In active development" },
                  { status: "exploring", badge: "Later", desc: "On the longer-term roadmap" },
                ].map((l) => (
                  <div key={l.status} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span className={`badge badge-dot badge-${l.status === "current" ? "live" : l.status === "building" ? "building" : "later"}`}>{l.badge}</span>
                    <span className="t-sm">{l.desc}</span>
                  </div>
                ))}
              </div>
              <div className="card" style={{ marginTop: 36 }}>
                <p className="t-sm" style={{ lineHeight: 1.7 }}>
                  BROKA never misrepresents what is currently live. Every step
                  here is clearly labelled so you know exactly what exists
                  today and what we are working toward.
                </p>
              </div>
            </div>

            {/* Journey steps */}
            <div className="journey" role="list">
              {steps.map((s) => (
                <div className={`journey-step ${s.status}`} key={s.num} role="listitem">
                  <div className="journey-step-header">
                    <span className="journey-num">{s.num}</span>
                    <span className={`badge badge-dot badge-${s.badge === "Live" ? "live" : s.badge === "Building" ? "building" : "later"}`}>
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="journey-title" style={{ marginBottom: 12 }}>{s.title}</h3>
                  <p className="journey-body">{s.body}</p>
                  {s.example && <div className="journey-example">{s.example}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Negotiation flow visual */}
      <section className="sec atm-violet" aria-labelledby="nego-h">
        <div className="wrap">
          <div className="sec-header-center">
            <span className="t-eyebrow">Negotiation layer</span>
            <h2 className="t-h2" id="nego-h">Zeno assists both sides.</h2>
            <p className="t-body">Zeno participates in the negotiation — not as a decision-maker, but as an intelligent assistant with context that neither party had before.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
            {["Buyer", "⇄", "Zeno (BROKA)", "⇄", "Seller"].map((n, i) => (
              i % 2 === 0 ? (
                <div key={i} className={`card card-sm ${n === "Zeno (BROKA)" ? "" : ""}`} style={{ padding: "14px 28px", background: n === "Zeno (BROKA)" ? "var(--c-v-dim)" : "var(--c-surface)", border: n === "Zeno (BROKA)" ? "1px solid var(--c-rule-v)" : "1px solid var(--c-rule)", color: n === "Zeno (BROKA)" ? "var(--c-v-light)" : "var(--c-text-1)", fontWeight: 600, fontSize: 14 }}>
                  {n}
                </div>
              ) : (
                <span key={i} style={{ color: "var(--c-text-3)", fontSize: 20 }}>{n}</span>
              )
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/zeno" className="btn btn-ghost">Explore Zeno in depth →</Link>
          </div>
        </div>
      </section>

      <section className="sec bg-1">
        <div className="wrap">
          <div className="final-cta">
            <h2 className="t-h2" style={{ marginBottom: 16 }}>See the intelligence behind it.</h2>
            <p>Zeno is what makes BROKA different from a listing site with a search bar.</p>
            <div className="final-cta-actions" style={{ marginTop: 32 }}>
              <Link href="/zeno" className="btn btn-primary">Meet Zeno</Link>
              <Link href="/technology" className="btn btn-ghost">Technology →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
