'use client'

import { CalendarClock, Video, ExternalLink, Church } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { useLitabibleStore } from '@/lib/store'

const MEET_URL = 'https://meet.google.com/ftb-jjbq-udk'

/**
 * RDV du dimanche page: a centered card displaying the Sunday-meeting
 * visual; the card (and a prominent button) opens the Google Meet link.
 */
export function RdvDimanchePage() {
  const { t } = useT()
  const { goPrevDay, goNextDay } = useLitabibleStore()

  return (
    <section aria-labelledby="rdv-title" className="w-full">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Heading */}
        <div className="text-center">
          <h1 id="rdv-title" className="text-[24px] sm:text-[28px] font-bold uppercase text-[#1a4fa0] tracking-tight">
            {t('rdv.title')}
          </h1>
          <p className="mt-2 text-[14px] text-[#2d2d2d]/80 max-w-2xl mx-auto leading-relaxed">
            {t('rdv.intro')}
          </p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase text-[#1a4fa0]">
            <CalendarClock className="w-4 h-4" />
            {t('rdv.time')}
          </p>
        </div>

        {/* Card with image + Meet link "behind" it (card is clickable) */}
        <a
          href={MEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white border-2 border-[#1a4fa0]/20 hover:border-[#1a4fa0] transition-colors overflow-hidden shadow-lg"
        >
          {/* The joined visual (generated; replace /public/rdv-dimanche.png with the real affiche if desired) */}
          <div className="relative">
            <img
              src="/rdv-dimanche.png"
              alt={t('rdv.card_title')}
              className="w-full max-h-[520px] object-cover"
            />
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-[#1a4fa0] text-white text-[10px] font-bold uppercase px-2.5 py-1.5">
              <Church className="w-3 h-3" />
              LitaBible
            </span>
            <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-[#f5c400] text-[#1a4fa0] text-[10px] font-bold uppercase px-2.5 py-1.5">
              <Video className="w-3 h-3" />
              Google Meet
            </span>
          </div>

          {/* Card body */}
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-[18px] font-bold text-[#1a4fa0] mb-1">{t('rdv.card_title')}</h2>
              <p className="text-[13px] text-[#2d2d2d]/80 leading-relaxed">{t('rdv.card_desc')}</p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-[#6b6b6b] font-semibold">
                {t('rdv.meet_label')}: <span className="text-[#1a4fa0] break-all">{MEET_URL}</span>
              </p>
            </div>
            {/* Join button (yellow) — the link lives "behind" the card */}
            <span className="inline-flex items-center gap-2 bg-[#f5c400] text-[#1a4fa0] font-bold uppercase text-[13px] px-5 py-3 group-hover:bg-[#ffd000] transition-colors flex-shrink-0">
              <Video className="w-4 h-4" />
              {t('rdv.join_btn')}
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </a>

        {/* Auxiliary day navigation (so the page isn't empty of interactivity) */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={goPrevDay}
            className="lt-btn-black !bg-black !text-white text-[11px] px-3 py-1.5"
          >
            {t('lec.move_prev')}
          </button>
          <button
            type="button"
            onClick={goNextDay}
            className="lt-btn-black !bg-black !text-white text-[11px] px-3 py-1.5"
          >
            {t('lec.move_next')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default RdvDimanchePage
