import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Download, Mail, MessageCircle, Phone, Search } from "lucide-react";
import { footerNav, navLegal } from "@/data/navigation";
import { CONTACT, SITE_URL, SOCIAL, mailto } from "@/lib/site";
import { QrCode } from "@/components/ui/QrCode";

/**
 * The footer reads from the same taxonomy as the header (data/navigation.ts).
 * Its columns are the same four groups, so nothing here can drift out of step
 * with the top bar, and the social links no longer take a whole column of
 * their own away from the pages people are actually looking for.
 *
 * Above the columns sits one last way into the app (hidden on the homepage,
 * which closes on its own call to action), and under them the wordmark.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { label: "X / Twitter", href: SOCIAL.x },
    { label: "Instagram", href: SOCIAL.instagram },
    { label: "TikTok", href: SOCIAL.tiktok },
  ];
  return (
    <footer className="ftr" aria-label="Site footer">
      <div className="wrap">
        <section className="ftr-cta" aria-labelledby="ftr-cta-title">
          <div className="ftr-cta-copy">
            <p className="ftr-cta-kicker"><i aria-hidden="true" /> BROKA for Android</p>
            <h2 className="ftr-cta-title" id="ftr-cta-title">Your next deal is one tap away.</h2>
            <div className="ftr-cta-actions">
              <Link href="/download" className="btn btn-primary">
                <Download size={17} aria-hidden="true" /> Get the app
              </Link>
              <Link href="/browse" className="btn btn-ghost">
                <Search size={16} aria-hidden="true" /> Browse the marketplace
              </Link>
            </div>
          </div>
          <div className="ftr-cta-qr">
            <QrCode value={`${SITE_URL}/download`} title="QR code linking to the BROKA download page" className="ftr-qr" />
            <p>Scan with your phone to open the download page.</p>
          </div>
        </section>

        <div className="ftr-grid">
          <div className="ftr-brand-col">
            <div className="ftr-brand">
              <Image src="/assets/broka-mark.png" alt="" width={34} height={34} />
              <span className="ftr-brand-name">BROKA</span>
            </div>
            <p className="ftr-brand-tag">Future of Intelligent Commerce</p>
            <p className="t-sm ftr-brand-blurb">
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
            <nav className="ftr-social" aria-label="Social links">
              {social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="ftr-col-title">{group.title}</p>
              <nav className="ftr-links" aria-label={`${group.title} links`}>
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="ftr-bottom">
          <p className="ftr-copy">&copy; {year} BROKA. All rights reserved.</p>
          <nav className="ftr-legal" aria-label="Legal">
            {navLegal.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="ftr-built">Built in <em>Kenya.</em> Designed for a global market.</p>
        </div>
      </div>
      <div className="ftr-wordmark" aria-hidden="true">BROKA</div>
    </footer>
  );
}
