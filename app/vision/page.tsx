import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Vision",
  description: "BROKA's long-term vision: intelligent commerce accessible to everyone in East Africa and beyond — multilingual, mobile-first, and built for informal markets.",
};

const principles = [
  { icon: "📱", title: "Mobile-first by design", body: "Commerce in East Africa moves through mobile. BROKA is built around that reality — not retrofitted to it after the fact." },
  { icon: "💬", title: "Local language commerce", body: "Intelligent commerce should work in Swahili, Kikuyu and other local languages — not just in English. This is a core long-term direction." },
  { icon: "💳", title: "Local payment infrastructure", body: "M-Pesa and local payment rails are the infrastructure most people already use. BROKA works with them, not around them." },
  { icon: "🎙️", title: "Voice interaction", body: "Not everyone is a fluent smartphone user. Voice-based interaction with Zeno is part of the accessibility vision for the longer term." },
  { icon: "🤝", title: "Informal market fit", body: "Most commerce in East Africa happens informally. BROKA is designed for how real people actually trade — not for a sanitised digital marketplace ideal." },
  { icon: "🌍", title: "Regional trust infrastructure", body: "Trust systems that work across borders, currencies and communities — infrastructure that doesn't exist yet but that commerce across the region needs." },
];

export default function Vision() {
  return (
    <>
      <PageHero
        eyebrow="The long-term vision"
        headline="Commerce should speak your language."
        sub="Intelligent commerce should not be the exclusive domain of highly technical or urban users. BROKA is designed to be accessible to anyone who buys or sells — regardless of how they access technology, what language they speak, or where they are."
        atmosphere="atm-amber"
      />

      {/* Geographic tiers */}
      <section className="sec bg-1" aria-labelledby="geo-h">
        <div className="wrap">
          <div className="sec-header">
            <span className="t-eyebrow t-eyebrow-amber">Geographic expansion</span>
            <h2 className="t-h2" id="geo-h">Starting local. Thinking global.</h2>
            <p className="t-body" style={{ maxWidth: 560 }}>
              BROKA is starting in Kenya — not because the opportunity ends
              there, but because that is where we understand the problem best.
              The platform we are building here is designed to travel.
            </p>
          </div>
          <div className="vision-tiers">
            {[
              {
                tier: "kenya",
                label: "Where we start",
                place: "Kenya",
                body: "Kenyan commerce — its patterns, languages, payment systems and informal networks — shapes everything BROKA is designed around. M-Pesa, Nairobi's informal markets, the culture of negotiation and trust: this is the foundation.",
              },
              {
                tier: "africa",
                label: "Where the opportunity expands",
                place: "East Africa",
                body: "The same dynamics that shape Kenyan commerce exist across Uganda, Tanzania, Ethiopia, Rwanda and beyond. Informal markets, information asymmetry, mobile-first users — the infrastructure we build in Kenya is designed to work across the region.",
              },
              {
                tier: "global",
                label: "The long-range ambition",
                place: "Global",
                body: "The problems BROKA is solving — information asymmetry, friction, lack of trust in peer-to-peer commerce — are universal. The ambition is not limited to one continent. The platform should work wherever informal commerce exists.",
              },
            ].map((t) => (
              <div className="vision-tier" key={t.place}>
                <div>
                  <p className={`vision-tier-label ${t.tier}`}>{t.label}</p>
                  <p className="vision-tier-place">{t.place}</p>
                </div>
                <p className="vision-tier-body">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What accessible commerce looks like */}
      <section className="sec atm-amber" aria-labelledby="access-h">
        <div className="wrap">
          <div className="sec-header-center">
            <span className="t-eyebrow t-eyebrow-amber">Accessible commerce</span>
            <h2 className="t-h2" id="access-h">What we mean by accessible.</h2>
            <p className="t-body">Accessibility in commerce is not just about UI. It is about language, payment method, device type, and whether the system understands the way you actually trade.</p>
          </div>
          <div className="vision-principles">
            {principles.map((p) => (
              <div className="vision-principle" key={p.title}>
                <span className="vision-principle-icon" aria-hidden="true">{p.icon}</span>
                <div>
                  <h3 className="vision-principle-title">{p.title}</h3>
                  <p className="vision-principle-body">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-term statement */}
      <section className="sec bg-2" aria-labelledby="stmt-h">
        <div className="wrap" style={{ maxWidth: 800, margin: "0 auto" }}>
          <span className="t-eyebrow" style={{ textAlign: "center", display: "block" }}>The long view</span>
          <blockquote style={{ textAlign: "center" }}>
            <p className="t-h2" id="stmt-h" style={{ lineHeight: 1.15, marginBottom: 32 }}>
              &ldquo;Kenya is where we start.<br className="br-lg" />Africa is where the opportunity expands.<br className="br-lg" />The ambition is global.&rdquo;
            </p>
          </blockquote>
          <p className="t-body" style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 36px" }}>
            We are not making this claim to sound ambitious. We are making it
            because the problem we are solving — making intelligent commerce
            accessible — is genuinely a global problem. We are starting where
            we can make the most immediate difference.
          </p>
          <div style={{ textAlign: "center" }}>
            <Link href="/roadmap" className="btn btn-ghost">See the roadmap →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
