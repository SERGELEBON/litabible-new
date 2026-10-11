'use client'

import { useState } from 'react'
import { useAelfStore } from '@/lib/store'
import { getMassData } from '@/data/mass-readings'
import { TwoPanelLayout } from '@/components/aelf/two-panel-layout'
import { LiturgicalBadge } from '@/components/aelf/liturgical-badge'
import { BlackButton } from '@/components/aelf/black-button'
import { ReadingTable } from '@/components/aelf/reading-table'
import { ReadingPanel } from '@/components/aelf/reading-panel'
import { MassDateControls } from '@/components/aelf/date-nav-bar'
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

function formatFrenchDate(iso: string): string {
  // iso is "2026-09-27"
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
 * LA MESSE page — the home page of the AELF clone.
 *
 * Two-panel layout: left = date header + collapsible readings list, right = full
 * text of the readings. Both panels scroll independently on lg+ screens and
 * stack on mobile.
 */
export function MassPage() {
  const selectedDate = useAelfStore((s) => s.selectedDate)
  const goPrevDay = useAelfStore((s) => s.goPrevDay)
  const goNextDay = useAelfStore((s) => s.goNextDay)

  const mass = getMassData(selectedDate)
  const dayInfo = mass.dayInfo

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
    <section aria-label="La messe du jour" className="w-full">
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
                    {formatFrenchDate(selectedDate)}
                  </h4>
                  <p className="text-[11px] uppercase tracking-wide text-[#6b6b6b] mt-0.5">
                    {frenchWeekday(selectedDate)}
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
                  <span>Lectures de la messe</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${listOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>
              </CollapsibleTrigger>
              {listOpen && (
                <div className="flex-1 min-h-0 overflow-y-auto aelf-scroll">
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
              title="LECTURES DE LA MESSE"
              readings={mass.readings}
              showBadges
            />
            <p className="text-[11px] text-[#9a9a9a] mt-6 pt-3 border-t border-[#e2e0dc]">
              Textes liturgiques © AELF — Tous droits réservés.
            </p>
          </>
        }
      />
    </section>
  )
}

export default MassPage
