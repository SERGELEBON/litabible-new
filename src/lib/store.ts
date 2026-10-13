import { create } from 'zustand'

export type LitabiblePage =
  | 'messe'
  | 'bible'
  | 'apropos'
  | 'rdv-dimanche'
  | 'lecture-quotidienne'
  | 'videos'
  | 'calendrier'
  | 'contact'

export type Locale = 'en' | 'fr' | 'es'

export type AproposSubPage =
  | 'missions'
  | 'organisation'
  | 'realisations'
  | 'videos-apropos'
  | 'podcasts'
  | 'conditions'
  | 'questions'
  | 'mentions'

export type CalendarZone =
  | 'romain'
  | 'afrique-nord'
  | 'belgique'
  | 'canada'
  | 'france'
  | 'luxembourg'
  | 'suisse'
  | 'monaco'

interface LitabibleState {
  page: LitabiblePage
  aproposSub: AproposSubPage
  calendarZone: CalendarZone
  selectedDate: string // ISO date YYYY-MM-DD
  bibleTab: 'at' | 'nt'
  locale: Locale
  setPage: (p: LitabiblePage) => void
  setAproposSub: (s: AproposSubPage) => void
  setCalendarZone: (z: CalendarZone) => void
  setSelectedDate: (d: string) => void
  setBibleTab: (t: 'at' | 'nt') => void
  setLocale: (l: Locale) => void
  goNextDay: () => void
  goPrevDay: () => void
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function addDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + n)
  return isoDate(d)
}

export const useLitabibleStore = create<LitabibleState>((set) => ({
  page: 'bible',
  aproposSub: 'missions',
  calendarZone: 'romain',
  selectedDate: isoDate(new Date()),
  bibleTab: 'at',
  locale: 'en',
  setPage: (p) => set({ page: p }),
  setAproposSub: (s) => set({ aproposSub: s }),
  setCalendarZone: (z) => set({ calendarZone: z }),
  setSelectedDate: (d) => set({ selectedDate: d }),
  setBibleTab: (t) => set({ bibleTab: t }),
  setLocale: (l) => set({ locale: l }),
  goNextDay: () => set((s) => ({ selectedDate: addDays(s.selectedDate, 1) })),
  goPrevDay: () => set((s) => ({ selectedDate: addDays(s.selectedDate, -1) })),
}))
