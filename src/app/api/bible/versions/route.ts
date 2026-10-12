import { NextResponse } from "next/server";
import { bibleVersions, BIBLE_LANGUAGE_ORDER, BIBLE_LANGUAGE_NAMES } from "@/lib/bible-api";

/**
 * GET /api/bible/versions
 *
 * Public list of supported Bible text versions, grouped by language. Provider
 * ids (api.bible / YouVersion / helloao) stay server-side.
 */
export async function GET() {
  const versions = bibleVersions.map(({ id, name, language, ntOnly }) => ({
    id, name, language, ntOnly: !!ntOnly,
  }));
  const languages = Object.fromEntries(
    BIBLE_LANGUAGE_ORDER.map((l) => [l, versions.filter((v) => v.language === l)])
  );
  return NextResponse.json(
    { versions, languages, languageNames: BIBLE_LANGUAGE_NAMES, languageOrder: BIBLE_LANGUAGE_ORDER },
    { status: 200, headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } }
  );
}
