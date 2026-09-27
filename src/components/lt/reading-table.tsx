'use client'

import { cn } from '@/lib/utils'
import type { Reading } from '@/data/types'
import { useT, localizedReadingLabel } from '@/lib/i18n'

interface ReadingTableProps {
  readings: Reading[]
  activeIndex: number
  onSelect: (i: number) => void
  className?: string
}

/**
 * Summary table of readings (left panel): label (bold) | short citation | reference.
 * Active row is highlighted red (white text); others white, hover light grey.
 */
export function ReadingTable({ readings, activeIndex, onSelect, className }: ReadingTableProps) {
  const { t } = useT()
  return (
    <div className={cn('w-full', className)}>
      {readings.map((r, i) => {
        const active = i === activeIndex
        const label = localizedReadingLabel(r.type, t) || r.label
        return (
          <button
            key={`${r.type}-${i}`}
            type="button"
            onClick={() => onSelect(i)}
            className={cn(
              'w-full text-left flex items-start gap-2 px-3 py-2.5 border-b border-[#e8e6e2] cursor-pointer transition-colors',
              active ? 'bg-[#f5c400] text-[#1a4fa0]' : 'bg-white text-[#333] hover:bg-[#f0eeea]',
            )}
          >
            <span
              className={cn(
                'flex-1 min-w-0 text-[13px] leading-tight',
              )}
            >
              <span className={cn('block font-bold uppercase tracking-tight', active ? 'text-white' : 'text-[#333]')}>
                {label}
              </span>
              {r.citation && (
                <span className={cn('block truncate text-[12px] mt-0.5', active ? 'text-white/90' : 'text-[#6b6b6b]')}>
                  {r.citation}
                </span>
              )}
              {r.reference && (
                <span className={cn('block text-[11px] mt-0.5', active ? 'text-white/80' : 'text-[#9a9a9a]')}>
                  {r.reference}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
