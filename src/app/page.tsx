'use client'

import { useSyncExternalStore } from 'react'
import { SiteHeader } from '@/components/aelf/site-header'
import { MainNav } from '@/components/aelf/main-nav'
import { SiteFooter } from '@/components/aelf/site-footer'
import { MassPage } from '@/components/aelf/pages/mass-page'
import { HoursPage } from '@/components/aelf/pages/hours-page'
import { BiblePage } from '@/components/aelf/pages/bible-page'
import { AelfPage } from '@/components/aelf/pages/aelf-page'
import { VideosPodcastsPage } from '@/components/aelf/pages/videos-podcasts-page'
import { CalendarPage } from '@/components/aelf/pages/calendar-page'
import { ContactPage } from '@/components/aelf/pages/contact-page'
import { useAelfStore } from '@/lib/store'

function PageSwitch() {
  const page = useAelfStore((s) => s.page)
  switch (page) {
    case 'messe':
      return <MassPage />
    case 'heures':
      return <HoursPage />
    case 'bible':
      return <BiblePage />
    case 'aelf':
      return <AelfPage />
    case 'videos':
      return <VideosPodcastsPage />
    case 'calendrier':
      return <CalendarPage />
    case 'contact':
      return <ContactPage />
    default:
      return <MassPage />
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
    </div>
  )
}
