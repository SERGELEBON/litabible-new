'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { ChevronTab } from '../chevron-tab'
import { videos as videoList, podcasts as podcastList } from '@/data/videos-podcasts'
import { videos as videosSection, podcasts as podcastsSection } from '@/data/aelf-content'

type Tab = 'videos' | 'podcasts'

/** Standalone Vidéos & Podcasts page (main nav entry). */
export function VideosPodcastsPage() {
  const [tab, setTab] = useState<Tab>('videos')

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Decorative dark grey bar */}
      <div className="bg-[#3a3a3a] h-1.5 w-full" aria-hidden="true" />

      {/* White content card */}
      <section className="bg-white border border-[#e2e0dc] p-5 sm:p-8 flex flex-col md:flex-row gap-6">
        {/* Left — small chevron sub-nav (two tabs) */}
        <nav
          aria-label="Vidéos & Podcasts"
          className="md:w-[160px] md:flex-shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible"
        >
          <ChevronTab
            orientation="vertical"
            indent
            active={tab === 'videos'}
            onClick={() => setTab('videos')}
          >
            Vidéos
          </ChevronTab>
          <ChevronTab
            orientation="vertical"
            indent
            active={tab === 'podcasts'}
            onClick={() => setTab('podcasts')}
          >
            Podcasts
          </ChevronTab>
        </nav>

        {/* Right — content */}
        <div className="flex-1 min-w-0">
          {tab === 'videos' ? (
            <>
              <h1 className="uppercase text-[21px] font-medium text-[#333333] tracking-wide mb-2">
                {videosSection.title}
              </h1>
              {videosSection.intro && (
                <p className="text-[16px] leading-[1.8] text-[#333333] italic mb-6">
                  {videosSection.intro}
                </p>
              )}
              <ol className="space-y-6">
                {videoList.map((v) => (
                  <li
                    key={v.id}
                    className="border-t border-[#e2e0dc] pt-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-[13px] font-bold text-[#bf2329] uppercase tracking-wide flex-shrink-0">
                        {v.number}
                      </span>
                      <h2 className="text-[16px] font-semibold text-[#333333]">
                        {v.title}
                      </h2>
                      {v.duration && (
                        <span className="text-[12px] text-[#6b6b6b] ml-auto">
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
                {podcastsSection.title}
              </h1>
              {podcastsSection.intro && (
                <p className="text-[16px] leading-[1.8] text-[#333333] italic mb-6">
                  {podcastsSection.intro}
                </p>
              )}
              <ol className="space-y-4">
                {podcastList.map((p) => (
                  <li
                    key={p.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 border border-[#e2e0dc] p-4"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-[13px] font-bold text-[#bf2329] uppercase tracking-wide flex-shrink-0">
                        {p.number}
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-[16px] font-semibold text-[#333333]">
                          {p.title}
                        </h2>
                        <p className="text-[14px] leading-[1.6] text-[#333333] mt-1">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {p.duration && (
                        <span className="text-[12px] text-[#6b6b6b]">
                          {p.duration}
                        </span>
                      )}
                      {p.audioUrl && (
                        <a
                          href={p.audioUrl}
                          className="inline-flex items-center gap-1.5 bg-[#000000] hover:bg-[#333333] text-white text-[12px] uppercase font-semibold px-3 py-2 !normal-case"
                        >
                          <Play className="w-3 h-3" /> Écouter
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
