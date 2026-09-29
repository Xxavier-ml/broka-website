import Link from "next/link";

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
        <p>The link may be old, or the auction or store may have been removed. Here are some good places to start.</p>
        <div className="nf-actions">
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/auctions" className="btn btn-ghost">
            Auction House
          </Link>
          <Link href="/stores" className="btn btn-ghost">
            Online stores
          </Link>
        </div>
      </div>
    </section>
  );
}
