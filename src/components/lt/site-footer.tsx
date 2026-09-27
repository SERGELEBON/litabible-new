'use client'

import { useLitabibleStore } from '@/lib/store'
import { useT } from '@/lib/i18n'
import { RedRibbon } from './red-ribbon'

/** Minimal site footer — sticks to the bottom on short pages, pushed down on long pages. */
export function SiteFooter() {
  const setPage = useLitabibleStore((s) => s.setPage)
  const { t } = useT()

  const socials = [
    {
      label: 'YouTube',
      href: 'https://studio.youtube.com/channel/UCcoPnmSULKkzMi6pCYY-l0A/livestreaming',
      // YouTube glyph
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: 'https://web.facebook.com/profile.php?id=61571734105214',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-white border-t border-[#e2e0dc] mt-auto">
      <div className="flex">
        <RedRibbon className="!h-[44px]" />
        <div className="flex-1 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            <p className="text-[11px] text-[#6b6b6b]">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            {/* Social: YouTube + Facebook */}
            <div className="flex items-center gap-2">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="text-[#1a4fa0] hover:text-[#143d7a] transition-colors p-1.5 rounded-full hover:bg-[#f5c400]/30"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <nav className="flex items-center gap-3 text-[11px] text-[#6b6b6b]">
            <button
              type="button"
              onClick={() => setPage('apropos')}
              className="hover:text-[#1a4fa0] uppercase"
            >
              {t('footer.mentions')}
            </button>
            <span aria-hidden>·</span>
            <button
              type="button"
              onClick={() => setPage('apropos')}
              className="hover:text-[#1a4fa0] uppercase"
            >
              {t('footer.conditions')}
            </button>
            <span aria-hidden>·</span>
            <button
              type="button"
              onClick={() => setPage('contact')}
              className="hover:text-[#1a4fa0] uppercase"
            >
              {t('footer.contact')}
            </button>
          </nav>
        </div>
      </div>
    </footer>
  )
}
