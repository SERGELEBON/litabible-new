'use client'

import { cn } from '@/lib/utils'
import type { Reading } from '@/data/types'
import { Download, Type } from 'lucide-react'
import { useT, localizedReadingLabel, localizedConclusion } from '@/lib/i18n'
import { HighlightedText } from './highlighted-text'
import { HighlightToolbar } from './highlight-toolbar'

interface ReadingPanelProps {
  title: string
  readings: Reading[]
  className?: string
  /** extra badges row above title (e.g. download .doc / A+ lecture confort) */
  showBadges?: boolean
  /** When provided, text in the readings becomes highlightable (color markers)
   *  and a floating toolbar appears on selection. e.g. `mass:2026-09-27`. */
  highlightKeyPrefix?: string
}

/**
 * Right panel: full text of the readings for the day.
 * Each reading block = red uppercase label → citation+reference → italic source → body → conclusion.
 * When `highlightKeyPrefix` is set, every paragraph is wrapped in <HighlightedText>
 * (persistent color markers via localStorage) and a floating HighlightToolbar is mounted.
 */
export function ReadingPanel({ title, readings, className, showBadges = true, highlightKeyPrefix }: ReadingPanelProps) {
  const { t, locale } = useT()
  return (
    <div className={cn('flex flex-col', className)}>
      {showBadges && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <button
            type="button"
            className="lt-badge inline-flex items-center gap-1.5 px-2.5 py-1.5"
            title={t('mass.download_doc')}
          >
            <Download className="w-3 h-3" />
            <span className="leading-tight">
              <span className="block">{t('mass.download_short')}</span>
              <span className="block">{t('mass.download_long')}</span>
            </span>
          </button>
          <button
            type="button"
            className="lt-badge inline-flex items-center gap-1.5 px-2.5 py-1.5"
            title={t('mass.confort')}
          >
            <Type className="w-3 h-3" />
            <span className="leading-tight text-[12px]">
              <span className="block">A+</span>
              <span className="block">{t('mass.confort_short')}</span>
            </span>
          </button>
        </div>
      )}

      <h1 className="text-[21px] font-medium uppercase text-[#333] mb-5 tracking-tight">
        {title}
      </h1>

      <div className="flex flex-col gap-7">
        {readings.map((r, i) => (
          <ReadingBlock
            key={`${r.type}-${i}`}
            reading={r}
            index={i}
            highlightKeyPrefix={highlightKeyPrefix}
            localizedLabel={localizedReadingLabel(r.type, t) || r.label}
            conclusion={
              r.conclusion ? localizedConclusion(r.conclusion, locale) : r.conclusion
            }
          />
        ))}
      </div>

      {/* Floating color-marker toolbar (only active when highlightKeyPrefix is set) */}
      {highlightKeyPrefix && <HighlightToolbar containerSelector="[data-highlightable]" />}
    </div>
  )
}

function ReadingBlock({
  reading: r,
  index,
  highlightKeyPrefix,
  localizedLabel,
  conclusion,
}: {
  reading: Reading
  index: number
  highlightKeyPrefix?: string
  localizedLabel: string
  conclusion?: string
}) {
  const hl = (sub: string) =>
    highlightKeyPrefix ? `${highlightKeyPrefix}:${index}:${sub}` : undefined
  const canHighlight = Boolean(highlightKeyPrefix)

  // Alleluia is rendered centered in a box.
  if (r.type === 'alleluia') {
    return (
      <div className="border border-[#e2e0dc] bg-[#f8f7f4] p-5 text-center" data-highlightable={canHighlight || undefined}>
        <p className="text-[10px] font-bold uppercase text-[#1a4fa0] mb-2">{localizedLabel}</p>
        {r.content?.map((p, idx) => (
          <p key={idx} className="text-[16px] font-semibold text-[#333] italic">
            {hl(`a${idx}`) ? <HighlightedText text={p} highlightKey={hl(`a${idx}`)!} /> : p}
          </p>
        ))}
      </div>
    )
  }

  // Psalm
  if (r.type === 'psaume') {
    return (
      <article className="lt-reading-text" data-highlightable={canHighlight || undefined}>
        <h4 className="text-[17px] font-bold uppercase text-[#1a4fa0] mb-1">{localizedLabel}</h4>
        {r.reference && (
          <h5 className="text-[14px] font-bold text-[#333] mb-3">{r.reference}</h5>
        )}
        {r.refrain && (
          <p className="font-bold text-[#333] mb-3 text-[16px]">{r.refrain}</p>
        )}
        {r.strophes?.map((s, idx) => (
          <p key={idx} className="mb-2 text-[16px] text-[#333]">
            {s.number && <span className="font-bold mr-2 text-[#1a4fa0]">{s.number}</span>}
            {hl(`ps${idx}`) ? <HighlightedText text={s.text} highlightKey={hl(`ps${idx}`)!} /> : s.text}
          </p>
        ))}
        {r.content?.map((p, idx) => (
          <p key={`c-${idx}`} className="mb-2 text-[16px] text-[#333]">
            {hl(`pc${idx}`) ? <HighlightedText text={p} highlightKey={hl(`pc${idx}`)!} /> : p}
          </p>
        ))}
        {r.refrain && <p className="font-bold text-[#333] mt-3 text-[16px]">{r.refrain}</p>}
      </article>
    )
  }

  // Hymn
  if (r.type === 'hymne') {
    return (
      <article className="lt-reading-text" data-highlightable={canHighlight || undefined}>
        <h4 className="text-[17px] font-bold uppercase text-[#1a4fa0] mb-1">{localizedLabel}</h4>
        {r.reference && (
          <h5 className="text-[14px] font-bold text-[#333] mb-3">{r.reference}</h5>
        )}
        {r.author && <p className="lt-source mb-3">{r.author}</p>}
        {r.content?.map((p, idx) => (
          <p key={idx} className="mb-2 text-[16px] text-[#333] italic">
            {hl(`h${idx}`) ? <HighlightedText text={p} highlightKey={hl(`h${idx}`)!} /> : p}
          </p>
        ))}
      </article>
    )
  }

  // Standard reading / gospel / patristic
  return (
    <article className="lt-reading-text" data-highlightable={canHighlight || undefined}>
      <h4 className="text-[17px] font-bold uppercase text-[#1a4fa0] mb-1">{localizedLabel}</h4>
      {r.citation && (
        <h5 className="text-[14px] font-bold text-[#333] mb-2">{r.citation}</h5>
      )}
      {r.reference && !r.citation && (
        <h5 className="text-[14px] font-bold text-[#333] mb-2">{r.reference}</h5>
      )}
      {r.source && <p className="lt-source mb-3">{r.source}</p>}
      {!r.source && r.title && <p className="lt-source mb-3">{r.title}</p>}
      {r.content?.map((p, idx) => (
        <p key={idx} className="mb-3 text-[17px] text-[#333] leading-[1.75]">
          {hl(`s${idx}`) ? <HighlightedText text={p} highlightKey={hl(`s${idx}`)!} /> : p}
        </p>
      ))}
      {conclusion && (
        <p className="font-semibold text-[#333] mt-2 text-[17px]">{conclusion}</p>
      )}
      {r.patristicSource && (
        <p className="lt-source mt-3">{r.patristicSource}</p>
      )}
    </article>
  )
}
