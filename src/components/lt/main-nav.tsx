'use client'

import { cn } from '@/lib/utils'
import { useLitabibleStore, type LitabiblePage } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { ChevronTab } from './chevron-tab'
import { RedRibbon } from './red-ribbon'

interface NavItem {
  id: LitabiblePage
  /** i18n key for the nav label */
  key: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'messe', key: 'nav.messe' },
  { id: 'heures', key: 'nav.heures' },
  { id: 'bible', key: 'nav.bible' },
  { id: 'apropos', key: 'nav.apropos' },
  { id: 'videos', key: 'nav.videos' },
  { id: 'calendrier', key: 'nav.calendrier' },
  { id: 'contact', key: 'nav.contact' },
]

/** Vertical 7-tab navigation with the chevron active motif and the decorative red ribbon. */
export function MainNav() {
  const page = useLitabibleStore((s) => s.page)
  const setPage = useLitabibleStore((s) => s.setPage)
  const { t } = useT()

  return (
    <nav
      aria-label={t('nav.aria_label')}
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
            {t(item.key)}
          </ChevronTab>
        ))}
      </div>
    </nav>
  )
}
