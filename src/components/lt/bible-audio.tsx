'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLitabibleStore } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { getBookName } from '@/data/bible-books'
import type { BibleBook } from '@/data/types'
import type { ChapterResult } from '@/lib/bible-api'
import { BlackButton } from '@/components/lt/black-button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Pause,
  Play,
  Repeat,
  RotateCcw,
  RotateCw,
} from 'lucide-react'

/** Public shape of an audio Bible (from /api/bible/audio/versions). */
export interface AudioInfo {
  id: string
  name: string
  narrator?: string
  language: string
  ntOnly?: boolean
  textVersionId?: string
}

interface VersionInfo {
  id: string
  name: string
  language: string
  ntOnly?: boolean
}

export const LANGUAGE_ORDER = ['fr', 'en', 'es', 'de', 'tw', 'ee', 'yo', 'ig', 'ha', 'wo', 'msc']

export const LANGUAGE_NAMES: Record<string, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  tw: 'Twi (Akan)',
  ee: 'Eʋegbe (Ewe)',
  yo: 'Yorùbá',
  ig: 'Igbo',
  ha: 'Hausa',
  wo: 'Wolof',
  msc: 'Malinké (Sankaran)',
}

/** Languages requested by the project but with no open source yet. */
const COMING_SOON = ['Ga', 'Dioula', 'Baoulé', 'Mooré', 'Bambara']

const SPEEDS = [0.75, 1, 1.25, 1.5]

function readBool(key: string, fallback: boolean): boolean {
  try {
    const v = window.localStorage.getItem(key)
    return v === null ? fallback : v === '1'
  } catch {
    return fallback
  }
}
function writeBool(key: string, value: boolean) {
  try {
    window.localStorage.setItem(key, value ? '1' : '0')
  } catch {
    /* ignore */
  }
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Audio player for one chapter: custom controls (play/pause, ±15 s, speed,
 * continuous listening), seek bar, lock-screen metadata (Media Session API)
 * and optional read-along text.
 */
export function AudioPlayerView({
  audio,
  book,
  chapter,
  maximized,
  onBack,
  onPrev,
  onNext,
}: {
  audio: AudioInfo
  book: BibleBook
  chapter: number
  maximized: boolean
  onBack: () => void
  onPrev?: () => void
  onNext?: () => void
}) {
  const locale = useLitabibleStore((s) => s.locale)
  const { t } = useT()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [src, setSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [autoNext, setAutoNext] = useState(true)
  const [showText, setShowText] = useState(true)
  const [text, setText] = useState<ChapterResult | null>(null)

  const bookLabel = getBookName(book, locale)

  useEffect(() => {
    setAutoNext(readBool('lt.bible.autonext', true))
    setShowText(readBool('lt.bible.readalong', true))
  }, [])

  // Resolve the MP3 URL. (Error is stored as a code and translated at render
  // time, so `t` — a new function on every render — is not an effect dep.)
  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    setError(null)
    setSrc(null)
    fetch(
      `/api/bible/audio?audio=${encodeURIComponent(audio.id)}&book=${encodeURIComponent(book.name)}&chapter=${chapter}`,
      { signal: ctrl.signal },
    )
      .then(async (r) => {
        const body = (await r.json().catch(() => ({}))) as { url?: string; error?: string }
        if (ctrl.signal.aborted) return
        if (!r.ok || !body.url) {
          setError(body.error === 'nt_only' ? 'nt_only' : 'unavailable')
          return
        }
        setSrc(body.url)
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setError('unavailable')
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false)
      })
    return () => ctrl.abort()
  }, [audio.id, book.name, chapter])

  // Read-along text (same translation as the recording, when we have it).
  useEffect(() => {
    if (!audio.textVersionId) return
    const ctrl = new AbortController()
    setText(null)
    fetch(
      `/api/bible/chapter?version=${encodeURIComponent(audio.textVersionId)}&book=${encodeURIComponent(book.name)}&chapter=${chapter}`,
      { signal: ctrl.signal },
    )
      .then((r) => (r.ok ? (r.json() as Promise<ChapterResult>) : null))
      .then((d) => {
        if (!ctrl.signal.aborted && d && Array.isArray(d.verses)) setText(d)
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [audio.textVersionId, book.name, chapter])

  // Start playback as soon as the source is ready.
  useEffect(() => {
    const el = audioRef.current
    if (!el || !src) return
    el.playbackRate = speed
    el.play().catch(() => {
      /* autoplay blocked — the user presses play */
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  // Lock-screen / headset controls.
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `${bookLabel} ${chapter}`,
        artist: audio.narrator ? `${audio.name} — ${audio.narrator}` : audio.name,
        album: 'LitaBible',
        artwork: [{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
      })
      navigator.mediaSession.setActionHandler('previoustrack', onPrev ?? null)
      navigator.mediaSession.setActionHandler('nexttrack', onNext ?? null)
    } catch {
      /* not supported */
    }
  }, [bookLabel, chapter, audio.name, audio.narrator, onPrev, onNext])

  const togglePlay = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }, [])

  const skip = useCallback((delta: number) => {
    const el = audioRef.current
    if (!el) return
    el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + delta))
  }, [])

  const changeSpeed = useCallback(() => {
    setSpeed((prev) => {
      const next = SPEEDS[(SPEEDS.indexOf(prev) + 1) % SPEEDS.length]
      if (audioRef.current) audioRef.current.playbackRate = next
      return next
    })
  }, [])

  const toggleAutoNext = useCallback(() => {
    setAutoNext((v) => {
      writeBool('lt.bible.autonext', !v)
      return !v
    })
  }, [])

  const toggleText = useCallback(() => {
    setShowText((v) => {
      writeBool('lt.bible.readalong', !v)
      return !v
    })
  }, [])

  const iconBtn =
    'inline-flex items-center justify-center w-9 h-9 text-[#1a4fa0] hover:bg-[#eef3fb] rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed'

  return (
    <div className="flex-1 overflow-y-auto lt-scroll p-5">
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          type="button"
          onClick={onBack}
          className="text-[14px] text-[#1a4fa0] hover:underline uppercase font-semibold"
        >
          {t('bible.back_chapters')}
        </button>
        <span className="text-[13px] text-[#9a9a9a] uppercase tracking-wide">
          {LANGUAGE_NAMES[audio.language] ?? audio.language}
        </span>
      </div>

      {/* Player card */}
      <div className="border border-[#d7e1f1] bg-gradient-to-br from-[#f4f7fc] to-white p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 flex-shrink-0 bg-[#1a4fa0] text-white flex items-center justify-center">
            <Headphones className="w-6 h-6" aria-hidden />
          </div>
          <div className="min-w-0">
            <h2 className="text-[17px] font-bold uppercase text-[#1a4fa0] truncate">
              {bookLabel} {chapter}
            </h2>
            <p className="text-[14px] text-[#6b6b6b] truncate">
              {audio.name}
              {audio.narrator ? ` · ${audio.narrator}` : ''}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-9 w-2/3 mx-auto" />
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <AlertCircle className="w-8 h-8 text-[#1a4fa0] mx-auto mb-2" />
            <p className="text-[15px] text-[#333] mb-3">
              {error === 'nt_only' ? t('bible.nt_only') : t('bible.audio_unavailable')}
            </p>
            {onNext && (
              <BlackButton size="sm" onClick={onNext}>
                {t('bible.next_chapter')}
              </BlackButton>
            )}
          </div>
        ) : src ? (
          <>
            <audio
              ref={audioRef}
              src={src}
              preload="auto"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => {
                setDuration(e.currentTarget.duration)
                e.currentTarget.playbackRate = speed
              }}
              onEnded={() => {
                setPlaying(false)
                if (autoNext && onNext) onNext()
              }}
              onError={() => setError('unavailable')}
              className="hidden"
            />
            {/* Seek bar */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[13px] tabular-nums text-[#6b6b6b] w-10 text-right">
                {formatTime(current)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={1}
                value={Math.min(current, duration || 0)}
                onChange={(e) => {
                  const el = audioRef.current
                  if (el) el.currentTime = Number(e.target.value)
                }}
                aria-label={t('bible.audio_seek')}
                className="flex-1 accent-[#1a4fa0] h-1.5 cursor-pointer"
              />
              <span className="text-[13px] tabular-nums text-[#6b6b6b] w-10">
                {formatTime(duration)}
              </span>
            </div>
            {/* Transport */}
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <button type="button" className={iconBtn} onClick={onPrev} disabled={!onPrev} aria-label={t('bible.prev_chapter')} title={t('bible.prev_chapter')}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button type="button" className={iconBtn} onClick={() => skip(-15)} aria-label={t('bible.audio_back15')} title={t('bible.audio_back15')}>
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? t('bible.audio_pause') : t('bible.audio_play')}
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1a4fa0] text-white hover:bg-[#153f80] shadow-md transition-colors"
              >
                {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
              <button type="button" className={iconBtn} onClick={() => skip(15)} aria-label={t('bible.audio_fwd15')} title={t('bible.audio_fwd15')}>
                <RotateCw className="w-5 h-5" />
              </button>
              <button type="button" className={iconBtn} onClick={onNext} disabled={!onNext} aria-label={t('bible.next_chapter')} title={t('bible.next_chapter')}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            {/* Options */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={changeSpeed}
                className="px-3 py-1 text-[13px] font-bold border border-[#c9d6ea] text-[#1a4fa0] hover:bg-[#eef3fb]"
                aria-label={t('bible.audio_speed')}
              >
                {speed}×
              </button>
              <button
                type="button"
                onClick={toggleAutoNext}
                aria-pressed={autoNext}
                className={
                  'inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-bold border transition-colors ' +
                  (autoNext ? 'bg-[#1a4fa0] border-[#1a4fa0] text-white' : 'border-[#c9d6ea] text-[#1a4fa0] hover:bg-[#eef3fb]')
                }
              >
                <Repeat className="w-3.5 h-3.5" aria-hidden />
                {t('bible.audio_autonext')}
              </button>
              {audio.textVersionId && (
                <button
                  type="button"
                  onClick={toggleText}
                  aria-pressed={showText}
                  className={
                    'inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-bold border transition-colors ' +
                    (showText ? 'bg-[#1a4fa0] border-[#1a4fa0] text-white' : 'border-[#c9d6ea] text-[#1a4fa0] hover:bg-[#eef3fb]')
                  }
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden />
                  {t('bible.audio_readalong')}
                </button>
              )}
            </div>
          </>
        ) : null}
      </div>

      {/* Read-along text */}
      {showText && audio.textVersionId && (
        <div className="mt-5">
          {text ? (
            <article className="lt-reading-text">
              {text.verses.map((v) => (
                <p
                  key={v.verse}
                  className={
                    maximized
                      ? 'mb-3 text-[20px] sm:text-[22px] text-[#333] leading-[1.8]'
                      : 'mb-2 text-[15px] text-[#333] leading-[1.7]'
                  }
                >
                  <sup className="font-bold text-[#1a4fa0] mr-1.5 text-[13px]">{v.verse}</sup>
                  {v.text}
                </p>
              ))}
            </article>
          ) : !error ? (
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-full" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

/**
 * Languages overview: which languages have text and/or audio, plus the ones
 * coming soon. Doubles as crawlable content for SEO.
 */
export function LanguagesPanel({
  versions,
  audios,
  onPickText,
  onPickAudio,
}: {
  versions: VersionInfo[]
  audios: AudioInfo[]
  onPickText: (versionId: string) => void
  onPickAudio: (audioId: string) => void
}) {
  const { t } = useT()
  const rows = LANGUAGE_ORDER.map((lang) => ({
    lang,
    texts: versions.filter((v) => v.language === lang),
    audio: audios.filter((a) => a.language === lang),
  })).filter((r) => r.texts.length > 0 || r.audio.length > 0)

  return (
    <section
      aria-labelledby="lt-langs-title"
      className="bg-white border border-[#e2e0dc] shadow-sm mt-5 p-5 sm:p-7"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
        <div>
          <h2 id="lt-langs-title" className="text-[26px] sm:text-[30px] font-bold text-[#1a2b4a] leading-tight">
            {t('bible.languages_title')}
          </h2>
          <p className="mt-1 text-[16px] text-[#555]">{t('bible.languages_intro')}</p>
        </div>
        <div className="flex items-center gap-4 text-[14px] text-[#555]">
          <span className="inline-flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-[#1a4fa0]" aria-hidden />{t('bible.lang_text')}</span>
          <span className="inline-flex items-center gap-1.5"><Headphones className="w-4 h-4 text-[#1a4fa0]" aria-hidden />{t('bible.lang_audio')}</span>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {rows.map((r) => (
          <li
            key={r.lang}
            className="flex flex-col justify-between gap-3 border border-[#e3eaf6] bg-gradient-to-br from-white to-[#f7f9fd] p-4 hover:border-[#1a4fa0] hover:shadow-md transition-all"
          >
            <div>
              <p className="font-display text-[20px] font-bold text-[#1a2b4a] leading-tight">
                {LANGUAGE_NAMES[r.lang] ?? r.lang}
              </p>
              <p className="mt-0.5 text-[14px] text-[#6b7280]">
                {r.texts.length > 0 && t('bible.n_versions', { n: r.texts.length })}
                {r.texts.length > 0 && r.audio.length > 0 && ' · '}
                {r.audio.length > 0 && t('bible.n_recordings', { n: r.audio.length })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {r.texts.length > 0 && (
                <button
                  type="button"
                  onClick={() => onPickText(r.texts[0].id)}
                  className="inline-flex items-center gap-2 h-10 px-4 text-[15px] font-semibold border border-[#1a4fa0] text-[#1a4fa0] bg-white hover:bg-[#eef3fb] transition-colors"
                  title={r.texts.map((v) => v.name).join(' · ')}
                >
                  <BookOpen className="w-4 h-4" aria-hidden />
                  {t('bible.read')}
                </button>
              )}
              {r.audio.length > 0 ? (
                <button
                  type="button"
                  onClick={() => onPickAudio(r.audio[0].id)}
                  className="inline-flex items-center gap-2 h-10 px-4 text-[15px] font-semibold bg-[#1a4fa0] text-white hover:bg-[#153f80] transition-colors"
                  title={r.audio.map((a) => `${a.name}${a.narrator ? ' — ' + a.narrator : ''}`).join(' · ')}
                >
                  <Headphones className="w-4 h-4" aria-hidden />
                  {t('bible.listen')}
                </button>
              ) : (
                <span className="inline-flex items-center h-10 px-3 text-[14px] text-[#8a8f99] border border-dashed border-[#d5d3cf]">
                  {t('bible.audio_soon')}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-[#eceae6] pt-5">
        <p className="text-[16px] font-bold text-[#1a2b4a] mb-3">{t('bible.coming_soon')}</p>
        <div className="flex flex-wrap gap-2">
          {COMING_SOON.map((l) => (
            <span key={l} className="px-4 py-1.5 text-[15px] font-semibold text-[#6b7280] bg-[#f4f4f2] border border-[#e6e4e0]">
              {l}
            </span>
          ))}
        </div>
        <p className="text-[14px] text-[#8a8f99] mt-3">{t('bible.coming_soon_desc')}</p>
      </div>
    </section>
  )
}
