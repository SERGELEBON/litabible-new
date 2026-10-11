'use client'

import { useState } from 'react'
import { Check, Loader2, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { BlackButton } from '../black-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { contactInfo, contactSubjects } from '@/data/contact'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

/** Contact page — form + INFORMATIONS card. The stained-glass rosette
 *  background shows around the centered white card. */
export function ContactPage() {
  const { toast } = useToast()
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Basic client-side validation.
    if (!form.name.trim()) {
      toast({
        title: 'Champ requis',
        description: 'Veuillez indiquer votre nom.',
        variant: 'destructive',
      })
      return
    }
    if (!form.email.includes('@')) {
      toast({
        title: 'Courriel invalide',
        description: 'Veuillez saisir une adresse de courriel valide.',
        variant: 'destructive',
      })
      return
    }
    if (!form.subject) {
      toast({
        title: 'Sujet requis',
        description: 'Veuillez choisir un sujet dans la liste.',
        variant: 'destructive',
      })
      return
    }
    if (form.message.trim().length < 10) {
      toast({
        title: 'Message trop court',
        description: 'Votre message doit contenir au moins 10 caractères.',
        variant: 'destructive',
      })
      return
    }

    setSubmitting(true)
    try {
      // Cloudflare Turnstile token would be added here in production:
      //   captchaToken: await turnstile.getToken()
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject,
          message: form.message.trim(),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(typeof err.error === 'string' ? err.error : 'Réponse invalide du serveur.')
      }

      toast({
        title: 'Message envoyé',
        description: 'Merci. Nous vous répondrons dans les meilleurs délais.',
      })
      setForm(EMPTY_FORM)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue.'
      toast({
        title: 'Échec de l’envoi',
        description: `Votre message n’a pas pu être envoyé (${message}). Réessayez plus tard.`,
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* White centered card — rosette shows around it */}
      <section className="bg-white border border-[#e2e0dc] p-6 sm:p-8 shadow-sm">
        <h2 className="uppercase text-[22px] sm:text-[24px] font-semibold text-[#333333] tracking-wide mb-2">
          Contacter l’AELF
        </h2>
        <p className="text-[15px] leading-[1.7] text-[#333333] mb-6">
          Pour toute question relative aux textes liturgiques, à l’utilisation du site,
          au calendrier ou à un problème technique, vous pouvez nous écrire via le formulaire
          ci-dessous. Nous vous répondrons dans les meilleurs délais.
        </p>

        <div className="grid md:grid-cols-[1fr_220px] gap-6">
          {/* Form column */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-name" className="text-[13px] font-bold text-[#333] uppercase tracking-wide">
                Nom
              </Label>
              <Input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Votre nom"
                disabled={submitting}
                className="bg-[#f8f7f4] border-[#ccc] rounded-none h-10"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-email" className="text-[13px] font-bold text-[#333] uppercase tracking-wide">
                Courriel
              </Label>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="vous@exemple.fr"
                disabled={submitting}
                className="bg-[#f8f7f4] border-[#ccc] rounded-none h-10"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-subject" className="text-[13px] font-bold text-[#333] uppercase tracking-wide">
                Sujet
              </Label>
              <Select
                value={form.subject}
                onValueChange={(v) => update('subject', v)}
                disabled={submitting}
              >
                <SelectTrigger
                  id="contact-subject"
                  className="bg-[#f8f7f4] border-[#ccc] rounded-none h-10 w-full text-[#333] data-[placeholder]:text-[#6b6b6b]"
                >
                  <SelectValue placeholder="Choisissez un sujet…" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {contactSubjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-message" className="text-[13px] font-bold text-[#333] uppercase tracking-wide">
                Message
              </Label>
              <Textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Saisissez votre message…"
                disabled={submitting}
                rows={6}
                className="bg-[#f8f7f4] border-[#ccc] rounded-none min-h-[140px] text-[#333]"
              />
            </div>

            {/* Captcha placeholder — in production this would integrate Cloudflare Turnstile.
                Without API keys, we render a decorative labelled box. */}
            <div
              className="flex items-center gap-2 bg-[#f0eeea] border border-[#ccc] px-3 py-2.5 text-[12px] text-[#6b6b6b]"
              aria-label="Vérification anti-spam Cloudflare Turnstile (désactivée en mode démo)"
            >
              <span className="w-4 h-4 inline-flex items-center justify-center bg-[#1e883f] text-white flex-shrink-0">
                <Check className="w-3 h-3" />
              </span>
              <span>Vérification anti-spam (Cloudflare Turnstile)</span>
            </div>

            <BlackButton
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full sm:w-auto sm:self-start mt-1"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…
                </>
              ) : (
                'Envoyer'
              )}
            </BlackButton>
          </form>

          {/* INFORMATIONS card column */}
          <aside className="bg-[#f0eeea] border border-[#e2e0dc] p-4 self-start">
            <h3 className="text-[12px] font-bold text-[#333] uppercase tracking-wide mb-3">
              Informations
            </h3>
            <div className="space-y-3 text-[13px] text-[#333]">
              <div>
                <p className="font-semibold">{contactInfo.address}</p>
                {contactInfo.addressLines.map((line, i) => (
                  <p key={i} className="leading-snug">{line}</p>
                ))}
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#bf2329]" />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:underline">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#bf2329]" />
                <a href={`mailto:${contactInfo.email}`} className="text-[#bf2329] hover:underline break-all">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#bf2329]" />
                <p className="leading-snug">{contactInfo.hours}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#bf2329]" />
                <p className="leading-snug">Secrétariat de l’AELF, Paris.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
