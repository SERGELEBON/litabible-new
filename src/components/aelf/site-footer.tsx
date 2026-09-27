'use client'

import { useAelfStore } from '@/lib/store'
import { RedRibbon } from './red-ribbon'

/** Minimal site footer — sticks to the bottom on short pages, pushed down on long pages. */
export function SiteFooter() {
  const setPage = useAelfStore((s) => s.setPage)
  return (
    <footer className="bg-white border-t border-[#e2e0dc] mt-auto">
      <div className="flex">
        <RedRibbon className="!h-[40px]" />
        <div className="flex-1 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1400px] mx-auto">
          <p className="text-[11px] text-[#6b6b6b]">
            © {new Date().getFullYear()} AELF — Association Épiscopale Liturgique pour les pays Francophones.
            Textes liturgiques © AELF. Tous droits réservés.
          </p>
          <nav className="flex items-center gap-3 text-[11px] text-[#6b6b6b]">
            <button type="button" onClick={() => setPage('aelf')} className="hover:text-[#bf2329] uppercase">Mentions légales</button>
            <span aria-hidden>·</span>
            <button type="button" onClick={() => setPage('aelf')} className="hover:text-[#bf2329] uppercase">Conditions</button>
            <span aria-hidden>·</span>
            <button type="button" onClick={() => setPage('contact')} className="hover:text-[#bf2329] uppercase">Contact</button>
          </nav>
        </div>
      </div>
    </footer>
  )
}
