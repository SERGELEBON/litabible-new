'use client'

import { useEffect, useRef, useState } from 'react'
import { useLitabibleStore } from '@/lib/store'
import { X, MessageCircle } from 'lucide-react'

type Locale = 'en' | 'fr' | 'es'

// Self-contained translations for the WhatsApp contact menu.
const STR: Record<Locale, { title: string; close: string; options: { n: number; label: string }[] }> = {
  en: {
    title: 'How can we help you?',
    close: 'Close',
    options: [
      { n: 1, label: 'I have a question' },
      { n: 2, label: 'I really have a problem' },
      { n: 3, label: 'I want help reading the Bible' },
      { n: 4, label: 'Other need' },
    ],
  },
  fr: {
    title: 'Comment pouvons-nous vous aider ?',
    close: 'Fermer',
    options: [
      { n: 1, label: "J'ai une question" },
      { n: 2, label: 'J\u2019ai v\u00e9ritablement un probl\u00e8me' },
      { n: 3, label: "Je veux de l'aide pour lire la Bible" },
      { n: 4, label: 'Autre besoin' },
    ],
  },
  es: {
    title: '¿Cómo podemos ayudarle?',
    close: 'Cerrar',
    options: [
      { n: 1, label: 'Tengo una pregunta' },
      { n: 2, label: 'Tengo realmente un problema' },
      { n: 3, label: 'Quiero ayuda para leer la Biblia' },
      { n: 4, label: 'Otra necesidad' },
    ],
  },
}

// --- Targets ---
// The shared WhatsApp community chat invite link (options 1 & 3).
const CHAT_LINK =
  'https://chat.whatsapp.com/FqfCHONoSsP6JU9Bf1nUZ8?s=cl&p=a&mlu=4&ilr=4&iam=1'
// Direct-chat phone number (options 2 & 4).
// International format required by wa.me: country code 225 (Côte d'Ivoire), no '+'.
const PHONE = '2250778254286'

interface MenuOption {
  n: number
  label: string
  href: string
}

/**
 * Floating WhatsApp contact button. On click it opens a small menu with 4
 * options; each option routes to either the shared community chat invite
 * link (options 1 & 3) or a direct 1-to-1 chat with the phone number
 * +225 07 78 25 42 86 (options 2 & 4).
 */
export function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const locale = useLitabibleStore((s) => s.locale) as Locale
  const t = STR[locale] ?? STR.en

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  const options: MenuOption[] = t.options.map((o) => {
    // Options 1 & 3 → community chat invite; options 2 & 4 → direct phone chat.
    const href = o.n === 1 || o.n === 3 ? CHAT_LINK : `https://wa.me/${PHONE}`
    return { ...o, href }
  })

  return (
    <div ref={wrapRef} className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Menu card */}
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp menu"
          className="w-[280px] max-w-[calc(100vw-2.5rem)] bg-white border border-[#e2e0dc] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#25D366] text-white px-4 py-3">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.24 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.05-3.75zm7.07 18.13c-.3.85-1.74 1.62-2.4 1.72-.62.1-1.4.13-2.27-.14-.52-.16-1.19-.4-2.05-.78-3.6-1.56-5.95-5.18-6.13-5.42-.18-.24-1.46-1.94-1.46-3.7 0-1.76.92-2.63 1.25-2.99.33-.36.72-.45.96-.45.24 0 .48 0 .69.01.22.01.52-.08.81.62.3.72 1.02 2.48 1.11 2.66.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.36.37-.16.73.2.36.88 1.45 1.89 2.35 1.3 1.16 2.4 1.52 2.76 1.7.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1 1 2.46 1.18.36.18.6.27.69.42.09.15.09.87-.21 1.72z"/>
              </svg>
              <span className="text-[15px] font-bold uppercase tracking-wide">{t.title}</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="text-white/90 hover:text-white p-1 -mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Options */}
          <ul className="flex flex-col">
            {options.map((o) => (
              <li key={o.n}>
                <a
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 px-4 py-3 border-b border-[#eeece8] last:border-b-0 hover:bg-[#1a4fa0]/15 transition-colors group"
                >
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#25D366] text-white text-[14px] font-bold rounded-full">
                    {o.n}
                  </span>
                  <span className="text-[16px] text-[#2d2d2d] group-hover:text-[#1a4fa0] leading-snug">
                    {o.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Floating WhatsApp button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="WhatsApp"
        aria-expanded={open}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg text-white transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.24 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.05-3.75zm7.07 18.13c-.3.85-1.74 1.62-2.4 1.72-.62.1-1.4.13-2.27-.14-.52-.16-1.19-.4-2.05-.78-3.6-1.56-5.95-5.18-6.13-5.42-.18-.24-1.46-1.94-1.46-3.7 0-1.76.92-2.63 1.25-2.99.33-.36.72-.45.96-.45.24 0 .48 0 .69.01.22.01.52-.08.81.62.3.72 1.02 2.48 1.11 2.66.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.36.37-.16.73.2.36.88 1.45 1.89 2.35 1.3 1.16 2.4 1.52 2.76 1.7.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1 1 2.46 1.18.36.18.6.27.69.42.09.15.09.87-.21 1.72z"/>
        </svg>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#1a4fa0] border-2 border-white" aria-hidden />
        )}
      </button>
    </div>
  )
}

export { WhatsAppButton as default }
