import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { EarlyAccessPanel } from "@/components/sections/EarlyAccessPanel";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the BROKA team — whether you are a potential user, partner, investor or just curious about intelligent commerce.",
};

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        headline="We'd like to hear from you."
        sub="Whether you are a potential user, a partner, an investor or someone who thinks intelligent commerce matters — we are open to conversations."
        atmosphere="atm-violet"
      />

      <section className="sec bg-1" aria-labelledby="contact-h">
        <div className="wrap">
          <EarlyAccessPanel />
        </div>
      </section>

      <section className="sec bg-2" aria-labelledby="faq-link-h">
        <div className="wrap">
          <div className="final-cta">
            <h2 className="t-h3" id="faq-link-h" style={{ marginBottom: 12 }}>
              Looking for quick answers?
            </h2>
            <p>Many common questions are covered in the FAQ.</p>
            <div className="final-cta-actions" style={{ marginTop: 28 }}>
              <Link href="/faq" className="btn btn-ghost">Browse the FAQ →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
