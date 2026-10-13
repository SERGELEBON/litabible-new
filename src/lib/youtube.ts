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
  { id: 'Y19i5bjmsYU', title: 'Résumé du Livre de Michée, Nahum, Habakuk et Sophonie', published: '2026-10-12T12:00:00Z' },
  { id: 'CRXdhcYgRX4', title: 'La grâce de Dieu — Frère Mobio Loba Marc', published: '2026-10-01T12:00:00Z' },
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
      headers: {
        'Accept-Language': 'fr-FR,fr;q=0.9',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
        Cookie: 'CONSENT=YES+1; SOCS=CAI',
      },
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

/** Walk YouTube's ytInitialData (new "lockupViewModel" and legacy "videoRenderer"). */
function collect(node: unknown, out: YoutubeVideo[], seen: Set<string>) {
  if (!node || typeof node !== 'object') return
  const o = node as Record<string, any>
  const lv = o.lockupViewModel
  if (lv?.contentId && lv?.metadata?.lockupMetadataViewModel?.title?.content) {
    if (!seen.has(lv.contentId)) {
      seen.add(lv.contentId)
      out.push({ id: lv.contentId, title: lv.metadata.lockupMetadataViewModel.title.content })
    }
  }
  const vr = o.videoRenderer ?? o.gridVideoRenderer
  if (vr?.videoId && vr?.title) {
    const t = vr.title.runs?.[0]?.text ?? vr.title.simpleText
    if (t && !seen.has(vr.videoId)) {
      seen.add(vr.videoId)
      out.push({ id: vr.videoId, title: t })
    }
  }
  for (const k in o) collect(o[k], out, seen)
}

async function fromChannelPage(): Promise<YoutubeVideo[]> {
  const html = await get(`${YOUTUBE_CHANNEL_URL}/videos`)
  if (!html) return []
  const json = html.match(/var ytInitialData = (\{[\s\S]*?\});<\/script>/)?.[1]
  if (!json) return []
  try {
    const out: YoutubeVideo[] = []
    collect(JSON.parse(json), out, new Set())
    // Add known publication dates when available
    return out.slice(0, 30).map((v) => ({
      ...v,
      published: v.published ?? FALLBACK_VIDEOS.find((f) => f.id === v.id)?.published,
    }))
  } catch {
    return []
  }
}

const LIVE_RE = /^diffusion en direct|^live stream|^en direct/i

/** Titled videos first (newest first), then live-stream replays with a clean title. */
function tidy(list: YoutubeVideo[]): YoutubeVideo[] {
  const clean = list.map((v) => ({ ...v, title: v.title.replace(/\s{2,}/g, ' ').trim() }))
  const titled = clean.filter((v) => !LIVE_RE.test(v.title))
  const lives = clean
    .filter((v) => LIVE_RE.test(v.title))
    .map((v) => ({ ...v, title: 'RDV Biblique — rediffusion du direct', description: '' }))
  return [...titled, ...lives]
}

export async function getChannelVideos(): Promise<{ videos: YoutubeVideo[]; source: string }> {
  const rss = await fromRss()
  if (rss.length) return { videos: tidy(rss), source: 'rss' }
  const page = await fromChannelPage()
  if (page.length) return { videos: tidy(page), source: 'channel' }
  return { videos: FALLBACK_VIDEOS, source: 'fallback' }
}
