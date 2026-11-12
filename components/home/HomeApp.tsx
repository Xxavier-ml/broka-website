import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, MessageCircle, Search, Store } from "lucide-react";
import { QrCode } from "@/components/ui/QrCode";
import { SITE_URL } from "@/lib/site";

/**
 * The handoff to the app, which is where the account, the conversations and
 * the notifications live. The website stays a browsing surface, so this panel
 * says plainly what the app adds rather than implying the site can do it too.
 * Visitors on a computer get a code to scan, since the app installs on the
 * phone in their pocket rather than the screen they are reading.
 */
const APP_POINTS = [
  { icon: Search, title: "The whole marketplace", text: "Search and browse every category and store." },
  { icon: MessageCircle, title: "Talk to sellers", text: "Chat or call inside BROKA, without sharing your number." },
  { icon: Store, title: "Your own store", text: "Open a store with its own link and add products in minutes." },
];

export function HomeApp() {
  return (
    <section className="sec hp-app" aria-labelledby="hp-app-title">
      <div className="wrap">
        <div className="hp-app-panel hp-reveal">
          <div className="hp-app-visual">
            <span className="hp-app-halo" aria-hidden="true" />
            <span className="hp-app-rings" aria-hidden="true"><i /><i /><i /></span>
            <Image
              src="/assets/home/app-phone.webp"
              alt="The BROKA app on a phone, showing a marketplace search and product grid"
              width={900}
              height={1125}
              sizes="(max-width: 900px) 70vw, 420px"
              className="hp-app-image"
            />
          </div>

          <div className="hp-app-copy">
            <span className="hp-eyebrow"><b>05</b> Get the app</span>
            <h2 className="hp-title" id="hp-app-title">
              BROKA <em>in your pocket.</em>
            </h2>
            <p className="hp-lede">
              The app is where a browse turns into a conversation. Download it for Android, sign in, and keep
              the sellers you found here in one place.
            </p>
            <ul className="hp-app-points">
              {APP_POINTS.map((point) => (
                <li key={point.title}>
                  <span className="hp-app-point-icon" aria-hidden="true"><point.icon size={16} /></span>
                  <span><strong>{point.title}</strong> {point.text}</span>
                </li>
              ))}
            </ul>
            <div className="hp-app-actions">
              <Link href="/download" className="btn btn-primary btn-lg hp-beam">
                <Download size={18} aria-hidden="true" /> Download for Android
              </Link>
              <Link href="/app-preview" className="btn btn-ghost btn-lg">
                Preview the app <ArrowUpRight size={16} aria-hidden="true" className="btn-arrow" />
              </Link>
            </div>
            <p className="hp-app-platforms">
              <span><i aria-hidden="true" /> Android — available now</span>
              <span>iPhone — coming later</span>
            </p>

            <div className="hp-qr-card">
              <QrCode value={`${SITE_URL}/download`} title="QR code linking to the BROKA download page" className="hp-qr" />
              <p>
                <strong>Reading this on a computer?</strong>
                Point your phone&apos;s camera at the code to open the download page there.
              </p>
            </div>

            <p className="hp-app-note">
              The website stays a place to browse and compare — buying, selling and paying are arranged between
              you and the seller.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
