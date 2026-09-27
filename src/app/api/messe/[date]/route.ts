import { NextRequest, NextResponse } from "next/server";
import { fetchMesse, isValidIsoDate } from "@/lib/aelf-api";

/**
 * GET /api/messe/[date]
 *
 * Proxies the AELF mass-of-the-day API for a given ISO date `YYYY-MM-DD`.
 * On success returns `{ source: "aelf-api", data: AelfMesseResponse }`.
 * On failure returns `{ source: "local-fallback", data: null }` with HTTP 200
 * so the client can transparently fall back to local cached readings.
 */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ date: string }> }
) {
  const { date } = await ctx.params;

  if (!isValidIsoDate(date)) {
    return NextResponse.json(
      { source: "error", data: null, error: "Invalid date format. Expected YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const data = await fetchMesse(date);
  if (data) {
    return NextResponse.json(
      { source: "aelf-api", data },
      {
        status: 200,
        headers: {
          // Cache up to 1 hour on CDN, revalidate every 10 minutes.
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
        },
      }
    );
  }

  return NextResponse.json(
    { source: "local-fallback", data: null },
    {
      status: 200,
      headers: {
        // Don't cache the fallback for too long — we want the client to retry soon.
        "Cache-Control": "no-store",
      },
    }
  );
}
