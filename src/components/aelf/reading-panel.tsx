'use client'

import { cn } from '@/lib/utils'
import type { Reading } from '@/data/types'
import { Download, Type } from 'lucide-react'

interface ReadingPanelProps {
  title: string
  readings: Reading[]
  className?: string
  /** extra badges row above title (e.g. download .doc / A+ lecture confort) */
  showBadges?: boolean
}

/**
 * Right panel: full text of the readings for the day.
 * Each reading block = red uppercase label → citation+reference → italic source → body → conclusion.
 */
export function ReadingPanel({ title, readings, className, showBadges = true }: ReadingPanelProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {showBadges && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <button
            type="button"
            className="aelf-badge-red inline-flex items-center gap-1.5 px-2.5 py-1.5"
            title="Télécharger les textes (.doc)"
          >
            <Download className="w-3 h-3" />
            <span className="leading-tight">
              <span className="block">Télécharger</span>
              <span className="block">les textes (.doc)</span>
            </span>
          </button>
          <button
            type="button"
            className="aelf-badge-red inline-flex items-center gap-1.5 px-2.5 py-1.5"
            title="A+ Lecture confort"
          >
            <Type className="w-3 h-3" />
            <span className="leading-tight text-[12px]">
              <span className="block">A+ Lecture</span>
              <span className="block">confort</span>
            </span>
          </button>
        </div>
      )}

      <h1 className="text-[21px] font-medium uppercase text-[#333] mb-5 tracking-tight">
        {title}
      </h1>

      <div className="flex flex-col gap-7">
        {readings.map((r, i) => (
          <ReadingBlock key={`${r.type}-${i}`} reading={r} />
        ))}
      </div>
    </div>
  )
}

function ReadingBlock({ reading: r }: { reading: Reading }) {
  // Alleluia is rendered centered in a box.
  if (r.type === 'alleluia') {
    return (
      <div className="border border-[#e2e0dc] bg-[#f8f7f4] p-5 text-center">
        {r.label && (
          <p className="text-[10px] font-bold uppercase text-[#bf2329] mb-2">{r.label}</p>
        )}
        {r.content?.map((p, idx) => (
          <p key={idx} className="text-[16px] font-semibold text-[#333] italic">
            {p}
          </p>
        ))}
      </div>
    )
  }

  // Psalm
  if (r.type === 'psaume') {
    return (
      <article className="aelf-reading-text">
        <h4 className="text-[17px] font-bold uppercase text-[#bf2329] mb-1">{r.label}</h4>
        {r.reference && (
          <h5 className="text-[14px] font-bold text-[#333] mb-3">{r.reference}</h5>
        )}
        {r.refrain && (
          <p className="font-bold text-[#333] mb-3 text-[16px]">{r.refrain}</p>
        )}
        {r.strophes?.map((s, idx) => (
          <p key={idx} className="mb-2 text-[16px] text-[#333]">
            {s.number && <span className="font-bold mr-2 text-[#bf2329]">{s.number}</span>}
            {s.text}
          </p>
        ))}
        {r.content?.map((p, idx) => (
          <p key={`c-${idx}`} className="mb-2 text-[16px] text-[#333]">{p}</p>
        ))}
        {r.refrain && <p className="font-bold text-[#333] mt-3 text-[16px]">{r.refrain}</p>}
      </article>
    )
  }

  // Hymn
  if (r.type === 'hymne') {
    return (
      <article className="aelf-reading-text">
        <h4 className="text-[17px] font-bold uppercase text-[#bf2329] mb-1">{r.label}</h4>
        {r.reference && (
          <h5 className="text-[14px] font-bold text-[#333] mb-3">{r.reference}</h5>
        )}
        {r.author && <p className="aelf-source mb-3">{r.author}</p>}
        {r.content?.map((p, idx) => (
          <p key={idx} className="mb-2 text-[16px] text-[#333] italic">{p}</p>
        ))}
      </article>
    )
  }

  // Standard reading / gospel / patristic
  return (
    <article className="aelf-reading-text">
      <h4 className="text-[17px] font-bold uppercase text-[#bf2329] mb-1">{r.label}</h4>
      {r.citation && (
        <h5 className="text-[14px] font-bold text-[#333] mb-2">{r.citation}</h5>
      )}
      {r.reference && !r.citation && (
        <h5 className="text-[14px] font-bold text-[#333] mb-2">{r.reference}</h5>
      )}
      {r.source && <p className="aelf-source mb-3">{r.source}</p>}
      {!r.source && r.title && <p className="aelf-source mb-3">{r.title}</p>}
      {r.content?.map((p, idx) => (
        <p key={idx} className="mb-3 text-[17px] text-[#333] leading-[1.75]">{p}</p>
      ))}
      {r.conclusion && (
        <p className="font-semibold text-[#333] mt-2 text-[17px]">{r.conclusion}</p>
      )}
      {r.patristicSource && (
        <p className="aelf-source mt-3">Source : {r.patristicSource}</p>
      )}
    </article>
  )
}
