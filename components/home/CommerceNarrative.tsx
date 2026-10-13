import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type JourneyStep = {
  number: string;
  label: string;
  title: string;
  body: string;
};

const journey: JourneyStep[] = [
  { number: "01", label: "Discover", title: "Start with what you need.", body: "Describe what you are looking for; Zeno can help surface relevant listings." },
  { number: "02", label: "Compare", title: "See the useful details.", body: "Review price, condition, location and seller context before choosing a next step." },
  { number: "03", label: "Connect", title: "Talk directly with the seller.", body: "Use the available contact options to ask questions and clarify a listing." },
  { number: "04", label: "Decide", title: "Make arrangements together.", body: "Buyers and sellers agree any purchase, payment and delivery directly. BROKA does not process or hold payments." },
];

const marketplaceLayers = [
  { mark: "01", title: "Discover", body: "Browse products and stores across the marketplace." },
  { mark: "02", title: "Compare", body: "Keep product details and seller context in view." },
  { mark: "03", title: "Connect", body: "Reach out to sellers and decide what works for you." },
];

export function CommerceNarrative() {
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
              <p><strong>BROKA turns the gap into a signal.</strong> Browse listings, compare useful context and connect directly with sellers.</p>
            </div>
            <Link href="/what-is-broka" className="preview-link">See how BROKA approaches this →</Link>
          </Reveal>
          <Reveal className="cn-signal-map" delay={0.1} aria-label="BROKA connects buyer intent, marketplace context and seller listings">
            <div className="cn-map-grid" aria-hidden="true" />
            <div className="cn-map-line cn-map-line-a" aria-hidden="true" />
            <div className="cn-map-line cn-map-line-b" aria-hidden="true" />
            <div className="cn-map-line cn-map-line-c" aria-hidden="true" />
            <div className="cn-map-node cn-map-buyer"><span>BUYER</span><b>intent</b></div>
            <div className="cn-map-node cn-map-zeno"><span>ZENO</span><b>context layer</b></div>
            <div className="cn-map-node cn-map-market"><span>MARKET</span><b>real signals</b></div>
            <div className="cn-map-node cn-map-seller"><span>SELLER</span><b>listings</b></div>
            <div className="cn-map-caption">A clearer view of the marketplace</div>
          </Reveal>
        </div>
      </section>

      <section className="sec cn-journey" aria-labelledby="cn-journey-title">
        <div className="wrap">
          <Reveal className="cn-section-intro">
            <div>
              <span className="t-eyebrow">The marketplace journey</span>
              <h2 className="t-h2" id="cn-journey-title">From search to direct connection.</h2>
            </div>
            <p className="t-body-lg">BROKA brings useful context into view. Buyers and sellers arrange any sale, payment and delivery directly with each other.</p>
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
              <div className="cn-deal-top"><span className="cn-deal-kicker"><i /> SIMULATED SEARCH</span><span className="cn-deal-time">ZENO / 02</span></div>
              <div className="cn-deal-query"><span>YOU ASKED</span><strong>I need a 55-inch TV under KSh 50,000</strong></div>
              <div className="cn-deal-context"><span className="cn-context-dot" /> Intent understood <b>size · category · budget</b></div>
              <div className="cn-deal-match">
                <div className="cn-match-image" aria-hidden="true">TV</div>
                <div><span>LISTING CONTEXT</span><strong>Compare before you contact</strong><small>Price · condition · seller details</small></div>
                <span className="cn-match-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="cn-deal-footer"><span>Discover</span><span>Compare</span><span className="is-current">Contact</span></div>
            </Reveal>
          </div>
          <div className="sec-outro"><Link href="/how-it-works" className="preview-link">See how marketplace discovery works →</Link></div>
        </div>
      </section>

      <section className="sec cn-trust" aria-labelledby="cn-trust-title">
        <div className="wrap cn-trust-grid">
          <Reveal className="cn-trust-panel">
            <span className="t-eyebrow t-eyebrow-amber">A clearer way to find your next step</span>
            <h2 className="t-h2" id="cn-trust-title">See the context. <em>Choose what comes next.</em></h2>
            <p className="t-body-lg">Explore product details and seller information, then decide whether to reach out. BROKA is a discovery layer—not a payment handler.</p>
            <div className="cn-trust-stack">
              {marketplaceLayers.map((layer, i) => (
                <Reveal className="cn-trust-row" key={layer.mark} delay={i * 0.08}>
                  <span>{layer.mark}</span><div><strong>{layer.title}</strong><p>{layer.body}</p></div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal
            className="cn-trust-visual"
            delay={0.1}
            aria-label="BROKA marketplace discovery: explore categories, compare listing context and contact sellers directly. BROKA does not process or hold payments."
          >
            <div className="cn-market-header">
              <span className="cn-market-brand"><i aria-hidden="true">B</i> BROKA <b>/ MARKET RADAR</b></span>
              <span className="cn-market-status"><i aria-hidden="true" /> KENYA / MARKETPLACE</span>
            </div>

            <div className="cn-market-stage">
              <div className="cn-market-art" aria-hidden="true">
                <span className="cn-market-orbit cn-market-orbit-a" />
                <span className="cn-market-orbit cn-market-orbit-b" />
                <div className="cn-market-image cn-market-image-electronics"><span>Electronics</span></div>
                <div className="cn-market-image cn-market-image-fashion"><span>Fashion</span></div>
                <div className="cn-market-image cn-market-image-home"><span>Home &amp; living</span></div>
                <div className="cn-market-lens"><Search size={19} strokeWidth={1.8} /><span>DISCOVER</span></div>
                <i className="cn-market-spark cn-market-spark-one" />
                <i className="cn-market-spark cn-market-spark-two" />
              </div>
              <div className="cn-market-copy">
                <span>01 / MARKETPLACE SIGNAL</span>
                <h3>Find your next move.</h3>
                <p>Useful listing and seller context, before the conversation starts.</p>
                <div className="cn-market-tags"><span>PRICE</span><span>CONDITION</span><span>LOCATION</span></div>
              </div>
            </div>

            <ol className="cn-market-flow" aria-label="Marketplace steps">
              <li><span>01</span><strong>Discover</strong><small>Explore listings</small></li>
              <li><span>02</span><strong>Compare</strong><small>Review context</small></li>
              <li><span>03</span><strong>Connect</strong><small>Contact seller</small></li>
            </ol>

            <div className="cn-market-footer">
              <span><MessageCircle size={13} aria-hidden="true" /> DIRECT SELLER CONTACT</span>
              <span>SALE &amp; PAYMENT ARRANGED DIRECTLY</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec cn-seller" aria-labelledby="cn-seller-title">
          <div className="wrap cn-seller-grid">
            <Reveal className="cn-seller-poster">
              <div className="cn-seller-preview-head">
                <span className="cn-seller-preview-brand"><i aria-hidden="true">B</i> BROKA <b>/ SELLER STUDIO</b></span>
                <span className="cn-seller-preview-status"><i aria-hidden="true" /> SAMPLE PREVIEW</span>
              </div>
              <div className="cn-seller-feature">
                <span className="cn-seller-feature-tag">ARTS &amp; CRAFTS</span>
                <div className="cn-seller-feature-copy">
                  <span>LISTING PREVIEW / 01</span>
                  <strong>Give the details room to shine.</strong>
                  <div className="cn-seller-feature-points"><i>Clear photos</i><i>Honest details</i></div>
                </div>
              </div>
              <div className="cn-seller-preview-foot">
                <span className="cn-seller-avatar" aria-hidden="true">S</span>
                <div className="cn-seller-profile-copy">
                  <span>SELLER PROFILE</span>
                  <strong>Details · location · contact</strong>
                </div>
                <span className="cn-seller-contact-pill"><MessageCircle size={12} aria-hidden="true" /> Contact seller</span>
              </div>
            </Reveal>
            <Reveal className="cn-seller-copy" delay={0.1}>
              <span className="t-eyebrow">For sellers</span>
              <h2 className="t-h2" id="cn-seller-title">Make your listings easy to understand.</h2>
              <p className="t-body-lg">Show clear photos, accurate details and seller context so interested buyers know what to expect and how to contact you. Any purchase, payment and delivery are arranged directly between you and the buyer.</p>
              <div className="cn-seller-points"><span>Clear product context</span><span>Seller presence</span><span>Direct contact</span></div>
              <Link href="/sell" className="btn btn-primary btn-sm">Create a listing <span aria-hidden="true">↗</span></Link>
            </Reveal>
        </div>
      </section>

      <section className="sec cn-proof" aria-labelledby="cn-proof-title">
        <div className="wrap">
          <Reveal className="cn-section-intro cn-proof-intro">
            <div><span className="t-eyebrow">Built in Kenya. Designed to travel.</span><h2 className="t-h2" id="cn-proof-title">Start local. Carry the infrastructure forward.</h2></div>
            <p className="t-body-lg">Kenya is where BROKA learns the patterns, languages and ways people buy and sell first. The problem — and the ambition — reaches further.</p>
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
              <p>AI systems, marketplace infrastructure, seller context and real-time communication — one platform layer at a time.</p>
              <div className="cn-tech-stack"><span>AI INTELLIGENCE</span><span>MARKETPLACE LAYER</span><span className="is-core">BROKA API</span><span>SELLER CONTEXT</span><span>MESSAGING</span></div>
              <Link href="/technology" className="preview-link">See the architecture →</Link>
            </Reveal>
          </div>
          <div className="sec-outro"><Link href="/vision" className="preview-link">See the long-term vision →</Link></div>
        </div>
      </section>
    </>
  );
}
