import { NextRequest, NextResponse } from "next/server";
import {
  fetchOffice,
  isAelfOfficeHour,
  isValidIsoDate,
  type AelfOfficeHour,
} from "@/lib/aelf-api";

/**
 * GET /api/office/[hour]/[date]
 *
 * Proxies the AELF office-of-the-hours API.
 * `hour` must be one of: lectures, laudes, tierce, sext, none, vepres, complies.
 * `date` must be ISO `YYYY-MM-DD`.
 *
 * On success returns `{ source: "aelf-api", hour, date, data }`.
 * On failure returns `{ source: "local-fallback", hour, date, data: null }` with HTTP 200.
 */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ hour: string; date: string }> }
) {
  const { hour, date } = await ctx.params;

  if (!isAelfOfficeHour(hour)) {
    return NextResponse.json(
      {
        source: "error",
        hour,
        date,
        data: null,
        error:
          "Invalid office hour. Expected one of: lectures, laudes, tierce, sext, none, vepres, complies.",
      },
      { status: 400 }
    );
  }

  if (!isValidIsoDate(date)) {
    return NextResponse.json(
      {
        source: "error",
        hour,
        date,
        data: null,
        error: "Invalid date format. Expected YYYY-MM-DD.",
      },
      { status: 400 }
    );
  }

  const data = await fetchOffice(hour as AelfOfficeHour, date);
  if (data) {
    return NextResponse.json(
      { source: "aelf-api", hour, date, data },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
        },
      }
    );
  }

  return NextResponse.json(
    { source: "local-fallback", hour, date, data: null },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
