import { NextRequest, NextResponse } from "next/server";
import { bibleVersions, getBibleVersion, searchBible } from "@/lib/bible-api";

/**
 * GET /api/bible/search?q=...&version=LSG&limit=30
 *
 * Searches the given Bible version via bolls.life. `version` defaults to "LSG".
 * Returns `{ results: SearchResult[], translation, query }` on success and
 * `{ results: [], translation, query, error }` on upstream failure.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").trim();
  const versionParam = (url.searchParams.get("version") ?? "LSG").trim();
  const limitParam = url.searchParams.get("limit");

  if (!q) {
    return NextResponse.json(
      { results: [], translation: versionParam, query: q, error: "Missing 'q' query parameter." },
      { status: 400 }
    );
  }

  if (q.length < 2) {
    return NextResponse.json(
      { results: [], translation: versionParam, query: q, error: "Query must be at least 2 characters." },
      { status: 400 }
    );
  }

  let limit = 30;
  if (limitParam) {
    const n = Number(limitParam);
    if (Number.isFinite(n) && n > 0 && n <= 100) {
      limit = Math.floor(n);
    }
  }

  const version = getBibleVersion(versionParam) ?? bibleVersions[0];
  if (!version) {
    return NextResponse.json(
      { results: [], translation: versionParam, query: q, error: "No Bible versions configured." },
      { status: 500 }
    );
  }

  const results = await searchBible(version, q, limit);

  // Bolls returns [] both on "no matches" and on "network error". Either way we
  // return 200 so the client can render an empty state.
  return NextResponse.json(
    { results, translation: version.id, query: q },
    {
      status: 200,
      headers: {
        // Search results don't really change, but allow some freshness.
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
