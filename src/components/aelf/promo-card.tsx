'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { Book } from 'lucide-react'

interface PromoCardProps {
  title?: string
  description?: string
  className?: string
  children?: ReactNode
}

/** Black promo card (Bible paper edition) — packshot left, white descriptive text right. */
export function PromoCard({
  title = 'Découvrez l\'édition papier',
  description = 'La Bible liturgique est disponible en librairie. Texte officiel de l\'Église, traduction pour la proclamation, notes et introductions pour la lecture priée.',
  className,
}: PromoCardProps) {
  return (
    <aside
      className={cn(
        'bg-[#000000] text-white p-5 flex flex-col sm:flex-row gap-4 items-center',
        className,
      )}
    >
      {/* Packshot placeholder (stylised book cover) */}
      <div className="flex-shrink-0 w-24 h-32 bg-gradient-to-br from-[#3a2a1a] to-[#1a1208] border border-[#c9a444]/40 flex items-center justify-center relative overflow-hidden">
        <Book className="w-10 h-10 text-[#c9a444]" />
        <span className="absolute bottom-1 left-0 right-0 text-center text-[8px] uppercase tracking-widest text-[#c9a444]/80 font-bold">
          Bible liturgique
        </span>
      </div>
      <div className="text-center sm:text-left">
        <h3 className="text-[14px] font-bold uppercase tracking-wide mb-2 text-white">{title}</h3>
        <p className="text-[13px] text-white/80 leading-relaxed">{description}</p>
        <a
          href="#"
          className="inline-block mt-3 text-[11px] font-bold uppercase text-[#c9a444] hover:text-white transition-colors"
        >
          En librairie →
        </a>
      </div>
    </aside>
  )
}
