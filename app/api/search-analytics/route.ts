import { NextResponse } from "next/server";
import { recordSearchQuery } from "@/lib/searchAnalytics";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { query?: unknown };
    if (typeof body.query === "string") recordSearchQuery(body.query);
  } catch {
    // Analytics must never block a search or surface an error to the user.
  }
  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
