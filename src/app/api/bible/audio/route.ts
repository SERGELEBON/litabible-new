import { NextRequest, NextResponse } from "next/server";
import { resolveBookId } from "@/lib/bible-api";
import { audioBibles, getAudioBible, getAudioChapter } from "@/lib/bible-audio";

/**
 * GET /api/bible/audio?audio=BSB-SOUER&book=John&chapter=3
 *
 * Resolves the MP3 URL of one chapter. api.bible URLs are signed and expire
 * after ~1h, so responses are cached only briefly.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const audioParam = (url.searchParams.get("audio") ?? "").trim();
  const bookParam = (url.searchParams.get("book") ?? "").trim();
  const chapterNum = Number((url.searchParams.get("chapter") ?? "1").trim());

  const audio = getAudioBible(audioParam) ?? audioBibles[0];
  const bookId = resolveBookId(bookParam);
  if (!bookId) {
    return NextResponse.json({ error: `Unknown book: "${bookParam}".` }, { status: 400 });
  }
  if (!Number.isFinite(chapterNum) || chapterNum < 1 || chapterNum > 150) {
    return NextResponse.json({ error: "Invalid chapter." }, { status: 400 });
  }

  if (audio.ntOnly && bookId < 40) {
    return NextResponse.json(
      { error: "nt_only", audio: audio.id },
      { status: 404 }
    );
  }

  const result = await getAudioChapter(audio, bookId, chapterNum);
  if (!result) {
    return NextResponse.json(
      { error: "unavailable", audio: audio.id },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { ...result, audio: audio.id, book: bookId, chapter: chapterNum },
    {
      status: 200,
      headers: {
        // Signed URLs expire after ~1h: keep the CDN cache well below that.
        "Cache-Control": result.expiresAt
          ? "public, s-maxage=1200, stale-while-revalidate=300"
          : "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
