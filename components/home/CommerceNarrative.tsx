import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeData } from "@/lib/api/home";

type JourneyStep = {
  number: string;
  label: string;
  title: string;
  body: string;
};

const journey: JourneyStep[] = [
  { number: "01", label: "Discover", title: "Start with intent, not a form.", body: "Say what you need in your own words. Zeno keeps the useful context in view." },
  { number: "02", label: "Understand", title: "See the shape of the deal.", body: "Compare products, sellers, price, condition and location before you commit." },
  { number: "03", label: "Negotiate", title: "Bring both sides closer.", body: "Zeno can frame an offer and make the next step clearer for buyer and seller." },
  { number: "04", label: "Complete", title: "Move forward with trust.", body: "Payment, messaging, delivery and resolution belong to the same transaction." },
];

const trustLayers = [
  { mark: "01", title: "Context", body: "The product, seller and conversation stay connected." },
  { mark: "02", title: "Protection", body: "Escrow and familiar payment rails support the moment of commitment." },
  { mark: "03", title: "Resolution", body: "A good transaction is one that can be understood after the sale." },
];

export function CommerceNarrative({ data }: { data: HomeData }) {
  const featured = data.featuredListings[0];
  return (
    <>
      <section className="sec cn-discovery" aria-labelledby="cn-discovery-title">
        <div className="wrap cn-discovery-grid">
          <Reveal className="cn-discovery-copy">
            <span className="t-eyebrow">Why BROKA exists</span>
            <h2 className="t-h2" id="cn-discovery-title">Information doesn&apos;t flow where it&apos;s <em>needed.</em></h2>
            <p className="t-body-lg">In informal markets across East Africa, buyers and sellers often meet through layers of friction. Context gets lost. Prices become opaque. Better outcomes become harder to reach.</p>
            <div className="cn-discovery-answer">
              <span className="cn-answer-mark" aria-hidden="true">↗</span>
              <p><strong>BROKA turns the gap into a signal.</strong> Discovery, context, negotiation and trust — connected in one commerce layer.</p>
            </div>
            <Link href="/what-is-broka" className="preview-link">See how BROKA approaches this →</Link>
          </Reveal>
          <Reveal className="cn-signal-map" delay={0.1} aria-label="BROKA connects buyer intent, market context and seller response">
            <div className="cn-map-grid" aria-hidden="true" />
            <div className="cn-map-line cn-map-line-a" aria-hidden="true" />
            <div className="cn-map-line cn-map-line-b" aria-hidden="true" />
            <div className="cn-map-line cn-map-line-c" aria-hidden="true" />
            <div className="cn-map-node cn-map-buyer"><span>BUYER</span><b>intent</b></div>
            <div className="cn-map-node cn-map-zeno"><span>ZENO</span><b>context layer</b></div>
            <div className="cn-map-node cn-map-market"><span>MARKET</span><b>real signals</b></div>
            <div className="cn-map-node cn-map-seller"><span>SELLER</span><b>response</b></div>
            <div className="cn-map-caption">The intelligence between both sides</div>
          </Reveal>
        </div>
      </section>

      <section className="sec cn-journey" aria-labelledby="cn-journey-title">
        <div className="wrap">
          <Reveal className="cn-section-intro">
            <div>
              <span className="t-eyebrow">The transaction, reconnected</span>
              <h2 className="t-h2" id="cn-journey-title">From a vague need to a confident deal.</h2>
            </div>
            <p className="t-body-lg">Not a new set of steps to learn. A clearer way for the steps you already take to work together.</p>
          </Reveal>
          <div className="cn-journey-shell">
            <div className="cn-journey-rail">
              {journey.map((step, i) => (
                <Reveal className={`cn-journey-step ${i === 0 ? "is-active" : ""}`} key={step.number} delay={i * 0.07}>
                  <span className="cn-step-number">{step.number}</span>
                  <div><span className="cn-step-label">{step.label}</span><h3>{step.title}</h3><p>{step.body}</p></div>
                </Reveal>
              ))}
            </div>
            <Reveal className="cn-deal-card" delay={0.12}>
              <div className="cn-deal-top"><span className="cn-deal-kicker"><i /> SIMULATED PRODUCT FLOW</span><span className="cn-deal-time">ZENO / 02</span></div>
              <div className="cn-deal-query"><span>YOU ASKED</span><strong>I need a 55-inch TV under KSh 50,000</strong></div>
              <div className="cn-deal-context"><span className="cn-context-dot" /> Intent understood <b>size · category · budget</b></div>
              <div className="cn-deal-match">
                <div className="cn-match-image" aria-hidden="true">TV</div>
                <div><span>RELEVANT MATCH</span><strong>Compare before you commit</strong><small>Price · condition · seller context</small></div>
                <span className="cn-match-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="cn-deal-footer"><span>Discovery</span><span>Understand</span><span className="is-current">Negotiate</span><span>Complete</span></div>
            </Reveal>
          </div>
          <div className="sec-outro"><Link href="/how-it-works" className="preview-link">See the full transaction journey →</Link></div>
        </div>
      </section>

      <section className="sec cn-trust" aria-labelledby="cn-trust-title">
        <div className="wrap cn-trust-grid">
          <Reveal className="cn-trust-panel">
            <span className="t-eyebrow t-eyebrow-amber">The moment that matters</span>
            <h2 className="t-h2" id="cn-trust-title">A better deal is one you can stand behind.</h2>
            <p className="t-body-lg">Trust is not a badge added at the end. It is the layer that makes discovery, negotiation and payment feel like one continuous decision.</p>
            <div className="cn-trust-stack">
              {trustLayers.map((layer, i) => (
                <Reveal className="cn-trust-row" key={layer.mark} delay={i * 0.08}>
                  <span>{layer.mark}</span><div><strong>{layer.title}</strong><p>{layer.body}</p></div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal className="cn-trust-visual" delay={0.1}>
            <div className="cn-trust-orbit" aria-hidden="true"><span /><span /><span /></div>
            <div className="cn-trust-core"><span className="cn-core-pulse" /><strong>ESCROW</strong><small>protected payment layer</small></div>
            <div className="cn-trust-chip cn-chip-mpesa">M-PESA <b>familiar rail</b></div>
            <div className="cn-trust-chip cn-chip-chat">CHAT <b>seller context</b></div>
            <div className="cn-trust-chip cn-chip-resolve">RESOLVE <b>after the sale</b></div>
            <div className="cn-trust-note">Designed around the real decision, not the ideal one.</div>
          </Reveal>
        </div>
      </section>

      <section className="sec cn-seller" aria-labelledby="cn-seller-title">
        <div className="wrap cn-seller-grid">
          <Reveal className="cn-seller-poster">
            <span className="cn-seller-index">BROKA / SELL</span>
            <div className="cn-seller-signal">SELLER <i /> READY</div>
            <div className="cn-seller-poster-copy"><span>PUT YOUR<br /><em>CONTEXT</em><br />TO WORK.</span><small>Reach the right buyer with less back-and-forth.</small></div>
            <div className="cn-seller-bars" aria-hidden="true"><i /><i /><i /><i /></div>
          </Reveal>
          <Reveal className="cn-seller-copy" delay={0.1}>
            <span className="t-eyebrow">For sellers</span>
            <h2 className="t-h2" id="cn-seller-title">The better buyer is not always the closest one.</h2>
            <p className="t-body-lg">BROKA gives sellers a clearer way to present what they have, respond with context and move toward a fairer outcome — without shouting into a crowded feed.</p>
            <div className="cn-seller-points"><span>List once</span><span>Be understood</span><span>Negotiate clearly</span></div>
            <Link href="/sell" className="btn btn-primary btn-sm">Sell on BROKA <span aria-hidden="true">↗</span></Link>
          </Reveal>
        </div>
      </section>

      <section className="sec cn-proof" aria-labelledby="cn-proof-title">
        <div className="wrap">
          <Reveal className="cn-section-intro cn-proof-intro">
            <div><span className="t-eyebrow">Built in Kenya. Designed to travel.</span><h2 className="t-h2" id="cn-proof-title">Start local. Carry the infrastructure forward.</h2></div>
            <p className="t-body-lg">Kenya is where BROKA understands the patterns, languages and payment systems first. The problem — and the ambition — reaches further.</p>
          </Reveal>
          <div className="cn-proof-grid">
            <Reveal className="cn-proof-route">
              <div className="cn-route-line" aria-hidden="true" />
              <div className="cn-route-point is-active"><i /> <strong>Kenya</strong><span>Where we start</span></div>
              <div className="cn-route-point"><i /> <strong>East Africa</strong><span>Where it expands</span></div>
              <div className="cn-route-point"><i /> <strong>Global</strong><span>The ambition</span></div>
            </Reveal>
            <Reveal className="cn-stack-card" delay={0.1}>
              <span className="cn-stack-caption">UNDER THE HOOD</span>
              <h3>Engineered for real commerce.</h3>
              <p>AI systems, marketplace infrastructure, payments, trust mechanisms and real-time communication — one platform layer at a time.</p>
              <div className="cn-tech-stack"><span>AI INTELLIGENCE</span><span>COMMERCE LAYER</span><span className="is-core">BROKA API</span><span>TRUST &amp; SAFETY</span><span>PAYMENTS + MESSAGING</span></div>
              <Link href="/technology" className="preview-link">See the architecture →</Link>
            </Reveal>
          </div>
          {featured && <p className="cn-proof-footnote">The system is being built around the market that is already here — including live listings like <Link href={`/listings/${featured.id}`}>{featured.name}</Link>.</p>}
          <div className="sec-outro"><Link href="/vision" className="preview-link">See the long-term vision →</Link></div>
        </div>
      </section>
    </>
  );
}
