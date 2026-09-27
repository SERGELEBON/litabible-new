'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface TwoPanelLayoutProps {
  left: ReactNode
  right: ReactNode
  className?: string
  /** fixed height = each panel scrolls independently (viewport-bound app layout) */
  fixedHeight?: boolean
}

/**
 * Two-panel reading layout used by La Messe & Les Heures.
 * The left (summary table) and right (full text) panels each scroll independently;
 * the page itself does not scroll.
 */
export function TwoPanelLayout({
  left,
  right,
  className,
  fixedHeight = true,
}: TwoPanelLayoutProps) {
  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row gap-4 w-full',
        fixedHeight && 'lg:h-[calc(100vh-150px)]',
        className,
      )}
    >
      <div
        className={cn(
          'bg-white border border-[#e2e0dc] flex flex-col min-h-0',
          'lg:w-[440px] lg:flex-shrink-0',
          fixedHeight && 'lg:h-full lg:overflow-hidden',
        )}
      >
        {left}
      </div>
      <div
        className={cn(
          'bg-white border border-[#e2e0dc] p-5 sm:p-7 flex-1 min-w-0',
          fixedHeight && 'lg:h-full lg:overflow-y-auto aelf-scroll',
        )}
      >
        {right}
      </div>
    </div>
  )
}
