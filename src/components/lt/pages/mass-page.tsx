'use client'

import { useMemo, useState } from 'react'
import { useLitabibleStore } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { getMassData } from '@/data/mass-readings'
import { localizeDayInfo } from '@/data/liturgical-calendar'
import { TwoPanelLayout } from '@/components/lt/two-panel-layout'
import { LiturgicalBadge } from '@/components/lt/liturgical-badge'
import { BlackButton } from '@/components/lt/black-button'
import { ReadingTable } from '@/components/lt/reading-table'
import { ReadingPanel } from '@/components/lt/reading-panel'
import { MassDateControls } from '@/components/lt/date-nav-bar'
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import type { Locale } from '@/lib/store'

const MONTH_SHORT_KEY = [
  'cal.month.jan', 'cal.month.feb', 'cal.month.mar', 'cal.month.apr',
  'cal.month.may', 'cal.month.jun', 'cal.month.jul', 'cal.month.aug',
  'cal.month.sep', 'cal.month.oct', 'cal.month.nov', 'cal.month.dec',
]
const WEEKDAY_LONG_KEY = [
  'lit.dimanche', 'lit.lundi', 'lit.mardi', 'lit.mercredi',
  'lit.jeudi', 'lit.vendredi', 'lit.samedi',
]

function formatLocalizedDate(iso: string, locale: Locale, t: (k: string) => string): string {
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return iso
  if (locale === 'fr') {
    // 27 sept. 2026 — keep the French dotted short form.
    const FR_MONTHS_SHORT = [
      'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
      'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
    ]
    return `${d.getDate()} ${FR_MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`
  }
  if (locale === 'es') {
    const ES_MONTHS_SHORT = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
    ]
    return `${d.getDate()} ${ES_MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`
  }
  // en — uses the i18n dictionary short month labels.
  return `${d.getDate()} ${t(MONTH_SHORT_KEY[d.getMonth()])} ${d.getFullYear()}`
}

function localizedWeekday(iso: string, t: (k: string) => string): string {
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return ''
  return t(WEEKDAY_LONG_KEY[d.getDay()])
}

/**
 * LA MESSE page — the home page of the LitaBible app.
 *
 * Two-panel layout: left = date header + collapsible readings list, right = full
 * text of the readings. Both panels scroll independently on lg+ screens and
 * stack on mobile.
 */
export function MassPage() {
  const selectedDate = useLitabibleStore((s) => s.selectedDate)
  const goPrevDay = useLitabibleStore((s) => s.goPrevDay)
  const goNextDay = useLitabibleStore((s) => s.goNextDay)
  const locale = useLitabibleStore((s) => s.locale)
  const { t } = useT()

  const mass = getMassData(selectedDate)
  const dayInfo = useMemo(() => localizeDayInfo(mass.dayInfo, locale), [mass.dayInfo, locale])

  const [activeIdx, setActiveIdx] = useState(0)
  const [prevDate, setPrevDate] = useState(selectedDate)
  // Reset the active reading when the date changes (readings list re-computed).
  // The "previous value" pattern is the React-recommended way to adjust state
  // when a prop changes — preferred over useEffect+setState.
  if (selectedDate !== prevDate) {
    setPrevDate(selectedDate)
    setActiveIdx(0)
  }
  const [listOpen, setListOpen] = useState(true)

  // Clamp activeIdx to the readings range so the table never highlights a
  // missing row when the data changes underneath.
  const safeIdx = Math.min(
    activeIdx,
    Math.max(0, mass.readings.length - 1),
  )

  return (
    <section aria-label={t('nav.messe')} className="w-full">
      <TwoPanelLayout
        left={
          <>
            {/* Date header — fixed at the top of the left card */}
            <div className="px-4 pt-4 pb-3 border-b border-[#e2e0dc]">
              <div className="flex items-start gap-2.5 mb-2">
                <LiturgicalBadge
                  color={dayInfo.color}
                  filled={dayInfo.colorFilled}
                  size={16}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[19px] font-semibold text-[#333] leading-tight">
                    {formatLocalizedDate(selectedDate, locale, t)}
                  </h4>
                  <p className="text-[11px] uppercase tracking-wide text-[#6b6b6b] mt-0.5">
                    {localizedWeekday(selectedDate, t)}
                  </p>
                </div>
              </div>
              <p className="text-[14px] text-[#333] leading-snug font-medium mb-1">
                {dayInfo.dayName}
              </p>
              {dayInfo.feast ? (
                <p className="text-[12px] text-[#6b6b6b] leading-snug mb-2">
                  {dayInfo.feast}
                </p>
              ) : null}
              <p className="text-[11px] text-[#6b6b6b] leading-snug mb-3">
                {dayInfo.liturgicalTime}
                {' · '}
                {dayInfo.psalterWeek}
                {' · '}
                {dayInfo.year}
              </p>
              <MassDateControls onPrev={goPrevDay} onNext={goNextDay} />
            </div>

            {/* Collapsible black "Lectures de la messe" bar with the readings table.
                Using the Collapsible primitive for state + trigger, and a
                conditional render for the body to avoid Radix height animation
                interfering with the inner overflow scroll. */}
            <Collapsible
              open={listOpen}
              onOpenChange={setListOpen}
              className="flex-1 flex flex-col min-h-0"
            >
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  aria-expanded={listOpen}
                  className="w-full flex items-center justify-between bg-black text-white px-3.5 py-2.5 text-[12px] font-bold uppercase tracking-tight cursor-pointer transition-colors hover:bg-[#222]"
                >
                  <span>{t('mass.lectures_bar')}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${listOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
              </CollapsibleTrigger>
              {listOpen && (
                <div className="flex-1 min-h-0 overflow-y-auto lt-scroll">
                  <ReadingTable
                    readings={mass.readings}
                    activeIndex={safeIdx}
                    onSelect={setActiveIdx}
                  />
                </div>
              )}
            </Collapsible>

            {/* Bottom prev / next day buttons */}
            <div className="border-t border-[#e2e0dc] px-3 py-2.5 flex items-center justify-between gap-2">
              <BlackButton
                size="sm"
                onClick={goPrevDay}
                className="!normal-case !font-medium"
              >
                {t('mass.prev')}
              </BlackButton>
              <BlackButton
                size="sm"
                onClick={goNextDay}
                className="!normal-case !font-medium"
              >
                {t('mass.next')}
              </BlackButton>
            </div>
          </>
        }
        right={
          <>
            <ReadingPanel
              title={t('mass.title')}
              readings={mass.readings}
              showBadges
            />
            {locale !== 'fr' && (
              <p className="text-[11px] text-[#9a9a9a] mt-3 italic">
                {t('mass.french_note')}
              </p>
            )}
            <p className="text-[11px] text-[#9a9a9a] mt-6 pt-3 border-t border-[#e2e0dc]">
              {t('mass.source')}
            </p>
          </>
        }
      />
    </section>
  )
}

export default MassPage
