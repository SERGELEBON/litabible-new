'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Play } from 'lucide-react'
import { useLitabibleStore } from '@/lib/store'

interface Video {
  id: string
  title: string
  published?: string
  description?: string
}

const CHANNEL_URL = 'https://www.youtube.com/@litabible'
const SUBSCRIBE_URL = 'https://www.youtube.com/@litabible?sub_confirmation=1'

const TXT = {
  en: { latest: 'Latest video', more: 'More videos', channel: 'LitaBible – RDV Biblique', sub: 'Subscribe', all: 'See all videos', loading: 'Loading videos…', desc: 'Bible summaries, teachings and our Sunday Bible meeting, every week on YouTube.' },
  fr: { latest: 'Dernière vidéo', more: 'Autres vidéos', channel: 'LitaBible – RDV Biblique', sub: "S'abonner", all: 'Voir toutes les vidéos', loading: 'Chargement des vidéos…', desc: 'Résumés de la Bible, enseignements et notre RDV biblique du dimanche, chaque semaine sur YouTube.' },
  es: { latest: 'Último vídeo', more: 'Más vídeos', channel: 'LitaBible – RDV Biblique', sub: 'Suscribirse', all: 'Ver todos los vídeos', loading: 'Cargando vídeos…', desc: 'Resúmenes de la Biblia, enseñanzas y nuestro encuentro bíblico del domingo, cada semana en YouTube.' },
}

function fmtDate(iso: string | undefined, locale: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

const YT_ICON = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
  </svg>
)

/**
 * Real videos from the LitaBible YouTube channel: the selected (latest by
 * default) video in a large player, the others as clickable thumbnails.
 */
export function YoutubeChannel({ max = 12 }: { max?: number }) {
  const locale = useLitabibleStore((s) => s.locale)
  const L = TXT[locale] ?? TXT.fr
  const [videos, setVideos] = useState<Video[] | null>(null)
  const [current, setCurrent] = useState<string | null>(null)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch('/api/youtube', { signal: ctrl.signal })
      .then((r) => r.json() as Promise<{ videos: Video[] }>)
      .then((d) => {
        const list = (d.videos ?? []).slice(0, max)
        setVideos(list)
        setCurrent((c) => c ?? list[0]?.id ?? null)
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setVideos([])
      })
    return () => ctrl.abort()
  }, [max])

  const active = videos?.find((v) => v.id === current) ?? videos?.[0]

  return (
    <div className="flex flex-col gap-5">
      {/* Channel header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#f7f9fd] border border-[#e3eaf6] p-4 sm:p-5">
        <img src="/icon-192.png" alt="" className="w-14 h-14 rounded-full flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-[22px] font-bold text-[#1a2b4a] leading-tight">{L.channel}</p>
          <p className="text-[15px] text-[#555] mt-0.5">{L.desc}</p>
        </div>
        <div className="flex flex-wrap gap-2 flex-shrink-0">
          <a
            href={SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-4 bg-[#FF0000] hover:bg-[#cc0000] text-white text-[15px] font-bold transition-colors"
          >
            {YT_ICON}
            {L.sub}
          </a>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-4 border border-[#1a4fa0] text-[#1a4fa0] bg-white hover:bg-[#eef3fb] text-[15px] font-semibold transition-colors"
          >
            {L.all}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {videos === null ? (
        <div className="aspect-video w-full bg-[#eceae6] animate-pulse flex items-center justify-center text-[15px] text-[#6b6b6b]">
          {L.loading}
        </div>
      ) : active ? (
        <>
          {/* Main player */}
          <div>
            {active.id === videos[0]?.id && (
              <p className="text-[13px] font-bold uppercase tracking-wide text-[#1a4fa0] mb-2">{L.latest}</p>
            )}
            <div className="aspect-video w-full bg-black shadow-lg">
              <iframe
                key={active.id}
                src={`https://www.youtube-nocookie.com/embed/${active.id}?rel=0`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <h2 className="mt-3 text-[22px] sm:text-[26px] font-bold text-[#1a2b4a] leading-snug">{active.title}</h2>
            {active.published && (
              <p className="text-[14px] text-[#6b6b6b] mt-1">{fmtDate(active.published, locale)}</p>
            )}
          </div>

          {/* Other videos */}
          {videos.length > 1 && (
            <div>
              <h3 className="text-[18px] font-bold text-[#1a2b4a] mb-3">{L.more}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrent(v.id)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={
                        'group w-full text-left bg-white border transition-all hover:shadow-md ' +
                        (v.id === active.id ? 'border-[#1a4fa0] ring-2 ring-[#1a4fa0]/30' : 'border-[#e2e0dc]')
                      }
                    >
                      <span className="relative block aspect-video bg-black overflow-hidden">
                        <img
                          src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-12 h-12 rounded-full bg-black/60 group-hover:bg-[#FF0000] flex items-center justify-center text-white transition-colors">
                            <Play className="w-5 h-5 ml-0.5" />
                          </span>
                        </span>
                      </span>
                      <span className="block p-3">
                        <span className="block text-[15px] font-semibold text-[#1a2b4a] leading-snug line-clamp-2">
                          {v.title}
                        </span>
                        {v.published && (
                          <span className="block text-[13px] text-[#6b6b6b] mt-1">{fmtDate(v.published, locale)}</span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
