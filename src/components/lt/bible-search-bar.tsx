'use client'

import { useState, type FormEvent } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useT } from '@/lib/i18n'

interface BibleSearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

/** Full-width Bible search bar: text field + red square loupe button (border-radius 0). */
export function BibleSearchBar({
  onSearch,
  placeholder,
  className,
}: BibleSearchBarProps) {
  const [value, setValue] = useState('')
  const { toast } = useToast()
  const { t } = useT()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const q = value.trim()
    if (q.length < 2) {
      toast({
        title: t('bible.search_too_short_title'),
        description: t('bible.search_too_short_desc'),
        variant: 'destructive',
      })
      return
    }
    onSearch(q)
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full ${className ?? ''}`} role="search">
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? t('bible.search_ph')}
        aria-label={t('bible.search_btn')}
        className="flex-1 rounded-none border border-[#ccc] bg-white text-[16px] h-[42px] focus-visible:ring-[#1a4fa0]"
      />
      <button
        type="submit"
        aria-label={t('bible.search_btn')}
        className="bg-[#1a4fa0] hover:bg-[#143d7a] text-[#1a4fa0] flex items-center justify-center w-[42px] h-[42px] flex-shrink-0 transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  )
}
