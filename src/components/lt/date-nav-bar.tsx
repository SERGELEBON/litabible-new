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

const ZONES: { id: CalendarZone; label: string }[] = [
  { id: 'romain', label: 'Calendrier romain' },
  { id: 'afrique-nord', label: 'Afrique du Nord' },
  { id: 'belgique', label: 'Belgique' },
  { id: 'canada', label: 'Canada' },
  { id: 'france', label: 'France' },
  { id: 'luxembourg', label: 'Luxembourg' },
  { id: 'suisse', label: 'Suisse' },
  { id: 'monaco', label: 'Monaco' },
]

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
  prevLabel = '‹ hier',
  nextLabel = 'demain ›',
  className,
}: DateNavBarProps) {
  const zone = useLitabibleStore((s) => s.calendarZone)
  const setZone = useLitabibleStore((s) => s.setCalendarZone)
  const current = ZONES.find((z) => z.id === zone)

  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <BlackButton size="sm" onClick={onPrev} className="!normal-case !font-medium">
        {prevLabel}
      </BlackButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 bg-[#f0eeea] hover:bg-[#e2e0dc] text-[#333] text-[12px] px-3 py-2 border border-[#ccc] cursor-pointer"
          >
            {current?.label ?? 'Calendrier'} <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="rounded-none">
          {ZONES.map((z) => (
            <DropdownMenuItem
              key={z.id}
              onSelect={() => setZone(z.id)}
              className={z.id === zone ? 'bg-[#f0eeea] font-semibold' : ''}
            >
              {z.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <BlackButton size="sm" onClick={onNext} className="!normal-case !font-medium">
        {nextLabel}
      </BlackButton>
    </div>
  )
}

export { ZONES }

/** Pill button "Dimanche prochain" / "Autres dates" + zone dropdown + note link — used on Messe left panel. */
export function MassDateControls({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const setPage = useLitabibleStore((s) => s.setPage)
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="inline-flex items-center bg-[#f0eeea] hover:bg-[#1a4fa0] hover:text-white text-[#333] text-[11px] font-semibold uppercase px-3 py-1.5 border border-[#ccc] rounded-full transition-colors"
        onClick={() => onNext()}
      >
        Dimanche prochain
      </button>
      <button
        type="button"
        className="text-[12px] text-[#1a4fa0] hover:underline uppercase font-semibold"
      >
        Autres dates
      </button>
      <DateNavBar onPrev={onPrev} onNext={onNext} />
      <button
        type="button"
        onClick={() => setPage('apropos')}
        className="text-[12px] text-[#1a4fa0] hover:underline"
      >
        Note sur les calendriers
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
  const current = ZONES.find((z) => z.id === zone)
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
            {current?.label ?? 'Calendrier'} <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="rounded-none">
          {ZONES.map((z) => (
            <DropdownMenuItem key={z.id} onSelect={() => setZone(z.id)}>
              {z.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <BlackButton size="sm" onClick={() => setPage('apropos')} className="!normal-case">
        Note sur les calendriers
      </BlackButton>
      <BlackButton size="sm" onClick={onNext} className="!normal-case !font-medium">
        {nextLabel} <ChevronRight className="w-3.5 h-3.5" />
      </BlackButton>
    </div>
  )
}
