/**
 * Bible API client.
 *
 * Primary source: api.bible (https://rest.api.bible/v1) — a rich, key-protected
 * catalogue covering English, French and Spanish Bible versions.
 * Fallbacks: bolls.life, then bible-api.com, then the local public-domain
 * text in src/data/bible-text-fallback.ts.
 *
 * This module is imported ONLY by server-side route handlers (the client
 * Bible page uses `import type {…}` which is erased at build time, so the
 * API key below never reaches the browser).
 */

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

import { bookNames } from '@/data/bible-books'

/** api.bible API key (provided by the project owner). Overridable via env. */
const BIBLE_API_KEY = process.env.BIBLE_API_KEY || 'phTaCXXUQwJS07WqoxL9f'
const API_BIBLE_BASE = 'https://rest.api.bible/v1'

const BOLLS_BASE = 'https://bible-api.bolls.life'
const BIBLE_API_BASE = 'https://bible-api.com'
const DEFAULT_TIMEOUT_MS = 12_000

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BibleLanguage = 'en' | 'fr' | 'es'

export interface BibleVersion {
  /** Short code shown to the user, e.g. "BSB", "KJV", "JND", "RVR09". */
  id: string
  /** Display name, e.g. "Berean Standard Bible". */
  name: string
  language: BibleLanguage
  /** api.bible bibleId (the canonical version id on api.bible). */
  apiBibleId: string
  /** Optional bolls.life translation code (fallback). */
  bollsCode?: string
  /** Optional bible-api.com translation code (fallback). */
  bibleApiCode?: string
}

export interface Verse {
  verse: number
  text: string
}

export interface ChapterResult {
  reference: string
  book: string
  chapter: number
  verses: Verse[]
  translation: string
  /** Which upstream answered: "api.bible" | "bolls" | "bible-api" | "local-fallback" | "none". */
  source: string
}

export interface SearchResult {
  reference: string
  text: string
  translation: string
}

// ---------------------------------------------------------------------------
// Curated version list (verified against api.bible with the project key)
// ---------------------------------------------------------------------------

export const bibleVersions: BibleVersion[] = [
  // --- English (api.bible) ---
  { id: 'BSB', name: 'Berean Standard Bible', language: 'en', apiBibleId: 'bba9f40183526463-01', bollsCode: 'BSB' },
  { id: 'KJV', name: 'King James Version', language: 'en', apiBibleId: 'de4e12af7f28f599-01', bollsCode: 'KJV', bibleApiCode: 'kjv' },
  { id: 'WEB', name: 'World English Bible', language: 'en', apiBibleId: '9879dbb7cfe39e4d-01', bollsCode: 'WEB', bibleApiCode: 'web' },
  { id: 'ASV', name: 'American Standard Version', language: 'en', apiBibleId: '06125adad2d5898a-01', bollsCode: 'ASV' },
  { id: 'NASB', name: 'New American Standard Bible 1995', language: 'en', apiBibleId: 'b8ee27bcd1cae43a-01', bollsCode: 'NASB' },
  { id: 'NKJV', name: 'New King James Version', language: 'en', apiBibleId: '63097d2a0a2f7db3-01', bollsCode: 'NKJV' },
  { id: 'NIV', name: 'New International Version 2011', language: 'en', apiBibleId: '78a9f6124f344018-01', bollsCode: 'NIV' },
  // --- French (api.bible) ---
  { id: 'JND', name: 'Bible J.N. Darby (français)', language: 'fr', apiBibleId: 'a93a92589195411f-01', bollsCode: 'JND' },
  // --- Spanish (api.bible) ---
  { id: 'RVR09', name: 'Reina Valera 1909 (español)', language: 'es', apiBibleId: '592420522e16049f-01', bollsCode: 'RVR1960' },
]

export function getBibleVersion(id: string): BibleVersion | undefined {
  const lower = id.toLowerCase()
  return bibleVersions.find(
    (v) => v.id.toLowerCase() === lower || v.apiBibleId.toLowerCase() === lower,
  )
}

// ---------------------------------------------------------------------------
// Book-id resolution (used by all upstreams)
// ---------------------------------------------------------------------------

/** Standard ABL / USFM book codes for the 66 protocanon books, indexed 1..66. */
const BOLL_TO_ABL: string[] = [
  '', 'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA',
  '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB', 'PSA', 'PRO',
  'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO',
  'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP', 'HAG', 'ZEC', 'MAL', 'MAT',
  'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP',
  'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE',
  '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV',
]

const BOOK_ID_TO_NAME: Record<number, string> = {
  1: 'Genesis', 2: 'Exodus', 3: 'Leviticus', 4: 'Numbers', 5: 'Deuteronomy',
  6: 'Joshua', 7: 'Judges', 8: 'Ruth', 9: '1 Samuel', 10: '2 Samuel',
  11: '1 Kings', 12: '2 Kings', 13: '1 Chronicles', 14: '2 Chronicles',
  15: 'Ezra', 16: 'Nehemiah', 17: 'Esther', 18: 'Job', 19: 'Psalms',
  20: 'Proverbs', 21: 'Ecclesiastes', 22: 'Song of Solomon', 23: 'Isaiah',
  24: 'Jeremiah', 25: 'Lamentations', 26: 'Ezekiel', 27: 'Daniel',
  28: 'Hosea', 29: 'Joel', 30: 'Amos', 31: 'Obadiah', 32: 'Jonah',
  33: 'Micah', 34: 'Nahum', 35: 'Habakkuk', 36: 'Zephaniah',
  37: 'Haggai', 38: 'Zechariah', 39: 'Malachi', 40: 'Matthew',
  41: 'Mark', 42: 'Luke', 43: 'John', 44: 'Acts', 45: 'Romans',
  46: '1 Corinthians', 47: '2 Corinthians', 48: 'Galatians',
  49: 'Ephesians', 50: 'Philippians', 51: 'Colossians',
  52: '1 Thessalonians', 53: '2 Thessalonians', 54: '1 Timothy',
  55: '2 Timothy', 56: 'Titus', 57: 'Philemon', 58: 'Hebrews',
  59: 'James', 60: '1 Peter', 61: '2 Peter', 62: '1 John',
  63: '2 John', 64: '3 John', 65: 'Jude', 66: 'Revelation',
}

/** Strip diacritics + lowercase for accent-insensitive matching. */
function ascii(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

/** Aliases for resolving a book name (English + French + Spanish + abbreviations) → 1..66. */
const BOOK_ALIASES: Record<string, number> = (() => {
  const list: Array<[string, number]> = [
    ['genesis', 1], ['gen', 1], ['gn', 1],
    ['exodus', 2], ['exo', 2],
    ['leviticus', 3], ['lev', 3], ['lv', 3],
    ['numbers', 4], ['num', 4], ['nb', 4],
    ['deuteronomy', 5], ['deut', 5], ['dt', 5],
    ['joshua', 6], ['josh', 6], ['jos', 6],
    ['judges', 7], ['jdg', 7], ['jg', 7],
    ['ruth', 8], ['ru', 8], ['rt', 8],
    ['1samuel', 9], ['1sam', 9], ['1s', 9],
    ['2samuel', 10], ['2sam', 10], ['2s', 10],
    ['1kings', 11], ['1kgs', 11], ['1k', 11], ['1r', 11],
    ['2kings', 12], ['2kgs', 12], ['2k', 12], ['2r', 12],
    ['1chronicles', 13], ['1chron', 13], ['1ch', 13],
    ['2chronicles', 14], ['2chron', 14], ['2ch', 14],
    ['ezra', 15], ['ezr', 15], ['esd', 15],
    ['nehemiah', 16], ['neh', 16], ['ne', 16],
    ['esther', 17], ['est', 17], ['et', 17],
    ['job', 18], ['jb', 18],
    ['psalms', 19], ['psalm', 19], ['ps', 19], ['pss', 19],
    ['proverbs', 20], ['prov', 20], ['pr', 20], ['pv', 20],
    ['ecclesiastes', 21], ['eccl', 21], ['qohelet', 21], ['qo', 21],
    ['songofsolomon', 22], ['song', 22], ['sos', 22], ['cantique', 22], ['ct', 22],
    ['isaiah', 23], ['isa', 23], ['is', 23], ['es', 23],
    ['jeremiah', 24], ['jer', 24], ['jr', 24],
    ['lamentations', 25], ['lam', 25], ['la', 25],
    ['ezekiel', 26], ['ezek', 26], ['ez', 26],
    ['daniel', 27], ['dan', 27], ['da', 27], ['dn', 27],
    ['hosea', 28], ['hos', 28],
    ['joel', 29], ['jl', 29],
    ['amos', 30], ['am', 30],
    ['obadiah', 31], ['obad', 31], ['ob', 31], ['abd', 31],
    ['jonah', 32], ['jon', 32],
    ['micah', 33], ['mic', 33], ['mi', 33],
    ['nahum', 34], ['na', 34], ['nah', 34],
    ['habakkuk', 35], ['hab', 35], ['hb', 35],
    ['zephaniah', 36], ['zeph', 36], ['zp', 36], ['so', 36],
    ['haggai', 37], ['hag', 37], ['ag', 37],
    ['zechariah', 38], ['zech', 38], ['zc', 38], ['zac', 38],
    ['malachi', 39], ['mal', 39], ['ml', 39],
    ['matthew', 40], ['matt', 40], ['mt', 40],
    ['mark', 41], ['mk', 41], ['mc', 41],
    ['luke', 42], ['lk', 42], ['lc', 42],
    ['john', 43], ['jn', 43],
    ['acts', 44], ['act', 44], ['ac', 44],
    ['romans', 45], ['rom', 45], ['ro', 45], ['rm', 45],
    ['1corinthians', 46], ['1cor', 46], ['1co', 46],
    ['2corinthians', 47], ['2cor', 47], ['2co', 47],
    ['galatians', 48], ['gal', 48], ['ga', 48],
    ['ephesians', 49], ['eph', 49], ['ep', 49],
    ['philippians', 50], ['phil', 50], ['pp', 50], ['ph', 50],
    ['colossians', 51], ['col', 51], ['cl', 51],
    ['1thessalonians', 52], ['1thess', 52], ['1th', 52],
    ['2thessalonians', 53], ['2thess', 53], ['2th', 53],
    ['1timothy', 54], ['1tim', 54], ['1ti', 54],
    ['2timothy', 55], ['2tim', 55], ['2ti', 55],
    ['titus', 56], ['tit', 56], ['ti', 56],
    ['philemon', 57], ['phlm', 57], ['phm', 57],
    ['hebrews', 58], ['heb', 58], ['he', 58],
    ['james', 59], ['jas', 59], ['jm', 59], ['jc', 59],
    ['1peter', 60], ['1pet', 60], ['1pe', 60], ['1pi', 60], ['1p', 60],
    ['2peter', 61], ['2pet', 61], ['2pe', 61], ['2pi', 61], ['2p', 61],
    ['1john', 62], ['1jn', 62], ['1jo', 62], ['1j', 62],
    ['2john', 63], ['2jn', 63], ['2jo', 63], ['2j', 63],
    ['3john', 64], ['3jn', 64], ['3jo', 64], ['3j', 64],
    ['jude', 65], ['jd', 65],
    ['revelation', 66], ['rev', 66], ['re', 66], ['ap', 66],
  ]
  const out: Record<string, number> = {}
  for (const [k, v] of list) out[ascii(k)] = v

  // Augment with the full localized (English/French/Spanish) book names from
  // the data file so that any localized name — e.g. Spanish "Génesis",
  // "Reina Valera" book titles — resolves to its book id.
  try {
    // Build a reverse map from bollsBookId (1..66) → book.id using a static
    // table is unnecessary; we just iterate every entry and match by id.
    const ID_TO_BOLL: Record<string, number> = {
      genesis: 1, exodus: 2, leviticus: 3, numbers: 4, deuteronomy: 5,
      joshua: 6, judges: 7, ruth: 8, '1-samuel': 9, '2-samuel': 10,
      '1-rois': 11, '2-rois': 12, '1-chroniques': 13, '2-chroniques': 14,
      esdras: 15, nehemie: 16, esther: 17, job: 18, psaumes: 19, proverbes: 20,
      qoheleth: 21, cantique: 22, isaie: 23, jeremie: 24, lamentations: 25,
      baruc: 0, ezekiel: 26, daniel: 27, osee: 28, joel: 29, amos: 30,
      abdias: 31, jonas: 32, miche: 33, nahum: 34, habacuc: 35, sophonie: 36,
      aggee: 37, zacharie: 38, malachie: 39, matthieu: 40, marc: 41, luc: 42,
      jean: 43, actes: 44, romains: 45, '1-corinthiens': 46, '2-corinthiens': 47,
      galates: 48, ephesiens: 49, philippiens: 50, colossiens: 51,
      '1-thessaloniciens': 52, '2-thessaloniciens': 53, '1-timothee': 54,
      '2-timothee': 55, tite: 56, philemon: 57, hebreux: 58, jacques: 59,
      '1-pierre': 60, '2-pierre': 61, '1-jean': 62, '2-jean': 63, '3-jean': 64,
      jude: 65, apocalypse: 66,
    }
    for (const [id, names] of Object.entries(bookNames)) {
      const boll = ID_TO_BOLL[id]
      if (!boll) continue // deuterocanonical books without a protocanon slot
      for (const locale of ['en', 'fr', 'es'] as const) {
        const nm = ascii(names[locale])
        if (nm) out[nm] = boll
      }
    }
  } catch {
    // data import best-effort; the static alias list above is the baseline.
  }

  return out
})()

/** Map book-id → api.bible ABL code (e.g. 1 → "GEN"). Empty string if out of range. */
export function bookIdToAbl(id: number): string {
  return BOLL_TO_ABL[id] ?? ''
}

export function bookIdToName(id: number): string {
  return BOOK_ID_TO_NAME[id] ?? `Book ${id}`
}

/** Resolve any book input (name / abbreviation / French / English / Spanish / numeric) → 1..66. */
export function resolveBookId(book: string | number): number | null {
  if (typeof book === 'number') return book >= 1 && book <= 66 ? book : null
  const trimmed = String(book).trim()
  if (!trimmed) return null
  if (/^\d+$/.test(trimmed)) {
    const n = parseInt(trimmed, 10)
    return n >= 1 && n <= 66 ? n : null
  }
  // Strip whitespace/punctuation + diacritics for accent-insensitive matching.
  const key = ascii(trimmed.replace(/[\s.\-_/]/g, ''))
  if (BOOK_ALIASES[key]) return BOOK_ALIASES[key]
  if (BOOK_ALIASES[ascii(trimmed)]) return BOOK_ALIASES[ascii(trimmed)]
  return null
}

// ---------------------------------------------------------------------------
// HTTP helper
// ---------------------------------------------------------------------------

async function fetchWithTimeout(
  url: string,
  opts: Record<string, unknown> = {},
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    return await fetch(url, {
      ...opts,
      signal: ctrl.signal,
      headers: { Accept: 'application/json', ...(opts.headers as Record<string, string> | undefined) },
      cache: 'no-store' as const,
    })
  } finally {
    clearTimeout(timer)
  }
}

// ---------------------------------------------------------------------------
// api.bible (PRIMARY)
// ---------------------------------------------------------------------------

/**
 * Parse api.bible `content-type=text` chapter content into structured verses.
 * The format embeds verse markers like `[1] … [2] …` and may include section
 * titles on their own lines (no marker). Titles are dropped.
 */
function parseApiBibleText(content: string): Verse[] {
  if (!content) return []
  const verses: Verse[] = []
  // Split on `[n]` markers, keeping the number.
  const parts = content.split(/\[(\d+)\]/)
  // parts = ['', '1', ' verse-1 text ', '2', ' verse-2 text ', …]
  for (let i = 1; i + 1 < parts.length; i += 2) {
    const n = parseInt(parts[i], 10)
    const text = (parts[i + 1] || '')
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .trim()
    if (Number.isFinite(n) && n >= 1 && text) {
      verses.push({ verse: n, text })
    }
  }
  return verses
}

/** Fetch a chapter from api.bible. Returns [] on any failure. */
async function fetchApiBibleChapter(
  version: BibleVersion,
  bookId: number,
  chapter: number,
): Promise<Verse[]> {
  const code = bookIdToAbl(bookId)
  if (!code || !version.apiBibleId) return []
  const url = `${API_BIBLE_BASE}/bibles/${encodeURIComponent(version.apiBibleId)}/chapters/${encodeURIComponent(`${code}.${chapter}`)}?content-type=text&include-notes=false&include-titles=false`
  try {
    const res = await fetchWithTimeout(url, {
      headers: { 'api-key': BIBLE_API_KEY },
    })
    if (!res.ok) return []
    const json = (await res.json()) as { data?: { content?: string } }
    const content = json?.data?.content
    if (!content) return []
    return parseApiBibleText(content)
  } catch {
    return []
  }
}

/** Search a bible via api.bible. Returns [] on any failure. */
async function searchApiBible(
  version: BibleVersion,
  query: string,
  limit: number,
): Promise<SearchResult[]> {
  if (!version.apiBibleId) return []
  // api.bible search uses `query=` (not `search=`).
  const url = `${API_BIBLE_BASE}/bibles/${encodeURIComponent(version.apiBibleId)}/search?query=${encodeURIComponent(query)}&limit=${limit}&sort=relevance`
  try {
    const res = await fetchWithTimeout(url, {
      headers: { 'api-key': BIBLE_API_KEY },
    })
    if (!res.ok) return []
    const json = (await res.json()) as {
      data?: {
        verses?: { id?: string; reference?: string; text?: string; bookId?: string; content?: string }[]
      }
    }
    const verses = json?.data?.verses
    if (!Array.isArray(verses)) return []
    const out: SearchResult[] = []
    for (const v of verses) {
      const ref = v?.reference || v?.id || ''
      const text = (v?.text || v?.content || '')
        .replace(/\[(\d+)\]/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      if (ref && text) out.push({ reference: ref, text, translation: version.id })
    }
    return out
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// Fallbacks: bolls.life + bible-api.com
// ---------------------------------------------------------------------------

async function fetchBollsChapter(translation: string, book: number, chapter: number): Promise<Verse[]> {
  if (!translation) return []
  const url = `${BOLLS_BASE}/v2/text/${encodeURIComponent(translation)}/${book}/${chapter}/`
  try {
    const res = await fetchWithTimeout(url)
    if (!res.ok) return []
    const data = (await res.json()) as Array<{ verse?: number; text?: string }>
    if (!Array.isArray(data)) return []
    return data
      .filter((v) => typeof v.verse === 'number' && typeof v.text === 'string')
      .map((v) => ({ verse: v.verse as number, text: (v.text as string).trim() }))
  } catch {
    return []
  }
}

async function fetchBibleApiChapter(passage: string, translation: string): Promise<Verse[]> {
  if (!translation) return []
  const ref = `${passage}:1-200`
  const url = `${BIBLE_API_BASE}/${encodeURIComponent(ref)}?translation=${encodeURIComponent(translation)}`
  try {
    const res = await fetchWithTimeout(url)
    if (!res.ok) return []
    const data = (await res.json()) as { verses?: Array<{ verse?: number; text?: string }> }
    if (!data || !Array.isArray(data.verses)) return []
    return data.verses
      .filter((v) => typeof v.verse === 'number' && typeof v.text === 'string')
      .map((v) => ({ verse: v.verse as number, text: (v.text as string).trim() }))
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetch a full Bible chapter. Tries api.bible first, then bolls.life, then
 * bible-api.com. Never throws — returns an empty ChapterResult on total failure.
 */
export async function getChapter(
  version: BibleVersion,
  bookName: string,
  chapter: number,
): Promise<ChapterResult> {
  const safeChapter = Math.max(1, Math.floor(chapter))
  const bookId = resolveBookId(bookName)
  const canonicalName = bookId ? bookIdToName(bookId) : bookName
  const reference = `${canonicalName} ${safeChapter}`

  const base: ChapterResult = {
    reference,
    book: canonicalName,
    chapter: safeChapter,
    verses: [],
    translation: version.id,
    source: 'none',
  }
  if (!bookId) return base

  // 1. Primary — api.bible.
  const apiVerses = await fetchApiBibleChapter(version, bookId, safeChapter)
  if (apiVerses.length > 0) {
    return { ...base, verses: apiVerses, source: 'api.bible' }
  }

  // 2. Fallback — bolls.life.
  if (version.bollsCode) {
    const bolls = await fetchBollsChapter(version.bollsCode, bookId, safeChapter)
    if (bolls.length > 0) return { ...base, verses: bolls, source: 'bolls' }
  }

  // 3. Fallback — bible-api.com.
  if (version.bibleApiCode) {
    const fallback = await fetchBibleApiChapter(`${canonicalName} ${safeChapter}`, version.bibleApiCode)
    if (fallback.length > 0) return { ...base, verses: fallback, source: 'bible-api' }
  }

  return base
}

/**
 * Search the Bible. Tries api.bible first, then bolls.life. Returns [] on
 * total failure.
 */
export async function searchBible(
  version: BibleVersion,
  query: string,
  limit = 30,
): Promise<SearchResult[]> {
  const cleaned = query.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim()
  if (!cleaned) return []
  const count = Math.max(1, Math.min(100, Math.floor(limit)))

  // 1. api.bible.
  const apiResults = await searchApiBible(version, cleaned, count)
  if (apiResults.length > 0) return apiResults

  // 2. bolls.life.
  const url = `${BOLLS_BASE}/v2/search/${encodeURIComponent(version.bollsCode || version.id)}/${encodeURIComponent(cleaned)}/${count}/`
  try {
    const res = await fetchWithTimeout(url)
    if (!res.ok) return []
    const data = (await res.json()) as Array<Record<string, unknown>>
    if (!Array.isArray(data)) return []
    const results: SearchResult[] = []
    for (const hit of data) {
      const bId = Number(hit.book ?? -1)
      const ch = Number(hit.chapter ?? -1)
      const v = Number(hit.verse ?? -1)
      const text = typeof hit.text === 'string' ? hit.text.trim() : ''
      if (!Number.isFinite(bId) || bId < 1 || !text) continue
      results.push({ reference: `${bookIdToName(bId)} ${ch}:${v}`, text, translation: version.id })
    }
    return results
  } catch {
    return []
  }
}
