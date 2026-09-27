'use client'

import { cn } from '@/lib/utils'
import { useAelfStore, type AelfPage } from '@/lib/store'
import { ChevronTab } from './chevron-tab'
import { RedRibbon } from './red-ribbon'

interface NavItem {
  id: AelfPage
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'messe', label: 'La messe' },
  { id: 'heures', label: 'Les heures' },
  { id: 'bible', label: 'La Bible' },
  { id: 'aelf', label: "L'AELF" },
  { id: 'videos', label: 'Vidéos & Podcasts' },
  { id: 'calendrier', label: 'Calendrier' },
  { id: 'contact', label: 'Contact' },
]

/** Vertical 7-tab navigation with the chevron active motif and the decorative red ribbon. */
export function MainNav() {
  const page = useAelfStore((s) => s.page)
  const setPage = useAelfStore((s) => s.setPage)

  return (
    <nav
      aria-label="Navigation principale"
      className="flex flex-stretch flex-shrink-0"
    >
      <RedRibbon />
      <div className="flex flex-col w-[150px] sm:w-[170px] py-2 gap-0 bg-transparent">
        {NAV_ITEMS.map((item) => (
          <ChevronTab
            key={item.id}
            active={page === item.id}
            orientation="vertical"
            onClick={() => setPage(item.id)}
            className={cn('text-left')}
          >
            {item.label}
          </ChevronTab>
        ))}
      </div>
    </nav>
  )
}
