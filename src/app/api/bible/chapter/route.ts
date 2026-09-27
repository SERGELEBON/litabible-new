import { NextRequest, NextResponse } from "next/server";
import { bibleVersions, getBibleVersion, getChapter, resolveBookId } from "@/lib/bible-api";
import { getLocalChapter } from "@/data/bible-text-fallback";

/**
 * GET /api/bible/chapter?version=LSG&book=John&chapter=3
 *
 * Returns the verses of a Bible chapter from bolls.life (with bible-api.com
 * fallback when available). On a total failure returns HTTP 502 with an error
 * envelope — never 500.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const versionParam = (url.searchParams.get("version") ?? "LSG").trim();
  const bookParam = (url.searchParams.get("book") ?? "").trim();
  const chapterParam = (url.searchParams.get("chapter") ?? "1").trim();

  if (!bookParam) {
    return NextResponse.json(
      { error: "Missing 'book' query parameter." },
      { status: 400 }
    );
  }

  const chapterNum = Number(chapterParam);
  if (!Number.isFinite(chapterNum) || chapterNum < 1 || chapterNum > 200) {
    return NextResponse.json(
      { error: "Invalid 'chapter' query parameter. Expected an integer 1..200." },
      { status: 400 }
    );
  }

  const version = getBibleVersion(versionParam) ?? bibleVersions[0];
  if (!version) {
    return NextResponse.json(
      { error: "No Bible versions configured." },
      { status: 500 }
    );
  }

  // Validate the book name early so we can 400 instead of returning an empty chapter.
  const bookId = resolveBookId(bookParam);
  if (!bookId) {
    return NextResponse.json(
      { error: `Unknown book: "${bookParam}". Try a name or abbreviation like "John", "Psaumes", "1 Corinthiens", or a number 1..66.` },
      { status: 400 }
    );
  }

  const result = await getChapter(version, bookParam, chapterNum);

  if (result.source === "none" || result.verses.length === 0) {
    // Try the local public-domain fallback (Louis Segond 1910) for chapters we
    // have embedded. This keeps the Bible page functional even when the
    // external free APIs (bolls.life, bible-api.com) are unreachable.
    const local = getLocalChapter(bookId, chapterNum);
    if (local && local.length > 0) {
      return NextResponse.json(
        {
          reference: result.reference,
          book: result.book,
          chapter: result.chapter,
          verses: local,
          translation: result.translation,
          source: "local-fallback (Louis Segond 1910, domaine public)",
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        }
      );
    }
    return NextResponse.json(
      {
        error: "Aucune donnée reçue des API bibliques externes pour ce chapitre. Essayez Genèse 1, Psaume 1, Psaume 23, Jean 1, Jean 3, Matthieu 5, Romains 8, Romains 12, 1 Corinthiens 13, Ésaïe 53, Psaume 51, Psaume 100 ou Apocalypse 21.",
        reference: result.reference,
        book: result.book,
        chapter: result.chapter,
        translation: result.translation,
        source: result.source,
      },
      { status: 502 }
    );
  }

  return NextResponse.json(result, {
    status: 200,
    headers: {
      // Bible text doesn't change — cache aggressively.
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
