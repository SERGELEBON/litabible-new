import { create } from 'zustand'

export type AelfPage =
  | 'messe'
  | 'heures'
  | 'bible'
  | 'aelf'
  | 'videos'
  | 'calendrier'
  | 'contact'

export type AelfSubPage =
  | 'missions'
  | 'organisation'
  | 'realisations'
  | 'videos-aelf'
  | 'podcasts'
  | 'conditions'
  | 'questions'
  | 'mentions'

export type OfficeHour =
  | 'lectures'
  | 'laudes'
  | 'tierce'
  | 'sexe'
  | 'none'
  | 'vepres'
  | 'complies'

export type CalendarZone =
  | 'romain'
  | 'afrique-nord'
  | 'belgique'
  | 'canada'
  | 'france'
  | 'luxembourg'
  | 'suisse'
  | 'monaco'

interface AelfState {
  page: AelfPage
  aelfSub: AelfSubPage
  officeHour: OfficeHour
  calendarZone: CalendarZone
  selectedDate: string // ISO date YYYY-MM-DD
  bibleTab: 'at' | 'nt' | 'psaumes'
  setPage: (p: AelfPage) => void
  setAelfSub: (s: AelfSubPage) => void
  setOfficeHour: (h: OfficeHour) => void
  setCalendarZone: (z: CalendarZone) => void
  setSelectedDate: (d: string) => void
  setBibleTab: (t: 'at' | 'nt' | 'psaumes') => void
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

export const useAelfStore = create<AelfState>((set) => ({
  page: 'messe',
  aelfSub: 'missions',
  officeHour: 'lectures',
  calendarZone: 'romain',
  selectedDate: isoDate(new Date()),
  bibleTab: 'at',
  setPage: (p) => set({ page: p }),
  setAelfSub: (s) => set({ aelfSub: s }),
  setOfficeHour: (h) => set({ officeHour: h }),
  setCalendarZone: (z) => set({ calendarZone: z }),
  setSelectedDate: (d) => set({ selectedDate: d }),
  setBibleTab: (t) => set({ bibleTab: t }),
  goNextDay: () => set((s) => ({ selectedDate: addDays(s.selectedDate, 1) })),
  goPrevDay: () => set((s) => ({ selectedDate: addDays(s.selectedDate, -1) })),
}))
