'use client'

import { useMemo } from 'react'
import { useHighlights, buildSegments } from '@/lib/highlights'

interface HighlightedTextProps {
  /** The plain text to render (e.g. a verse's text). */
  text: string
  /** Stable highlight key (e.g. "bible:BSB:1:1:3"). */
  highlightKey: string
  className?: string
}

/**
 * Renders `text` with any saved highlights wrapped in colored <mark> runs.
 * Used everywhere Bible/reading text is shown so users can highlight
 * selected passages and see them persist (localStorage).
 */
export function HighlightedText({ text, highlightKey, className }: HighlightedTextProps) {
  const highlights = useHighlights(highlightKey)
  const segments = useMemo(() => buildSegments(text, highlights), [text, highlights])

  if (segments.length === 1 && !segments[0].color) {
    // Fast path: no highlights — just the plain text.
    return <span className={className} data-highlight-key={highlightKey}>{text}</span>
  }

  return (
    <span className={className} data-highlight-key={highlightKey}>
      {segments.map((seg, i) =>
        seg.color ? (
          <mark
            key={i}
            style={{ backgroundColor: seg.color, color: '#1a1a1a', borderRadius: '1px', padding: '0 1px' }}
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </span>
  )
}

export default HighlightedText
