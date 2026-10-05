import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ZenoInterface } from "@/components/zeno/ZenoInterface";

export const metadata: Metadata = {
  title: "Zeno — BROKA AI",
  description: "Zeno is BROKA's AI commerce companion — designed to understand intent, surface relevant sellers, assist negotiations, and build trust across every transaction.",
};

const capabilities = [
  { index: "01", title: "Understands intent", body: "What you need, at what price, in what condition — without requiring a structured form.", status: "Live" },
  { index: "02", title: "Knows the context", body: "Seller history, deal context and the negotiation thread stay in the same picture.", status: "Live" },
  { index: "03", title: "Surfaces the right signal", body: "Zeno helps turn a crowded catalogue into a smaller set of useful decisions.", status: "Live" },
  { index: "04", title: "Assists negotiation", body: "Zeno can frame an offer and help both sides move toward a fair agreement.", status: "Building" },
  { index: "05", title: "Keeps the thread", body: "What was said, offered and accepted remains available when the deal continues.", status: "Live" },
  { index: "06", title: "Travels with the market", body: "The long-term direction is intelligent commerce that can speak to more people and places.", status: "Exploring" },
];

export default function ZenoPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Zeno / Intelligence layer"
        headline="The intelligence between both sides of a deal."
        sub="Zeno is not a chatbot attached to a marketplace. Zeno helps BROKA understand intent, preserve context and make the next commerce decision clearer."
      >
        <Link href="#zeno-session" className="btn btn-primary">See Zeno in practice</Link>
        <Link href="/how-it-works" className="btn btn-ghost">How it fits →</Link>
      </PageHero>

      <section className="sec zeno-route-positioning" aria-labelledby="zeno-positioning-title">
        <div className="wrap zeno-route-positioning-grid">
          <div>
            <span className="t-eyebrow">Not a layer on top</span>
            <h2 className="t-h2" id="zeno-positioning-title">Zeno is designed around the transaction itself.</h2>
          </div>
          <div className="zeno-route-statement">
            <span className="zeno-route-quote-mark">“</span>
            <p>It knows the buyer, knows the seller, knows the deal context — and uses all of it to help both sides make a better decision.</p>
            <span className="zeno-route-statement-label">BROKA / DESIGN PRINCIPLE</span>
          </div>
        </div>
      </section>

      <section className="sec zeno-route-session" id="zeno-session" aria-labelledby="zeno-session-title">
        <div className="wrap">
          <div className="sec-header-center zeno-route-header">
            <span className="t-eyebrow">Simulated product session</span>
            <h2 className="t-h2" id="zeno-session-title">A conversation that keeps the useful parts.</h2>
            <p className="t-body">Intent understanding, relevant discovery, negotiation context and a clear next step — in one surface.</p>
          </div>
          <ZenoInterface />
          <p className="zeno-route-disclosure">Demo only — sample listings and simulated responses, not connected to the live BROKA platform.</p>
        </div>
      </section>

      <section className="sec zeno-route-capabilities" aria-labelledby="zeno-capabilities-title">
        <div className="wrap">
          <div className="sec-header zeno-route-header-left">
            <span className="t-eyebrow">Capabilities</span>
            <h2 className="t-h2" id="zeno-capabilities-title">Useful at every handoff.</h2>
            <p className="t-body-lg">Zeno should make the decision clearer without taking the decision away from the people making the deal.</p>
          </div>
          <div className="zeno-route-cap-grid">
            {capabilities.map((capability) => (
              <article className="zeno-route-cap" key={capability.index}>
                <div className="zeno-route-cap-top"><span>{capability.index}</span><b className={capability.status === "Live" ? "is-live" : ""}>{capability.status}</b></div>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec zeno-route-principles" aria-labelledby="zeno-principles-title">
        <div className="wrap">
          <div className="zeno-route-principles-head"><span className="t-eyebrow">Design philosophy</span><h2 className="t-h2" id="zeno-principles-title">Assist, not replace.</h2></div>
          <div className="zeno-route-principle-grid">
            <article><span>01</span><h3>You decide.</h3><p>Zeno provides context, surfaces options and helps frame conversations. Every deal decision stays with the buyer and seller.</p></article>
            <article><span>02</span><h3>Both sides benefit.</h3><p>Zeno is designed to be useful to buyer and seller alike. Better information for both leads to better deals for both.</p></article>
            <article><span>03</span><h3>Context is everything.</h3><p>A good negotiation assistant knows the history. Zeno maintains the thread of a deal over time.</p></article>
          </div>
          <div className="sec-outro"><Link href="/technology" className="preview-link">See the architecture behind Zeno →</Link></div>
        </div>
      </section>
    </>
  );
}
