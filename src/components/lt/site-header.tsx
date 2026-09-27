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

/** Top site header: logo + tagline (left), subscribe block (right), social icons row. */
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      toast({ title: 'Courriel invalide', description: 'Veuillez saisir une adresse valide.', variant: 'destructive' })
      return
    }
    toast({ title: 'Inscription confirmée', description: `Les lectures du jour seront envoyées à ${email}.` })
    setEmail('')
    setOpen(false)
  }

  return (
    <header className="bg-white border-b border-[#e2e0dc] w-full">
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 max-w-[1400px] mx-auto">
        {/* Logo + tagline */}
        <div className="flex items-center gap-3 min-w-0">
          <img src="/litabible-logo.svg" alt="LitaBible" className="h-9 sm:h-10 w-auto flex-shrink-0" />
          <p className="hidden sm:block text-[11px] leading-tight text-[#6b6b6b] max-w-[230px] border-l border-[#e2e0dc] pl-3">
            La Bible et les lectures du jour au quotidien
          </p>
        </div>

        {/* Subscribe block */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-[13px] font-bold text-black leading-tight">
              Recevez gratuitement les lectures
            </p>
            <p className="text-[13px] font-bold text-black leading-tight">du jour par courriel</p>
          </div>
          <BlackButton size="md" onClick={() => setOpen(true)} className="hidden sm:inline-flex">
            S&apos;abonner
          </BlackButton>
          <BlackButton size="sm" onClick={() => setOpen(true)} className="sm:hidden">
            S&apos;abonner
          </BlackButton>
        </div>
      </div>

      {/* Social / quick-links row */}
      <div className="px-4 sm:px-6 pb-2 flex items-center justify-center gap-4 max-w-[1400px] mx-auto">
        {[
          { icon: Mail, label: 'Courriel', href: '#contact' },
          { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
          { icon: Rss, label: 'RSS', href: '#' },
          { icon: Code2, label: 'API', href: '#' },
        ].map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            title={label}
            aria-label={label}
            className="text-[#9a9a9a] hover:text-[#0e7c66] transition-colors p-1"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>

      {/* Subscribe dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="uppercase text-[15px] font-semibold text-[#0e7c66]">
              Recevoir les lectures du jour
            </DialogTitle>
            <DialogDescription className="text-[#333333]">
              Inscrivez votre courriel pour recevoir chaque matin les textes de la messe et de l&apos;office.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sub-email" className="text-[13px] font-bold text-[#333]">
                Courriel
              </Label>
              <Input
                id="sub-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.fr"
                className="bg-[#f8f7f4] border-[#ccc] rounded-none"
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <DialogClose asChild>
                <BlackButton variant="solid" size="md" type="button">Annuler</BlackButton>
              </DialogClose>
              <BlackButton variant="solid" size="md" type="submit">S&apos;abonner</BlackButton>
            </div>
          </form>
          <DialogClose className="absolute top-3 right-3 text-[#6b6b6b] hover:text-[#0e7c66]">
            <X className="w-4 h-4" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </header>
  )
}
