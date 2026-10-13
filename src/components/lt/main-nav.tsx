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
  { id: 'bible', key: 'nav.bible' },
  { id: 'apropos', key: 'nav.apropos' },
  { id: 'rdv-dimanche', key: 'nav.rdv' },
  { id: 'lecture-quotidienne', key: 'nav.lecture' },
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
    <>
      {/* Mobile / tablet: horizontal, scrollable tab bar */}
      <nav
        aria-label={t('nav.aria_label')}
        className="lg:hidden sticky top-0 z-30 w-full bg-white/95 backdrop-blur border-b border-[#e2e0dc] shadow-sm"
      >
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-3 py-2 snap-x">
          {NAV_ITEMS.map((item) => {
            const active = page === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPage(item.id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'snap-start flex-shrink-0 whitespace-nowrap px-3.5 h-10 text-[14px] font-bold uppercase tracking-wide transition-colors',
                  active
                    ? 'bg-[#1a4fa0] text-white'
                    : 'bg-[#f1f3f7] text-[#1a2b4a] hover:bg-[#e3eaf6]',
                )}
              >
                {t(item.key)}
              </button>
            )
          })}
        </div>
      </nav>

      {/* Desktop: vertical chevron navigation */}
      <nav
        aria-label={t('nav.aria_label')}
        className="hidden lg:flex flex-stretch flex-shrink-0"
      >
        <RedRibbon />
        <div className="flex flex-col w-[180px] py-2 gap-0 bg-transparent">
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
    </>
  )
}
