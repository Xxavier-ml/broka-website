import { NextResponse } from "next/server";
import { recordSearchQuery } from "@/lib/searchAnalytics";

export const dynamic = "force-dynamic";

/** A search phrase is a few dozen bytes; a body larger than this is not one. */
const MAX_BODY_BYTES = 2048;

export async function POST(request: Request) {
  try {
    const declared = Number(request.headers.get("content-length") ?? 0);
    if (declared <= MAX_BODY_BYTES) {
      const text = await request.text();
      if (text.length <= MAX_BODY_BYTES) {
        const body = JSON.parse(text) as { query?: unknown } | null;
        if (typeof body?.query === "string") recordSearchQuery(body.query);
      }
    }
  } catch {
    // Analytics must never block a search or surface an error to the user.
  }
  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
