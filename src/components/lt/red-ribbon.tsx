'use client'

import { cn } from '@/lib/utils'

/** Decorative red ribbon (thin vertical band) with a bookmark tail at the bottom. */
export function RedRibbon({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('lt-ribbon relative self-stretch flex-shrink-0', className)}
    />
  )
}
