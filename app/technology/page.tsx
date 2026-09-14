import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ArchitectureViz } from "@/components/visuals/ArchitectureViz";

export const metadata: Metadata = {
  title: "Technology",
  description: "BROKA is built on a serious technical foundation — FastAPI, PostgreSQL, Redis Streams, AI provider fallbacks, WebRTC, escrow, fraud detection and more.",
};

const pillars = [
  {
    label: "AI layer",
    title: "Zeno engine",
    body: "Multiple AI provider integrations with automatic fallbacks, prompt engineering for commerce-specific tasks, and conversation state management.",
    items: ["Multi-provider AI fallbacks", "Commerce-specific prompting", "Conversation history management", "Intent classification"],
    status: "live",
  },
  {
    label: "Commerce layer",
    title: "Marketplace infrastructure",
    body: "Real-time marketplace operations — listing management, search and discovery, seller stores, and the buyer-seller interaction layer.",
    items: ["Listing management", "Seller stores", "Search & discovery", "Real-time negotiation"],
    status: "live",
  },
  {
    label: "Communication",
    title: "Messaging & calls",
    body: "Real-time messaging built on Redis Streams and ARQ workers, with WebRTC for audio and video calls between buyers and sellers.",
    items: ["Redis Streams messaging", "WebRTC audio/video calls", "Cloudflare TURN integration", "Message history"],
    status: "live",
  },
  {
    label: "Payments",
    title: "Transaction infrastructure",
    body: "M-Pesa integration and local payment rails, with an escrow layer to protect both sides of a transaction.",
    items: ["M-Pesa integration", "Escrow layer", "Payment status tracking", "Local payment rails"],
    status: "building",
  },
  {
    label: "Trust & safety",
    title: "Fraud & dispute systems",
    body: "Fraud detection, user verification, dispute resolution workflows and reputation systems that make transactions safer over time.",
    items: ["Fraud detection", "Seller verification", "Dispute resolution", "Reputation scoring"],
    status: "building",
  },
  {
    label: "Infrastructure",
    title: "Backend platform",
    body: "FastAPI backend, PostgreSQL database, Redis for real-time operations, ARQ for async task processing, and cloud-native deployment.",
    items: ["FastAPI (Python)", "PostgreSQL", "Redis + ARQ workers", "Cloud-native deployment"],
    status: "live",
  },
];

export default function Technology() {
  return (
    <>
      <PageHero
        eyebrow="Under the hood"
        headline="Built to handle real commerce."
        sub="BROKA is being engineered around the practical needs of commerce at scale — AI systems, marketplace infrastructure, payments, trust mechanisms and real-time communication assembled into a coherent platform."
        atmosphere="atm-violet"
      />

      {/* Architecture diagram */}
      <section className="sec bg-1" aria-labelledby="arch-h">
        <div className="wrap">
          <div className="sec-header">
            <span className="t-eyebrow">Platform architecture</span>
            <h2 className="t-h2" id="arch-h">How the pieces fit together.</h2>
            <p className="t-body" style={{ maxWidth: 560 }}>
              A high-level view of the BROKA platform. Implementation details
              are not publicly shared — this shows the shape of the system,
              not its internals.
            </p>
          </div>
          <div className="tech-arch">
            <ArchitectureViz />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="sec atm-violet-center" aria-labelledby="tech-pillars-h">
        <div className="wrap">
          <div className="sec-header-center">
            <span className="t-eyebrow">System breakdown</span>
            <h2 className="t-h2" id="tech-pillars-h">Six technical domains.</h2>
            <p className="t-body">Each domain of the BROKA platform is independently capable, but designed to work together.</p>
          </div>
          <div className="tech-pillars">
            {pillars.map((p) => (
              <div className="tech-pillar" key={p.title}>
                <span className="tech-pillar-label">{p.label}</span>
                <h3 className="tech-pillar-title">{p.title}</h3>
                <p className="tech-pillar-body">{p.body}</p>
                <ul className="tech-pillar-items" aria-label={`${p.title} components`}>
                  {p.items.map((item) => (
                    <li className="tech-pillar-item" key={item}>{item}</li>
                  ))}
                </ul>
                <span className={`badge badge-dot ${p.status === "live" ? "badge-live" : "badge-building"}`} style={{ marginTop: 18 }}>
                  {p.status === "live" ? "Live" : "Building"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical note */}
      <section className="sec bg-2" aria-labelledby="tech-note-h">
        <div className="wrap">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <span className="t-eyebrow">A note on openness</span>
            <h2 className="t-h3" id="tech-note-h" style={{ marginBottom: 20 }}>
              We describe what we&apos;re building, not how it works internally.
            </h2>
            <p className="t-body" style={{ marginBottom: 16 }}>
              This page describes the shape of the BROKA technical system using
              information derived from the actual product repository. We do not
              publish implementation details, API credentials, database schemas
              or proprietary logic.
            </p>
            <p className="t-body">
              If you are an engineer, researcher or potential partner interested
              in the technical direction of BROKA, get in touch through the
              contact page.
            </p>
            <div style={{ marginTop: 32 }}>
              <Link href="/contact" className="btn btn-ghost">Get in touch →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
