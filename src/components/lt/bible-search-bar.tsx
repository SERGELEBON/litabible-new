'use client'

import { useState, type FormEvent } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

interface BibleSearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

/** Full-width Bible search bar: text field + red square loupe button (border-radius 0). */
export function BibleSearchBar({
  onSearch,
  placeholder = 'Rechercher dans la Bible (ex. Jean 3,16 ou « la lumière »)…',
  className,
}: BibleSearchBarProps) {
  const [value, setValue] = useState('')
  const { toast } = useToast()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const q = value.trim()
    if (q.length < 2) {
      toast({
        title: 'Recherche trop courte',
        description: 'Saisissez au moins 2 caractères.',
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
        placeholder={placeholder}
        aria-label="Recherche dans la Bible"
        className="flex-1 rounded-none border border-[#ccc] bg-white text-[14px] h-[42px] focus-visible:ring-[#0e7c66]"
      />
      <button
        type="submit"
        aria-label="Rechercher"
        className="bg-[#0e7c66] hover:bg-[#0a5e4d] text-white flex items-center justify-center w-[42px] h-[42px] flex-shrink-0 transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  )
}
