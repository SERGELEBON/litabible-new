import { NextResponse } from "next/server";
import { audioBibles } from "@/lib/bible-audio";

/** GET /api/bible/audio/versions — static catalogue of audio Bibles. */
export async function GET() {
  const audios = audioBibles.map(({ id, name, narrator, language, ntOnly, textVersionId }) => ({
    id, name, narrator, language, ntOnly: !!ntOnly, textVersionId,
  }));
  return NextResponse.json(
    { audios },
    { status: 200, headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } }
  );
}
