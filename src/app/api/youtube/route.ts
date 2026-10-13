import { NextResponse } from "next/server";
import { getChannelVideos, YOUTUBE_CHANNEL_URL } from "@/lib/youtube";

/** GET /api/youtube — latest videos of the LitaBible YouTube channel. */
export async function GET() {
  const { videos, source } = await getChannelVideos();
  return NextResponse.json(
    { channelUrl: YOUTUBE_CHANNEL_URL, videos, source },
    { status: 200, headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400" } }
  );
}
