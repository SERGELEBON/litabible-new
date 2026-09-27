'use client'

import { useMemo, useState } from 'react'
import { MonthNavBar } from '../date-nav-bar'
import { LiturgicalBadge } from '../liturgical-badge'
import { useLitabibleStore } from '@/lib/store'
import { getMonthCalendar } from '@/data/liturgical-calendar'
import type { DayInfo } from '@/data/types'

const FRENCH_MONTHS_FULL = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

const FRENCH_MONTHS_SHORT = [
  'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
]

const WEEKDAY_SHORT = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

function parseISO(iso: string): { year: number; month: number; day: number } {
  const [y, m, d] = iso.split('-').map(Number)
  return { year: y, month: m || 1, day: d || 1 }
}

function describeDay(day: DayInfo): string {
  // Compose a readable description for a calendar row.
  const parts: string[] = [day.dayName]
  if (day.liturgicalTime) parts.push(`— ${day.liturgicalTime}`)
  if (day.feast && day.feast !== day.dayName) parts.push(`· ${day.feast}`)
  return parts.join(' ')
}

/** Calendrier page — vertical list of all days of the viewed month. */
export function CalendarPage() {
  const selectedDate = useLitabibleStore((s) => s.selectedDate)
  const setSelectedDate = useLitabibleStore((s) => s.setSelectedDate)
  const setPage = useLitabibleStore((s) => s.setPage)

  // Local state for the currently-viewed month, initialised from `selectedDate`.
  const [{ year, month }, setView] = useState(() => {
    const parsed = parseISO(selectedDate)
    return { year: parsed.year, month: parsed.month }
  })

  const days = useMemo(() => getMonthCalendar(year, month), [year, month])

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

  const prevLabel = `${FRENCH_MONTHS_SHORT[prevDate.getMonth()]} ${prevDate.getFullYear()}`
  const nextLabel = `${FRENCH_MONTHS_SHORT[nextDate.getMonth()]} ${nextDate.getFullYear()}`

  // Header: "1 SEPT. 2026" — the first day of the viewed month.
  const monthNameShort = FRENCH_MONTHS_SHORT[month - 1].toUpperCase().replace('.', '')
  const headerTitle = `1 ${monthNameShort} ${year}`

  function openDay(dateIso: string, target: 'messe' | 'heures') {
    setSelectedDate(dateIso)
    setPage(target)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Decorative dark grey bar */}
      <div className="bg-[#3a3a3a] h-1.5 w-full" aria-hidden="true" />

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
        <p className="text-[13px] text-[#6b6b6b] uppercase tracking-wide mb-5">
          {FRENCH_MONTHS_FULL[month - 1]} {year} · {days.length} jours
        </p>

        <div className="max-h-[70vh] overflow-y-auto lt-scroll -mx-1">
          <ul className="divide-y divide-[#e2e0dc]">
            {days.map((day) => {
              const { day: dayNum } = parseISO(day.date)
              const parsed = new Date(year, month - 1, dayNum)
              const wd = WEEKDAY_SHORT[parsed.getDay()]
              const dateLabel = `${dayNum} ${FRENCH_MONTHS_SHORT[month - 1]} ${year}`
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
                        <span className="text-[#0e7c66]">{wd}</span>{' '}
                        <span className="text-[#333333]">{dateLabel}</span>
                      </p>
                      <p className="text-[14px] leading-[1.5] text-[#333333] mt-0.5">
                        {describeDay(day)}
                      </p>
                      {day.year && (
                        <p className="text-[12px] text-[#6b6b6b] mt-0.5 uppercase tracking-wide">
                          {day.year} · {day.psalterWeek}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-3 sm:gap-1 sm:items-end flex-shrink-0 pl-5 sm:pl-0">
                    <button
                      type="button"
                      onClick={() => openDay(day.date, 'messe')}
                      className="text-[13px] text-[#0e7c66] hover:underline uppercase font-semibold whitespace-nowrap"
                    >
                      La messe
                    </button>
                    <button
                      type="button"
                      onClick={() => openDay(day.date, 'heures')}
                      className="text-[13px] text-[#0e7c66] hover:underline uppercase font-semibold whitespace-nowrap"
                    >
                      Les heures
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
