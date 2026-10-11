'use client'

/**
 * LitaBible — text-highlight store (localStorage-backed, with a tiny pub/sub
 * so React components re-render when highlights change).
 *
 * Highlights are keyed by a stable `highlightKey` (e.g.
 * "bible:BSB:1:1:3" for Genesis chapter 1 verse 3 in the BSB version, or
 * "reading:mass:2026-09-27:0" for the first mass reading of that date). Each
 * key holds a list of `{ id, text, color }` records; the `text` is the exact
 * substring that was selected.
 */

export interface Highlight {
  id: string
  /** The exact selected substring. */
  text: string
  /** Marker color (hex). */
  color: string
  /** Creation timestamp (ms). */
  createdAt: number
}

type Store = Record<string, Highlight[]>

const STORAGE_KEY = 'litabible:highlights:v1'
const EVENT = 'litabible:highlights:change'

// ---------------------------------------------------------------------------
// Storage helpers (defensive — localStorage may be unavailable / corrupt)
// ---------------------------------------------------------------------------

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function read(): Store {
  if (!isBrowser()) return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as Store) : {}
  } catch {
    return {}
  }
}

function write(store: Store): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    window.dispatchEvent(new CustomEvent(EVENT))
  } catch {
    /* quota / privacy mode — ignore */
  }
}

function emit(): void {
  if (isBrowser()) window.dispatchEvent(new CustomEvent(EVENT))
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Return the highlights for a given key (empty array if none). */
export function getHighlights(key: string): Highlight[] {
  return read()[key] ?? []
}

/** Add a highlight (selected text + color) under a key. */
export function addHighlight(key: string, text: string, color: string): Highlight {
  const store = read()
  const list = store[key] ?? []
  const item: Highlight = { id: genId(), text, color, createdAt: Date.now() }
  // Avoid exact duplicates (same text + color).
  if (!list.some((h) => h.text === text && h.color === color)) {
    list.push(item)
    store[key] = list
    write(store)
    return item
  }
  return item
}

/** Remove a single highlight by id. */
export function removeHighlight(key: string, id: string): void {
  const store = read()
  const list = store[key]
  if (!list) return
  store[key] = list.filter((h) => h.id !== id)
  if (store[key].length === 0) delete store[key]
  write(store)
}

/** Remove all highlights that exactly match a given text under a key. */
export function removeHighlightByText(key: string, text: string): void {
  const store = read()
  const list = store[key]
  if (!list) return
  store[key] = list.filter((h) => h.text !== text)
  if (store[key].length === 0) delete store[key]
  write(store)
}

/** Clear every highlight under a key. */
export function clearHighlights(key: string): void {
  const store = read()
  if (!(key in store)) return
  delete store[key]
  write(store)
}

/** Clear every highlight everywhere. */
export function clearAllHighlights(): void {
  write({})
}

// ---------------------------------------------------------------------------
// React binding — re-render on change
// ---------------------------------------------------------------------------

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void): () => void {
  if (!isBrowser()) return () => {}
  window.addEventListener(EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

/** React hook: returns the highlights for a key, re-rendering on any change. */
export function useHighlights(key: string): Highlight[] {
  const snapshot = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(read()[key] ?? []),
    () => '[]',
  )
  try {
    return JSON.parse(snapshot) as Highlight[]
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// Segment builder — splits a text into runs, wrapping matched substrings
// in `{ text, color }` segments (for <HighlightedText>).
// ---------------------------------------------------------------------------

export interface TextSegment {
  text: string
  /** Marker color, or "" for plain text. */
  color?: string
}

/**
 * Split `text` into segments, applying every highlight (matched by exact
 * substring, case-sensitive) as colored runs. Overlapping highlights are
 * resolved in insertion order (later highlights win on the overlap).
 */
export function buildSegments(text: string, highlights: Highlight[]): TextSegment[] {
  if (!text || highlights.length === 0) return [{ text }]
  // Mark each character index with the winning color (or "" for none).
  const marks = new Array<string>(text.length).fill('')
  for (const h of highlights) {
    if (!h.text) continue
    let from = 0
    while (from <= text.length - h.text.length) {
      const idx = text.indexOf(h.text, from)
      if (idx === -1) break
      for (let i = idx; i < idx + h.text.length; i++) marks[i] = h.color
      from = idx + h.text.length
    }
  }
  // Group consecutive identical marks into segments.
  const segs: TextSegment[] = []
  let i = 0
  while (i < text.length) {
    const color = marks[i]
    let j = i + 1
    while (j < text.length && marks[j] === color) j++
    segs.push({ text: text.slice(i, j), color: color || undefined })
    i = j
  }
  return segs
}
