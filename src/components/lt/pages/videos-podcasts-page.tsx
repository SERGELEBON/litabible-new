'use client'

import { useMemo, useState } from 'react'
import { Play, ExternalLink } from 'lucide-react'
import { ChevronTab } from '../chevron-tab'
import { useLitabibleStore } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { localizedVideos, localizedPodcasts } from '@/data/videos-podcasts'
import { videos as videosSection, podcasts as podcastsSection } from '@/data/litabible-content'

type Tab = 'videos' | 'podcasts'

// YouTube channel link (shared with the footer social icon).
const YOUTUBE_CHANNEL_URL =
  'https://studio.youtube.com/channel/UCcoPnmSULKkzMi6pCYY-l0A/livestreaming'

const YT_CARD: Record<'en' | 'fr' | 'es', { title: string; desc: string; cta: string }> = {
  en: { title: 'Our YouTube channel', desc: 'Watch our videos and live streams directly on YouTube — subscribe to never miss a new one.', cta: 'Visit the channel' },
  fr: { title: 'Notre chaîne YouTube', desc: 'Regardez nos vidéos et nos lives directement sur YouTube — abonnez-vous pour ne rien manquer.', cta: 'Visiter la chaîne' },
  es: { title: 'Nuestro canal de YouTube', desc: 'Mira nuestros vídeos y directos en YouTube — suscríbete para no perderte ninguno.', cta: 'Visitar el canal' },
}

/** Standalone Vidéos & Podcasts page (main nav entry). */
export function VideosPodcastsPage() {
  const [tab, setTab] = useState<Tab>('videos')
  const locale = useLitabibleStore((s) => s.locale)
  const { t } = useT()

  const videoList = useMemo(() => localizedVideos(locale), [locale])
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

              {/* YouTube channel link card */}
              {(() => {
                const yt = YT_CARD[locale]
                return (
                  <a
                    href={YOUTUBE_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-white border-2 border-[#FF0000]/30 hover:border-[#FF0000] p-4 mb-6 transition-colors"
                  >
                    <span className="flex-shrink-0 w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center text-white">
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold text-[#1a4fa0]">{yt.title}</span>
                      <span className="block text-[15px] text-[#2d2d2d]/80 leading-snug mt-0.5">{yt.desc}</span>
                    </span>
                    <span className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#FF0000] text-white text-[14px] font-bold uppercase px-3.5 py-2 group-hover:bg-[#cc0000] transition-colors">
                      {yt.cta}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </a>
                )
              })()}

              <ol className="space-y-6">
                {videoList.map((v) => (
                  <li
                    key={v.id}
                    className="border-t border-[#e2e0dc] pt-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-[15px] font-bold text-[#1a4fa0] uppercase tracking-wide flex-shrink-0">
                        {v.number}
                      </span>
                      <h2 className="text-[16px] font-semibold text-[#333333]">
                        {v.title}
                      </h2>
                      {v.duration && (
                        <span className="text-[14px] text-[#6b6b6b] ml-auto">
                          {v.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-[15px] leading-[1.7] text-[#333333] mb-3">
                      {v.description}
                    </p>
                    <div className="aspect-video w-full bg-black border border-[#e2e0dc]">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.youtubeId}`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                      />
                    </div>
                  </li>
                ))}
              </ol>
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
