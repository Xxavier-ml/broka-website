import type { Metadata } from "next";
import Link from "next/link";

const description = "The BROKA page you requested could not be found. Browse the marketplace or return to the homepage.";

export const metadata: Metadata = {
  title: "Page not found",
  description,
  alternates: null,
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <section className="nf" aria-labelledby="nf-h">
      <div className="wrap">
        <p className="nf-code" aria-hidden="true">
          404
        </p>
        <h1 className="t-h2" id="nf-h">
          We can&apos;t find that page.
        </h1>
        <p>The link may be old, or the page may have moved. Here are some good places to start.</p>
        <div className="nf-actions">
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/browse" className="btn btn-ghost">
            Browse marketplace
          </Link>
          <Link href="/stores" className="btn btn-ghost">
            Online stores
          </Link>
        </div>
      </div>
    </section>
  );
}
