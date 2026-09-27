'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ChevronTabProps {
  /** tab label */
  children: ReactNode
  /** active = filled teal with pointed chevron; inactive = light grey */
  active?: boolean
  /** orientation: vertical (left column, chevron points right) or horizontal (sub-nav, points down) */
  orientation?: 'vertical' | 'horizontal'
  /** extra indent for nested sub-nav */
  indent?: boolean
  onClick?: () => void
  className?: string
  /** HTML tag (button by default) */
  as?: 'button' | 'a' | 'div'
  href?: string
}

/**
 * LitaBible signature "chevron/pointed" tab.
 * - Active tab = solid teal rectangle with a pointed chevron that bites into the next panel.
 * - Inactive = flat grey (#dadad9) rectangle.
 * - Vertical orientation: the pointed arrow is on the RIGHT edge (bites into the content area).
 * - Horizontal orientation: the arrow is on the BOTTOM edge (bites into the content below).
 */
export function ChevronTab({
  children,
  active = false,
  orientation = 'vertical',
  indent = false,
  onClick,
  className,
  as = 'button',
  href,
}: ChevronTabProps) {
  const Tag = as as 'button' | 'a' | 'div'
  const baseStyle = orientation === 'vertical'
    ? active
      ? {
          clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)',
          backgroundColor: '#f5c400',
          color: '#1a4fa0',
        }
      : {
          backgroundColor: '#dadad9',
          color: '#333333',
        }
    : active
      ? {
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 14px), 50% 100%, 0 calc(100% - 14px))',
          backgroundColor: '#f5c400',
          color: '#1a4fa0',
        }
      : {
          backgroundColor: '#dadad9',
          color: '#333333',
        }

  return (
    <Tag
      href={as === 'a' ? href : undefined}
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-2 uppercase font-semibold',
        'cursor-pointer select-none transition-colors duration-150',
        orientation === 'vertical'
          ? 'w-full px-3.5 py-3 text-[15px] leading-tight'
          : 'px-4 py-2.5 text-[13px] leading-tight whitespace-nowrap',
        indent && (orientation === 'vertical' ? 'pl-6' : 'mt-1'),
        active ? 'bg-lt-brand' : 'bg-lt-inactive',
        className,
      )}
      style={baseStyle}
    >
      <span className="relative z-10">{children}</span>
    </Tag>
  )
}
