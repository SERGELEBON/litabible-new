// Shared TypeScript types for the AELF liturgical readings clone.
// All content is sample / public-domain-style text composed for this UI clone
// and does not reproduce copyrighted AELF translations verbatim.

export type LiturgicalColor = 'green' | 'violet' | 'red' | 'white' | 'rose' | 'gold'

export interface DayInfo {
  /** ISO date, e.g. "2026-09-27" */
  date: string
  color: LiturgicalColor
  /** false = optional memorial (rendered as outline badge); true = filled badge */
  colorFilled: boolean
  /** e.g. "Temps ordinaire", "Temps de l'Avent" */
  liturgicalTime: string
  /** e.g. "Semaine III du Psautier" */
  psalterWeek: string
  /** e.g. "Année B" (liturgical year A/B/C) */
  year: string
  /** e.g. "27e dimanche du Temps ordinaire" */
  dayName: string
  /** Optional feast label, e.g. "Saint Vincent de Paul, diacre († 1660) — mémoire" */
  feast?: string
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
