'use client'

import { useSyncExternalStore, useEffect } from 'react'
import { SiteHeader } from '@/components/lt/site-header'
import { MainNav } from '@/components/lt/main-nav'
import { SiteFooter } from '@/components/lt/site-footer'
import { ReseauPage } from '@/components/lt/pages/reseau-page'
import { HoursPage } from '@/components/lt/pages/hours-page'
import { BiblePage } from '@/components/lt/pages/bible-page'
import { AproposPage } from '@/components/lt/pages/apropos-page'
import { RdvDimanchePage } from '@/components/lt/pages/rdv-dimanche-page'
import { LectureQuotidiennePage } from '@/components/lt/pages/lecture-quotidienne-page'
import { VideosPodcastsPage } from '@/components/lt/pages/videos-podcasts-page'
import { CalendarPage } from '@/components/lt/pages/calendar-page'
import { ContactPage } from '@/components/lt/pages/contact-page'
import { WhatsAppButton } from '@/components/lt/whatsapp-button'
import { useLitabibleStore } from '@/lib/store'

function PageSwitch() {
  const page = useLitabibleStore((s) => s.page)
  switch (page) {
    case 'messe':
      return <ReseauPage />
    case 'heures':
      return <HoursPage />
    case 'bible':
      return <BiblePage />
    case 'apropos':
      return <AproposPage />
    case 'rdv-dimanche':
      return <RdvDimanchePage />
    case 'lecture-quotidienne':
      return <LectureQuotidiennePage />
    case 'videos':
      return <VideosPodcastsPage />
    case 'calendrier':
      return <CalendarPage />
    case 'contact':
      return <ContactPage />
    default:
      return <ReseauPage />
  }
}

/**
 * Client-only mounting guard. Returns `false` during SSR and `true` on the
 * client — using `useSyncExternalStore` so there is no synchronous setState
 * in an effect (lint-clean) and no hydration mismatch (server snapshot is
 * deterministic). Lets the date-aware reading pages render only on the client,
 * where `new Date()` reflects the user's timezone.
 */
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

export default function Home() {
  const mounted = useMounted()
  const locale = useLitabibleStore((s) => s.locale)
  // Keep the <html lang="…"> attribute in sync with the selected locale.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <SiteHeader />
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto">
        <MainNav />
        <main className="flex-1 min-w-0 p-4 sm:p-6">
          {mounted ? (
            <PageSwitch />
          ) : (
            <div className="h-64 animate-pulse bg-white/60" aria-hidden />
          )}
        </main>
      </div>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
