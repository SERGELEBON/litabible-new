'use client'

import { MessageCircle } from 'lucide-react'

/**
 * Floating WhatsApp contact button (bottom-right, always visible).
 * Uses the standard wa.me deep-link. Replace the number below with the
 * project's real WhatsApp Business number.
 */
export function WhatsAppButton() {
  const phone = '22800000000' // TODO: replace with the real WhatsApp Business number
  const message = encodeURIComponent('Bonjour LitaBible, je vous contacte depuis le site.')
  const href = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      title="Contacter sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg text-white transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      style={{ backgroundColor: '#25D366' }}
    >
      {/* WhatsApp glyph */}
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.24 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.05-3.75zm7.07 18.13c-.3.85-1.74 1.62-2.4 1.72-.62.1-1.4.13-2.27-.14-.52-.16-1.19-.4-2.05-.78-3.6-1.56-5.95-5.18-6.13-5.42-.18-.24-1.46-1.94-1.46-3.7 0-1.76.92-2.63 1.25-2.99.33-.36.72-.45.96-.45.24 0 .48 0 .69.01.22.01.52-.08.81.62.3.72 1.02 2.48 1.11 2.66.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.36.37-.16.73.2.36.88 1.45 1.89 2.35 1.3 1.16 2.4 1.52 2.76 1.7.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1 1 2.46 1.18.36.18.6.27.69.42.09.15.09.87-.21 1.72z"/>
      </svg>
      {/* Live presence dot */}
      <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#f5c400] border-2 border-white" aria-hidden />
    </a>
  )
}

/** Re-export for convenience. */
export { WhatsAppButton as default }
