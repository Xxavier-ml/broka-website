import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "What is BROKA",
  description: "BROKA is an intelligent commerce platform connecting buyers and sellers with AI-assisted discovery, negotiation and trust tools built in.",
};

export default function WhatIsBroka() {
  return (
    <>
      <PageHero
        eyebrow="What is BROKA"
        headline="Commerce intelligence, not just a marketplace."
        sub="BROKA is an intelligent commerce platform designed to connect buyers and sellers more directly — with AI-assisted discovery, negotiation and trust built into the experience from the ground up."
        atmosphere="atm-violet"
      >
        <Link href="/how-it-works" className="btn btn-primary">See how it works</Link>
        <Link href="/zeno" className="btn btn-ghost">Meet Zeno →</Link>
      </PageHero>

      {/* ── The problem BROKA addresses ── */}
      <section className="sec bg-1" aria-labelledby="wib-prob-h">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 80 }}>
            <div>
              <span className="t-eyebrow">The problem</span>
              <h2 className="t-h2" id="wib-prob-h" style={{ marginBottom: 24 }}>
                Information rarely flows where it needs to go.
              </h2>
              <p className="t-body" style={{ marginBottom: 16 }}>
                In many informal markets, buyers and sellers rarely interact
                directly. Intermediaries help bridge the gap — but they can also
                introduce significant cost, opacity and friction. A buyer paying
                KES 250,000 for something listed at KES 200,000 may not know
                where the extra KES 50,000 went.
              </p>
              <p className="t-body" style={{ marginBottom: 16 }}>
                Both sides often lack the context they need to make good
                decisions. The seller doesn't know what the buyer really values.
                The buyer doesn't know what the seller will actually accept. And
                trust has to be built from scratch every time.
              </p>
              <p className="t-body">
                BROKA is exploring a different model — one where technology
                provides the context, reduces the asymmetry and helps both sides
                reach better outcomes without requiring another layer of
                intermediaries.
              </p>
            </div>
            {/* Old vs new */}
            <div>
              <div className="wib-comparison">
                <div>
                  <p className="wib-col-label old">Traditional model</p>
                  <div className="wib-items">
                    {["Multiple intermediaries", "Information asymmetry", "Opaque pricing", "Trust built on nothing", "Friction at every step", "Limited recourse"].map((i) => (
                      <div key={i} className="wib-item old">
                        <span style={{ color: "#555" }}>−</span> {i}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="wib-vs" aria-hidden="true">vs</div>
                <div>
                  <p className="wib-col-label new">BROKA model</p>
                  <div className="wib-items">
                    {["Direct buyer–seller connection", "AI provides shared context", "Transparent pricing assistance", "Trust built into the platform", "Reduced friction by design", "Dispute resolution layer"].map((i) => (
                      <div key={i} className="wib-item new">
                        <span style={{ color: "var(--c-v-light)" }}>+</span> {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Four pillars ── */}
      <section className="sec atm-violet-center" aria-labelledby="wib-pillars-h">
        <div className="wrap">
          <div className="sec-header-center">
            <span className="t-eyebrow">What BROKA provides</span>
            <h2 className="t-h2" id="wib-pillars-h">One platform. Four capabilities.</h2>
            <p className="t-body">Together, these form an intelligent commerce experience — not four separate tools.</p>
          </div>
          <div className="pillars-grid">
            {[
              { num: "01", title: "Discover", body: "Find products, sellers and opportunities that match what you actually need — not just what happens to be listed. Context-aware search, seller profiles and relevant market information.", badge: "Live" },
              { num: "02", title: "Understand", body: "Get useful context about products, sellers and deals before committing. Better information on both sides leads to better decisions for everyone.", badge: "Live" },
              { num: "03", title: "Negotiate", body: "Zeno can assist the negotiation process — helping buyers frame requests, providing sellers with context, and helping both sides move toward a fair agreement.", badge: "Building" },
              { num: "04", title: "Complete", body: "Move toward payment, delivery, trust and dispute resolution — all within one platform. Commerce that doesn't end at the handshake.", badge: "Building" },
            ].map((p) => (
              <div className="pillar" key={p.num}>
                <span className="pillar-num">{p.num}</span>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-body">{p.body}</p>
                <span className={`badge badge-dot ${p.badge === "Live" ? "badge-live" : "badge-building"}`} style={{ marginTop: 16 }}>{p.badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Buyer and seller perspective ── */}
      <section className="sec bg-2" aria-labelledby="wib-pov-h">
        <div className="wrap">
          <div className="sec-header">
            <span className="t-eyebrow">Two perspectives, one platform</span>
            <h2 className="t-h2" id="wib-pov-h">BROKA works for both sides.</h2>
          </div>
          <div className="wib-perspective">
            <div className="wib-pov">
              <p className="wib-pov-label">For buyers</p>
              <h3>Find it. Understand it. Negotiate it.</h3>
              <ul>
                {["Describe what you need in plain language", "See relevant sellers and their history", "Get pricing context before making an offer", "Negotiate with Zeno's assistance", "Complete the transaction with a trust layer"].map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            </div>
            <div className="wib-pov">
              <p className="wib-pov-label" style={{ color: "var(--c-a)" }}>For sellers</p>
              <h3>List. Be discovered. Close deals.</h3>
              <ul>
                {["List products or services with minimal friction", "Be surfaced to buyers with genuine intent", "Receive and respond to negotiation requests", "Build verifiable seller reputation over time", "Complete transactions with platform-backed trust"].map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec bg-1" aria-labelledby="wib-cta-h">
        <div className="wrap">
          <div className="final-cta">
            <h2 className="t-h2" id="wib-cta-h" style={{ marginBottom: 16 }}>Ready to see it in action?</h2>
            <p>Walk through a full transaction journey or explore Zeno in depth.</p>
            <div className="final-cta-actions" style={{ marginTop: 32 }}>
              <Link href="/how-it-works" className="btn btn-primary">See how it works</Link>
              <Link href="/zeno" className="btn btn-ghost">Meet Zeno →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
