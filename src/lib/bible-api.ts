/**
 * Bible API client.
 *
 * Primary source: bolls.life (https://bible-api.bolls.life/)
 * Fallback:     bible-api.com (https://bible-api.com/)
 *
 * Both are free, no API key required.
 * All calls are server-side and use the global fetch with an AbortController
 * timeout so a slow upstream can never wedge a request.
 */

export type BibleLanguage = "fr" | "en" | "es";

export interface BibleVersion {
  id: string;
  name: string;
  language: BibleLanguage;
  /** Translation code expected by bolls.life v2 routes. */
  bollsCode: string;
  /** Optional translation code expected by bible-api.com (fallback). */
  bibleApiCode?: string;
}

export const bibleVersions: BibleVersion[] = [
  // French
  { id: "LSG", name: "Louis Segond 1910", language: "fr", bollsCode: "LSG", bibleApiCode: "lsg" },
  { id: "BDS", name: "Bible du Semeur", language: "fr", bollsCode: "BDS" },
  { id: "TOB", name: "Traduction Œcuménique de la Bible", language: "fr", bollsCode: "TOB" },
  { id: "NEG", name: "Nouvelle Édition de Genève", language: "fr", bollsCode: "NEG" },
  { id: "MAR", name: "Bible Maredsous", language: "fr", bollsCode: "MAR" },
  // English
  { id: "KJV", name: "King James Version", language: "en", bollsCode: "KJV", bibleApiCode: "kjv" },
  { id: "ESV", name: "English Standard Version", language: "en", bollsCode: "ESV" },
  { id: "NIV", name: "New International Version", language: "en", bollsCode: "NIV" },
  { id: "WEB", name: "World English Bible", language: "en", bollsCode: "WEB", bibleApiCode: "web" },
  { id: "NLT", name: "New Living Translation", language: "en", bollsCode: "NLT" },
  // Spanish
  { id: "RVR1960", name: "Reina-Valera 1960", language: "es", bollsCode: "RVR1960" },
  { id: "NTV", name: "Nueva Traducción Viviente", language: "es", bollsCode: "NTV" },
  { id: "RVA", name: "Reina-Valera Antigua", language: "es", bollsCode: "RVA", bibleApiCode: "rva" },
];

export function getBibleVersion(id: string): BibleVersion | undefined {
  const lower = id.toLowerCase();
  return bibleVersions.find((v) => v.id.toLowerCase() === lower || v.bollsCode.toLowerCase() === lower);
}

export interface Verse {
  verse: number;
  text: string;
}

export interface ChapterResult {
  reference: string;
  book: string;
  chapter: number;
  verses: Verse[];
  translation: string;
  /** Which upstream actually answered: "bolls" | "bible-api" | "none". */
  source: string;
}

export interface SearchResult {
  reference: string;
  text: string;
  translation: string;
}

const BOLLS_BASE = "https://bible-api.bolls.life";
const BIBLE_API_BASE = "https://bible-api.com";
const DEFAULT_TIMEOUT_MS = 10_000;

/** Run fetch with an abort timeout; resolves to Response. Throws on network/timeout error. */
async function fetchWithTimeout(url: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: ctrl.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Bible book name -> canonical (protestant) book number, 1..66.
 * Accepts English and French names plus common abbreviations.
 * Returns null if the name cannot be resolved.
 */
const BOOK_ALIASES: Record<string, number> = (() => {
  const list: Array<[string, number]> = [
    // Genesis
    ["genesis", 1], ["gen", 1], ["genèse", 1], ["genese", 1], ["gn", 1],
    // Exodus
    ["exodus", 2], ["exo", 2], ["exode", 2],
    // Leviticus
    ["leviticus", 3], ["lev", 3], ["lévitique", 3], ["levitique", 3], ["lv", 3],
    // Numbers
    ["numbers", 4], ["num", 4], ["nombres", 4], ["nb", 4],
    // Deuteronomy
    ["deuteronomy", 5], ["deut", 5], ["dt", 5], ["deutéronome", 5], ["deuteronomique", 5],
    // Joshua
    ["joshua", 6], ["josh", 6], ["jos", 6], ["josué", 6], ["josue", 6],
    // Judges
    ["judges", 7], ["jdg", 7], ["juges", 7], ["jg", 7],
    // Ruth
    ["ruth", 8], ["ru", 8],
    // 1 Samuel
    ["1samuel", 9], ["1sam", 9], ["1s", 9], ["1samuel", 9],
    // 2 Samuel
    ["2samuel", 10], ["2sam", 10], ["2s", 10],
    // 1 Kings
    ["1kings", 11], ["1kgs", 11], ["1k", 11], ["1rois", 11], ["1r", 11],
    // 2 Kings
    ["2kings", 12], ["2kgs", 12], ["2k", 12], ["2rois", 12], ["2r", 12],
    // 1 Chronicles
    ["1chronicles", 13], ["1chron", 13], ["1ch", 13], ["1chroniques", 13], ["1ch", 13],
    // 2 Chronicles
    ["2chronicles", 14], ["2chron", 14], ["2ch", 14], ["2chroniques", 14],
    // Ezra
    ["ezra", 15], ["ezr", 15], ["esdras", 15], ["esd", 15],
    // Nehemiah
    ["nehemiah", 16], ["neh", 16], ["néhémie", 16], ["nehemie", 16], ["ne", 16],
    // Esther
    ["esther", 17], ["est", 17], ["est", 17], ["et", 17],
    // Job
    ["job", 18], ["jb", 18],
    // Psalms
    ["psalms", 19], ["psalm", 19], ["psaumes", 19], ["psaume", 19], ["ps", 19], ["pss", 19],
    // Proverbs
    ["proverbs", 20], ["prov", 20], ["pr", 20], ["proverbes", 20], ["pv", 20],
    // Ecclesiastes
    ["ecclesiastes", 21], ["eccl", 21], ["qohelet", 21], ["ecclésiaste", 21], ["ecclesiaste", 21], ["qo", 21],
    // Song of Solomon
    ["songofsolomon", 22], ["song", 22], ["sos", 22], ["cantique", 22], ["cantiquedescantiques", 22], ["ct", 22], ["ss", 22],
    // Isaiah
    ["isaiah", 23], ["isa", 23], ["is", 23], ["esaïe", 23], ["esaie", 23], ["es", 23],
    // Jeremiah
    ["jeremiah", 24], ["jer", 24], ["jr", 24], ["jérémie", 24], ["jeremie", 24],
    // Lamentations
    ["lamentations", 25], ["lam", 25], ["la", 25], ["lamentations", 25],
    // Ezekiel
    ["ezekiel", 26], ["ezek", 26], ["ez", 26], ["ezéchiel", 26], ["ezechiel", 26],
    // Daniel
    ["daniel", 27], ["dan", 27], ["da", 27], ["dn", 27],
    // Hosea
    ["hosea", 28], ["hos", 28], ["osée", 28], ["osee", 28],
    // Joel
    ["joel", 29], ["jl", 29], ["joël", 29],
    // Amos
    ["amos", 30], ["am", 30],
    // Obadiah
    ["obadiah", 31], ["obad", 31], ["ob", 31], ["abdias", 31], ["abd", 31],
    // Jonah
    ["jonah", 32], ["jon", 32], ["jonas", 32],
    // Micah
    ["micah", 33], ["mic", 33], ["michée", 33], ["michee", 33], ["mi", 33],
    // Nahum
    ["nahum", 34], ["na", 34], ["nah", 34],
    // Habakkuk
    ["habakkuk", 35], ["hab", 35], ["hb", 35], ["habacuc", 35],
    // Zephaniah
    ["zephaniah", 36], ["zeph", 36], ["zp", 36], ["sophonie", 36], ["so", 36], ["sop", 36],
    // Haggai
    ["haggai", 37], ["hag", 37], ["aggée", 37], ["aggee", 37], ["ag", 37],
    // Zechariah
    ["zechariah", 38], ["zech", 38], ["zc", 38], ["zacharie", 38], ["za", 38], ["zac", 38],
    // Malachi
    ["malachi", 39], ["mal", 39], ["ml", 39], ["malachie", 39],
    // Matthew
    ["matthew", 40], ["matt", 40], ["mt", 40], ["matthieu", 40],
    // Mark
    ["mark", 41], ["mk", 41], ["marc", 41], ["mc", 41],
    // Luke
    ["luke", 42], ["lk", 42], ["luc", 42], ["lc", 42],
    // John
    ["john", 43], ["jn", 43], ["jean", 43], ["jn", 43],
    // Acts
    ["acts", 44], ["act", 44], ["ac", 44], ["actes", 44],
    // Romans
    ["romans", 45], ["rom", 45], ["ro", 45], ["romains", 45], ["rm", 45],
    // 1 Corinthians
    ["1corinthians", 46], ["1cor", 46], ["1co", 46], ["1corinthiens", 46],
    // 2 Corinthians
    ["2corinthians", 47], ["2cor", 47], ["2co", 47], ["2corinthiens", 47],
    // Galatians
    ["galatians", 48], ["gal", 48], ["ga", 48], ["galates", 48],
    // Ephesians
    ["ephesians", 49], ["eph", 49], ["ep", 49], ["ephesiens", 49], ["ésiens", 49],
    // Philippians
    ["philippians", 50], ["phil", 50], ["pp", 50], ["philippiens", 50], ["ph", 50], ["ph", 50],
    // Colossians
    ["colossians", 51], ["col", 51], ["cl", 51], ["colossiens", 51],
    // 1 Thessalonians
    ["1thessalonians", 52], ["1thess", 52], ["1th", 52], ["1thessaloniciens", 52], ["1th", 52],
    // 2 Thessalonians
    ["2thessalonians", 53], ["2thess", 53], ["2th", 53], ["2thessaloniciens", 53],
    // 1 Timothy
    ["1timothy", 54], ["1tim", 54], ["1ti", 54], ["1timothée", 54], ["1timothee", 54],
    // 2 Timothy
    ["2timothy", 55], ["2tim", 55], ["2ti", 55], ["2timothée", 55], ["2timothee", 55],
    // Titus
    ["titus", 56], ["tit", 56], ["ti", 56], ["tite", 56],
    // Philemon
    ["philemon", 57], ["phlm", 57], ["philémon", 57], ["philemon", 57], ["phm", 57],
    // Hebrews
    ["hebrews", 58], ["heb", 58], ["he", 58], ["hébreux", 58], ["hebreux", 58],
    // James
    ["james", 59], ["jas", 59], ["jm", 59], ["jacques", 59], ["jc", 59],
    // 1 Peter
    ["1peter", 60], ["1pet", 60], ["1pe", 60], ["1pi", 60], ["1pierre", 60], ["1p", 60],
    // 2 Peter
    ["2peter", 61], ["2pet", 61], ["2pe", 61], ["2pi", 61], ["2pierre", 61], ["2p", 61],
    // 1 John
    ["1john", 62], ["1jn", 62], ["1jean", 62], ["1jo", 62], ["1j", 62],
    // 2 John
    ["2john", 63], ["2jn", 63], ["2jean", 63], ["2jo", 63], ["2j", 63],
    // 3 John
    ["3john", 64], ["3jn", 64], ["3jean", 64], ["3jo", 64], ["3j", 64],
    // Jude
    ["jude", 65], ["jd", 65],
    // Revelation
    ["revelation", 66], ["rev", 66], ["re", 66], ["apocalypse", 66], ["ap", 66],
  ];
  const out: Record<string, number> = {};
  for (const [k, v] of list) out[k] = v;
  return out;
})();

const BOOK_ID_TO_NAME: Record<number, string> = {
  1: "Genesis", 2: "Exodus", 3: "Leviticus", 4: "Numbers", 5: "Deuteronomy",
  6: "Joshua", 7: "Judges", 8: "Ruth", 9: "1 Samuel", 10: "2 Samuel",
  11: "1 Kings", 12: "2 Kings", 13: "1 Chronicles", 14: "2 Chronicles",
  15: "Ezra", 16: "Nehemiah", 17: "Esther", 18: "Job", 19: "Psalms",
  20: "Proverbs", 21: "Ecclesiastes", 22: "Song of Solomon", 23: "Isaiah",
  24: "Jeremiah", 25: "Lamentations", 26: "Ezekiel", 27: "Daniel",
  28: "Hosea", 29: "Joel", 30: "Amos", 31: "Obadiah", 32: "Jonah",
  33: "Micah", 34: "Nahum", 35: "Habakkuk", 36: "Zephaniah",
  37: "Haggai", 38: "Zechariah", 39: "Malachi", 40: "Matthew",
  41: "Mark", 42: "Luke", 43: "John", 44: "Acts", 45: "Romans",
  46: "1 Corinthians", 47: "2 Corinthians", 48: "Galatians",
  49: "Ephesians", 50: "Philippians", 51: "Colossians",
  52: "1 Thessalonians", 53: "2 Thessalonians", 54: "1 Timothy",
  55: "2 Timothy", 56: "Titus", 57: "Philemon", 58: "Hebrews",
  59: "James", 60: "1 Peter", 61: "2 Peter", 62: "1 John",
  63: "2 John", 64: "3 John", 65: "Jude", 66: "Revelation",
};

/**
 * Normalize any book input (name, abbreviation, French, English, or numeric id)
 * into a canonical numeric id in the 1..66 range.
 * Returns null if the input cannot be resolved.
 */
export function resolveBookId(book: string | number): number | null {
  if (typeof book === "number") {
    return book >= 1 && book <= 66 ? book : null;
  }
  const trimmed = String(book).trim();
  if (trimmed === "") return null;
  if (/^\d+$/.test(trimmed)) {
    const n = parseInt(trimmed, 10);
    return n >= 1 && n <= 66 ? n : null;
  }
  // Strip punctuation/whitespace and lowercase.
  const key = trimmed.replace(/[\s.\-_/]/g, "").toLowerCase();
  if (BOOK_ALIASES[key]) return BOOK_ALIASES[key];
  // Try the original (case-insensitive) name as-is.
  const lower = trimmed.toLowerCase();
  if (BOOK_ALIASES[lower]) return BOOK_ALIASES[lower];
  return null;
}

export function bookIdToName(id: number): string {
  return BOOK_ID_TO_NAME[id] ?? `Book ${id}`;
}

/** Fetch a chapter's verses from bolls.life. Returns [] on failure. */
async function fetchBollsChapter(translation: string, book: number, chapter: number): Promise<Verse[]> {
  const url = `${BOLLS_BASE}/v2/text/${encodeURIComponent(translation)}/${book}/${chapter}/`;
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{ verse?: number; text?: string }>;
    if (!Array.isArray(data)) return [];
    return data
      .filter((v) => typeof v.verse === "number" && typeof v.text === "string")
      .map((v) => ({ verse: v.verse as number, text: (v.text as string).trim() }));
  } catch {
    return [];
  }
}

/** Fetch a chapter's verses from bible-api.com (fallback). Returns [] on failure. */
async function fetchBibleApiChapter(passage: string, translation: string): Promise<Verse[]> {
  // bible-api.com accepts ranges like "John 3:1-36". We ask for the whole chapter
  // by passing the chapter alone — it returns the first verse by default, so
  // we additionally pass a generous range to maximize coverage.
  const ref = `${passage}:1-200`;
  const url = `${BIBLE_API_BASE}/${encodeURIComponent(ref)}?translation=${encodeURIComponent(translation)}`;
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return [];
    const data = (await res.json()) as { verses?: Array<{ verse?: number; text?: string }> };
    if (!data || !Array.isArray(data.verses)) return [];
    return data.verses
      .filter((v) => typeof v.verse === "number" && typeof v.text === "string")
      .map((v) => ({ verse: v.verse as number, text: (v.text as string).trim() }));
  } catch {
    return [];
  }
}

/**
 * Fetch a full Bible chapter for a given version.
 * Tries bolls.life first; falls back to bible-api.com (only if the version has a
 * `bibleApiCode`). Never throws — on total failure returns an empty ChapterResult
 * with `source: "none"`.
 */
export async function getChapter(
  version: BibleVersion,
  bookName: string,
  chapter: number
): Promise<ChapterResult> {
  const safeChapter = Math.max(1, Math.floor(chapter));
  const bookId = resolveBookId(bookName);
  const canonicalName = bookId ? bookIdToName(bookId) : bookName;
  const reference = `${canonicalName} ${safeChapter}`;

  const base: ChapterResult = {
    reference,
    book: canonicalName,
    chapter: safeChapter,
    verses: [],
    translation: version.id,
    source: "none",
  };

  if (!bookId) return base;

  // 1. Primary: bolls.life.
  const bolls = await fetchBollsChapter(version.bollsCode, bookId, safeChapter);
  if (bolls.length > 0) {
    return { ...base, verses: bolls, source: "bolls" };
  }

  // 2. Fallback: bible-api.com (only if a code is configured).
  if (version.bibleApiCode) {
    const fallback = await fetchBibleApiChapter(`${canonicalName} ${safeChapter}`, version.bibleApiCode);
    if (fallback.length > 0) {
      return { ...base, verses: fallback, source: "bible-api" };
    }
  }

  return base;
}

/** Normalize a search pattern to bolls.life's expected plain text query. */
function sanitizeSearchQuery(q: string): string {
  return q.replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

/**
 * Search the Bible via bolls.life. Returns [] on failure.
 * `limit` is capped to 100 to keep response sizes reasonable.
 */
export async function searchBible(
  version: BibleVersion,
  query: string,
  limit = 30
): Promise<SearchResult[]> {
  const cleaned = sanitizeSearchQuery(query);
  if (!cleaned) return [];
  const count = Math.max(1, Math.min(100, Math.floor(limit)));
  const url = `${BOLLS_BASE}/v2/search/${encodeURIComponent(version.bollsCode)}/${encodeURIComponent(cleaned)}/${count}/`;
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return [];
    const data = (await res.json()) as Array<Record<string, unknown>>;
    if (!Array.isArray(data)) return [];
    const results: SearchResult[] = [];
    for (const hit of data) {
      // bolls.life returns objects with `book`, `chapter`, `verse`, `text` keys.
      const bookId = Number(hit.book ?? -1);
      const chapter = Number(hit.chapter ?? -1);
      const verse = Number(hit.verse ?? -1);
      const text = typeof hit.text === "string" ? hit.text.trim() : "";
      if (!Number.isFinite(bookId) || bookId < 1 || !text) continue;
      const ref = `${bookIdToName(bookId)} ${chapter}:${verse}`;
      results.push({ reference: ref, text, translation: version.id });
    }
    return results;
  } catch {
    return [];
  }
}
