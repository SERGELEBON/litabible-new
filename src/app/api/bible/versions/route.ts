import { NextResponse } from "next/server";
import { bibleVersions } from "@/lib/bible-api";

/**
 * GET /api/bible/versions
 *
 * Static list of supported Bible versions, grouped by language. Frontend uses
 * this to populate the version selector on the LA BIBLE tab.
 */
export async function GET() {
  return NextResponse.json(
    {
      versions: bibleVersions,
      languages: {
        fr: bibleVersions.filter((v) => v.language === "fr"),
        en: bibleVersions.filter((v) => v.language === "en"),
        es: bibleVersions.filter((v) => v.language === "es"),
      },
    },
    {
      status: 200,
      headers: {
        // Pure static — cache for a long time.
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
      },
    }
  );
}
