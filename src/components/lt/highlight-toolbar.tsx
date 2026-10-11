'use client'

import { useEffect, useRef, useState } from 'react'
import { Highlighter, Eraser, Trash2 } from 'lucide-react'
import { addHighlight, removeHighlightByText, clearHighlights, useHighlights } from '@/lib/highlights'

/** Marker palette (warm + brand colors, distinct from the blue body text). */
const COLORS = [
  { hex: '#f5c400', label: 'Yellow' },
  { hex: '#ff9d3c', label: 'Orange' },
  { hex: '#ff6b6b', label: 'Red' },
  { hex: '#7dd87d', label: 'Green' },
  { hex: '#9ec5fe', label: 'Blue' },
  { hex: '#d8a4f0', label: 'Purple' },
]

interface HighlightToolbarProps {
  /**
   * CSS selector for the container(s) where text selection should trigger the
   * toolbar (e.g. "[data-highlightable]"). Selections outside are ignored.
   */
  containerSelector: string
}

interface ToolbarState {
  visible: boolean
  x: number
  y: number
  selText: string
  highlightKey: string | null
}

/**
 * Floating color-marker toolbar. When the user selects text inside any
 * `[data-highlightable]` element (each verse/reading carries a
 * `data-highlight-key`), this toolbar pops up near the selection with color
 * swatches + an eraser + a "clear all" button. Selecting a color saves the
 * highlight (localStorage) and the <HighlightedText> re-renders with the
 * colored <mark>.
 */
export function HighlightToolbar({ containerSelector }: HighlightToolbarProps) {
  const [state, setState] = useState<ToolbarState>({
    visible: false,
    x: 0,
    y: 0,
    selText: '',
    highlightKey: null,
  })
  // Re-render toolbar when highlights change (e.g. to update the active-swatch ring).
  const activeKey = state.highlightKey ?? ''
  useHighlights(activeKey)
  const toolbarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function compute(): void {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setState((s) => (s.visible ? { ...s, visible: false } : s))
        return
      }
      const text = sel.toString().trim()
      if (text.length < 2) {
        setState((s) => (s.visible ? { ...s, visible: false } : s))
        return
      }
      const range = sel.getRangeAt(0)
      // Only show the toolbar if the selection is within a highlightable container.
      const container = range.commonAncestorContainer instanceof Element
        ? range.commonAncestorContainer.closest(containerSelector)
        : range.commonAncestorContainer.parentElement?.closest(containerSelector)
      if (!container) {
        setState((s) => (s.visible ? { ...s, visible: false } : s))
        return
      }
      // Find the highlight key: the [data-highlight-key] element whose contents
      // intersect the selection. (Using intersectsNode is robust to selections
      // that begin in a sibling like the verse-number <sup>.)
      let key: string | null = null
      const keyEls = container.querySelectorAll('[data-highlight-key]')
      for (let k = 0; k < keyEls.length; k++) {
        const el = keyEls[k]
        if (range.intersectsNode(el)) {
          key = el.getAttribute('data-highlight-key')
          break
        }
      }
      const rect = range.getBoundingClientRect()
      // Position the toolbar just above the selection, centered.
      const x = rect.left + rect.width / 2
      const y = rect.top - 8
      setState({ visible: true, x, y, selText: text, highlightKey: key })
    }

    // Recompute on selection change + after a small delay (mouseup).
    let t: ReturnType<typeof setTimeout> | null = null
    function debounced(): void {
      if (t) clearTimeout(t)
      t = setTimeout(compute, 10)
    }
    document.addEventListener('selectionchange', debounced)
    document.addEventListener('mouseup', debounced)
    document.addEventListener('scroll', debounced, { passive: true })
    window.addEventListener('resize', debounced)
    return () => {
      if (t) clearTimeout(t)
      document.removeEventListener('selectionchange', debounced)
      document.removeEventListener('mouseup', debounced)
      document.removeEventListener('scroll', debounced)
      window.removeEventListener('resize', debounced)
    }
  }, [containerSelector])

  // Close on Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') setState((s) => (s.visible ? { ...s, visible: false } : s))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  if (!state.visible || !state.highlightKey) return null

  function applyColor(hex: string): void {
    if (!state.highlightKey || !state.selText) return
    addHighlight(state.highlightKey, state.selText, hex)
    // Clear the browser selection so the user sees the highlight apply.
    window.getSelection()?.removeAllRanges()
    setState((s) => ({ ...s, visible: false }))
  }
  function erase(): void {
    if (!state.highlightKey || !state.selText) return
    removeHighlightByText(state.highlightKey, state.selText)
    window.getSelection()?.removeAllRanges()
    setState((s) => ({ ...s, visible: false }))
  }
  function clearAll(): void {
    if (!state.highlightKey) return
    clearHighlights(state.highlightKey)
    window.getSelection()?.removeAllRanges()
    setState((s) => ({ ...s, visible: false }))
  }

  // Clamp the toolbar within the viewport (it's centered on x; width ~340).
  const width = 340
  const left = Math.max(8, Math.min(state.x - width / 2, window.innerWidth - width - 8))
  const top = Math.max(8, state.y - 44)

  return (
    <div
      ref={toolbarRef}
      role="toolbar"
      aria-label="Highlight"
      className="fixed z-[60] flex items-center gap-1 bg-white border border-[#e2e0dc] shadow-xl px-2 py-1.5"
      style={{ left, top, width }}
    >
      <Highlighter className="w-4 h-4 text-[#6b6b6b] mr-1 flex-shrink-0" aria-hidden />
      {COLORS.map((c) => (
        <button
          key={c.hex}
          type="button"
          onClick={() => applyColor(c.hex)}
          aria-label={c.label}
          title={c.label}
          className="w-6 h-6 rounded-full border border-[#00000020] hover:scale-110 transition-transform flex-shrink-0"
          style={{ backgroundColor: c.hex }}
        />
      ))}
      <span className="w-px h-5 bg-[#e2e0dc] mx-1" aria-hidden />
      <button
        type="button"
        onClick={erase}
        aria-label="Remove highlight"
        title="Remove highlight"
        className="w-7 h-7 flex items-center justify-center text-[#6b6b6b] hover:text-[#bf2329] hover:bg-[#f4f1ea] rounded transition-colors"
      >
        <Eraser className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={clearAll}
        aria-label="Clear all highlights"
        title="Clear all highlights"
        className="w-7 h-7 flex items-center justify-center text-[#6b6b6b] hover:text-[#bf2329] hover:bg-[#f4f1ea] rounded transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

export default HighlightToolbar
