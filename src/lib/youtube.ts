/**
 * YouTube channel feed for "LitaBible - RDV Biblique" (@litabible).
 * Server-side only: reads the public RSS feed (no API key needed), with a
 * fallback on the channel's /videos page, then on a static list.
 */

export const YOUTUBE_CHANNEL_ID = 'UCcoPnmSULKkzMi6pCYY-l0A'
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@litabible'

export interface YoutubeVideo {
  id: string
  title: string
  published?: string
  description?: string
}

/** Known videos — used only if YouTube cannot be reached. */
export const FALLBACK_VIDEOS: YoutubeVideo[] = [
  { id: 'Y19i5bjmsYU', title: 'Résumé du Livre de Michée, Nahum, Habakuk et Sophonie' },
]

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\\u0026/g, '&')
    .replace(/\\"/g, '"')
}

async function get(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { 'Accept-Language': 'fr-FR,fr;q=0.9', 'User-Agent': 'Mozilla/5.0 (LitaBible)' },
      next: { revalidate: 1800 },
    })
    return res.ok ? await res.text() : null
  } catch {
    return null
  }
}

async function fromRss(): Promise<YoutubeVideo[]> {
  const xml = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`)
  if (!xml) return []
  const out: YoutubeVideo[] = []
  for (const entry of xml.split('<entry>').slice(1)) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1]
    if (!id || !title) continue
    out.push({
      id,
      title: decode(title),
      published: entry.match(/<published>([^<]+)<\/published>/)?.[1],
      description: decode(entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? '').trim(),
    })
  }
  return out
}

async function fromChannelPage(): Promise<YoutubeVideo[]> {
  const html = await get(`${YOUTUBE_CHANNEL_URL}/videos`)
  if (!html) return []
  const out: YoutubeVideo[] = []
  const seen = new Set<string>()
  const re = /"videoId":"([\w-]{11})"[\s\S]{0,1500}?"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) && out.length < 30) {
    if (seen.has(m[1])) continue
    seen.add(m[1])
    out.push({ id: m[1], title: decode(m[2]) })
  }
  return out
}

export async function getChannelVideos(): Promise<{ videos: YoutubeVideo[]; source: string }> {
  const rss = await fromRss()
  if (rss.length) return { videos: rss, source: 'rss' }
  const page = await fromChannelPage()
  if (page.length) return { videos: page, source: 'channel' }
  return { videos: FALLBACK_VIDEOS, source: 'fallback' }
}
