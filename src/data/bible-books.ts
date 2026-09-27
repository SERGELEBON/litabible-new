import type { BibleBook } from './types'

// =============================================================================
// Bible books — Catholic canon in French.
//
// The 46 Old Testament books (including the deuterocanonical books: Tobie,
// Judith, additions to Esther, 1-2 Maccabées, Sagesse, Ecclésiastique/Siracide,
// Baruc) and 27 New Testament books. A separate `psalmsBooks` array contains
// the 150 individual psalms for the dedicated Psalms tab.
//
// `bollsBookId` follows the standard Bolls/AEB mapping (1 = Genesis … 66 =
// Revelation). Deuterocanonical books not in the Bolls protocanon are left
// without a `bollsBookId`.
// =============================================================================

// ---------------------------------------------------------------------------
// Old Testament (46 books, Catholic canon).
// ---------------------------------------------------------------------------
export const oldTestamentBooks: BibleBook[] = [
  { id: 'genesis', name: 'Genèse', abbreviation: 'Gn', chapters: 50, testament: 'AT', bollsBookId: 1 },
  { id: 'exodus', name: 'Exode', abbreviation: 'Ex', chapters: 40, testament: 'AT', bollsBookId: 2 },
  { id: 'leviticus', name: 'Lévitique', abbreviation: 'Lv', chapters: 27, testament: 'AT', bollsBookId: 3 },
  { id: 'numbers', name: 'Nombres', abbreviation: 'Nb', chapters: 36, testament: 'AT', bollsBookId: 4 },
  { id: 'deuteronomy', name: 'Deutéronome', abbreviation: 'Dt', chapters: 34, testament: 'AT', bollsBookId: 5 },
  { id: 'joshua', name: 'Josué', abbreviation: 'Jos', chapters: 24, testament: 'AT', bollsBookId: 6 },
  { id: 'judges', name: 'Juges', abbreviation: 'Jg', chapters: 21, testament: 'AT', bollsBookId: 7 },
  { id: 'ruth', name: 'Ruth', abbreviation: 'Rt', chapters: 4, testament: 'AT', bollsBookId: 8 },
  { id: '1-samuel', name: '1 Samuel', abbreviation: '1 S', chapters: 31, testament: 'AT', bollsBookId: 9 },
  { id: '2-samuel', name: '2 Samuel', abbreviation: '2 S', chapters: 24, testament: 'AT', bollsBookId: 10 },
  { id: '1-rois', name: '1 Rois', abbreviation: '1 R', chapters: 22, testament: 'AT', bollsBookId: 11 },
  { id: '2-rois', name: '2 Rois', abbreviation: '2 R', chapters: 25, testament: 'AT', bollsBookId: 12 },
  { id: '1-chroniques', name: '1 Chroniques', abbreviation: '1 Ch', chapters: 29, testament: 'AT', bollsBookId: 13 },
  { id: '2-chroniques', name: '2 Chroniques', abbreviation: '2 Ch', chapters: 36, testament: 'AT', bollsBookId: 14 },
  { id: 'esdras', name: 'Esdras', abbreviation: 'Esd', chapters: 10, testament: 'AT', bollsBookId: 15 },
  { id: 'nehemie', name: 'Néhémie', abbreviation: 'Ne', chapters: 13, testament: 'AT', bollsBookId: 16 },
  { id: 'tobie', name: 'Tobie', abbreviation: 'Tb', chapters: 14, testament: 'AT' },
  { id: 'judith', name: 'Judith', abbreviation: 'Jdt', chapters: 16, testament: 'AT' },
  { id: 'esther', name: 'Esther', abbreviation: 'Est', chapters: 14, testament: 'AT', bollsBookId: 17 },
  { id: '1-maccabees', name: '1 Maccabées', abbreviation: '1 M', chapters: 16, testament: 'AT' },
  { id: '2-maccabees', name: '2 Maccabées', abbreviation: '2 M', chapters: 15, testament: 'AT' },
  { id: 'job', name: 'Job', abbreviation: 'Jb', chapters: 42, testament: 'AT', bollsBookId: 18 },
  { id: 'psaumes', name: 'Psaumes', abbreviation: 'Ps', chapters: 150, testament: 'AT', bollsBookId: 19 },
  { id: 'proverbes', name: 'Proverbes', abbreviation: 'Pr', chapters: 31, testament: 'AT', bollsBookId: 20 },
  { id: 'qoheleth', name: 'Qohéleth (Ecclésiaste)', abbreviation: 'Qo', chapters: 12, testament: 'AT', bollsBookId: 21 },
  { id: 'cantique', name: 'Cantique des cantiques', abbreviation: 'Ct', chapters: 8, testament: 'AT', bollsBookId: 22 },
  { id: 'sagesse', name: 'Sagesse', abbreviation: 'Sg', chapters: 19, testament: 'AT' },
  { id: 'ecclesiastique', name: 'Ecclésiastique (Siracide)', abbreviation: 'Si', chapters: 51, testament: 'AT' },
  { id: 'isaie', name: 'Isaïe', abbreviation: 'Is', chapters: 66, testament: 'AT', bollsBookId: 23 },
  { id: 'jeremie', name: 'Jérémie', abbreviation: 'Jr', chapters: 52, testament: 'AT', bollsBookId: 24 },
  { id: 'lamentations', name: 'Lamentations', abbreviation: 'La', chapters: 5, testament: 'AT', bollsBookId: 25 },
  { id: 'baruc', name: 'Baruc', abbreviation: 'Ba', chapters: 6, testament: 'AT' },
  { id: 'ezekiel', name: 'Ézéchiel', abbreviation: 'Ez', chapters: 48, testament: 'AT', bollsBookId: 26 },
  { id: 'daniel', name: 'Daniel', abbreviation: 'Dn', chapters: 14, testament: 'AT', bollsBookId: 27 },
  { id: 'osee', name: 'Osée', abbreviation: 'Os', chapters: 14, testament: 'AT', bollsBookId: 28 },
  { id: 'joel', name: 'Joël', abbreviation: 'Jl', chapters: 4, testament: 'AT', bollsBookId: 29 },
  { id: 'amos', name: 'Amos', abbreviation: 'Am', chapters: 9, testament: 'AT', bollsBookId: 30 },
  { id: 'abdias', name: 'Abdias', abbreviation: 'Ab', chapters: 1, testament: 'AT', bollsBookId: 31 },
  { id: 'jonas', name: 'Jonas', abbreviation: 'Jon', chapters: 4, testament: 'AT', bollsBookId: 32 },
  { id: 'miche', name: 'Miche', abbreviation: 'Mi', chapters: 7, testament: 'AT', bollsBookId: 33 },
  { id: 'nahum', name: 'Nahum', abbreviation: 'Na', chapters: 3, testament: 'AT', bollsBookId: 34 },
  { id: 'habacuc', name: 'Habacuc', abbreviation: 'Ha', chapters: 3, testament: 'AT', bollsBookId: 35 },
  { id: 'sophonie', name: 'Sophonie', abbreviation: 'So', chapters: 3, testament: 'AT', bollsBookId: 36 },
  { id: 'aggee', name: 'Aggée', abbreviation: 'Ag', chapters: 2, testament: 'AT', bollsBookId: 37 },
  { id: 'zacharie', name: 'Zacharie', abbreviation: 'Za', chapters: 14, testament: 'AT', bollsBookId: 38 },
  { id: 'malachie', name: 'Malachie', abbreviation: 'Ml', chapters: 4, testament: 'AT', bollsBookId: 39 },
]

// ---------------------------------------------------------------------------
// New Testament (27 books).
// ---------------------------------------------------------------------------
export const newTestamentBooks: BibleBook[] = [
  { id: 'matthieu', name: 'Matthieu', abbreviation: 'Mt', chapters: 28, testament: 'NT', bollsBookId: 40 },
  { id: 'marc', name: 'Marc', abbreviation: 'Mc', chapters: 16, testament: 'NT', bollsBookId: 41 },
  { id: 'luc', name: 'Luc', abbreviation: 'Lc', chapters: 24, testament: 'NT', bollsBookId: 42 },
  { id: 'jean', name: 'Jean', abbreviation: 'Jn', chapters: 21, testament: 'NT', bollsBookId: 43 },
  { id: 'actes', name: 'Actes des Apôtres', abbreviation: 'Ac', chapters: 28, testament: 'NT', bollsBookId: 44 },
  { id: 'romains', name: 'Romains', abbreviation: 'Rm', chapters: 16, testament: 'NT', bollsBookId: 45 },
  { id: '1-corinthiens', name: '1 Corinthiens', abbreviation: '1 Co', chapters: 16, testament: 'NT', bollsBookId: 46 },
  { id: '2-corinthiens', name: '2 Corinthiens', abbreviation: '2 Co', chapters: 13, testament: 'NT', bollsBookId: 47 },
  { id: 'galates', name: 'Galates', abbreviation: 'Ga', chapters: 6, testament: 'NT', bollsBookId: 48 },
  { id: 'ephesiens', name: 'Éphésiens', abbreviation: 'Ep', chapters: 6, testament: 'NT', bollsBookId: 49 },
  { id: 'philippiens', name: 'Philippiens', abbreviation: 'Ph', chapters: 4, testament: 'NT', bollsBookId: 50 },
  { id: 'colossiens', name: 'Colossiens', abbreviation: 'Col', chapters: 4, testament: 'NT', bollsBookId: 51 },
  { id: '1-thessaloniciens', name: '1 Thessaloniciens', abbreviation: '1 Th', chapters: 5, testament: 'NT', bollsBookId: 52 },
  { id: '2-thessaloniciens', name: '2 Thessaloniciens', abbreviation: '2 Th', chapters: 3, testament: 'NT', bollsBookId: 53 },
  { id: '1-timothee', name: '1 Timothée', abbreviation: '1 Tm', chapters: 6, testament: 'NT', bollsBookId: 54 },
  { id: '2-timothee', name: '2 Timothée', abbreviation: '2 Tm', chapters: 4, testament: 'NT', bollsBookId: 55 },
  { id: 'tite', name: 'Tite', abbreviation: 'Tt', chapters: 3, testament: 'NT', bollsBookId: 56 },
  { id: 'philemon', name: 'Philémon', abbreviation: 'Phm', chapters: 1, testament: 'NT', bollsBookId: 57 },
  { id: 'hebreux', name: 'Hébreux', abbreviation: 'He', chapters: 13, testament: 'NT', bollsBookId: 58 },
  { id: 'jacques', name: 'Jacques', abbreviation: 'Jc', chapters: 5, testament: 'NT', bollsBookId: 59 },
  { id: '1-pierre', name: '1 Pierre', abbreviation: '1 P', chapters: 5, testament: 'NT', bollsBookId: 60 },
  { id: '2-pierre', name: '2 Pierre', abbreviation: '2 P', chapters: 3, testament: 'NT', bollsBookId: 61 },
  { id: '1-jean', name: '1 Jean', abbreviation: '1 Jn', chapters: 5, testament: 'NT', bollsBookId: 62 },
  { id: '2-jean', name: '2 Jean', abbreviation: '2 Jn', chapters: 1, testament: 'NT', bollsBookId: 63 },
  { id: '3-jean', name: '3 Jean', abbreviation: '3 Jn', chapters: 1, testament: 'NT', bollsBookId: 64 },
  { id: 'jude', name: 'Jude', abbreviation: 'Jude', chapters: 1, testament: 'NT', bollsBookId: 65 },
  { id: 'apocalypse', name: 'Apocalypse', abbreviation: 'Ap', chapters: 22, testament: 'NT', bollsBookId: 66 },
]

// ---------------------------------------------------------------------------
// Psalms tab — 150 individual psalms, each as its own "book" entry so the UI
// can present a flat list / pagination of all psalms.
// ---------------------------------------------------------------------------
export const psalmsBooks: BibleBook[] = Array.from({ length: 150 }, (_, i) => {
  const n = i + 1
  return {
    id: `psaume-${n}`,
    name: `Psaume ${n}`,
    abbreviation: `Ps ${n}`,
    chapters: 1,
    testament: 'PSAUMES' as const,
    bollsBookId: 19, // all psalms live inside the Psaumes book on Bolls
  }
})

// ---------------------------------------------------------------------------
// Convenience: combined array & lookup helpers.
// ---------------------------------------------------------------------------
export const bibleBooks: BibleBook[] = [...oldTestamentBooks, ...newTestamentBooks]

export function getBookById(id: string): BibleBook | undefined {
  return bibleBooks.find((b) => b.id === id) ?? psalmsBooks.find((b) => b.id === id)
}

export function getBookByAbbreviation(abbr: string): BibleBook | undefined {
  const target = abbr.trim().toLowerCase()
  const all = [...bibleBooks, ...psalmsBooks]
  return all.find((b) => b.abbreviation.toLowerCase() === target)
}
