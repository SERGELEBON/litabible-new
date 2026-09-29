'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { io, type Socket } from 'socket.io-client'
import { useT } from '@/lib/i18n'
import { Send, Users, Wifi, WifiOff, LogOut } from 'lucide-react'

// ---------------------------------------------------------------------------
// Types (mirror the chat mini-service contract)
// ---------------------------------------------------------------------------

interface ChatUser {
  id: string
  name: string
  color: string
}

interface ChatMessage {
  id: string
  userId: string
  name: string
  color: string
  content: string
  timestamp: number
  type: 'message' | 'system'
}

const MAX_RENDERED = 120 // cap DOM to keep scrolling smooth on long sessions

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * "Mon réseau" social page — a real-time chat (socket.io) where each connected
 * person can exchange messages with everyone else online. Optimised for
 * smoothness: single socket connection, capped rendered list, ref-based typing
 * debounce, no per-keystroke re-renders of the message list.
 */
export function ReseauPage() {
  const { t, locale } = useT()

  // Connection + identity
  const [connected, setConnected] = useState(false)
  const [joined, setJoined] = useState(false)
  const [name, setName] = useState('')
  const [joinError, setJoinError] = useState('')

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [users, setUsers] = useState<ChatUser[]>([])
  const [draft, setDraft] = useState('')
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({})

  // Refs for stable callbacks (avoid re-subscribing socket listeners)
  const socketRef = useRef<Socket | null>(null)
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [myId, setMyId] = useState<string>('')

  // --- connect once on mount ---
  useEffect(() => {
    const s = io('/?XTransformPort=3003', {
      transports: ['websocket', 'polling'],
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1500,
      reconnectionDelayMax: 8000,
      timeout: 10000,
    })
    socketRef.current = s

    s.on('connect', () => {
      setConnected(true)
      setMyId(s.id ?? "")
    })
    s.on('disconnect', () => setConnected(false))
    s.on('connect_error', () => setConnected(false))

    s.on('history', (data: { messages: ChatMessage[] }) => {
      setMessages(data.messages.slice(-MAX_RENDERED))
    })
    s.on('message', (msg: ChatMessage) => {
      setMessages((prev) => {
        const next = prev.length >= MAX_RENDERED ? prev.slice(prev.length - MAX_RENDERED + 1) : prev
        return [...next, msg]
      })
    })
    s.on('user-joined', (data: { user: ChatUser; message: ChatMessage }) => {
      setMessages((prev) => [...prev, data.message])
    })
    s.on('user-left', (data: { user: { id: string; name: string }; message: ChatMessage }) => {
      setMessages((prev) => [...prev, data.message])
      setTypingUsers((prev) => {
        if (!prev[data.user.id]) return prev
        const copy = { ...prev }
        delete copy[data.user.id]
        return copy
      })
    })
    s.on('users-list', (data: { users: ChatUser[] }) => {
      setUsers(data.users)
    })
    s.on('typing', (data: { userId: string; name: string; isTyping: boolean }) => {
      setTypingUsers((prev) => {
        // Don't show my own typing indicator.
        if (data.userId === myId) return prev
        const copy = { ...prev }
        if (data.isTyping) copy[data.userId] = true
        else delete copy[data.userId]
        return copy
      })
    })
    s.on('join-error', (data: { message: string }) => {
      setJoinError(data.message)
    })

    return () => {
      s.removeAllListeners()
      s.disconnect()
      socketRef.current = null
    }
  }, [])

  // --- auto-scroll to bottom on new message ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  // --- join ---
  const handleJoin = useCallback(() => {
    const n = name.trim()
    if (!n) {
      setJoinError(t('reseau.join_error'))
      return
    }
    if (!socketRef.current?.connected) return
    setJoinError('')
    socketRef.current.emit('join', { name: n })
    setJoined(true)
  }, [name, t])

  // --- send a message ---
  const sendMessage = useCallback(() => {
    const content = draft.trim()
    if (!content || !socketRef.current || !joined) return
    socketRef.current.emit('message', { content })
    socketRef.current.emit('typing', { isTyping: false })
    setDraft('')
  }, [draft, joined])

  // --- typing indicator (debounced) ---
  const onDraftChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDraft(e.target.value)
      const s = socketRef.current
      if (!s || !joined) return
      s.emit('typing', { isTyping: true })
      if (typingTimer.current) clearTimeout(typingTimer.current)
      typingTimer.current = setTimeout(() => {
        s.emit('typing', { isTyping: false })
      }, 2500)
    },
    [joined],
  )

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleLeave = useCallback(() => {
    socketRef.current?.disconnect()
    setJoined(false)
    setMessages([])
    setUsers([])
    setTypingUsers({})
    // Reconnect fresh so a new name can be chosen
    if (socketRef.current) {
      socketRef.current.connect()
    }
  }, [])

  const onlineCount = users.length
  const typingNames = useMemo(
    () => Object.keys(typingUsers).map((id) => users.find((u) => u.id === id)?.name).filter(Boolean) as string[],
    [typingUsers, users],
  )

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  // Not joined yet: show the join form.
  if (!joined) {
    return (
      <section aria-labelledby="reseau-title" className="w-full">
        <div className="max-w-md mx-auto bg-white border border-[#e2e0dc] shadow-lg p-6 sm:p-8 flex flex-col gap-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1a4fa0] text-white mb-3">
              <Users className="w-7 h-7" />
            </div>
            <h1 id="reseau-title" className="text-[22px] font-bold uppercase text-[#1a4fa0] tracking-tight">
              {t('reseau.title')}
            </h1>
            <p className="mt-2 text-[13px] text-[#2d2d2d]/80 leading-relaxed">
              {t('reseau.intro')}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-[12px] font-semibold">
            {connected ? (
              <span className="inline-flex items-center gap-1.5 text-[#1e883f]"><Wifi className="w-3.5 h-3.5" />{t('reseau.connected')}</span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[#bf2329]"><WifiOff className="w-3.5 h-3.5" />{t('reseau.disconnected')}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reseau-name" className="text-[13px] font-bold text-[#2d2d2d]">
              {t('reseau.name_label')}
            </label>
            <input
              id="reseau-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleJoin() }}
              placeholder={t('reseau.name_ph')}
              maxLength={40}
              disabled={!connected}
              className="bg-[#f8f7f4] border border-[#ccc] rounded-none px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1a4fa0] disabled:opacity-50"
            />
            {joinError && <p className="text-[12px] text-[#bf2329]">{joinError}</p>}
          </div>

          <button
            type="button"
            onClick={handleJoin}
            disabled={!connected || !name.trim()}
            className="lt-btn-black !bg-[#1a4fa0] !text-white text-[13px] px-4 py-3 hover:!bg-[#143d7a] disabled:opacity-50"
          >
            {t('reseau.join_btn')}
          </button>
        </div>
      </section>
    )
  }

  // Joined: two-panel chat (online users left, conversation right).
  return (
    <section aria-labelledby="reseau-title" className="w-full">
      <div className="flex flex-col lg:flex-row gap-4 lg:h-[calc(100vh-180px)]">
        {/* Online users panel */}
        <aside className="bg-white border border-[#e2e0dc] w-full lg:w-[240px] lg:flex-shrink-0 flex flex-col min-h-0 lg:overflow-hidden">
          <div className="bg-[#1a4fa0] text-white px-4 py-3 flex items-center justify-between">
            <h2 className="text-[13px] font-bold uppercase tracking-wide flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t('reseau.online_users')}
            </h2>
            <span className="text-[12px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
              {t('reseau.online', { n: onlineCount })}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto lt-scroll p-2 min-h-0">
            <ul className="flex flex-col gap-1">
              {users.map((u) => {
                const isMe = u.id === myId
                return (
                  <li key={u.id} className="flex items-center gap-2.5 px-2 py-2 rounded hover:bg-[#f4f1ea]">
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                      style={{ backgroundColor: u.color }}
                    >
                      {initials(u.name)}
                    </span>
                    <span className="text-[13px] font-semibold text-[#2d2d2d] truncate">
                      {u.name}{isMe ? ` · ${t('reseau.you')}` : ''}
                    </span>
                    <span className="ml-auto w-2 h-2 rounded-full bg-[#1e883f]" aria-hidden />
                  </li>
                )
              })}
              {users.length === 0 && (
                <li className="text-[12px] text-[#6b6b6b] italic px-2 py-4 text-center">
                  {t('reseau.disconnected')}
                </li>
              )}
            </ul>
          </div>
        </aside>

        {/* Conversation panel */}
        <div className="bg-white border border-[#e2e0dc] flex-1 flex flex-col min-h-0 lg:overflow-hidden">
          {/* Header */}
          <div className="bg-[#1a4fa0] text-white px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h1 id="reseau-title" className="text-[14px] font-bold uppercase tracking-wide">
                {t('reseau.chat')}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {connected ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-white/90"><Wifi className="w-3.5 h-3.5" />{t('reseau.connected')}</span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-white/90"><WifiOff className="w-3.5 h-3.5" />{t('reseau.disconnected')}</span>
              )}
              <button
                type="button"
                onClick={handleLeave}
                className="inline-flex items-center gap-1 text-[11px] uppercase font-semibold text-white/80 hover:text-white"
                title={t('reseau.leave')}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('reseau.leave')}</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto lt-scroll p-4 min-h-0" style={{ minHeight: 240 }}>
            {messages.length === 0 ? (
              <p className="text-[13px] text-[#6b6b6b] italic text-center mt-8">
                {t('reseau.no_messages')}
              </p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {messages.map((m) => {
                  if (m.type === 'system') {
                    return (
                      <li key={m.id} className="text-center">
                        <span className="text-[11px] text-[#9a9a9a] italic px-3 py-1 bg-[#f4f1ea] rounded-full">
                          {m.content} · {formatTime(m.timestamp)}
                        </span>
                      </li>
                    )
                  }
                  const mine = m.userId === myId
                  return (
                    <li key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-end gap-2 max-w-[78%] ${mine ? 'flex-row-reverse' : ''}`}>
                        {!mine && (
                          <span
                            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                            style={{ backgroundColor: m.color }}
                          >
                            {initials(m.name)}
                          </span>
                        )}
                        <div className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
                          {!mine && (
                            <span className="text-[11px] font-semibold text-[#1a4fa0] mb-0.5 px-1">{m.name}</span>
                          )}
                          <span
                            className={`px-3 py-2 text-[14px] leading-snug break-words ${
                              mine ? 'bg-[#1a4fa0] text-white' : 'bg-[#f4f1ea] text-[#2d2d2d]'
                            }`}
                            style={{ borderRadius: mine ? '12px 2px 12px 12px' : '2px 12px 12px 12px' }}
                          >
                            {m.content}
                          </span>
                          <span className="text-[10px] text-[#9a9a9a] px-1 mt-0.5">{formatTime(m.timestamp)}</span>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing indicator */}
          <div className="px-4 py-1 h-6 text-[11px] text-[#6b6b6b] italic">
            {typingNames.length > 0 && (
              typingNames.length <= 2
                ? t('reseau.typing', { name: typingNames.join(', ') })
                : t('reseau.online', { n: typingNames.length }) + '…'
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage() }}
            className="flex items-center gap-2 p-3 border-t border-[#e2e0dc] bg-[#f8f7f4]"
          >
            <input
              type="text"
              value={draft}
              onChange={onDraftChange}
              onKeyDown={onKey}
              placeholder={t('reseau.message_ph')}
              maxLength={2000}
              className="flex-1 bg-white border border-[#ccc] rounded-none px-3.5 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1a4fa0]"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="lt-btn-black !bg-[#1a4fa0] !text-white text-[13px] px-4 py-2.5 inline-flex items-center gap-1.5 hover:!bg-[#143d7a] disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t('reseau.send')}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ReseauPage
