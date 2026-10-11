// Shared TypeScript types for the LitaBible liturgical readings app.
// All content is sample / public-domain-style text composed for this app
// and does not reproduce copyrighted LitaBible translations verbatim.

export type LiturgicalColor = 'green' | 'violet' | 'red' | 'white' | 'rose' | 'gold'

export interface ReadingInfo {
  /** Bolls book id (1..66 protocanon), used by the bolls/api.bible resolver. */
  bookId: number
  /** First chapter to read (inclusive). */
  chapterFrom: number
  /** Last chapter to read (inclusive). */
  chapterTo: number
  /** Localized book name. */
  bookName: { en: string; fr: string; es: string }
  /** Short localized title for the reading, e.g. "The Creation". */
  title: { en: string; fr: string; es: string }
}

export interface DayInfo {
  /** ISO date, e.g. "2026-09-27" */
  date: string
  color: LiturgicalColor
  /** false = optional memorial (rendered as outline badge); true = filled badge */
  colorFilled: boolean
  /** e.g. "Temps ordinaire", "Temps de l'Avent" — or "Bible reading plan" for the reading program. */
  liturgicalTime: string
  /** e.g. "Semaine III du Psautier" — empty for the Bible reading plan. */
  psalterWeek: string
  /** e.g. "Année B" (liturgical year A/B/C) — empty for the Bible reading plan. */
  year: string
  /** e.g. "27e dimanche du Temps ordinaire" — or the reading title for the Bible reading plan. */
  dayName: string
  /** Optional feast label, e.g. "Saint Vincent de Paul († 1660) — commémoration" — or the reading reference for the Bible reading plan. */
  feast?: string
  /** Reading-program metadata (bookId, chapter range, localized names). */
  reading?: ReadingInfo
}

export type ReadingType =
  | 'introduction'
  | 'hymne'
  | 'psaume'
  | 'lecture'
  | 'lecture_patristique'
  | 'conclusion'
  | 'premiere_lecture'
  | 'deuxieme_lecture'
  | 'evangile'
  | 'alleluia'
  | 'intercession'
  | 'oraison'

export interface Reading {
  type: ReadingType
  /** e.g. "Première lecture", "Psaume", "Hymne" */
  label: string
  /** e.g. "Lecture du livre de Néhémie" */
  title: string
  /** e.g. "Ne 8, 1-4a. 5-6. 8-10" */
  reference?: string
  /** Short heading shown in the readings table */
  citation?: string
  /** e.g. "Lecture du livre de Néhémie" — source line above body */
  source?: string
  /** Body text, one entry per paragraph (psalms/hymns may use `strophes` instead) */
  content?: string[]
  /** e.g. "– Parole du Seigneur." */
  conclusion?: string
  /** Psalm refrain, e.g. "R/ Tes paroles, Seigneur, sont esprit et vie." */
  refrain?: string
  /** Psalm stanzas */
  strophes?: { number?: string; text: string }[]
  /** Hymn / patristic author */
  author?: string
  /** e.g. "Saint Augustin, Sermon sur les psaumes" */
  patristicSource?: string
}

export interface MassData {
  date: string
  dayInfo: DayInfo
  readings: Reading[]
}

export interface OfficeData {
  date: string
  hour: 'lectures' | 'laudes' | 'tierce' | 'sexe' | 'none' | 'vepres' | 'complies'
  title: string
  introduction?: string[]
  hymn?: { text: string[]; author?: string; reference?: string }
  psalms: Reading[]
  readings: Reading[]
  conclusion?: string[]
  patristicReading?: Reading
}

export interface BibleBook {
  /** e.g. "genesis" */
  id: string
  /** e.g. "Genèse" */
  name: string
  /** e.g. "Gn" */
  abbreviation: string
  /** Number of chapters */
  chapters: number
  testament: 'AT' | 'NT' | 'PSAUMES'
  /** Book id for the bolls.life API (standard AEB/Bolls mapping, 1..66 for protocanon) */
  bollsBookId?: number
}

export interface VideoItem {
  id: string
  /** e.g. "1/6" */
  number: string
  title: string
  description: string
  youtubeId: string
  duration?: string
}

export interface PodcastItem {
  id: string
  number: string
  title: string
  description: string
  audioUrl?: string
  duration?: string
}
