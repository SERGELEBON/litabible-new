'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAelfStore } from '@/lib/store'
import {
  oldTestamentBooks,
  newTestamentBooks,
  psalmsBooks,
} from '@/data/bible-books'
import type { BibleBook } from '@/data/types'
import type {
  BibleVersion,
  ChapterResult,
  SearchResult,
} from '@/lib/bible-api'
import { BibleSearchBar } from '@/components/aelf/bible-search-bar'
import { ChevronTab } from '@/components/aelf/chevron-tab'
import { BlackButton } from '@/components/aelf/black-button'
import { PromoCard } from '@/components/aelf/promo-card'
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
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'

const DEFAULT_VERSION_ID = 'LSG'

const TABS: { id: 'at' | 'nt' | 'psaumes'; label: string }[] = [
  { id: 'at', label: 'Ancien Testament' },
  { id: 'nt', label: 'Nouveau Testament' },
  { id: 'psaumes', label: 'Psaumes' },
]

const LANG_LABELS: Record<BibleVersion['language'], string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
}

function booksForTab(tab: 'at' | 'nt' | 'psaumes'): BibleBook[] {
  if (tab === 'at') return oldTestamentBooks
  if (tab === 'nt') return newTestamentBooks
  return psalmsBooks
}

interface VersionListResponse {
  versions: BibleVersion[]
  languages: Record<BibleVersion['language'], BibleVersion[]>
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
  const bibleTab = useAelfStore((s) => s.bibleTab)
  const setBibleTab = useAelfStore((s) => s.setBibleTab)

  // Version selector state
  const [versions, setVersions] = useState<BibleVersion[]>([])
  const [version, setVersion] = useState<string>(DEFAULT_VERSION_ID)

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
            err instanceof Error ? err.message : 'Erreur inconnue lors de la recherche.',
          )
        })
        .finally(() => {
          if (!ctrl.signal.aborted) setSearchLoading(false)
        })
    },
    [version],
  )

  const loadChapter = useCallback(
    (book: BibleBook, chapter: number) => {
      // Abort any previous in-flight chapter fetch.
      chapterAbortRef.current?.abort()
      const ctrl = new AbortController()
      chapterAbortRef.current = ctrl

      setDialogChapter(chapter)
      setChapterLoading(true)
      setChapterError(null)
      setChapterData(null)

      const url =
        `/api/bible/chapter?version=${encodeURIComponent(version)}` +
        `&book=${encodeURIComponent(book.name)}` +
        `&chapter=${String(chapter)}`

      fetch(url, { signal: ctrl.signal, cache: 'no-store' })
        .then(async (r) => {
          if (!r.ok) {
            const body = (await r.json().catch(() => null)) as ChapterErrorBody | null
            throw new Error(
              body?.error ??
                `Échec du chargement du chapitre (HTTP ${r.status}).`,
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
            err instanceof Error ? err.message : 'Échec du chargement du chapitre.',
          )
        })
        .finally(() => {
          if (!ctrl.signal.aborted) setChapterLoading(false)
        })
    },
    [version],
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
    ? (['fr', 'en', 'es'] as const)
        .map((lang) => ({
          lang,
          items: versions.filter((v) => v.language === lang),
        }))
        .filter((g) => g.items.length > 0)
    : [{ lang: 'fr' as const, items: [{ id: DEFAULT_VERSION_ID, name: 'Louis Segond 1910', language: 'fr' as const, bollsCode: 'LSG' }] }]

  const currentBook = dialogBook
  const currentChapter = dialogChapter
  const canPrevChapter =
    currentBook !== null && currentChapter !== null && currentChapter > 1
  const canNextChapter =
    currentBook !== null &&
    currentChapter !== null &&
    currentChapter < currentBook.chapters

  return (
    <section aria-label="La Bible" className="w-full">
      <div className="bg-white border border-[#e2e0dc] p-4 sm:p-6 mb-4">
        <h1 className="text-[21px] font-semibold uppercase text-[#333] mb-3 tracking-tight">
          La Bible
        </h1>
        <BibleSearchBar onSearch={runSearch} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main column */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-[#e2e0dc]">
            {/* Tabs + version selector */}
            <div className="flex flex-col sm:flex-row sm:items-stretch sm:justify-between gap-2 border-b border-[#e2e0dc]">
              <nav
                aria-label="Testaments"
                className="flex overflow-x-auto aelf-scroll"
              >
                {TABS.map((t) => (
                  <ChevronTab
                    key={t.id}
                    orientation="horizontal"
                    active={t.id === bibleTab}
                    onClick={() => setBibleTab(t.id)}
                    className="flex-1"
                  >
                    {t.label}
                  </ChevronTab>
                ))}
              </nav>
              <div className="flex items-center gap-2 px-3 py-2 sm:py-1.5 border-t sm:border-t-0 sm:border-l border-[#e2e0dc]">
                <label
                  htmlFor="bible-version-select"
                  className="text-[11px] uppercase tracking-wide text-[#6b6b6b] font-semibold"
                >
                  Version
                </label>
                <Select value={version} onValueChange={setVersion}>
                  <SelectTrigger
                    id="bible-version-select"
                    size="sm"
                    className="h-8 rounded-none border-[#ccc] text-[12px] min-w-[160px]"
                  >
                    <SelectValue placeholder="Version" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {groupedVersions.map((g) => (
                      <SelectGroup key={g.lang}>
                        <SelectLabel>{LANG_LABELS[g.lang]}</SelectLabel>
                        {g.items.map((v) => (
                          <SelectItem key={v.id} value={v.id}>
                            {v.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Content area */}
            <div className="p-4 sm:p-5">
              {searchQuery !== null ? (
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
        </div>

        {/* Right promo column */}
        <aside className="lg:w-[320px] flex-shrink-0">
          <PromoCard
            title="La Bible liturgique"
            description="Texte officiel de l’Église pour la proclamation. Traduction, notes et introductions pour la lecture priée. Disponible en librairie."
          />
        </aside>
      </div>

      {/* Chapter dialog */}
      <Dialog
        open={currentBook !== null}
        onOpenChange={(open) => {
          if (!open) closeDialog()
        }}
      >
        <DialogContent className="max-w-3xl rounded-none p-0 overflow-hidden">
          {currentBook && (
            <>
              <DialogHeader className="px-5 pt-5 pb-3 border-b border-[#e2e0dc]">
                <DialogTitle className="text-[16px] font-bold uppercase text-[#333]">
                  {currentBook.name}
                </DialogTitle>
                <DialogDescription className="text-[12px] text-[#6b6b6b]">
                  {currentChapter
                    ? `Chapitre ${currentChapter} · ${currentBook.chapters} au total`
                    : `Choisissez un chapitre (1 à ${currentBook.chapters})`}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col max-h-[60vh] min-h-0">
                {currentChapter === null ? (
                  // Chapter picker grid
                  <div className="flex-1 overflow-y-auto aelf-scroll p-5">
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                      {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map(
                        (n) => (
                          <BlackButton
                            key={n}
                            size="sm"
                            onClick={() => loadChapter(currentBook, n)}
                            className="!text-[13px]"
                          >
                            {n}
                          </BlackButton>
                        ),
                      )}
                    </div>
                  </div>
                ) : chapterLoading ? (
                  // Loading skeleton
                  <div className="flex-1 overflow-y-auto aelf-scroll p-5 space-y-3">
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
                      <AlertCircle className="w-10 h-10 text-[#bf2329] mx-auto mb-3" />
                      <p className="text-[14px] font-semibold text-[#333] mb-1">
                        Échec du chargement
                      </p>
                      <p className="text-[12px] text-[#6b6b6b] mb-4">
                        {chapterError}
                      </p>
                      <BlackButton
                        size="sm"
                        onClick={() =>
                          loadChapter(currentBook, currentChapter)
                        }
                      >
                        Réessayer
                      </BlackButton>
                    </div>
                  </div>
                ) : chapterData ? (
                  // Chapter display
                  <div className="flex-1 overflow-y-auto aelf-scroll p-5">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <button
                        type="button"
                        onClick={backToChapterPicker}
                        className="text-[12px] text-[#bf2329] hover:underline uppercase font-semibold"
                      >
                        ‹ Chapitres
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={!canPrevChapter}
                          onClick={() =>
                            canPrevChapter &&
                            loadChapter(currentBook, currentChapter - 1)
                          }
                          className="inline-flex items-center justify-center w-8 h-8 bg-black text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#222] transition-colors"
                          aria-label="Chapitre précédent"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-[12px] font-semibold text-[#333]">
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
                          aria-label="Chapitre suivant"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h2 className="text-[17px] font-bold uppercase text-[#bf2329] mb-3">
                      {chapterData.reference}
                    </h2>
                    {chapterData.source && (
                      <p className="text-[11px] text-[#9a9a9a] mb-4">
                        Source : {chapterData.source} · {chapterData.translation}
                      </p>
                    )}
                    <article className="aelf-reading-text">
                      {chapterData.verses.map((v) => (
                        <p key={v.verse} className="mb-2 text-[16px] text-[#333] leading-[1.7]">
                          <sup className="font-bold text-[#bf2329] mr-1.5 text-[11px]">
                            {v.verse}
                          </sup>
                          {v.text}
                        </p>
                      ))}
                    </article>
                  </div>
                ) : null}
              </div>
            </>
          )}
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
  return (
    <div>
      <h2 className="sr-only">Liste des livres</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
        {books.map((book) => (
          <li key={book.id}>
            <button
              type="button"
              onClick={() => onBookClick(book)}
              className="w-full text-left py-1.5 text-[14px] text-[#333] hover:text-[#bf2329] transition-colors"
            >
              {book.name}
              <span className="ml-2 text-[11px] text-[#9a9a9a]">
                ({book.chapters} ch.)
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
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-[14px] font-semibold text-[#333]">
          {loading
            ? 'Recherche en cours…'
            : `${results.length} résultat(s) pour « ${query} »`}
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="text-[12px] text-[#bf2329] hover:underline uppercase font-semibold"
        >
          ← Retour à la liste
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
          <AlertCircle className="w-10 h-10 text-[#bf2329] mx-auto mb-3" />
          <p className="text-[14px] font-semibold text-[#333] mb-1">
            La recherche a échoué
          </p>
          <p className="text-[12px] text-[#6b6b6b]">{error}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[14px] text-[#333] mb-1">Aucun résultat.</p>
          <p className="text-[12px] text-[#6b6b6b]">
            Essayez un autre terme ou une référence (par ex. « Jean 3 »).
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {results.map((r, i) => (
            <li key={`${r.reference}-${i}`} className="border-b border-[#e8e6e2] pb-3">
              <p className="text-[14px] font-bold text-[#bf2329] mb-1">
                {r.reference}
              </p>
              <p className="text-[14px] text-[#333] leading-relaxed">{r.text}</p>
              {r.translation && (
                <p className="text-[11px] text-[#9a9a9a] mt-1">
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
