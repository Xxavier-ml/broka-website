import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT, SOCIAL, mailto } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr" aria-label="Site footer">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <div className="ftr-brand">
              <Image src="/assets/broka-mark.png" alt="" width={34} height={34} />
              <span className="ftr-brand-name">BROKA</span>
            </div>
            <p className="ftr-brand-tag">Future of Intelligent Commerce</p>
            <p className="t-sm" style={{ maxWidth: 240, marginTop: 8 }}>
              An intelligent commerce platform connecting buyers and sellers in
              East Africa and beyond.
            </p>
            <address className="ftr-contact" style={{ fontStyle: "normal" }}>
              <a href={mailto(CONTACT.adminEmail)}>
                <Mail size={14} aria-hidden="true" /> {CONTACT.adminEmail}
              </a>
              <a href={`tel:${CONTACT.phone}`}>
                <Phone size={14} aria-hidden="true" /> {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={14} aria-hidden="true" /> WhatsApp us
              </a>
            </address>
          </div>
          <div>
            <p className="ftr-col-title">Marketplace</p>
            <nav className="ftr-links" aria-label="Marketplace links">
              <Link href="/auctions">Auction House</Link>
              <Link href="/stores">Online stores</Link>
              <Link href="/search">Search</Link>
              <Link href="/download">Get the app</Link>
            </nav>
          </div>
          <div>
            <p className="ftr-col-title">Product</p>
            <nav className="ftr-links" aria-label="Product links">
              <Link href="/what-is-broka">What is BROKA</Link>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/zeno">Meet Zeno</Link>
              <Link href="/technology">Technology</Link>
              <Link href="/roadmap">Roadmap</Link>
            </nav>
          </div>
          <div>
            <p className="ftr-col-title">Company</p>
            <nav className="ftr-links" aria-label="Company links">
              <Link href="/vision">Vision</Link>
              <Link href="/founders">Founders</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div>
            <p className="ftr-col-title">Follow</p>
            <nav className="ftr-links" aria-label="Social links">
              <a href={SOCIAL.x} target="_blank" rel="noopener noreferrer">X / Twitter</a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </nav>
          </div>
        </div>
        <div className="ftr-bottom">
          <p className="ftr-copy">&copy; {year} BROKA. All rights reserved.</p>
          <nav className="ftr-legal" aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
          <p className="ftr-built">Built in <em>Kenya.</em> Designed for a global market.</p>
        </div>
      </div>
    </footer>
  );
}
