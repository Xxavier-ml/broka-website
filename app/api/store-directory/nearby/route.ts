import { NextResponse } from "next/server";
import { listStores } from "@/lib/api/stores";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid location request." }, { status: 400, headers: { "Cache-Control": "private, no-store" } });
  }

  const input = body as Record<string, unknown>;
  const lat = input.lat;
  const lng = input.lng;
  const maxDistanceKm = input.maxDistanceKm ?? 25;
  const limit = input.limit ?? 5;
  if (
    typeof lat !== "number" || !Number.isFinite(lat) || lat < -90 || lat > 90 ||
    typeof lng !== "number" || !Number.isFinite(lng) || lng < -180 || lng > 180 ||
    typeof maxDistanceKm !== "number" || !Number.isFinite(maxDistanceKm) || maxDistanceKm <= 0 || maxDistanceKm > 2000 ||
    typeof limit !== "number" || !Number.isInteger(limit) || limit < 1 || limit > 25
  ) {
    return NextResponse.json({ error: "Invalid location request." }, { status: 400, headers: { "Cache-Control": "private, no-store" } });
  }

  try {
    const result = await listStores({
      lat,
      lng,
      maxDistanceKm,
      nearestFirst: true,
      limit,
      revalidate: 0,
    });
    return NextResponse.json(result, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json(
      { error: "Nearby stores are temporarily unavailable.", items: [], total: 0 },
      { status: 502, headers: { "Cache-Control": "private, no-store" } },
    );
  }
}
