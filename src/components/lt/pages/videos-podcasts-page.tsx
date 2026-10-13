'use client'

import { useMemo, useState } from 'react'
import { Play } from 'lucide-react'
import { ChevronTab } from '../chevron-tab'
import { useLitabibleStore } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { localizedPodcasts } from '@/data/videos-podcasts'
import { videos as videosSection, podcasts as podcastsSection } from '@/data/litabible-content'
import { YoutubeChannel } from '@/components/lt/youtube-channel'

type Tab = 'videos' | 'podcasts'

/** Standalone Vidéos & Podcasts page (main nav entry). */
export function VideosPodcastsPage() {
  const [tab, setTab] = useState<Tab>('videos')
  const locale = useLitabibleStore((s) => s.locale)
  const { t } = useT()

  const podcastList = useMemo(() => localizedPodcasts(locale), [locale])
  const videosSect = videosSection[locale]
  const podcastsSect = podcastsSection[locale]

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Decorative dark grey bar */}
      <div className="bg-[#3a3a3a] h-1.5 w-full" aria-hidden="true" />

      {/* White content card */}
      <section className="bg-white border border-[#e2e0dc] p-5 sm:p-8 flex flex-col md:flex-row gap-6">
        {/* Left — small chevron sub-nav (two tabs) */}
        <nav
          aria-label={t('videos.subnav_aria')}
          className="md:w-[160px] md:flex-shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible"
        >
          <ChevronTab
            orientation="vertical"
            indent
            active={tab === 'videos'}
            onClick={() => setTab('videos')}
          >
            {t('apropos.videos')}
          </ChevronTab>
          <ChevronTab
            orientation="vertical"
            indent
            active={tab === 'podcasts'}
            onClick={() => setTab('podcasts')}
          >
            {t('apropos.podcasts')}
          </ChevronTab>
        </nav>

        {/* Right — content */}
        <div className="flex-1 min-w-0">
          {tab === 'videos' ? (
            <>
              <h1 className="uppercase text-[21px] font-medium text-[#333333] tracking-wide mb-2">
                {t('videos.title')}
              </h1>
              {videosSect.intro && (
                <p className="text-[16px] leading-[1.8] text-[#333333] italic mb-6">
                  {videosSect.intro}
                </p>
              )}

              {/* Real videos from the YouTube channel (loaded live) */}
              <YoutubeChannel />
            </>
          ) : (
            <>
              <h1 className="uppercase text-[21px] font-medium text-[#333333] tracking-wide mb-2">
                {t('videos.podcasts')}
              </h1>
              {podcastsSect.intro && (
                <p className="text-[16px] leading-[1.8] text-[#333333] italic mb-6">
                  {podcastsSect.intro}
                </p>
              )}
              <ol className="space-y-4">
                {podcastList.map((p) => (
                  <li
                    key={p.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 border border-[#e2e0dc] p-4"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-[15px] font-bold text-[#1a4fa0] uppercase tracking-wide flex-shrink-0">
                        {p.number}
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-[16px] font-semibold text-[#333333]">
                          {p.title}
                        </h2>
                        <p className="text-[16px] leading-[1.6] text-[#333333] mt-1">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {p.duration && (
                        <span className="text-[14px] text-[#6b6b6b]">
                          {p.duration}
                        </span>
                      )}
                      {p.audioUrl && (
                        <a
                          href={p.audioUrl}
                          className="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#333333] text-white text-[14px] uppercase font-semibold px-3 py-2 !normal-case"
                        >
                          <Play className="w-3 h-3" /> {t('videos.listen')}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default VideosPodcastsPage
