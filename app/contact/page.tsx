import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { EarlyAccessPanel } from "@/components/sections/EarlyAccessPanel";
import { JsonLd } from "@/components/ui/JsonLd";
import { Mail, MapPin, MessageCircle, Phone, User } from "lucide-react";
import { founders } from "@/data/founders";
import { CONTACT, SITE_URL, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the BROKA team — whether you are a potential user, partner, investor or just curious about intelligent commerce. Email admin@broka.co.ke or call +254 706 462 869.",
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

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}/contact`,
          mainEntity: {
            "@type": "Organization",
            name: "BROKA",
            email: CONTACT.adminEmail,
            telephone: CONTACT.phone,
            address: { "@type": "PostalAddress", addressLocality: CONTACT.city, addressCountry: "KE" },
          },
        }}
      />

      <section className="sec-sm bg-2" aria-labelledby="reach-h">
        <div className="wrap">
          <div className="sec-header-center" style={{ marginBottom: 36 }}>
            <span className="t-eyebrow">Reach us directly</span>
            <h2 className="t-h3" id="reach-h">The quickest ways to get hold of us.</h2>
          </div>
          <div className="reach">
            <a className="ccard" href={mailto(CONTACT.adminEmail)}>
              <span className="ccard-icon"><Mail size={20} aria-hidden="true" /></span>
              <span className="ccard-label">Email</span>
              <span className="ccard-value">{CONTACT.adminEmail}</span>
              <span className="ccard-note">General questions, partnerships, press and support.</span>
            </a>
            <a className="ccard" href={`tel:${CONTACT.phone}`}>
              <span className="ccard-icon"><Phone size={20} aria-hidden="true" /></span>
              <span className="ccard-label">Call</span>
              <span className="ccard-value">{CONTACT.phoneDisplay}</span>
              <span className="ccard-note">BROKA&apos;s official mobile number.</span>
            </a>
            <a className="ccard" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
              <span className="ccard-icon"><MessageCircle size={20} aria-hidden="true" /></span>
              <span className="ccard-label">WhatsApp</span>
              <span className="ccard-value">{CONTACT.phoneDisplay}</span>
              <span className="ccard-note">Message us on the same number.</span>
            </a>
            <div className="ccard">
              <span className="ccard-icon"><MapPin size={20} aria-hidden="true" /></span>
              <span className="ccard-label">Based in</span>
              <span className="ccard-value">{CONTACT.city}, {CONTACT.country}</span>
              <span className="ccard-note">Building commerce for East Africa and beyond.</span>
            </div>
          </div>

          <div className="sec-header-center" style={{ margin: "56px auto 28px" }}>
            <span className="t-eyebrow">The co-founders</span>
            <h3 className="t-h4">Or write to us personally.</h3>
          </div>
          <div className="reach" style={{ maxWidth: 620, margin: "0 auto" }}>
            {founders.map((f) => (
              <a className="ccard" key={f.id} href={mailto(f.email)}>
                <span className="ccard-icon"><User size={20} aria-hidden="true" /></span>
                <span className="ccard-label">{f.name} · {f.role}</span>
                <span className="ccard-value">{f.email}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

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
