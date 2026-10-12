'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLitabibleStore } from '@/lib/store'
import { useT } from '@/lib/i18n'
import {
  oldTestamentBooks,
  newTestamentBooks,
  psalmsBooks,
  getBookName,
} from '@/data/bible-books'
import type { BibleBook } from '@/data/types'
import type {
  ChapterResult,
  SearchResult,
} from '@/lib/bible-api'
import { BibleSearchBar } from '@/components/lt/bible-search-bar'
import { ChevronTab } from '@/components/lt/chevron-tab'
import { BlackButton } from '@/components/lt/black-button'
import { HighlightedText } from '@/components/lt/highlighted-text'
import { HighlightToolbar } from '@/components/lt/highlight-toolbar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, BookOpen, ChevronLeft, ChevronRight, Headphones, Maximize2, Minimize2 } from 'lucide-react'
import { AudioPlayerView, LanguagesPanel, LANGUAGE_NAMES, LANGUAGE_ORDER, type AudioInfo } from '@/components/lt/bible-audio'

const DEFAULT_VERSION_ID = 'LSG'
const DEFAULT_AUDIO_ID = 'BSB-SOUER'

/** Public shape of a text version (provider ids stay server-side). */
interface VersionInfo {
  id: string
  name: string
  language: string
  ntOnly?: boolean
}

type BibleMode = 'text' | 'audio'

function readPref(key: string, fallback: string): string {
  try {
    return window.localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}
function writePref(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage unavailable — ignore */
  }
}

const TABS: { id: 'at' | 'nt' | 'psaumes'; labelKey: string }[] = [
  { id: 'at', labelKey: 'bible.at' },
  { id: 'nt', labelKey: 'bible.nt' },
  { id: 'psaumes', labelKey: 'bible.psaumes' },
]

function booksForTab(tab: 'at' | 'nt' | 'psaumes'): BibleBook[] {
  if (tab === 'at') return oldTestamentBooks
  if (tab === 'nt') return newTestamentBooks
  return psalmsBooks
}

interface VersionListResponse {
  versions: VersionInfo[]
}

interface AudioListResponse {
  audios: AudioInfo[]
}

interface SearchResponse {
  results: SearchResult[]
  translation: string
  query: string
  error?: string
}

interface ChapterErrorBody {
  error: string
  reference?: string
  book?: string
  chapter?: number
  translation?: string
  source?: string
}

/**
 * LA BIBLE — three-tab Bible browser with chapter dialog and search.
 *
 * Top-level: full-width search bar. Below: two-column layout (left = tabs +
 * book list OR search results; right = promo card). Clicking a book opens a
 * shadcn Dialog with a chapter picker; clicking a chapter fetches and shows
 * the verses inline (with loading + error states and prev/next chapter
 * navigation).
 */
export function BiblePage() {
  const bibleTab = useLitabibleStore((s) => s.bibleTab)
  const setBibleTab = useLitabibleStore((s) => s.setBibleTab)
  const locale = useLitabibleStore((s) => s.locale)
  const { t } = useT()

  // Mode: text reading or audio listening
  const [mode, setModeState] = useState<BibleMode>('text')

  // Version selector state
  const [versions, setVersions] = useState<VersionInfo[]>([])
  const [version, setVersionState] = useState<string>(DEFAULT_VERSION_ID)

  // Audio selector state
  const [audios, setAudios] = useState<AudioInfo[]>([])
  const [audioId, setAudioIdState] = useState<string>(DEFAULT_AUDIO_ID)

  // Restore saved preferences (client only).
  useEffect(() => {
    setModeState(readPref('lt.bible.mode', 'text') === 'audio' ? 'audio' : 'text')
    setVersionState(readPref('lt.bible.version', DEFAULT_VERSION_ID))
    setAudioIdState(readPref('lt.bible.audio', DEFAULT_AUDIO_ID))
  }, [])

  const setMode = useCallback((m: BibleMode) => {
    setModeState(m)
    writePref('lt.bible.mode', m)
  }, [])
  const setVersion = useCallback((v: string) => {
    setVersionState(v)
    writePref('lt.bible.version', v)
  }, [])
  const setAudioId = useCallback((a: string) => {
    setAudioIdState(a)
    writePref('lt.bible.audio', a)
  }, [])

  // Search state — `null` means "show the book list" mode
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const searchAbortRef = useRef<AbortController | null>(null)

  // Chapter dialog state
  const [dialogBook, setDialogBook] = useState<BibleBook | null>(null)
  const [dialogChapter, setDialogChapter] = useState<number | null>(null)
  const [chapterData, setChapterData] = useState<ChapterResult | null>(null)
  const [chapterLoading, setChapterLoading] = useState(false)
  const [chapterError, setChapterError] = useState<string | null>(null)
  const [maximized, setMaximized] = useState(false)
  const chapterAbortRef = useRef<AbortController | null>(null)

  // Load the version list on mount.
  useEffect(() => {
    let cancelled = false
    const ctrl = new AbortController()
    fetch('/api/bible/versions', { signal: ctrl.signal, cache: 'no-store' })
      .then((r) => r.json() as Promise<VersionListResponse>)
      .then((data) => {
        if (cancelled) return
        if (Array.isArray(data.versions) && data.versions.length > 0) {
          setVersions(data.versions)
        }
      })
      .catch(() => {
        // Silent fallback — keep the default version selector.
      })
    fetch('/api/bible/audio/versions', { signal: ctrl.signal })
      .then((r) => r.json() as Promise<AudioListResponse>)
      .then((data) => {
        if (cancelled) return
        if (Array.isArray(data.audios) && data.audios.length > 0) setAudios(data.audios)
      })
      .catch(() => {
        /* audio list unavailable */
      })
    return () => {
      cancelled = true
      ctrl.abort()
    }
  }, [])

  // Cleanup any in-flight fetch on unmount.
  useEffect(() => {
    return () => {
      searchAbortRef.current?.abort()
      chapterAbortRef.current?.abort()
    }
  }, [])

  const runSearch = useCallback(
    (q: string) => {
      // Abort any previous in-flight search.
      searchAbortRef.current?.abort()
      const ctrl = new AbortController()
      searchAbortRef.current = ctrl

      setSearchQuery(q)
      setSearchLoading(true)
      setSearchError(null)
      setSearchResults([])

      const url = `/api/bible/search?q=${encodeURIComponent(q)}&version=${encodeURIComponent(version)}`
      fetch(url, { signal: ctrl.signal, cache: 'no-store' })
        .then(async (r) => {
          const data = (await r.json()) as SearchResponse
          return data
        })
        .then((data) => {
          if (ctrl.signal.aborted) return
          setSearchResults(data.results ?? [])
          if (data.error) setSearchError(data.error)
        })
        .catch((err: unknown) => {
          if (ctrl.signal.aborted) return
          setSearchError(
            err instanceof Error
              ? err.message
              : t('bible.search_failed'),
          )
        })
        .finally(() => {
          if (!ctrl.signal.aborted) setSearchLoading(false)
        })
    },
    [version, t],
  )

  const loadChapter = useCallback(
    (book: BibleBook, chapter: number, versionOverride?: string) => {
      // Abort any previous in-flight chapter fetch.
      chapterAbortRef.current?.abort()
      if (mode === 'audio') {
        // The audio view loads its own data.
        setDialogChapter(chapter)
        setChapterLoading(false)
        setChapterError(null)
        setChapterData(null)
        return
      }
      const ctrl = new AbortController()
      chapterAbortRef.current = ctrl

      setDialogChapter(chapter)
      setChapterLoading(true)
      setChapterError(null)
      setChapterData(null)

      const ver = versionOverride ?? version
      const url =
        `/api/bible/chapter?version=${encodeURIComponent(ver)}` +
        `&book=${encodeURIComponent(book.name)}` +
        `&chapter=${String(chapter)}`

      fetch(url, { signal: ctrl.signal, cache: 'no-store' })
        .then(async (r) => {
          if (!r.ok) {
            const body = (await r.json().catch(() => null)) as ChapterErrorBody | null
            const code = body?.error
            throw new Error(
              code === 'nt_only'
                ? t('bible.nt_only')
                : code === 'unavailable'
                  ? t('bible.chapter_unavailable')
                  : code ?? t('bible.error_fetch'),
            )
          }
          return (await r.json()) as ChapterResult
        })
        .then((data) => {
          if (ctrl.signal.aborted) return
          setChapterData(data)
        })
        .catch((err: unknown) => {
          if (ctrl.signal.aborted) return
          setChapterError(
            err instanceof Error ? err.message : t('bible.error_fetch'),
          )
        })
        .finally(() => {
          if (!ctrl.signal.aborted) setChapterLoading(false)
        })
    },
    [version, t, mode],
  )

  const handleBookClick = useCallback(
    (book: BibleBook) => {
      setDialogBook(book)
      setChapterData(null)
      setChapterError(null)
      // Single-chapter books (e.g. Psalms tab) skip the picker and load directly.
      if (book.chapters <= 1) {
        loadChapter(book, 1)
      } else {
        setDialogChapter(null)
      }
    },
    [loadChapter],
  )

  const closeDialog = useCallback(() => {
    setMaximized(false)
    chapterAbortRef.current?.abort()
    setDialogBook(null)
    setDialogChapter(null)
    setChapterData(null)
    setChapterError(null)
    setChapterLoading(false)
  }, [])

  const backToChapterPicker = useCallback(() => {
    chapterAbortRef.current?.abort()
    setDialogChapter(null)
    setChapterData(null)
    setChapterError(null)
    setChapterLoading(false)
  }, [])

  const backToBookList = useCallback(() => {
    searchAbortRef.current?.abort()
    setSearchQuery(null)
    setSearchResults([])
    setSearchError(null)
    setSearchLoading(false)
  }, [])

  // Group versions by language for the Select dropdown.
  const groupedVersions = versions.length
    ? LANGUAGE_ORDER
        .map((lang) => ({
          lang,
          items: versions.filter((v) => v.language === lang),
        }))
        .filter((g) => g.items.length > 0)
    : [{ lang: 'fr', items: [{ id: DEFAULT_VERSION_ID, name: 'Louis Segond 1910', language: 'fr' }] }]

  const groupedAudios = audios.length
    ? LANGUAGE_ORDER
        .map((lang) => ({ lang, items: audios.filter((a) => a.language === lang) }))
        .filter((g) => g.items.length > 0)
    : [{ lang: 'en', items: [{ id: DEFAULT_AUDIO_ID, name: 'Berean Standard Bible', narrator: 'Souer', language: 'en' }] as AudioInfo[] }]
  const currentAudio = audios.find((a) => a.id === audioId)

  const currentBook = dialogBook
  const currentChapter = dialogChapter
  const canPrevChapter =
    currentBook !== null && currentChapter !== null && currentChapter > 1
  const canNextChapter =
    currentBook !== null &&
    currentChapter !== null &&
    currentChapter < currentBook.chapters

  return (
    <section aria-label={t('bible.title')} className="w-full">
      {/* Hero / header card */}
      <div className="bg-white border border-[#e2e0dc] shadow-sm p-5 sm:p-7 mb-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="min-w-0">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-[#1a2b4a] leading-[1.1]">
              {t('bible.title')}
            </h1>
            <p className="mt-2 text-[17px] text-[#555] leading-relaxed max-w-[640px]">
              {mode === 'text' ? t('bible.text_intro') : t('bible.audio_intro')}
            </p>
          </div>
          <div
            role="tablist"
            aria-label={t('bible.mode_label')}
            className="inline-flex p-1 bg-[#eef3fb] self-start md:self-auto flex-shrink-0"
          >
            {([
              { id: 'text', label: t('bible.mode_text'), Icon: BookOpen },
              { id: 'audio', label: t('bible.mode_audio'), Icon: Headphones },
            ] as const).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={
                  'inline-flex items-center gap-2.5 px-5 sm:px-6 h-12 text-[16px] font-bold transition-all ' +
                  (mode === id
                    ? 'bg-[#1a4fa0] text-white shadow'
                    : 'text-[#1a4fa0] hover:bg-white')
                }
              >
                <Icon className="w-5 h-5" aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </div>
        {mode === 'text' && (
          <div className="mt-5">
            <BibleSearchBar onSearch={runSearch} />
          </div>
        )}
        {/* 3-step guide so first-time visitors know what to do */}
        <ol className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            mode === 'text' ? t('bible.step_version') : t('bible.step_recording'),
            t('bible.step_book'),
            mode === 'text' ? t('bible.step_read') : t('bible.step_listen'),
          ].map((label, i) => (
            <li key={i} className="flex items-center gap-3 bg-[#f7f9fd] border border-[#e3eaf6] px-3 py-2.5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a4fa0] text-white font-bold text-[15px] flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-[15px] font-semibold text-[#1a2b4a]">{label}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Main reading card — full width */}
      <div className="bg-white border border-[#e2e0dc] shadow-sm">
        {/* Toolbar: testament tabs + version / recording selector */}
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between border-b border-[#e2e0dc]">
          <nav aria-label={t('bible.title')} className="flex overflow-x-auto lt-scroll">
            {TABS.map((tab) => (
              <ChevronTab
                key={tab.id}
                orientation="horizontal"
                active={tab.id === bibleTab}
                onClick={() => setBibleTab(tab.id)}
                className="flex-1 !text-[15px] !px-6 !py-4"
              >
                {t(tab.labelKey)}
              </ChevronTab>
            ))}
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3 border-t lg:border-t-0 lg:border-l border-[#e2e0dc] bg-[#fafbfd]">
            {mode === 'text' ? (
              <>
                <label
                  htmlFor="bible-version-select"
                  className="text-[14px] font-bold text-[#1a2b4a] whitespace-nowrap"
                >
                  {t('bible.version')}
                </label>
                <Select value={version} onValueChange={setVersion}>
                  <SelectTrigger
                    id="bible-version-select"
                    className="h-11 rounded-none border-[#c9d6ea] bg-white text-[15px] w-full sm:w-[300px]"
                  >
                    <SelectValue placeholder={t('bible.version')} />
                  </SelectTrigger>
                  <SelectContent className="rounded-none max-h-[360px]">
                    {groupedVersions.map((g) => (
                      <SelectGroup key={g.lang}>
                        <SelectLabel className="text-[13px] font-bold text-[#1a4fa0]">{LANGUAGE_NAMES[g.lang] ?? g.lang}</SelectLabel>
                        {g.items.map((v) => (
                          <SelectItem key={v.id} value={v.id} className="text-[15px]">
                            {v.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </>
            ) : (
              <>
                <label
                  htmlFor="bible-audio-select"
                  className="text-[14px] font-bold text-[#1a2b4a] whitespace-nowrap"
                >
                  {t('bible.audio_version')}
                </label>
                <Select value={audioId} onValueChange={setAudioId}>
                  <SelectTrigger
                    id="bible-audio-select"
                    className="h-11 rounded-none border-[#c9d6ea] bg-white text-[15px] w-full sm:w-[340px]"
                  >
                    <SelectValue placeholder={t('bible.audio_version')} />
                  </SelectTrigger>
                  <SelectContent className="rounded-none max-h-[360px]">
                    {groupedAudios.map((g) => (
                      <SelectGroup key={g.lang}>
                        <SelectLabel className="text-[13px] font-bold text-[#1a4fa0]">{LANGUAGE_NAMES[g.lang] ?? g.lang}</SelectLabel>
                        {g.items.map((a) => (
                          <SelectItem key={a.id} value={a.id} className="text-[15px]">
                            {a.name}{a.narrator ? ` — ${a.narrator}` : ''}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 sm:p-6">
          {mode === 'text' && searchQuery !== null ? (
            <SearchResultsView
              query={searchQuery}
              results={searchResults}
              loading={searchLoading}
              error={searchError}
              onBack={backToBookList}
            />
          ) : (
            <BookListView
              books={booksForTab(bibleTab)}
              onBookClick={handleBookClick}
            />
          )}
        </div>
      </div>

      <LanguagesPanel
        versions={versions}
        audios={audios}
        onPickText={(id) => { setMode('text'); setVersion(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        onPickAudio={(id) => { setMode('audio'); setAudioId(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
      />

      {/* Chapter dialog */}
      <Dialog
        open={currentBook !== null}
        onOpenChange={(open) => {
          if (!open) closeDialog()
        }}
      >
        <DialogContent
          className={
            maximized
              ? 'lt-dialog-fullscreen rounded-none p-0 overflow-hidden'
              : 'max-w-3xl rounded-none p-0 overflow-hidden'
          }
        >
          {currentBook && (
            <>
              <DialogHeader className="px-5 pt-4 pb-3 border-b border-[#e2e0dc] flex flex-row items-center justify-between gap-3 pr-14">
                <div className="min-w-0">
                  <DialogTitle className="text-[16px] font-bold uppercase text-[#333] truncate">
                    {getBookName(currentBook, locale)}
                  </DialogTitle>
                  <DialogDescription className="text-[14px] text-[#6b6b6b]">
                    {currentChapter
                      ? `${t('bible.chapter')} ${currentChapter} · ${t('bible.chapters_total', { n: currentBook.chapters })}`
                      : t('bible.choose_chapter', { n: currentBook.chapters })}
                  </DialogDescription>
                </div>
                {/* Window controls: maximize / restore (default X close stays absolute top-right) */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setMaximized((m) => !m)}
                    aria-label={maximized ? t('bible.restore') : t('bible.maximize')}
                    title={maximized ? t('bible.restore') : t('bible.maximize')}
                    className="inline-flex items-center justify-center w-8 h-8 text-[#6b6b6b] hover:text-[#1a4fa0] hover:bg-[#f4f1ea] rounded transition-colors"
                  >
                    {maximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </DialogHeader>

              <div className={maximized ? 'flex flex-col max-h-[calc(100dvh-72px)] min-h-0' : 'flex flex-col max-h-[60vh] min-h-0'}>
                {currentChapter === null ? (
                  // Chapter picker grid
                  <div className="flex-1 overflow-y-auto lt-scroll p-5">
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                      {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(
                        (n) => (
                          <BlackButton
                            key={n}
                            size="sm"
                            onClick={() => loadChapter(currentBook, n)}
                            className="!text-[15px]"
                          >
                            {n}
                          </BlackButton>
                        ),
                      )}
                    </div>
                  </div>
                ) : mode === 'audio' ? (
                  <AudioPlayerView
                    key={`${audioId}:${currentBook.id}:${currentChapter}`}
                    audio={currentAudio ?? groupedAudios[0].items[0]}
                    book={currentBook}
                    chapter={currentChapter}
                    maximized={maximized}
                    onBack={backToChapterPicker}
                    onPrev={canPrevChapter ? () => loadChapter(currentBook, currentChapter - 1) : undefined}
                    onNext={canNextChapter ? () => loadChapter(currentBook, currentChapter + 1) : undefined}
                  />
                ) : chapterLoading ? (
                  // Loading skeleton
                  <div className="flex-1 overflow-y-auto lt-scroll p-5 space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : chapterError ? (
                  // Error block with retry
                  <div className="flex-1 flex items-center justify-center p-5">
                    <div className="text-center max-w-md">
                      <AlertCircle className="w-10 h-10 text-[#1a4fa0] mx-auto mb-3" />
                      <p className="text-[16px] font-semibold text-[#333] mb-1">
                        {t('bible.load_failed')}
                      </p>
                      <p className="text-[14px] text-[#6b6b6b] mb-4">
                        {chapterError}
                      </p>
                      <BlackButton
                        size="sm"
                        onClick={() =>
                          loadChapter(currentBook, currentChapter)
                        }
                      >
                        {t('bible.retry')}
                      </BlackButton>
                    </div>
                  </div>
                ) : chapterData ? (
                  // Chapter display
                  <div className="flex-1 overflow-y-auto lt-scroll p-5">
                    <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                      <button
                        type="button"
                        onClick={backToChapterPicker}
                        className="text-[14px] text-[#1a4fa0] hover:underline uppercase font-semibold"
                      >
                        {t('bible.back_chapters')}
                      </button>
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Version switcher inside the popup — change version without closing */}
                        <Select
                          value={version}
                          onValueChange={(v) => {
                            setVersion(v)
                            if (currentBook && currentChapter) loadChapter(currentBook, currentChapter, v)
                          }}
                        >
                          <SelectTrigger size="sm" className="h-7 rounded-none border-[#ccc] text-[13px] min-w-[130px] max-w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-none max-h-[280px]">
                            {groupedVersions.map((g) => (
                              <SelectGroup key={g.lang}>
                                <SelectLabel>{LANGUAGE_NAMES[g.lang] ?? g.lang}</SelectLabel>
                                {g.items.map((vv) => (
                                  <SelectItem key={vv.id} value={vv.id}>
                                    {vv.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </SelectContent>
                        </Select>
                        <button
                          type="button"
                          disabled={!canPrevChapter}
                          onClick={() =>
                            canPrevChapter &&
                            loadChapter(currentBook, currentChapter - 1)
                          }
                          className="inline-flex items-center justify-center w-8 h-8 bg-black text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#222] transition-colors"
                          aria-label={t('bible.prev_chapter')}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-[14px] font-semibold text-[#333]">
                          {currentChapter} / {currentBook.chapters}
                        </span>
                        <button
                          type="button"
                          disabled={!canNextChapter}
                          onClick={() =>
                            canNextChapter &&
                            loadChapter(currentBook, currentChapter + 1)
                          }
                          className="inline-flex items-center justify-center w-8 h-8 bg-black text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#222] transition-colors"
                          aria-label={t('bible.next_chapter')}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h2 className="text-[17px] font-bold uppercase text-[#1a4fa0] mb-3">
                      {chapterData.reference}
                    </h2>
                    {chapterData.source && (
                      <p className="text-[13px] text-[#9a9a9a] mb-4">
                        {t('bible.source_label')} {chapterData.source} · {chapterData.translation}
                      </p>
                    )}
                    <article className="lt-reading-text" data-highlightable>
                      {chapterData.verses.map((v) => (
                        <p key={v.verse} className={maximized ? "mb-3 text-[20px] sm:text-[24px] text-[#333] leading-[1.8]" : "mb-2 text-[16px] text-[#333] leading-[1.7]"}>
                          <sup className="font-bold text-[#1a4fa0] mr-1.5 text-[13px]">
                            {v.verse}
                          </sup>
                          <HighlightedText
                            text={v.text}
                            highlightKey={`bible:${version}:${currentBook.id}:${currentChapter}:${v.verse}`}
                          />
                        </p>
                      ))}
                    </article>
                  </div>
                ) : null}
              </div>
            </>
          )}
          {/* Floating color-marker toolbar (appears on text selection) */}
          <HighlightToolbar containerSelector="[data-highlightable]" />
        </DialogContent>
      </Dialog>
    </section>
  )
}

/**
 * 2-column list of book links. Black text, hover red, no bullets / icons.
 */
function BookListView({
  books,
  onBookClick,
}: {
  books: BibleBook[]
  onBookClick: (book: BibleBook) => void
}) {
  const locale = useLitabibleStore((s) => s.locale)
  const { t } = useT()
  return (
    <div>
      <h2 className="sr-only">{t('bible.book_list')}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
        {books.map((book) => (
          <li key={book.id}>
            <button
              type="button"
              onClick={() => onBookClick(book)}
              className="group w-full flex items-baseline justify-between gap-2 text-left px-3 py-2.5 text-[17px] font-semibold text-[#1a2b4a] border-b border-[#f0eeea] hover:bg-[#eef3fb] hover:text-[#1a4fa0] transition-colors"
            >
              {getBookName(book, locale)}
              <span className="flex-shrink-0 text-[14px] font-normal text-[#8a8f99] group-hover:text-[#1a4fa0]">
                {book.chapters} {t('bible.chapters_label')}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Search results panel — replaces the book list when a search is submitted.
 */
function SearchResultsView({
  query,
  results,
  loading,
  error,
  onBack,
}: {
  query: string
  results: SearchResult[]
  loading: boolean
  error: string | null
  onBack: () => void
}) {
  const { t } = useT()
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-[16px] font-semibold text-[#333]">
          {loading
            ? t('bible.searching')
            : t('bible.search_results_for', { n: results.length, query })}
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="text-[14px] text-[#1a4fa0] hover:underline uppercase font-semibold"
        >
          {t('bible.back_list')}
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <AlertCircle className="w-10 h-10 text-[#1a4fa0] mx-auto mb-3" />
          <p className="text-[16px] font-semibold text-[#333] mb-1">
            {t('bible.search_failed')}
          </p>
          <p className="text-[14px] text-[#6b6b6b]">{error}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[16px] text-[#333] mb-1">{t('bible.no_results')}</p>
          <p className="text-[14px] text-[#6b6b6b]">{t('bible.no_results_desc')}</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {results.map((r, i) => (
            <li key={`${r.reference}-${i}`} className="border-b border-[#e8e6e2] pb-3">
              <p className="text-[16px] font-bold text-[#1a4fa0] mb-1">
                {r.reference}
              </p>
              <p className="text-[16px] text-[#333] leading-relaxed">{r.text}</p>
              {r.translation && (
                <p className="text-[13px] text-[#9a9a9a] mt-1">
                  {r.translation}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BiblePage

