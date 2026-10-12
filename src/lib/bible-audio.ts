/**
 * Audio Bible catalogue + resolver (server-side only).
 *
 * Sources verified working:
 *   - api.bible `/audio-bibles/{id}/chapters/{BOOK.CH}` — returns a signed MP3
 *     URL (expires ~1h, so it is resolved per request, never cached long).
 *     Covers English, Akuapem & Asante Twi, Ewe, Yoruba, Igbo, Hausa.
 *   - Free Use Bible API (bible.helloao.org) — `thisChapterAudioLinks` on each
 *     chapter JSON. Berean Standard Bible with several narrators.
 *
 * No free audio source currently exists for French, Spanish, German, Ga,
 * Dioula, Baoulé, Malinké, Mooré, Bambara or Wolof (only Faith Comes By
 * Hearing / Bible Brain has them, which requires an approved key).
 */

import { bookIdToAbl, type BibleLanguage } from '@/lib/bible-api'

const BIBLE_API_KEY = process.env.BIBLE_API_KEY || 'phTaCXXUQwJS07WqoxL9f'
const API_BIBLE_BASE = 'https://rest.api.bible/v1'
const HELLOAO_BASE = 'https://bible.helloao.org/api'

export interface AudioBible {
  /** Stable id used by the frontend. */
  id: string
  /** Display name. */
  name: string
  language: BibleLanguage
  /** Narrator / edition label shown under the name. */
  narrator?: string
  provider: 'api.bible' | 'helloao'
  /** api.bible audio bible id. */
  apiBibleAudioId?: string
  /** helloao translation id + narrator key. */
  helloaoId?: string
  helloaoNarrator?: string
  /** Matching text version id (lets the player show the text alongside). */
  textVersionId?: string
  ntOnly?: boolean
}

export const audioBibles: AudioBible[] = [
  // --- English ---
  { id: 'BSB-SOUER', name: 'Berean Standard Bible', narrator: 'Souer', language: 'en', provider: 'helloao', helloaoId: 'BSB', helloaoNarrator: 'souer', textVersionId: 'BSB' },
  { id: 'BSB-HAYS', name: 'Berean Standard Bible', narrator: 'Hays', language: 'en', provider: 'helloao', helloaoId: 'BSB', helloaoNarrator: 'hays', textVersionId: 'BSB' },
  { id: 'BSB-GILBERT', name: 'Berean Standard Bible', narrator: 'Gilbert', language: 'en', provider: 'helloao', helloaoId: 'BSB', helloaoNarrator: 'gilbert', textVersionId: 'BSB' },
  { id: 'BSB-DAVID', name: 'Berean Standard Bible', narrator: 'David', language: 'en', provider: 'helloao', helloaoId: 'BSB', helloaoNarrator: 'david', textVersionId: 'BSB' },
  { id: 'WEB-DRAMA', name: 'World English Bible', narrator: 'Dramatisé (NT)', language: 'en', provider: 'api.bible', apiBibleAudioId: '105a06b6146d11e7-01', textVersionId: 'WEB', ntOnly: true },
  // --- Twi ---
  { id: 'AKCB-AUDIO', name: 'Akuapem Twi Contemporary Bible', narrator: 'Biblica', language: 'tw', provider: 'api.bible', apiBibleAudioId: '6e21c09d8edb4838-01', textVersionId: 'AKCB' },
  { id: 'ASCB-AUDIO', name: 'Asante Twi Contemporary Bible', narrator: 'Biblica', language: 'tw', provider: 'api.bible', apiBibleAudioId: '03d2ea6f8f7c4a19-01', textVersionId: 'ASCB' },
  // --- Ewe ---
  { id: 'ECS-AUDIO', name: 'Ewe Contemporary Scriptures', narrator: 'Biblica', language: 'ee', provider: 'api.bible', apiBibleAudioId: 'f7a4f623ca6040c0-01', textVersionId: 'ECS' },
  // --- Yoruba ---
  { id: 'BMYO-AUDIO', name: 'Bíbélì Mímọ́ Yorùbá Òde Òní', narrator: 'Biblica', language: 'yo', provider: 'api.bible', apiBibleAudioId: '2691a33c58f144c3-01', textVersionId: 'BMYO' },
  // --- Igbo ---
  { id: 'ICB-AUDIO', name: 'Igbo Contemporary Bible', narrator: 'Biblica', language: 'ig', provider: 'api.bible', apiBibleAudioId: '1b319c1d55564e45-01', textVersionId: 'ICB' },
  // --- Hausa ---
  { id: 'HCB-AUDIO', name: 'Hausa Contemporary Bible', narrator: 'Biblica', language: 'ha', provider: 'api.bible', apiBibleAudioId: '04308387908b41f0-01', textVersionId: 'HCB' },
]

export function getAudioBible(id: string): AudioBible | undefined {
  const lower = id.toLowerCase()
  return audioBibles.find((a) => a.id.toLowerCase() === lower)
}

export interface AudioChapter {
  url: string
  /** Unix seconds when the URL stops working (api.bible signed URLs). */
  expiresAt?: number
  provider: AudioBible['provider']
}

async function fetchJson(url: string, headers: Record<string, string> = {}): Promise<unknown> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 12_000)
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json', ...headers }, signal: ctrl.signal, cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

/** Resolve the MP3 URL for one chapter. Returns null when unavailable. */
export async function getAudioChapter(
  audio: AudioBible,
  bookId: number,
  chapter: number,
): Promise<AudioChapter | null> {
  const code = bookIdToAbl(bookId)
  if (!code) return null
  if (audio.ntOnly && bookId < 40) return null

  if (audio.provider === 'api.bible' && audio.apiBibleAudioId) {
    const json = (await fetchJson(
      `${API_BIBLE_BASE}/audio-bibles/${encodeURIComponent(audio.apiBibleAudioId)}/chapters/${encodeURIComponent(`${code}.${chapter}`)}`,
      { 'api-key': BIBLE_API_KEY },
    )) as { data?: { resourceUrl?: string; expiresAt?: number } } | null
    const url = json?.data?.resourceUrl
    return url ? { url, expiresAt: json?.data?.expiresAt, provider: 'api.bible' } : null
  }

  if (audio.provider === 'helloao' && audio.helloaoId && audio.helloaoNarrator) {
    const json = (await fetchJson(
      `${HELLOAO_BASE}/${encodeURIComponent(audio.helloaoId)}/${code}/${chapter}.json`,
    )) as { thisChapterAudioLinks?: Record<string, string> } | null
    const url = json?.thisChapterAudioLinks?.[audio.helloaoNarrator]
    return url ? { url, provider: 'helloao' } : null
  }

  return null
}
