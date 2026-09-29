'use client'

import { useMemo } from 'react'
import { Printer, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { useT, localizedReadingLabel, localizedConclusion } from '@/lib/i18n'
import { useLitabibleStore } from '@/lib/store'
import { getMassData } from '@/data/mass-readings'
import { getDayInfo } from '@/data/liturgical-calendar'
import { LiturgicalBadge } from '../liturgical-badge'

const WEEKDAYS = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
} as const

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
} as const

function formatLongDate(iso: string, locale: 'en' | 'fr' | 'es'): string {
  const d = new Date(iso + 'T00:00:00')
  const wd = WEEKDAYS[locale][d.getDay()]
  const mo = MONTHS[locale][d.getMonth()]
  const day = d.getDate()
  const year = d.getFullYear()
  return `${wd} ${day} ${mo} ${year}`
}

/**
 * Daily reading poster page: a single-sheet "affiche" of the day's mass
 * readings — date, liturgical colour, and each reading's label / reference /
 * source / body / conclusion. Styled like a printable poster with print +
 * download actions.
 */
export function LectureQuotidiennePage() {
  const { t, locale } = useT()
  const selectedDate = useLitabibleStore((s) => s.selectedDate)
  const goPrevDay = useLitabibleStore((s) => s.goPrevDay)
  const goNextDay = useLitabibleStore((s) => s.goNextDay)

  const mass = useMemo(() => getMassData(selectedDate), [selectedDate])
  const dayInfo = useMemo(
    () => mass?.dayInfo ?? getDayInfo(selectedDate),
    [mass, selectedDate],
  )

  const dateStr = formatLongDate(selectedDate, locale)

  return (
    <section aria-labelledby="lec-title" className="w-full">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {/* Page heading + actions */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 id="lec-title" className="text-[24px] sm:text-[28px] font-bold uppercase text-[#1a4fa0] tracking-tight">
              {t('lec.title')}
            </h1>
            <p className="text-[13px] text-[#2d2d2d]/70 mt-0.5">{t('lec.intro')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="lt-btn-black !bg-[#1a4fa0] !text-white text-[11px] px-3 py-2 inline-flex items-center gap-1.5 hover:!bg-[#143d7a]"
            >
              <Printer className="w-3.5 h-3.5" />
              {t('lec.print')}
            </button>
            <button
              type="button"
              className="lt-btn-black !bg-[#1a4fa0] !text-white text-[11px] px-3 py-2 inline-flex items-center gap-1.5 hover:!bg-[#143d7a]"
            >
              <Download className="w-3.5 h-3.5" />
              {t('lec.download')}
            </button>
          </div>
        </div>

        {/* Day navigation */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={goPrevDay}
            className="inline-flex items-center gap-1 text-[12px] uppercase font-semibold text-[#1a4fa0] hover:text-[#143d7a]"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('lec.move_prev')}
          </button>
          <span className="text-[12px] uppercase tracking-wide text-[#6b6b6b] font-semibold">
            {t('lec.date_label')}: <span className="text-[#1a4fa0]">{dateStr}</span>
          </span>
          <button
            type="button"
            onClick={goNextDay}
            className="inline-flex items-center gap-1 text-[12px] uppercase font-semibold text-[#1a4fa0] hover:text-[#143d7a]"
          >
            {t('lec.move_next')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* The poster card */}
        <article className="bg-white border-2 border-[#1a4fa0]/15 shadow-xl print:shadow-none print:border-0">
          {/* Poster header band (blue) */}
          <header className="bg-[#1a4fa0] text-white px-5 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <img src="/favicon.svg" alt="LitaBible" className="h-7 w-7" />
              <div>
                <p className="text-[16px] font-bold leading-tight">LitaBible</p>
                <p className="text-[10px] uppercase tracking-wide text-white/70 leading-tight">
                  {t('lec.title')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[15px] font-bold leading-tight">{dateStr}</p>
              {dayInfo.liturgicalTime && (
                <p className="text-[10px] uppercase tracking-wide text-white/70 leading-tight">
                  {dayInfo.liturgicalTime}
                </p>
              )}
            </div>
          </header>

          {/* Day info band */}
          <div className="flex items-center gap-3 px-5 py-3 bg-[#1a4fa0]/15 border-b border-[#e2e0dc]">
            <LiturgicalBadge color={dayInfo.color} filled={dayInfo.colorFilled} size={18} />
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-[#1a4fa0] leading-tight">
                {dayInfo.dayName}
              </p>
              {(dayInfo.psalterWeek || dayInfo.year) && (
                <p className="text-[11px] text-[#6b6b6b] leading-tight">
                  {[dayInfo.psalterWeek, dayInfo.year].filter(Boolean).join(' · ')}
                </p>
              )}
              {dayInfo.feast && (
                <p className="text-[12px] text-[#2d2d2d] italic leading-tight mt-0.5">
                  {dayInfo.feast}
                </p>
              )}
            </div>
          </div>

          {/* Readings body */}
          <div className="px-5 py-5 flex flex-col gap-5">
            {mass?.readings?.length ? (
              mass.readings.map((r, i) => (
                <ReadingBlock
                  key={`${r.type}-${i}`}
                  type={r.type}
                  reference={r.reference}
                  citation={r.citation}
                  source={r.source ?? r.title}
                  content={r.content}
                  conclusion={r.conclusion}
                  refrain={r.refrain}
                  strophes={r.strophes}
                  t={t}
                  locale={locale}
                />
              ))
            ) : (
              <p className="text-center text-[14px] text-[#6b6b6b] italic">
                {t('lec.no_reading')}
              </p>
            )}
          </div>

          {/* Poster footer band (yellow) */}
          <footer className="bg-[#1a4fa0] text-white px-5 py-2.5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wide">
              LitaBible · {t('lec.title')}
            </span>
            <span className="text-[10px] uppercase tracking-wide opacity-70">
              {dateStr}
            </span>
          </footer>
        </article>

        {locale !== 'fr' && (
          <p className="text-[11px] italic text-[#6b6b6b] text-center">
            {t('mass.french_note')}
          </p>
        )}
      </div>
    </section>
  )
}

interface ReadingBlockProps {
  type: import('@/data/types').ReadingType
  reference?: string
  citation?: string
  source?: string
  content?: string[]
  conclusion?: string
  refrain?: string
  strophes?: { number?: string; text: string }[]
  t: (k: string, v?: Record<string, string | number>) => string
  locale: 'en' | 'fr' | 'es'
}

function ReadingBlock({
  type,
  reference,
  citation,
  source,
  content,
  conclusion,
  refrain,
  strophes,
  t,
  locale,
}: ReadingBlockProps) {
  const label = localizedReadingLabel(type, t)

  // Alleluia: centered box
  if (type === 'alleluia') {
    return (
      <div className="border-l-4 border-[#1a4fa0] bg-[#1a4fa0]/10 px-4 py-3 text-center">
        {label && (
          <p className="text-[10px] font-bold uppercase text-[#1a4fa0] mb-1">{label}</p>
        )}
        {content?.map((p, i) => (
          <p key={i} className="text-[14px] font-semibold italic text-[#1a4fa0]">
            {p}
          </p>
        ))}
      </div>
    )
  }

  // Psalm
  if (type === 'psaume') {
    return (
      <article>
        <h4 className="text-[14px] font-bold uppercase text-[#1a4fa0] mb-0.5">{label}</h4>
        {reference && <p className="text-[12px] font-bold text-[#2d2d2d] mb-2">{reference}</p>}
        {refrain && (
          <p className="font-bold text-[#2d2d2d] mb-2 text-[14px]">{refrain}</p>
        )}
        {strophes?.map((s, i) => (
          <p key={i} className="mb-1.5 text-[14px] text-[#2d2d2d] leading-snug">
            {s.number && <span className="font-bold mr-2 text-[#1a4fa0]">{s.number}</span>}
            {s.text}
          </p>
        ))}
        {refrain && <p className="font-bold text-[#2d2d2d] mt-2 text-[14px]">{refrain}</p>}
      </article>
    )
  }

  // Standard reading / gospel
  return (
    <article>
      <h4 className="text-[14px] font-bold uppercase text-[#1a4fa0] mb-0.5">{label}</h4>
      {(citation || reference) && (
        <p className="text-[12px] font-bold text-[#2d2d2d] mb-1">{citation ?? reference}</p>
      )}
      {source && <p className="text-[12px] italic text-[#6b6b6b] mb-1.5">{source}</p>}
      {content?.map((p, i) => (
        <p key={i} className="mb-1.5 text-[14px] text-[#2d2d2d] leading-relaxed">
          {p}
        </p>
      ))}
      {conclusion && (
        <p className="font-semibold text-[#1a4fa0] mt-1 text-[14px]">
          {localizedConclusion(conclusion, locale)}
        </p>
      )}
    </article>
  )
}

export default LectureQuotidiennePage
