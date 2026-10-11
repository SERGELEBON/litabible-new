import type { DayInfo } from './types'
import type { Locale } from '@/lib/store'
import { getReadingForDate, readingReference, type ReadingPlanItem } from './reading-plan'

// =============================================================================
// LitaBible — Calendar data layer for the daily Bible reading program.
//
// Previously this module computed a Catholic liturgical calendar (Easter /
// Advent / Lent / saints / ranks). It has been repurposed: every day now
// points to a single Bible passage drawn deterministically from
// `readingPlan`. The DayInfo SHAPE is preserved so existing importers
// (mass-readings.ts, office-hours.ts, mass-page.tsx, hours-page.tsx,
// lecture-quotidienne-page.tsx) still compile and render — they just display
// the reading title + reference instead of saint names and seasons.
//
//   - color = 'green', colorFilled = true for every day (one badge color)
//   - dayName    = reading title (EN by default; localized by localizeDayInfo)
//   - feast      = reading reference (e.g. "Genesis 1-2")
//   - liturgicalTime = "Bible reading plan"
//   - psalterWeek / year = "" (no longer used)
//   - reading    = full ReadingPlanItem (bookId, chapters, localized names)
// =============================================================================

// English default for `liturgicalTime`. localizeDayInfo() translates this to
// FR/ES for callers that ask for a localized copy.
const PLAN_TITLE_EN = 'Bible reading plan'
const PLAN_TITLE: Record<Locale, string> = {
  en: 'Bible reading plan',
  fr: 'Plan de lecture biblique',
  es: 'Plan de lectura bíblica',
}

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

function toISO(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function toReadingInfo(r: ReadingPlanItem) {
  return {
    bookId: r.bookId,
    chapterFrom: r.chapterFrom,
    chapterTo: r.chapterTo,
    bookName: r.bookName,
    title: r.title,
  }
}

/**
 * Returns DayInfo for the given ISO date, populated from the Bible reading
 * plan. Fields map as follows:
 *   - date         = the input date
 *   - color        = 'green' (always)
 *   - colorFilled  = true (always)
 *   - liturgicalTime = 'Bible reading plan'
 *   - psalterWeek  = ''
 *   - year         = ''
 *   - dayName      = reading title (English)
 *   - feast        = reading reference (English, e.g. "Genesis 1-2")
 *   - reading      = the ReadingPlanItem metadata
 */
export function getDayInfo(dateInput: string): DayInfo {
  const date = parseISO(dateInput)
  const reading = getReadingForDate(dateInput)
  return {
    date: toISO(date),
    color: 'green',
    colorFilled: true,
    liturgicalTime: PLAN_TITLE_EN,
    psalterWeek: '',
    year: '',
    dayName: reading.title.en,
    feast: readingReference(reading, 'en'),
    reading: toReadingInfo(reading),
  }
}

/**
 * Returns DayInfo for every day of the given (1-indexed) month, each populated
 * from `getReadingForDate`.
 */
export function getMonthCalendar(year: number, month: number): DayInfo[] {
  const daysInMonth = new Date(year, month, 0).getDate()
  const out: DayInfo[] = []
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    out.push(getDayInfo(iso))
  }
  return out
}

/**
 * Returns a copy of `day` with localized strings for `liturgicalTime`,
 * `dayName`, and `feast`. Falls back to the English values stored on the day
 * if no `reading` is attached (e.g. legacy MassData). `date`, `color`,
 * `colorFilled`, `psalterWeek`, `year`, and `reading` are preserved unchanged.
 */
export function localizeDayInfo(day: DayInfo, locale: Locale): DayInfo {
  if (locale === 'en') return day
  const liturgicalTime = day.liturgicalTime === PLAN_TITLE_EN
    ? PLAN_TITLE[locale]
    : day.liturgicalTime
  // Localize the reading title + reference from the attached reading metadata
  // when available; otherwise fall back to the English strings.
  const dayName = day.reading ? day.reading.title[locale] || day.dayName : day.dayName
  const feast = day.reading ? readingReference(day.reading, locale) : day.feast
  return {
    ...day,
    liturgicalTime,
    dayName,
    feast,
  }
}

/**
 * Convenience for callers that want a fully-localized month calendar.
 */
export function getMonthCalendarLocalized(year: number, month: number, locale: Locale): DayInfo[] {
  return getMonthCalendar(year, month).map((d) => localizeDayInfo(d, locale))
}
