import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "How it Works",
  description: "See how BROKA helps people discover listings, compare seller context and contact sellers directly. Buyers and sellers arrange purchases and payments themselves.",
};

const steps = [
  { num: "01", title: "Discover", status: "current", badge: "Live",
    body: "Browse marketplace categories or describe what you are looking for to find relevant listings.",
    example: '"I need a used MacBook in good condition under KES 80,000 — preferably in Nairobi."' },
  { num: "02", title: "Compare", status: "current", badge: "Live",
    body: "Review the listing, price, condition, location and available seller context before deciding what to do next.",
    example: null },
  { num: "03", title: "Connect", status: "current", badge: "Live",
    body: "Use the available contact options to ask the seller questions or get more information about the listing.",
    example: null },
  { num: "04", title: "Arrange directly", status: "current", badge: "Direct",
    body: "If you choose to proceed, you and the seller agree any sale, payment and delivery directly. BROKA does not process or hold payments.",
    example: null },
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        headline="From search to seller contact."
        sub="BROKA helps you discover listings, compare seller context and make contact. Buyers and sellers arrange any purchase, payment and delivery directly with each other."
        atmosphere="atm-violet"
      />

      <section className="sec bg-1 grid-bg" aria-labelledby="journey-h">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 80, alignItems: "start" }}>
            {/* Legend */}
            <div className="journey-legend">
              <h2 className="t-h3" id="journey-h" style={{ marginBottom: 32 }}>The marketplace journey</h2>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { status: "current", badge: "BROKA", desc: "Discovery and context features" },
                  { status: "direct", badge: "Direct", desc: "Sale and payment arranged by the parties" },
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

          {/* Zeno context visual */}
      <section className="sec atm-violet" aria-labelledby="nego-h">
        <div className="wrap">
          <div className="sec-header-center">
            <span className="t-eyebrow">Zeno / Market context</span>
            <h2 className="t-h2" id="nego-h">Think it through before you reach out.</h2>
            <p className="t-body">Use Zeno to clarify what you need, understand listing context and prepare questions. Buyers and sellers discuss any sale and payment directly with each other.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
            {["Buyer", "→", "Zeno (BROKA)", "→", "Market context"].map((n, i) => (
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
            <p>Zeno adds marketplace context to discovery; it does not process or mediate a buyer-seller sale.</p>
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
