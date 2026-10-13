import type { Metadata } from "next";
import Link from "next/link";
import { Download, Handshake, MessageCircle, Search, Sparkles, Store, Smartphone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { APP_DOWNLOAD_URL, CONTACT, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get the BROKA app",
  description:
    "Download the BROKA app for Android to explore listings, connect with sellers, use Zeno for context, and manage your own store.",
  alternates: { canonical: "https://www.broka.co.ke/download" },
};

const FEATURES = [
  { icon: Search, title: "Explore products", body: "Browse marketplace categories and compare useful seller and product context." },
  { icon: Sparkles, title: "Think clearly with Zeno", body: "Compare listing details, clarify what matters to you and prepare questions before contacting a seller." },
  { icon: Handshake, title: "Arrange directly", body: "BROKA helps you discover and connect. Buyers and sellers agree payment, delivery and final terms directly; BROKA does not process or hold payments." },
  { icon: MessageCircle, title: "Chat and call sellers", body: "Talk to sellers inside BROKA, without sharing your number." },
  { icon: Store, title: "Open your own store", body: "Set up an online store with its own link and add products in minutes." },
  { icon: Smartphone, title: "Sell from your phone", body: "List an item with photos, let Zeno help with the price, and reach buyers across Kenya." },
];

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="Get the app"
        headline="Browse, connect and sell — from your phone."
        sub="The app adds account and conversation features. Buyers and sellers arrange any purchase, payment and delivery directly with each other."
        atmosphere="atm-violet"
      >
        <div className="dl-hero-actions">
          <a href={APP_DOWNLOAD_URL} className="btn btn-primary" rel="noopener noreferrer">
            <Download size={16} aria-hidden="true" /> Download for Android
          </a>
          <Link href="/app-preview" className="btn btn-ghost">
            <Smartphone size={16} aria-hidden="true" /> Explore the app preview
          </Link>
          <span className="badge badge-later">iPhone · coming later</span>
        </div>
      </PageHero>

      <section className="sec-sm bg-1" aria-labelledby="dl-steps-h">
        <div className="wrap">
          <div className="sec-header-center" style={{ marginBottom: 0 }}>
            <span className="t-eyebrow">Install in three steps</span>
            <h2 className="t-h3" id="dl-steps-h">
              Up and running in a minute.
            </h2>
          </div>
          <ol className="dl-steps">
            <li className="dl-step">
              <h3>Download the app</h3>
              <p>
                Tap <strong>Download for Android</strong> on this page. The file is BROKA&apos;s own build, published on
                our GitHub releases.
              </p>
            </li>
            <li className="dl-step">
              <h3>Allow the install</h3>
              <p>
                Android may ask you to allow installs from your browser or Files app, because the app comes from
                outside the Play Store. Allow it for this one install.
              </p>
            </li>
            <li className="dl-step">
              <h3>Open BROKA and sign up</h3>
              <p>Create your account, then browse, chat with sellers and let Zeno help you get a better deal.</p>
            </li>
          </ol>
          <p className="dl-note" style={{ margin: "22px auto 0", textAlign: "center" }}>
            Only download BROKA from this website or from{" "}
            <a href="https://github.com/Xxavier-ml/broka/releases" target="_blank" rel="noopener noreferrer" className="t-violet">
              BROKA&apos;s GitHub releases
            </a>
            . Trouble installing? Email{" "}
            <a href={mailto(CONTACT.adminEmail, "Help installing the BROKA app")} className="t-violet">
              {CONTACT.adminEmail}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="sec-sm bg-2" aria-labelledby="dl-feat-h">
        <div className="wrap">
          <div className="sec-header-center" style={{ marginBottom: 0 }}>
            <span className="t-eyebrow">In the app</span>
            <h2 className="t-h3" id="dl-feat-h">
              What you can do there.
            </h2>
          </div>
          <div className="dl-features">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div className="card card-sm" key={title}>
                <span className="ccard-icon">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="t-h4" style={{ marginBottom: 6 }}>
                  {title}
                </h3>
                <p className="t-body" style={{ fontSize: 14 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Link href="/browse" className="btn btn-ghost" style={{ marginRight: 10 }}>
              Browse marketplace
            </Link>
            <Link href="/stores" className="btn btn-ghost">
              Browse stores
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
