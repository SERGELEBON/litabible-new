'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { BlackButton } from './black-button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useLitabibleStore, type CalendarZone } from '@/lib/store'
import { useT, translate } from '@/lib/i18n'
import type { Locale } from '@/lib/store'

const ZONE_IDS: CalendarZone[] = [
  'romain',
  'afrique-nord',
  'belgique',
  'canada',
  'france',
  'luxembourg',
  'suisse',
  'monaco',
]

function zoneLabel(id: CalendarZone, locale: Locale): string {
  return translate(locale, `cal.zone.${id}`)
}

interface DateNavBarProps {
  onPrev: () => void
  onNext: () => void
  prevLabel?: string
  nextLabel?: string
  className?: string
}

/** Date navigation: prev / next black buttons + calendar-zone dropdown. */
export function DateNavBar({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  className,
}: DateNavBarProps) {
  const zone = useLitabibleStore((s) => s.calendarZone)
  const setZone = useLitabibleStore((s) => s.setCalendarZone)
  const locale = useLitabibleStore((s) => s.locale)
  const { t } = useT()
  const currentLabel = zoneLabel(zone, locale)

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <BlackButton size="sm" onClick={onPrev} className="!normal-case !font-medium">
        {prevLabel ?? t('mass.prev')}
      </BlackButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 bg-[#f0eeea] hover:bg-[#e2e0dc] text-[#333] text-[12px] px-3 py-2 border border-[#ccc] cursor-pointer"
          >
            {currentLabel} <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="rounded-none">
          {ZONE_IDS.map((z) => (
            <DropdownMenuItem
              key={z}
              onSelect={() => setZone(z)}
              className={z === zone ? 'bg-[#f0eeea] font-semibold' : ''}
            >
              {zoneLabel(z, locale)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <BlackButton size="sm" onClick={onNext} className="!normal-case !font-medium">
        {nextLabel ?? t('mass.next')}
      </BlackButton>
    </div>
  )
}

/** Pill button "Dimanche prochain" / "Autres dates" + zone dropdown + note link — used on Messe left panel. */
export function MassDateControls({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const setPage = useLitabibleStore((s) => s.setPage)
  const { t } = useT()
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="inline-flex items-center bg-[#f0eeea] hover:bg-[#f5c400] hover:text-[#1a4fa0] text-[#333] text-[11px] font-semibold uppercase px-3 py-1.5 border border-[#ccc] rounded-full transition-colors"
        onClick={() => onNext()}
      >
        {t('mass.next_sunday')}
      </button>
      <button
        type="button"
        className="text-[12px] text-[#1a4fa0] hover:underline uppercase font-semibold"
      >
        {t('mass.other_dates')}
      </button>
      <DateNavBar onPrev={onPrev} onNext={onNext} />
      <button
        type="button"
        onClick={() => setPage('apropos')}
        className="text-[12px] text-[#1a4fa0] hover:underline"
      >
        {t('mass.note_cal')}
      </button>
    </div>
  )
}

/** A simple prev/next month nav for the calendar page. */
export function MonthNavBar({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: {
  onPrev: () => void
  onNext: () => void
  prevLabel: string
  nextLabel: string
}) {
  const zone = useLitabibleStore((s) => s.calendarZone)
  const setZone = useLitabibleStore((s) => s.setCalendarZone)
  const setPage = useLitabibleStore((s) => s.setPage)
  const locale = useLitabibleStore((s) => s.locale)
  const { t } = useT()
  const currentLabel = zoneLabel(zone, locale)
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <BlackButton size="sm" onClick={onPrev} className="!normal-case !font-medium">
        <ChevronLeft className="w-3.5 h-3.5" /> {prevLabel}
      </BlackButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 bg-[#f0eeea] hover:bg-[#e2e0dc] text-[#333] text-[12px] px-3 py-2 border border-[#ccc] cursor-pointer"
          >
            {currentLabel} <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="rounded-none">
          {ZONE_IDS.map((z) => (
            <DropdownMenuItem key={z} onSelect={() => setZone(z)}>
              {zoneLabel(z, locale)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <BlackButton size="sm" onClick={() => setPage('apropos')} className="!normal-case">
        {t('cal.note_cal')}
      </BlackButton>
      <BlackButton size="sm" onClick={onNext} className="!normal-case !font-medium">
        {nextLabel} <ChevronRight className="w-3.5 h-3.5" />
      </BlackButton>
    </div>
  )
}

export { ZONE_IDS }
