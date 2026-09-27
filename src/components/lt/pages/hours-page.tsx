'use client'

import { useMemo, useState } from 'react'
import { useLitabibleStore, type OfficeHour } from '@/lib/store'
import { getOfficeData } from '@/data/office-hours'
import { getDayInfo } from '@/data/liturgical-calendar'
import type { OfficeData, Reading } from '@/data/types'
import { TwoPanelLayout } from '@/components/lt/two-panel-layout'
import { LiturgicalBadge } from '@/components/lt/liturgical-badge'
import { BlackButton } from '@/components/lt/black-button'
import { ReadingTable } from '@/components/lt/reading-table'
import { ReadingPanel } from '@/components/lt/reading-panel'
import { ChevronTab } from '@/components/lt/chevron-tab'
import { DateNavBar } from '@/components/lt/date-nav-bar'
import {
  Collapsible,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'

const FR_MONTHS_SHORT = [
  'janv.',
  'févr.',
  'mars',
  'avr.',
  'mai',
  'juin',
  'juil.',
  'août',
  'sept.',
  'oct.',
  'nov.',
  'déc.',
]
const FR_DAYS_LONG = [
  'dimanche',
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
]

const HOUR_TABS: { id: OfficeHour; label: string }[] = [
  { id: 'lectures', label: 'Lectures' },
  { id: 'laudes', label: 'Laudes' },
  { id: 'tierce', label: 'Tierce' },
  { id: 'sexe', label: 'Sexte' },
  { id: 'none', label: 'None' },
  { id: 'vepres', label: 'Vêpres' },
  { id: 'complies', label: 'Complies' },
]

function formatFrenchDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getDate()} ${FR_MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`
}

function frenchWeekday(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return ''
  return FR_DAYS_LONG[d.getDay()]
}

/**
 * Flatten an OfficeData into a single `Reading[]` list so both the
 * ReadingTable (left) and ReadingPanel (right) can iterate over a unified
 * sequence: introduction → hymne → psalms → readings → patristic → conclusion.
 */
function flattenOfficeReadings(office: OfficeData): Reading[] {
  const out: Reading[] = []

  if (office.introduction && office.introduction.length > 0) {
    out.push({
      type: 'introduction',
      label: 'Introduction',
      title: 'Introduction',
      content: office.introduction,
    })
  }

  if (office.hymn) {
    out.push({
      type: 'hymne',
      label: 'Hymne',
      title: 'Hymne',
      source: office.hymn.author,
      reference: office.hymn.reference,
      content: office.hymn.text,
    })
  }

  out.push(...office.psalms)
  out.push(...office.readings)

  if (office.patristicReading) {
    out.push(office.patristicReading)
  }

  if (office.conclusion && office.conclusion.length > 0) {
    out.push({
      type: 'conclusion',
      label: 'Conclusion',
      title: 'Conclusion',
      content: office.conclusion,
    })
  }

  return out
}

/**
 * LES HEURES — Liturgie des Heures page.
 *
 * Same two-panel shape as MassPage but the left panel adds a horizontal row
 * of office-hour tabs above the readings table. The hour tabs drive which
 * OfficeData is loaded via the Zustand store.
 */
export function HoursPage() {
  const selectedDate = useLitabibleStore((s) => s.selectedDate)
  const officeHour = useLitabibleStore((s) => s.officeHour)
  const setOfficeHour = useLitabibleStore((s) => s.setOfficeHour)
  const goPrevDay = useLitabibleStore((s) => s.goPrevDay)
  const goNextDay = useLitabibleStore((s) => s.goNextDay)

  const office = getOfficeData(selectedDate, officeHour)
  const dayInfo = getDayInfo(selectedDate)

  const officeReadings = useMemo(
    () => flattenOfficeReadings(office),
    [office],
  )

  const [activeIdx, setActiveIdx] = useState(0)
  const [prevKey, setPrevKey] = useState<string>(`${selectedDate}|${officeHour}`)
  // Reset the active reading when the date OR the office hour changes.
  // Uses the React-recommended "previous value" pattern instead of
  // useEffect+setState to avoid cascading renders.
  const currentKey = `${selectedDate}|${officeHour}`
  if (currentKey !== prevKey) {
    setPrevKey(currentKey)
    setActiveIdx(0)
  }
  const [listOpen, setListOpen] = useState(true)

  const safeIdx = Math.min(
    activeIdx,
    Math.max(0, officeReadings.length - 1),
  )

  return (
    <section aria-label="Liturgie des heures" className="w-full">
      <TwoPanelLayout
        left={
          <>
            {/* Date header */}
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
                    {formatFrenchDate(selectedDate)}
                  </h4>
                  <p className="text-[11px] uppercase tracking-wide text-[#6b6b6b] mt-0.5">
                    {frenchWeekday(selectedDate)}
                  </p>
                </div>
              </div>
              <p className="text-[14px] text-[#333] font-medium leading-snug mb-1">
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
              <p className="text-[13px] text-[#1a4fa0] font-semibold leading-snug mb-3 uppercase tracking-tight">
                {office.title}
              </p>
              <DateNavBar onPrev={goPrevDay} onNext={goNextDay} />
            </div>

            {/* Horizontal scrollable row of office-hour tabs */}
            <div className="border-b border-[#e2e0dc] overflow-x-auto lt-scroll">
              <nav
                aria-label="Heures de l'office"
                className="flex items-stretch min-w-max"
              >
                {HOUR_TABS.map((tab) => (
                  <ChevronTab
                    key={tab.id}
                    orientation="horizontal"
                    active={tab.id === officeHour}
                    onClick={() => setOfficeHour(tab.id)}
                    className="flex-1"
                  >
                    {tab.label}
                  </ChevronTab>
                ))}
              </nav>
            </div>

            {/* Collapsible black bar with the office readings table */}
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
                  <span>Lectures de l&apos;office</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${listOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
              </CollapsibleTrigger>
              {listOpen && (
                <div className="flex-1 min-h-0 overflow-y-auto lt-scroll">
                  <ReadingTable
                    readings={officeReadings}
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
                ‹ hier
              </BlackButton>
              <BlackButton
                size="sm"
                onClick={goNextDay}
                className="!normal-case !font-medium"
              >
                demain ›
              </BlackButton>
            </div>
          </>
        }
        right={
          <>
            <ReadingPanel
              title={office.title.toUpperCase()}
              readings={officeReadings}
              showBadges
            />
            <p className="text-[11px] text-[#9a9a9a] mt-6 pt-3 border-t border-[#e2e0dc]">
              Textes liturgiques © LitaBible — Tous droits réservés.
            </p>
          </>
        }
      />
    </section>
  )
}

export default HoursPage
