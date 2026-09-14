import Link from "next/link";
import { HeroCopy } from "@/components/hero/HeroCopy";
import { HeroScene } from "@/components/hero/HeroScene";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { ZenoDemo } from "@/components/zeno/ZenoDemo";
import { ConstellationField } from "@/components/visuals/ConstellationField";
import { FlowMesh } from "@/components/visuals/FlowMesh";

export default function Home() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="hero atm-hero grid-bg" aria-labelledby="hero-h">
        <div className="aurora" aria-hidden="true">
          <span className="aurora-blob aurora-1" />
          <span className="aurora-blob aurora-2" />
          <span className="aurora-blob aurora-3" />
        </div>
        <ConstellationField opacity={0.85} id="hero" />
        <div className="orbits" aria-hidden="true">
          <span className="orbit-ring orbit-1" />
          <span className="orbit-ring orbit-2" />
          <span className="orbit-ring orbit-3" />
        </div>
        <FlowMesh />
        <HeroCopy />
        <div className="hero-viz-col">
          <HeroScene />
        </div>
      </section>

      {/* ─── THE COMMERCE PROBLEM ─────────────────────────── */}
      <section className="sec atm-violet-center grid-bg has-field" aria-labelledby="prob-h">
        <ConstellationField opacity={0.4} id="prob" />
        <div className="wrap">
          <Reveal className="home-problem">
            <span className="t-eyebrow">The problem</span>
            <p className="home-problem-statement" id="prob-h">
              Information doesn&apos;t flow<br className="br-lg" />where it&apos;s <em>needed.</em>
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

      {/* ─── WHAT BROKA IS ─────────────────────────────────── */}
      <section className="sec bg-1" id="about" aria-labelledby="about-h">
        <div className="wrap">
          <Reveal className="sec-header">
            <span className="t-eyebrow">What we&apos;re building</span>
            <h2 className="t-h2" id="about-h">
              Not another marketplace.<br className="br-lg" />The intelligence inside one.
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

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <Link href="/what-is-broka" className="preview-link">
              Full product overview →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ZENO PREVIEW ──────────────────────────────────── */}
      <section className="sec atm-violet" aria-labelledby="zeno-prev-h">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 80 }}>
            <Reveal>
              <span className="t-eyebrow">Meet Zeno</span>
              <h2 className="t-h2" id="zeno-prev-h">
                Intelligence built into<br className="br-lg" />every transaction.
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

      {/* ─── HOW IT CHANGES A TRANSACTION ────────────────── */}
      <section className="sec bg-2" aria-labelledby="txn-h">
        <div className="wrap">
          <Reveal className="sec-header-center">
            <span className="t-eyebrow">How BROKA works</span>
            <h2 className="t-h2" id="txn-h">From intent to outcome.</h2>
            <p className="t-body">
              A deal that used to take days of phone calls, uncertain pricing and
              trust built on nothing but a handshake.
            </p>
          </Reveal>
          <div className="grid-3" style={{ gap: 2, border: "1px solid var(--c-rule)", borderRadius: 18, overflow: "hidden" }}>
            {[
              { step: "01", title: "Find", body: "Describe what you need in plain language. BROKA surfaces relevant sellers and opportunities." },
              { step: "02", title: "Negotiate", body: "Zeno assists with context, pricing information, and negotiation — for both sides." },
              { step: "03", title: "Complete", body: "Move toward agreement, payment and delivery with trust built into the platform." },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1} style={{ padding: "44px 36px", background: "var(--c-surface)" }}>
                <div style={{ fontSize: 44, fontWeight: 800, fontFamily: "var(--f-display)", color: "var(--c-v-dim)", letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 20 }}>{s.step}</div>
                <h3 className="t-h4" style={{ marginBottom: 10 }}>{s.title}</h3>
                <p className="t-body" style={{ fontSize: 14 }}>{s.body}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/how-it-works" className="preview-link">See the full transaction journey →</Link>
          </div>
        </div>
      </section>

      {/* ─── KENYA → AFRICA → GLOBAL ─────────────────────── */}
      <section className="sec atm-amber" aria-labelledby="vision-prev-h">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 80, alignItems: "center" }}>
            <Reveal>
              <span className="t-eyebrow t-eyebrow-amber">The vision</span>
              <h2 className="t-h2" id="vision-prev-h">
                Kenya. East Africa.<br className="br-lg" />The world.
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

      {/* ─── TECHNOLOGY PREVIEW ───────────────────────────── */}
      <section className="sec bg-1" aria-labelledby="tech-prev-h">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <Reveal>
              <span className="t-eyebrow">Under the hood</span>
              <h2 className="t-h2" id="tech-prev-h">
                Engineered for<br className="br-lg" />real commerce.
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

      {/* ─── FOUNDERS PREVIEW ─────────────────────────────── */}
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
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 40 }}>
            {["Xavier", "Arnold Ochieng"].map((name, i) => (
              <div key={name} className="card card-sm" style={{ width: 180, textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,var(--c-bg-3),var(--c-bg-4))", border: "1px solid var(--c-rule)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 700, color: "var(--c-v-light)", margin: "0 auto 14px" }}>
                  {i === 0 ? "X" : "AO"}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: 11, color: "var(--c-text-3)", marginTop: 3 }}>Co-Founder</div>
              </div>
            ))}
          </div>
          <Link href="/founders" className="preview-link" style={{ justifyContent: "center" }}>
            Our story →
          </Link>
        </Reveal>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────── */}
      <section className="sec atm-violet-center has-field" aria-labelledby="cta-h">
        <ConstellationField opacity={0.5} id="cta" />
        <FlowMesh />
        <div className="wrap">
          <Reveal className="final-cta">
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
