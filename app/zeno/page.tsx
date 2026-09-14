import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ZenoInterface } from "@/components/zeno/ZenoInterface";

export const metadata: Metadata = {
  title: "Zeno — BROKA AI",
  description: "Zeno is BROKA's AI commerce companion — designed to understand intent, surface relevant sellers, assist negotiations, and build trust across every transaction.",
};

const capabilities = [
  { icon: "🎯", title: "Intent understanding", body: "Zeno understands what you are looking for — price, condition, location, urgency — without requiring you to fill in a structured form.", status: "live" },
  { icon: "🔍", title: "Contextual discovery", body: "Zeno does not just match keywords. It surfaces sellers and listings that match the actual intent behind the request, ranked by relevance.", status: "live" },
  { icon: "📋", title: "Seller context", body: "Zeno knows the seller's history, transaction record, response time and reputation — and uses this to inform both sides of a deal.", status: "live" },
  { icon: "🤝", title: "Negotiation assistance", body: "Zeno can help a buyer frame an offer, provide context to a seller, and move both sides toward a fair agreement — without replacing human judgment.", status: "building" },
  { icon: "📚", title: "Conversation history", body: "Zeno maintains the thread of a negotiation over time — who said what, what was offered, what was accepted — so nothing is lost.", status: "live" },
  { icon: "🌍", title: "Multilingual direction", body: "A long-term goal is for Zeno to work in Swahili, Kikuyu and other local languages — making intelligent commerce accessible to more people.", status: "exploring" },
];

export default function ZenoPage() {
  return (
    <>
      <section className="page-hero atm-violet grid-bg" aria-labelledby="zeno-page-h">
        <div className="wrap">
          <span className="t-eyebrow">Meet Zeno</span>
          <h1 className="t-h1 page-hero-headline" id="zeno-page-h">
            Intelligence built into<br className="br-lg" />every transaction.
          </h1>
          <p className="page-hero-sub">
            Zeno is not a chatbot attached to a marketplace. Zeno is the
            intelligence layer that makes BROKA different — understanding
            context on both sides of a deal and helping both parties reach
            a better outcome.
          </p>
          <div className="page-hero-actions">
            <Link href="/how-it-works" className="btn btn-primary">See how Zeno fits in</Link>
            <Link href="/what-is-broka" className="btn btn-ghost">What is BROKA →</Link>
          </div>
        </div>
      </section>

      {/* Strong statement */}
      <section className="sec bg-2" aria-label="Zeno positioning">
        <div className="wrap">
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <p className="t-h2" style={{ lineHeight: 1.15, color: "var(--c-text-1)" }}>
              &ldquo;Zeno is not a chatbot<br className="br-lg" />attached to a marketplace.&rdquo;
            </p>
            <p className="t-body-lg" style={{ marginTop: 28, maxWidth: 580, margin: "28px auto 0" }}>
              Existing commerce platforms add a chat window and call it AI. Zeno
              is something different — it is the intelligence woven into the
              fabric of every BROKA transaction. It knows the buyer, knows the
              seller, knows the deal context, and uses all of it.
            </p>
          </div>
        </div>
      </section>

      {/* Live interface demo */}
      <section className="sec atm-violet" aria-labelledby="zeno-demo-h">
        <div className="wrap">
          <div className="sec-header-center">
            <span className="t-eyebrow">In practice</span>
            <h2 className="t-h2" id="zeno-demo-h">What Zeno looks like.</h2>
            <p className="t-body">A simulated Zeno session — showing intent understanding, discovery, negotiation, and the context panel Zeno maintains throughout.</p>
          </div>
          <ZenoInterface />
        </div>
      </section>

      {/* Capabilities */}
      <section className="sec bg-1" aria-labelledby="zeno-cap-h">
        <div className="wrap">
          <div className="sec-header">
            <span className="t-eyebrow">Capabilities</span>
            <h2 className="t-h2" id="zeno-cap-h">What Zeno is designed to do.</h2>
            <p className="t-body">Current capabilities and the direction Zeno is developing toward.</p>
          </div>
          <div className="zeno-capabilities">
            {capabilities.map((c) => (
              <div className="zeno-cap" key={c.title}>
                <span className="zeno-cap-icon">{c.icon}</span>
                <h3 className="zeno-cap-title">{c.title}</h3>
                <p className="zeno-cap-body">{c.body}</p>
                <span className={`badge badge-dot ${c.status === "live" ? "badge-live" : c.status === "building" ? "badge-building" : "badge-later"}`} style={{ marginTop: 14 }}>
                  {c.status === "live" ? "Live" : c.status === "building" ? "Building" : "Later"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="sec atm-violet-center" aria-labelledby="zeno-phil-h">
        <div className="wrap" style={{ maxWidth: 760, margin: "0 auto" }}>
          <span className="t-eyebrow" style={{ textAlign: "center", display: "block" }}>Design philosophy</span>
          <h2 className="t-h2" id="zeno-phil-h" style={{ textAlign: "center", marginBottom: 40 }}>Assist, not replace.</h2>
          <div className="grid-2" style={{ gap: 24 }}>
            {[
              { title: "Zeno assists. You decide.", body: "Zeno provides context, surfaces options and helps frame conversations — but every deal decision stays with the buyer and seller. Zeno is a tool, not a decision-maker." },
              { title: "Both sides benefit.", body: "Unlike an intermediary who represents one side, Zeno is designed to be useful to buyer and seller alike. Better information for both leads to better deals for both." },
              { title: "Context is everything.", body: "A good negotiation assistant knows the history. Zeno maintains the thread of a deal over time — what was said, what was offered, what matters to each party." },
              { title: "Built to scale.", body: "Zeno is designed to work at scale across many simultaneous transactions — providing the context a human broker would, but without the single-point-of-failure problem." },
            ].map((p) => (
              <div className="card" key={p.title}>
                <h3 className="t-h4" style={{ marginBottom: 10 }}>{p.title}</h3>
                <p className="t-body" style={{ fontSize: 14 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec bg-1">
        <div className="wrap">
          <div className="final-cta">
            <h2 className="t-h2" style={{ marginBottom: 16 }}>See Zeno in the context of the full platform.</h2>
            <p>Zeno is one piece of a larger commerce intelligence system.</p>
            <div className="final-cta-actions" style={{ marginTop: 32 }}>
              <Link href="/how-it-works" className="btn btn-primary">How it works</Link>
              <Link href="/technology" className="btn btn-ghost">Technology →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
