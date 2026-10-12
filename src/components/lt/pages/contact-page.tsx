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
import { useT } from '@/lib/i18n'
import { contactInfo } from '@/data/contact'

type FormState = {
  name: string
  email: string
  /** Stable id of the chosen subject ("general" | "subscription" | ...) */
  subject: string
  message: string
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const SUBJECT_IDS = [
  'general',
  'subscription',
  'rights',
  'bible',
  'calendar',
  'bug',
  'other',
] as const

type SubjectId = (typeof SUBJECT_IDS)[number]

function subjectLabel(id: SubjectId, t: (k: string) => string): string {
  return t(`contact.subjects.${id}`)
}

/** Contact page — form + INFORMATIONS card. The stained-glass rosette
 *  background shows around the centered white card. */
export function ContactPage() {
  const { toast } = useToast()
  const { t } = useT()
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
        title: t('contact.name_required_title'),
        description: t('contact.name_required_desc'),
        variant: 'destructive',
      })
      return
    }
    if (!form.email.includes('@')) {
      toast({
        title: t('contact.invalid_email_title'),
        description: t('contact.invalid_email_desc'),
        variant: 'destructive',
      })
      return
    }
    if (!form.subject) {
      toast({
        title: t('contact.subject_required_title'),
        description: t('contact.subject_required_desc'),
        variant: 'destructive',
      })
      return
    }
    if (form.message.trim().length < 10) {
      toast({
        title: t('contact.message_short_title'),
        description: t('contact.message_short_desc'),
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
          // Send the localized subject string to the backend — that's what
          // would land in the inbox. Falls back to the id if missing.
          subject: subjectLabel(form.subject as SubjectId, t),
          message: form.message.trim(),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(
          typeof err.error === 'string' ? err.error : t('contact.invalid_response'),
        )
      }

      toast({
        title: t('contact.success_title'),
        description: t('contact.success_desc'),
      })
      setForm(EMPTY_FORM)
    } catch (err) {
      const message = err instanceof Error ? err.message : t('contact.invalid_response')
      toast({
        title: t('contact.error_title'),
        description: t('contact.error_desc', { message }),
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
          {t('contact.title')}
        </h2>
        <p className="text-[15px] leading-[1.7] text-[#333333] mb-6">
          {t('contact.intro')}
        </p>

        <div className="grid md:grid-cols-[1fr_220px] gap-6">
          {/* Form column */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-name" className="text-[15px] font-bold text-[#333] uppercase tracking-wide">
                {t('contact.name')}
              </Label>
              <Input
                id="contact-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder={t('contact.name_ph')}
                disabled={submitting}
                className="bg-[#f8f7f4] border-[#ccc] rounded-none h-10"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-email" className="text-[15px] font-bold text-[#333] uppercase tracking-wide">
                {t('contact.email')}
              </Label>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder={t('contact.email_ph')}
                disabled={submitting}
                className="bg-[#f8f7f4] border-[#ccc] rounded-none h-10"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-subject" className="text-[15px] font-bold text-[#333] uppercase tracking-wide">
                {t('contact.subject')}
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
                  <SelectValue placeholder={t('contact.subject_ph')} />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  {SUBJECT_IDS.map((id) => (
                    <SelectItem key={id} value={id}>
                      {subjectLabel(id, t)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-message" className="text-[15px] font-bold text-[#333] uppercase tracking-wide">
                {t('contact.message')}
              </Label>
              <Textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder={t('contact.message_ph')}
                disabled={submitting}
                rows={6}
                className="bg-[#f8f7f4] border-[#ccc] rounded-none min-h-[140px] text-[#333]"
              />
            </div>

            {/* Captcha placeholder — in production this would integrate Cloudflare Turnstile.
                Without API keys, we render a decorative labelled box. */}
            <div
              className="flex items-center gap-2 bg-[#f0eeea] border border-[#ccc] px-3 py-2.5 text-[14px] text-[#6b6b6b]"
              aria-label={t('contact.captcha')}
            >
              <span className="w-4 h-4 inline-flex items-center justify-center bg-[#1e883f] text-white flex-shrink-0">
                <Check className="w-3 h-3" />
              </span>
              <span>{t('contact.captcha')}</span>
            </div>

            <BlackButton
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full sm:w-auto sm:self-start mt-1"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> {t('contact.send_loading')}
                </>
              ) : (
                t('contact.send')
              )}
            </BlackButton>
          </form>

          {/* INFORMATIONS card column */}
          <aside className="bg-[#f0eeea] border border-[#e2e0dc] p-4 self-start">
            <h3 className="text-[14px] font-bold text-[#333] uppercase tracking-wide mb-3">
              {t('contact.info_title')}
            </h3>
            <div className="space-y-3 text-[15px] text-[#333]">
              {/* Location */}
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#1a4fa0]" />
                <p className="leading-snug font-semibold">{contactInfo.location}</p>
              </div>
              {/* Phones */}
              {contactInfo.phones.map((phone) => (
                <div key={phone} className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#1a4fa0]" />
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:underline">
                    {phone}
                  </a>
                </div>
              ))}
              {/* Email */}
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#1a4fa0]" />
                <a href={`mailto:${contactInfo.email}`} className="text-[#1a4fa0] hover:underline break-all">
                  {contactInfo.email}
                </a>
              </div>
              {/* 24/7 tagline */}
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#1a4fa0]" />
                <p className="leading-snug font-semibold">{t('contact.tagline_24_7')}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
