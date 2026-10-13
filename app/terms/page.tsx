import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CONTACT, mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using the BROKA website: what it shows, what happens in the app, and the limits of what we promise.",
  alternates: { canonical: "https://www.broka.co.ke/terms" },
};

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" headline="Terms of Use" sub="The ground rules for using the BROKA website." />
      <section className="sec-sm bg-1">
        <div className="wrap">
          <div className="legal">
            <p className="legal-updated">Last updated 14 October 2026</p>

            <p>
              By using www.broka.co.ke (&quot;the website&quot;) you agree to these terms. If you do not agree, please do not use
              the website. Using the BROKA mobile app is covered by the terms you accept when you sign up there.
            </p>

            <h2>What the website is</h2>
            <p>
              The website introduces BROKA and lets you browse marketplace products and online stores. It is for viewing only.
              Seller conversations and account features are available in the <Link href="/download">BROKA app</Link>.
              BROKA does not process or hold buyer-seller payments. Buyers and sellers arrange any purchase, payment and
              delivery directly with each other.
            </p>

            <h2>Listings come from sellers</h2>
            <ul>
              <li>Item descriptions, photos, prices and locations are written by sellers, not by BROKA.</li>
              <li>
                A listing shown on the website is not an offer to sell by BROKA, and a price shown here may already have changed.
              </li>
              <li>Check listing details with the seller and inspect an item before agreeing to buy.</li>
              <li>BROKA is not a party to buyer-seller sales and does not process, hold, release or guarantee their payments.</li>
            </ul>

            <h2>Using the site properly</h2>
            <ul>
              <li>Do not try to disrupt the website, overload it with automated requests or gain access you were not given.</li>
              <li>Do not copy the website&apos;s listings in bulk, or present sellers&apos; content as your own.</li>
              <li>Do not use the site for anything unlawful.</li>
            </ul>

            <h2>Ownership</h2>
            <p>
              The BROKA name, logo, Zeno and the design of this website belong to BROKA. Photos and descriptions in
              listings belong to the sellers who posted them.
            </p>

            <h2>No guarantees</h2>
            <p>
              We work to keep the website accurate and available, but it is provided &quot;as is&quot;. We do not promise it will
              always be up, error-free, or that every listing is accurate. To the extent the law allows, BROKA is not liable
              for loss that results from relying on information shown on the website.
            </p>

            <h2>Links to other sites</h2>
            <p>We are not responsible for the content or practices of websites we link to.</p>

            <h2>Changes</h2>
            <p>We may change these terms. The date above shows when they last changed, and using the website afterwards means you accept the update.</p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of Kenya.</p>

            <h2>Contact</h2>
            <p>
              Questions about these terms: <a href={mailto(CONTACT.adminEmail, "Terms of use")}>{CONTACT.adminEmail}</a> or{" "}
              <a href={`tel:${CONTACT.phone}`}>{CONTACT.phoneDisplay}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
