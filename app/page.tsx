import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { ZenoDemo } from "@/components/zeno/ZenoDemo";
import { FlowMesh } from "@/components/visuals/FlowMesh";
import { HomeHero } from "@/components/home/HomeHero";
import { BrandMotion } from "@/components/home/BrandMotion";
import { LiveMarketplace } from "@/components/marketplace/LiveMarketplace";
import { getHomeData } from "@/lib/api/home";

// The auctions and stores on this page come from the BROKA API; rebuild it
// from fresh data every minute rather than once at deploy time.
export const revalidate = 60;

/**
 * The home page, in the order it is meant to be read:
 *
 *   1. What BROKA is            — the hero
 *   2. What is on BROKA today   — live listings
 *   3. Why it exists            — the problem
 *   4. What we are building     — the four capabilities
 *   5. The differentiator       — Zeno
 *   6. Where it goes            — the vision
 *   7. How it is built          — the technology
 *   8. Who is building it       — the founders
 *   9. What to do next          — the closing call to action
 *
 * Every section answers one question and hands off to the next. The page used
 * to also carry a three-step "Find / Negotiate / Complete" strip that restated
 * the four capabilities above it in different words, and the four capabilities
 * restated the eight-step journey on /how-it-works. One framing now, with a
 * link to the detail.
 */
export default async function Home() {
  const market = await getHomeData();
  return (
    <>
      {/* ─── 1. HERO: pitch, search, Zeno's orbit, live numbers ─ */}
      <HomeHero data={market} />

      {/* ─── 2. LIVE LISTINGS + NEW STORES (from the BROKA API) ─ */}
      <LiveMarketplace data={market} />

      {/* ─── 3. THE PROBLEM ───────────────────────────────────── */}
      <section className="sec bg-2" aria-labelledby="prob-h">
        <div className="wrap">
          <Reveal className="home-problem">
            <span className="t-eyebrow">Why BROKA exists</span>
            <p className="home-problem-statement" id="prob-h">
              Information doesn&apos;t flow where it&apos;s <em>needed.</em>
            </p>
            <p className="home-problem-body">
              In informal markets across East Africa, buyers and sellers rarely
              deal with each other directly. Intermediaries connect both sides
              — but they can also introduce cost, opacity and friction. The
              result is that both parties often end up worse off than they
              should be.
            </p>
            <Link href="/what-is-broka" className="btn btn-ghost btn-sm">
              See how BROKA approaches this →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── 4. WHAT BROKA IS ─────────────────────────────────── */}
      <section className="sec bg-1" id="about" aria-labelledby="about-h">
        <div className="wrap">
          <Reveal className="sec-header">
            <span className="t-eyebrow">What we&apos;re building</span>
            <h2 className="t-h2" id="about-h">
              Not another marketplace. The intelligence inside one.
            </h2>
            <p className="t-body-lg" style={{ maxWidth: 560, marginTop: 16 }}>
              BROKA sits between buyers and sellers — not as an intermediary,
              but as the intelligence that helps both sides make better
              decisions. Discovery, context, negotiation, trust — brought
              together in a single coherent experience.
            </p>
          </Reveal>
          <div className="pillars-grid">
            {[
              { num: "01", title: "Discover", body: "Find what you need. Surface who has it. Context-aware, not just keyword-matched." },
              { num: "02", title: "Understand", body: "Get useful information about products, sellers and deals before committing." },
              { num: "03", title: "Negotiate", body: "Zeno can assist the negotiation — helping both sides reach a better outcome." },
              { num: "04", title: "Complete", body: "Move toward payment, delivery, trust and resolution — all in one platform." },
            ].map((p, i) => (
              <Reveal className="pillar" key={p.num} delay={i * 0.08}>
                <span className="pillar-num">{p.num}</span>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-body">{p.body}</p>
              </Reveal>
            ))}
          </div>
          {/* The eight-step version of this lives on /how-it-works; this is the
              only place on the home page that points at it. */}
          <div className="sec-outro">
            <Link href="/how-it-works" className="preview-link">
              See the full transaction journey →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. ZENO ──────────────────────────────────────────── */}
      <section className="sec atm-violet" aria-labelledby="zeno-prev-h">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 80 }}>
            <Reveal>
              <span className="t-eyebrow">Meet Zeno</span>
              <h2 className="t-h2" id="zeno-prev-h">
                Intelligence built into every transaction.
              </h2>
              <p className="t-body-lg" style={{ marginTop: 20, marginBottom: 32 }}>
                Zeno is not a chatbot attached to a marketplace. Zeno is
                designed to understand the full context of a deal — and to be
                useful to both sides of it.
              </p>
              <div className="feature-list">
                {[
                  { title: "Understands intent", body: "What you need, at what price, in what condition — without filling in forms." },
                  { title: "Knows the context", body: "Seller history, deal context, negotiation thread — Zeno holds the relevant picture." },
                  { title: "Assists negotiation", body: "Zeno can start a conversation, frame an offer, and help both sides reach agreement." },
                ].map((f, i) => (
                  <Reveal className="feature-item" key={f.title} delay={0.15 + i * 0.08}>
                    <span className="feature-dot" aria-hidden="true" />
                    <div>
                      <div className="feature-title">{f.title}</div>
                      <div className="feature-body">{f.body}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Link href="/zeno" className="preview-link" style={{ marginTop: 32, display: "inline-flex" }}>
                Explore Zeno →
              </Link>
            </Reveal>
            {/* Interactive Zeno demo */}
            <Reveal delay={0.1}>
              <ZenoDemo />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 6. KENYA → AFRICA → GLOBAL ───────────────────────── */}
      <section className="sec atm-amber" aria-labelledby="vision-prev-h">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 80, alignItems: "center" }}>
            <Reveal>
              <span className="t-eyebrow t-eyebrow-amber">The vision</span>
              <h2 className="t-h2" id="vision-prev-h">
                Kenya. East Africa. The world.
              </h2>
              <p className="t-body-lg" style={{ marginTop: 20, marginBottom: 32 }}>
                We are starting in Kenya because that is where we understand
                the problem best. But the dynamics of informal commerce,
                information asymmetry and trust are universal. The platform we
                are building here is designed to travel.
              </p>
              <Link href="/vision" className="preview-link" style={{ color: "var(--c-a)" }}>
                See the long-term vision →
              </Link>
            </Reveal>
            <div style={{ display: "grid", gap: 14 }}>
              {[
                { label: "Where we start", place: "Kenya", desc: "Kenyan commerce — its patterns, languages and payment systems — shapes everything BROKA is built around." },
                { label: "Where it expands", place: "East Africa", desc: "The same dynamics that shape Kenyan markets exist across the region. The infrastructure travels." },
                { label: "The ambition", place: "Global", desc: "Information asymmetry and friction are universal problems. The ambition is not limited to one continent." },
              ].map((t, i) => (
                <Reveal key={t.place} delay={i * 0.09} className="card card-sm" style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-a)", marginBottom: 4, fontFamily: "var(--f-body)" }}>{t.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--f-display)", letterSpacing: "-0.03em", marginBottom: 6 }}>{t.place}</div>
                    <p style={{ fontSize: 13, color: "var(--c-text-2)", lineHeight: 1.6 }}>{t.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. TECHNOLOGY ────────────────────────────────────── */}
      <section className="sec bg-1" aria-labelledby="tech-prev-h">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <Reveal>
              <span className="t-eyebrow">Under the hood</span>
              <h2 className="t-h2" id="tech-prev-h">
                Engineered for real commerce.
              </h2>
              <p className="t-body-lg" style={{ marginTop: 20, marginBottom: 32 }}>
                BROKA is being built on a technical foundation designed to
                handle the actual demands of commerce at scale — AI systems,
                marketplace infrastructure, payments, trust mechanisms and
                real-time communication.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
                {["FastAPI", "PostgreSQL", "Redis Streams", "ARQ Workers", "AI Providers", "WebRTC", "M-Pesa", "Escrow"].map((t) => (
                  <span key={t} className="badge badge-live">{t}</span>
                ))}
              </div>
              <Link href="/technology" className="preview-link">See the architecture →</Link>
            </Reveal>
            <Reveal delay={0.1} className="card" style={{ textAlign: "center", padding: "60px 48px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--c-text-3)", marginBottom: 28, fontFamily: "var(--f-body)" }}>Platform layers</div>
              {["AI Intelligence", "Commerce Layer", "Trust & Safety", "BROKA API", "Payments + Messaging"].map((l, i) => (
                <div key={l} style={{ padding: "14px 20px", marginBottom: 2, borderRadius: 10, fontSize: 13, fontWeight: 500, background: i === 3 ? "var(--c-v-dim)" : "var(--c-surface-2)", border: `1px solid ${i === 3 ? "var(--c-rule-v)" : "var(--c-rule)"}`, color: i === 3 ? "var(--c-v-light)" : "var(--c-text-2)" }}>
                  {l}
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 8. FOUNDERS ──────────────────────────────────────── */}
      <section className="sec bg-0" aria-labelledby="fnd-prev-h">
        <Reveal className="wrap" style={{ textAlign: "center" }}>
          <span className="t-eyebrow">The founders</span>
          <h2 className="t-h2" id="fnd-prev-h" style={{ marginBottom: 16 }}>
            Two founders. One idea.
          </h2>
          <p className="t-body-lg" style={{ maxWidth: 520, margin: "0 auto 48px" }}>
            Xavier and Arnold Ochieng founded BROKA after observing the
            friction and cost in informal commerce first-hand.
          </p>
          <div className="founder-mini-grid">
            {["Xavier", "Arnold Ochieng"].map((name, i) => (
              <div key={name} className="card card-sm founder-mini">
                <div className="founder-mini-avatar">
                  {i === 0 ? "X" : "AO"}
                </div>
                <div className="founder-mini-name">{name}</div>
                <div className="founder-mini-role">Co-Founder</div>
              </div>
            ))}
          </div>
          <Link href="/founders" className="preview-link" style={{ justifyContent: "center" }}>
            Our story →
          </Link>
        </Reveal>
      </section>

      {/* ─── 9. FINAL CTA ─────────────────────────────────────── */}
      <section className="sec atm-violet-center has-field" aria-labelledby="cta-h">
        <FlowMesh />
        <div className="wrap">
          <Reveal className="final-cta">
            <BrandMotion />
            <span className="t-eyebrow" style={{ textAlign: "center", display: "block" }}>Get involved</span>
            <h2 className="t-h1" id="cta-h" style={{ marginBottom: 20, textAlign: "center" }}>
              Commerce is changing.
            </h2>
            <p style={{ textAlign: "center" }}>
              We&apos;re building what comes next. If you&apos;re a user,
              partner, investor or journalist — we&apos;d like to hear from you.
            </p>
            <div className="final-cta-actions">
              <Magnetic>
                <Link href="/contact" className="btn btn-primary">Get in touch</Link>
              </Magnetic>
              <Magnetic>
                <Link href="/faq" className="btn btn-ghost">Read the FAQ</Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
