'use client'

import { useState } from 'react'
import { Mail, Twitter, Rss, Code2, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BlackButton } from './black-button'
import { useToast } from '@/hooks/use-toast'
import { useT, LOCALES } from '@/lib/i18n'
import { useLitabibleStore } from '@/lib/store'
import { cn } from '@/lib/utils'

/** Compact 3-button language switcher (EN | FR | ES) for the header. */
function LanguageSwitcher() {
  const locale = useLitabibleStore((s) => s.locale)
  const setLocale = useLitabibleStore((s) => s.setLocale)
  const { t } = useT()
  return (
    <div
      className="inline-flex items-center border border-[#1a4fa0]/40 rounded-full overflow-hidden"
      role="group"
      aria-label={t('header.lang_label')}
    >
      {LOCALES.map((l) => {
        const active = l.code === locale
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            aria-pressed={active}
            aria-label={l.name}
            title={l.name}
            className={cn(
              'px-2.5 py-1 text-[11px] font-bold tracking-wide transition-colors',
              active
                ? 'bg-[#1a4fa0] text-white'
                : 'bg-transparent text-[#1a4fa0] hover:bg-[#1a4fa0]/15',
            )}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}

/** Top site header: logo + tagline (left), subscribe block (right), social icons row. */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const { toast } = useToast()
  const { t } = useT()

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      toast({
        title: t('header.invalid_email_title'),
        description: t('header.invalid_email_desc'),
        variant: 'destructive',
      })
      return
    }
    toast({
      title: t('header.subscribe_ok_title'),
      description: t('header.subscribe_ok_desc', { email }),
    })
    setEmail('')
    setOpen(false)
  }

  return (
    <header className="bg-[#f5c400] w-full">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 max-w-[1400px] mx-auto">
        {/* Logo + tagline */}
        <div className="flex items-center gap-3 min-w-0">
          <img src="/litabible-logo.svg" alt="LitaBible" className="h-9 sm:h-10 w-auto flex-shrink-0" />
          <p className="hidden sm:block text-[11px] leading-tight text-[#1a4fa0] max-w-[230px] border-l border-[#1a4fa0]/30 pl-3">
            {t('header.tagline')}
          </p>
        </div>

        {/* Subscribe block + language switcher */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <div className="hidden md:block text-right">
            <p className="text-[13px] font-bold text-[#1a4fa0] leading-tight">
              {t('header.subscribe_line1')}
            </p>
            <p className="text-[13px] font-bold text-[#1a4fa0] leading-tight">
              {t('header.subscribe_line2')}
            </p>
          </div>
          <BlackButton
            size="md"
            onClick={() => setOpen(true)}
            className="hidden sm:inline-flex !bg-[#1a4fa0] !text-white hover:!bg-[#143d7a]"
          >
            {t('header.subscribe_btn')}
          </BlackButton>
          <BlackButton
            size="sm"
            onClick={() => setOpen(true)}
            className="sm:hidden !bg-[#1a4fa0] !text-white hover:!bg-[#143d7a]"
          >
            {t('header.subscribe_btn')}
          </BlackButton>
        </div>
      </div>

      {/* Social / quick-links row */}
      <div className="px-4 sm:px-6 pb-2 flex items-center justify-center gap-4 max-w-[1400px] mx-auto">
        {[
          { icon: Mail, key: 'header.social.email', href: '#contact' },
          { icon: Twitter, key: 'header.social.twitter', href: 'https://twitter.com' },
          { icon: Rss, key: 'header.social.rss', href: '#' },
          { icon: Code2, key: 'header.social.api', href: '#' },
        ].map(({ icon: Icon, key, href }) => {
          const label = t(key)
          return (
            <a
              key={key}
              href={href}
              title={label}
              aria-label={label}
              className="text-[#1a4fa0]/70 hover:text-[#143d7a] transition-colors p-1"
            >
              <Icon className="w-4 h-4" />
            </a>
          )
        })}
      </div>

      {/* Subscribe dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="uppercase text-[15px] font-semibold text-[#1a4fa0]">
              {t('header.sub_dialog_title')}
            </DialogTitle>
            <DialogDescription className="text-[#333333]">
              {t('header.sub_dialog_desc')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sub-email" className="text-[13px] font-bold text-[#333]">
                {t('header.sub_email_label')}
              </Label>
              <Input
                id="sub-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('header.sub_email_ph')}
                className="bg-[#f8f7f4] border-[#ccc] rounded-none"
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <DialogClose asChild>
                <BlackButton variant="solid" size="md" type="button">
                  {t('header.sub_cancel')}
                </BlackButton>
              </DialogClose>
              <BlackButton variant="solid" size="md" type="submit">
                {t('header.sub_confirm')}
              </BlackButton>
            </div>
          </form>
          <DialogClose className="absolute top-3 right-3 text-[#6b6b6b] hover:text-[#1a4fa0]">
            <X className="w-4 h-4" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </header>
  )
}
