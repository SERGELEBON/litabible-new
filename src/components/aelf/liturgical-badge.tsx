'use client'

import { cn } from '@/lib/utils'
import type { LiturgicalColor } from '@/data/types'

const COLOR_MAP: Record<LiturgicalColor, string> = {
  green: '#1e883f',
  violet: '#7d4c9c',
  red: '#bf2329',
  white: '#f5f1e8',
  rose: '#d989a4',
  gold: '#c9a444',
}

interface LiturgicalBadgeProps {
  color: LiturgicalColor
  /** false = optional memorial (rendered as outline badge) */
  filled?: boolean
  size?: number
  className?: string
  title?: string
}

/** Small liturgical-color square (■ filled or □ outline) shown next to a date. */
export function LiturgicalBadge({
  color,
  filled = true,
  size = 14,
  className,
  title,
}: LiturgicalBadgeProps) {
  const bg = COLOR_MAP[color] ?? '#1e883f'
  return (
    <span
      role="img"
      aria-label={`Couleur liturgique : ${color}${filled ? '' : ' (mémoire facultative)'}`}
      title={title ?? `${color}${filled ? '' : ' (optionnelle)'}`}
      className={cn('inline-block flex-shrink-0 align-middle', className)}
      style={{
        width: size,
        height: size,
        backgroundColor: filled ? bg : '#ffffff',
        border: filled ? `1px solid ${bg}` : `2px solid ${bg}`,
        borderRadius: 0,
      }}
    />
  )
}

export { COLOR_MAP }
