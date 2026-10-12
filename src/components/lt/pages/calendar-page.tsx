'use client'

import { useMemo, useState } from 'react'
import { MonthNavBar } from '../date-nav-bar'
import { LiturgicalBadge } from '../liturgical-badge'
import { useLitabibleStore } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { getMonthCalendar, localizeDayInfo } from '@/data/liturgical-calendar'
import { getReadingForDate } from '@/data/reading-plan'

const MONTH_SHORT_KEY = [
  'cal.month.jan', 'cal.month.feb', 'cal.month.mar', 'cal.month.apr',
  'cal.month.may', 'cal.month.jun', 'cal.month.jul', 'cal.month.aug',
  'cal.month.sep', 'cal.month.oct', 'cal.month.nov', 'cal.month.dec',
]
const MONTH_FULL_KEY = [
  'cal.month_full.jan', 'cal.month_full.feb', 'cal.month_full.mar', 'cal.month_full.apr',
  'cal.month_full.may', 'cal.month_full.jun', 'cal.month_full.jul', 'cal.month_full.aug',
  'cal.month_full.sep', 'cal.month_full.oct', 'cal.month_full.nov', 'cal.month_full.dec',
]
// Weekday short labels — JS getDay(): 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
const WEEKDAY_SHORT_KEY = [
  'cal.weekday.sun', 'cal.weekday.mon', 'cal.weekday.tue', 'cal.weekday.wed',
  'cal.weekday.thu', 'cal.weekday.fri', 'cal.weekday.sat',
]

function parseISO(iso: string): { year: number; month: number; day: number } {
  const [y, m, d] = iso.split('-').map(Number)
  return { year: y, month: m || 1, day: d || 1 }
}

/**
 * Calendar page — a simple daily Bible reading program. Each day shows the
 * date, a green liturgical badge, the reading title + reference, and a
 * "Read" button that opens the Bible page.
 */
export function CalendarPage() {
  const selectedDate = useLitabibleStore((s) => s.selectedDate)
  const setSelectedDate = useLitabibleStore((s) => s.setSelectedDate)
  const setPage = useLitabibleStore((s) => s.setPage)
  const locale = useLitabibleStore((s) => s.locale)
  const { t } = useT()

  // Local state for the currently-viewed month, initialised from `selectedDate`.
  const [{ year, month }, setView] = useState(() => {
    const parsed = parseISO(selectedDate)
    return { year: parsed.year, month: parsed.month }
  })

  const days = useMemo(
    () => getMonthCalendar(year, month).map((d) => localizeDayInfo(d, locale)),
    [year, month, locale],
  )

  // Reading-day index lookup: maps the ISO date to its index in the plan so
  // we can display "Day {n}" alongside the reading.
  const readingDayIndex = (iso: string) => getReadingForDate(iso).dayIndex + 1

  function prevMonth() {
    setView((v) => {
      const m = v.month - 1
      if (m < 1) return { year: v.year - 1, month: 12 }
      return { ...v, month: m }
    })
  }

  function nextMonth() {
    setView((v) => {
      const m = v.month + 1
      if (m > 12) return { year: v.year + 1, month: 1 }
      return { ...v, month: m }
    })
  }

  const prevDate = useMemo(() => {
    const m = month - 1
    return m < 1
      ? new Date(year - 1, 11, 1)
      : new Date(year, m - 1, 1)
  }, [year, month])

  const nextDate = useMemo(() => {
    const m = month + 1
    return m > 12
      ? new Date(year + 1, 0, 1)
      : new Date(year, m - 1, 1)
  }, [year, month])

  const prevLabel = t('cal.prev_month', { month: t(MONTH_SHORT_KEY[prevDate.getMonth()]) })
  const nextLabel = t('cal.next_month', { month: t(MONTH_SHORT_KEY[nextDate.getMonth()]) })

  // Header: "1 SEP 2026" — the first day of the viewed month.
  const monthNameShort = t(MONTH_SHORT_KEY[month - 1]).toUpperCase().replace('.', '')
  const headerTitle = t('cal.header', { month: monthNameShort, year })

  function openBible(dateIso: string) {
    setSelectedDate(dateIso)
    setPage('bible')
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Decorative dark grey bar */}
      <div className="bg-[#3a3a3a] h-1.5 w-full" aria-hidden="true" />

      {/* Plan title + intro (yellow header accent strip) */}
      <div className="bg-[#1a4fa0] text-white px-4 sm:px-6 py-3 sm:py-4 border-b border-[#143d7a]">
        <h1 className="text-[18px] sm:text-[22px] font-bold uppercase tracking-wide leading-tight">
          {t('cal.plan_title')}
        </h1>
        <p className="text-[14px] sm:text-[15px] text-white/80 leading-snug mt-0.5">
          {t('cal.plan_intro')}
        </p>
      </div>

      {/* Month navigation bar */}
      <div className="bg-white border border-b-0 border-[#e2e0dc] p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <MonthNavBar
          onPrev={prevMonth}
          onNext={nextMonth}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      </div>

      {/* White content card with the scrollable list */}
      <section className="bg-white border border-[#e2e0dc] p-5 sm:p-7">
        <h2 className="uppercase text-[24px] sm:text-[28px] font-semibold text-[#333333] tracking-wide mb-1">
          {headerTitle}
        </h2>
        <p className="text-[15px] text-[#6b6b6b] uppercase tracking-wide mb-5">
          {t('cal.subhead', {
            month: t(MONTH_FULL_KEY[month - 1]),
            year,
            n: days.length,
          })}
        </p>

        <div className="max-h-[70vh] overflow-y-auto lt-scroll -mx-1">
          <ul className="divide-y divide-[#e2e0dc]">
            {days.map((day) => {
              const { day: dayNum } = parseISO(day.date)
              const parsed = new Date(year, month - 1, dayNum)
              const wd = t(WEEKDAY_SHORT_KEY[parsed.getDay()])
              const dateLabel = `${dayNum} ${t(MONTH_SHORT_KEY[month - 1])} ${year}`
              const isToday = day.date === selectedDate

              return (
                <li
                  key={day.date}
                  className={`px-1 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 ${
                    isToday ? 'bg-[#fbf5f5]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <LiturgicalBadge
                      color={day.color}
                      filled={day.colorFilled}
                      size={14}
                      className="mt-1"
                    />
                    <div className="min-w-0">
                      <p className="text-[15px] font-bold text-[#333333]">
                        <span className="text-[#1a4fa0]">{wd}</span>{' '}
                        <span className="text-[#333333]">{dateLabel}</span>
                      </p>
                      <p className="text-[16px] leading-[1.5] text-[#333333] mt-0.5">
                        <span className="font-semibold text-[#1a4fa0]">
                          {day.dayName}
                        </span>
                        {day.feast && day.feast !== day.dayName && (
                          <>
                            {' — '}
                            <span className="text-[#333333]">{day.feast}</span>
                          </>
                        )}
                      </p>
                      <p className="text-[13px] text-[#6b6b6b] uppercase tracking-wide mt-0.5">
                        {t('cal.day_n', { n: readingDayIndex(day.date) })}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-3 sm:gap-1 sm:items-end flex-shrink-0 pl-5 sm:pl-0">
                    <button
                      type="button"
                      onClick={() => openBible(day.date)}
                      className="lt-btn-black !bg-[#1a4fa0] !text-white text-[14px] px-3 py-1.5 inline-flex items-center hover:!bg-[#143d7a] whitespace-nowrap"
                    >
                      {t('cal.read_btn')}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default CalendarPage
