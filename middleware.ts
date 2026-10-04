import { NextResponse, type NextRequest } from "next/server";
import { STOREFRONT_PROXY_KEY, STOREFRONT_URL } from "./lib/storefront";

// The storefront's own API (store visits, shares, "load more" products),
// passed on to it like its pages (next.config.ts), plus who the visitor is.
// A plain rewrite would reach the storefront from this site's servers, and
// every web visitor would count as one client against the API's
// per-visitor limits: the store owner's stats would stop at a handful of
// web visitors.

const IPV4 = /^(\d{1,3}\.){3}\d{1,3}$/;
const IPV6 = /^[0-9a-f:.]+$/i;

/** The visitor's address as Vercel saw it (Vercel sets these, overwriting what the visitor sent). */
function visitorAddress(req: NextRequest): string | null {
  for (const raw of [req.headers.get("x-real-ip"), req.headers.get("x-forwarded-for")?.split(",")[0]]) {
    const value = raw?.trim();
    if (value && value.length <= 45 && (IPV4.test(value) || (value.includes(":") && IPV6.test(value)))) {
      return value;
    }
  }
  return null;
}

export function middleware(req: NextRequest) {
  // No storefront deployed: nothing here answers these, so a 404.
  if (!STOREFRONT_URL) return NextResponse.next();
  const headers = new Headers(req.headers);
  // Only ever this site's word, never the visitor's.
  headers.delete("x-broka-proxy-key");
  headers.delete("x-broka-visitor-ip");
  const address = visitorAddress(req);
  if (STOREFRONT_PROXY_KEY && address) {
    headers.set("x-broka-proxy-key", STOREFRONT_PROXY_KEY);
    headers.set("x-broka-visitor-ip", address);
  }
  const target = new URL(`${STOREFRONT_URL}${req.nextUrl.pathname}${req.nextUrl.search}`);
  return NextResponse.rewrite(target, { request: { headers } });
}

export const config = { matcher: "/api/stores/:path*" };
