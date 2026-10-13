import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ZenoInterface } from "@/components/zeno/ZenoInterface";

export const metadata: Metadata = {
  title: "Zeno — BROKA AI",
  description: "Zeno helps people clarify what they are looking for, compare marketplace context and decide whether to contact a seller.",
};

const capabilities = [
  { index: "01", title: "Understands intent", body: "What you need, at what price and in what condition — without requiring a structured form.", status: "Live" },
  { index: "02", title: "Keeps context close", body: "Listing details, seller-provided information and your search preferences stay in view.", status: "Live" },
  { index: "03", title: "Surfaces useful signals", body: "Zeno helps turn a crowded catalogue into a smaller set of relevant options to explore.", status: "Live" },
  { index: "04", title: "Prepares better questions", body: "Zeno can help you understand a listing and prepare questions before contacting a seller.", status: "Building" },
  { index: "05", title: "Keeps your search in context", body: "Your preferences and useful details remain available as you compare listings.", status: "Live" },
  { index: "06", title: "Travels with the market", body: "The long-term direction is intelligent commerce that can speak to more people and places.", status: "Exploring" },
];

export default function ZenoPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Zeno / Intelligence layer"
        headline="The intelligence for a clearer search."
        sub="Zeno helps you clarify what you need, compare marketplace context and decide whether to contact a seller. Buyers and sellers handle any sale and payment directly."
      >
        <Link href="#zeno-session" className="btn btn-primary">See Zeno in practice</Link>
        <Link href="/how-it-works" className="btn btn-ghost">How it fits →</Link>
      </PageHero>

      <section className="sec zeno-route-positioning" aria-labelledby="zeno-positioning-title">
        <div className="wrap zeno-route-positioning-grid">
          <div>
            <span className="t-eyebrow">Not a layer on top</span>
            <h2 className="t-h2" id="zeno-positioning-title">Zeno is designed around the search itself.</h2>
          </div>
          <div className="zeno-route-statement">
            <span className="zeno-route-quote-mark">“</span>
            <p>It helps clarify what the buyer is looking for, brings relevant listing details into view and leaves the next step to the people involved.</p>
            <span className="zeno-route-statement-label">BROKA / DESIGN PRINCIPLE</span>
          </div>
        </div>
      </section>

      <section className="sec zeno-route-session" id="zeno-session" aria-labelledby="zeno-session-title">
        <div className="wrap">
          <div className="sec-header-center zeno-route-header">
            <span className="t-eyebrow">Simulated product session</span>
            <h2 className="t-h2" id="zeno-session-title">A conversation that makes the search clearer.</h2>
            <p className="t-body">Intent understanding, relevant discovery, listing context and useful questions — before you contact a seller.</p>
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
            <p className="t-body-lg">Zeno helps people explore options. It does not contact sellers, negotiate offers or complete purchases on their behalf.</p>
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
            <article><span>01</span><h3>You decide.</h3><p>Zeno provides context and surfaces options. You decide whether, when and how to contact the seller.</p></article>
            <article><span>02</span><h3>Useful to both sides.</h3><p>Clearer product and seller information can help buyers compare and help sellers present what they have.</p></article>
            <article><span>03</span><h3>Context is everything.</h3><p>Zeno keeps search preferences and listing information together; buyer-seller arrangements stay between the parties.</p></article>
          </div>
          <div className="sec-outro"><Link href="/technology" className="preview-link">See the architecture behind Zeno →</Link></div>
        </div>
      </section>
    </>
  );
}
