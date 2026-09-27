'use client'

import { useMemo } from 'react'
import { Play } from 'lucide-react'
import { ChevronTab } from '../chevron-tab'
import { useLitabibleStore, type AproposSubPage } from '@/lib/store'
import {
  getSection,
  questions as questionsSection,
  videos as videosSection,
  podcasts as podcastsSection,
  type TextSection,
} from '@/data/litabible-content'
import { videos as videoList, podcasts as podcastList } from '@/data/videos-podcasts'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

interface SubNavItem {
  id: AproposSubPage
  label: string
}

const SUB_NAV: SubNavItem[] = [
  { id: 'missions', label: 'Missions' },
  { id: 'organisation', label: 'Organisation' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'videos-apropos', label: 'Vidéos' },
  { id: 'podcasts', label: 'Podcasts' },
  { id: 'conditions', label: "Conditions d'utilisation" },
  { id: 'questions', label: 'Questions courantes' },
  { id: 'mentions', label: 'Mentions légales' },
]

const FRENCH_MONTHS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

/** À PROPOS page — institutional section with vertical sub-nav + content. */
export function AproposPage() {
  const aproposSub = useLitabibleStore((s) => s.aproposSub)
  const setAproposSub = useLitabibleStore((s) => s.setAproposSub)

  // Resolve the section to display. Most sections come from getSection(aproposSub);
  // `videos-apropos` and `podcasts` map to the `videos`/`podcasts` TextSections
  // (which use `intro` instead of `paragraphs`), and the lists are pulled from
  // `@/data/videos-podcasts`.
  const { section, kind } = useMemo<{ section: TextSection | undefined; kind: 'text' | 'faq' | 'videos' | 'podcasts' }>(() => {
    if (aproposSub === 'videos-apropos') return { section: videosSection, kind: 'videos' }
    if (aproposSub === 'podcasts') return { section: podcastsSection, kind: 'podcasts' }
    if (aproposSub === 'questions') return { section: questionsSection, kind: 'faq' }
    const s = getSection(aproposSub)
    return { section: s, kind: 'text' }
  }, [aproposSub])

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Decorative dark grey bar above the white content card */}
      <div className="bg-[#3a3a3a] h-1.5 w-full" aria-hidden="true" />

      {/* White content card */}
      <section className="bg-white border border-[#e2e0dc] p-5 sm:p-8 flex flex-col md:flex-row gap-6">
        {/* Left column — vertical sub-nav */}
        <nav
          aria-label="Sous-sections À PROPOS"
          className="md:w-[180px] md:flex-shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible md:pb-2"
        >
          {SUB_NAV.map((item) => (
            <ChevronTab
              key={item.id}
              orientation="vertical"
              indent
              active={aproposSub === item.id}
              onClick={() => setAproposSub(item.id)}
            >
              {item.label}
            </ChevronTab>
          ))}
        </nav>

        {/* Right column — content */}
        <div className="flex-1 min-w-0">
          {section ? (
            <>
              <h1 className="uppercase text-[21px] sm:text-[21px] font-medium text-[#333333] tracking-wide mb-4">
                {section.title}
              </h1>

              {kind === 'text' && section.paragraphs && (
                <div className="space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-[16px] leading-[1.8] text-[#333333]">
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {kind === 'faq' && section.items && (
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`item-${idx}`}
                      className="border-b border-[#e2e0dc] last:border-b-0"
                    >
                      <AccordionTrigger className="text-left text-[15px] font-semibold text-[#333333] hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] leading-[1.7] text-[#333333]">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}

              {kind === 'videos' && (
                <div className="space-y-6 mt-2">
                  {section.intro && (
                    <p className="text-[16px] leading-[1.8] text-[#333333] italic">
                      {section.intro}
                    </p>
                  )}
                  <ol className="space-y-6">
                    {videoList.map((v) => (
                      <li key={v.id} className="border-t border-[#e2e0dc] pt-5 first:border-t-0 first:pt-0">
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-[13px] font-bold text-[#1a4fa0] uppercase tracking-wide flex-shrink-0">
                            {v.number}
                          </span>
                          <h3 className="text-[16px] font-semibold text-[#333333]">
                            {v.title}
                          </h3>
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
                </div>
              )}

              {kind === 'podcasts' && (
                <div className="space-y-6 mt-2">
                  {section.intro && (
                    <p className="text-[16px] leading-[1.8] text-[#333333] italic">
                      {section.intro}
                    </p>
                  )}
                  <ol className="space-y-4">
                    {podcastList.map((p) => (
                      <li
                        key={p.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 border border-[#e2e0dc] p-4"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-[13px] font-bold text-[#1a4fa0] uppercase tracking-wide flex-shrink-0">
                            {p.number}
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-[16px] font-semibold text-[#333333]">
                              {p.title}
                            </h3>
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
                </div>
              )}
            </>
          ) : (
            <p className="text-[16px] text-[#6b6b6b]">Section introuvable.</p>
          )}
        </div>
      </section>

      {/* Small footer note about the month/year context (purely decorative, matches the brand rhythm) */}
      <p className="text-[11px] text-[#6b6b6b] mt-3 text-right uppercase tracking-wide">
        {new Date().getFullYear()} · {FRENCH_MONTHS[new Date().getMonth()]}
      </p>
    </div>
  )
}

export default AproposPage
