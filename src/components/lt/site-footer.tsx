'use client'

import { useLitabibleStore } from '@/lib/store'
import { RedRibbon } from './red-ribbon'

/** Minimal site footer — sticks to the bottom on short pages, pushed down on long pages. */
export function SiteFooter() {
  const setPage = useLitabibleStore((s) => s.setPage)
  return (
    <footer className="bg-white border-t border-[#e2e0dc] mt-auto">
      <div className="flex">
        <RedRibbon className="!h-[40px]" />
        <div className="flex-1 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1400px] mx-auto">
          <p className="text-[11px] text-[#6b6b6b]">
            © {new Date().getFullYear()} LitaBible — La Bible et les lectures du jour au quotidien. Tous droits réservés.
          </p>
          <nav className="flex items-center gap-3 text-[11px] text-[#6b6b6b]">
            <button type="button" onClick={() => setPage('apropos')} className="hover:text-[#0e7c66] uppercase">Mentions légales</button>
            <span aria-hidden>·</span>
            <button type="button" onClick={() => setPage('apropos')} className="hover:text-[#0e7c66] uppercase">Conditions</button>
            <span aria-hidden>·</span>
            <button type="button" onClick={() => setPage('contact')} className="hover:text-[#0e7c66] uppercase">Contact</button>
          </nav>
        </div>
      </div>
    </footer>
  )
}
