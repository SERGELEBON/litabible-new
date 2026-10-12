'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface BlackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  /** solid (default, square) vs pill (rounded full) */
  variant?: 'solid' | 'pill'
  size?: 'sm' | 'md' | 'lg'
}

/** LitaBible signature black square button (border-radius 0, #000000, white text). */
export function BlackButton({
  children,
  variant = 'solid',
  size = 'md',
  className,
  ...rest
}: BlackButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'lt-btn-black inline-flex items-center justify-center gap-1.5 cursor-pointer select-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'pill' && 'rounded-full px-4',
        size === 'sm' && 'px-2.5 py-1 text-[13px]',
        size === 'md' && 'px-3.5 py-2 text-[15px]',
        size === 'lg' && 'px-5 py-2.5 text-[15px]',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
