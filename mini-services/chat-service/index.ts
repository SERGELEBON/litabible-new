/**
 * LitaBible — chat mini-service (socket.io).
 *
 * A lightweight real-time chat backend for the "Mon réseau" (My Network)
 * social page. In-memory only (no DB) for speed. Features:
 *  - Single "general" lounge where everyone converses.
 *  - Online users list (broadcast on join / leave).
 *  - Messages broadcast with username, avatar color, timestamp.
 *  - Last N messages kept in a ring buffer so new joiners see context.
 *  - Typing indicator.
 *
 * Runs on port 3003. The Next.js client connects with
 * `io('/?XTransformPort=3003')` (Caddy forwards to this port).
 */

import { createServer, type IncomingMessage, type ServerResponse } from 'http'
import { Server, type Socket } from 'socket.io'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatUser {
  id: string // socket.id
  name: string
  color: string // avatar color (hex)
  joinedAt: number
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

// ---------------------------------------------------------------------------
// State (in-memory)
// ---------------------------------------------------------------------------

const PORT = 3003
const HISTORY_LIMIT = 80 // keep the last N messages for context

const users = new Map<string, ChatUser>()
const history: ChatMessage[] = []

// A pleasant palette for avatar colors (avoids pure red/blue clash with brand).
const AVATAR_COLORS = [
  '#0e7c66', '#7d4c9c', '#c9a444', '#d989a4', '#1e883f',
  '#b8553a', '#5b6ee1', '#9c5fc4', '#3aa6a0', '#c97a2b',
  '#5a8a3a', '#6a4fb8', '#c74a5a', '#2a8c8a', '#b8860b',
]

function pickColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function genId(): string {
  return Math.random().toString(36).slice(2, 10)
}

function systemMessage(content: string): ChatMessage {
  return {
    id: genId(),
    userId: 'system',
    name: 'System',
    color: '#6b6b6b',
    content,
    timestamp: Date.now(),
    type: 'system',
  }
}

function pushHistory(msg: ChatMessage): void {
  history.push(msg)
  if (history.length > HISTORY_LIMIT) history.shift()
}

function onlineUsersList(): { id: string; name: string; color: string }[] {
  return Array.from(users.values()).map((u) => ({
    id: u.id,
    name: u.name,
    color: u.color,
  }))
}

// ---------------------------------------------------------------------------
// HTTP server (socket.io rides on top; also a tiny health endpoint)
// ---------------------------------------------------------------------------

const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true, users: users.size, port: PORT }))
    return
  }
  res.writeHead(404)
  res.end('Not found')
})

const io = new Server(httpServer, {
  // DO NOT change the path — Caddy uses it to forward to this port.
  path: '/',
  cors: { origin: '*', methods: ['GET', 'POST'] },
  pingTimeout: 60000,
  pingInterval: 25000,
  maxHttpBufferSize: 1e5, // 100 KB max message size — guards against abuse
})

// ---------------------------------------------------------------------------
// Connection handling
// ---------------------------------------------------------------------------

io.on('connection', (socket: Socket) => {
  let currentUser: ChatUser | null = null

  socket.on('join', (data: { name?: string }) => {
    const name = (data?.name ?? '').trim().slice(0, 40)
    if (!name) {
      socket.emit('join-error', { message: 'A name is required.' })
      return
    }

    // Part 1: send the new user the recent history + current online list
    // (so they see context + who is here).
    currentUser = {
      id: socket.id,
      name,
      color: pickColor(name),
      joinedAt: Date.now(),
    }
    users.set(socket.id, currentUser)

    socket.emit('history', { messages: history })
    socket.emit('users-list', { users: onlineUsersList() })

    // Part 2: announce the join to everyone (system message + updated user list).
    const joinMsg = systemMessage(`${name} joined the network`)
    pushHistory(joinMsg)
    io.emit('user-joined', { user: currentUser, message: joinMsg })
    io.emit('users-list', { users: onlineUsersList() })

    console.log(`[chat] ${name} joined (${users.size} online)`)
  })

  socket.on('message', (data: { content?: string }) => {
    if (!currentUser) return // must join first
    const content = (data?.content ?? '').trim().slice(0, 2000)
    if (!content) return

    const msg: ChatMessage = {
      id: genId(),
      userId: currentUser.id,
      name: currentUser.name,
      color: currentUser.color,
      content,
      timestamp: Date.now(),
      type: 'message',
    }
    pushHistory(msg)
    io.emit('message', msg)
  })

  socket.on('typing', (data: { isTyping?: boolean }) => {
    if (!currentUser) return
    socket.broadcast.emit('typing', {
      userId: currentUser.id,
      name: currentUser.name,
      isTyping: Boolean(data?.isTyping),
    })
  })

  socket.on('disconnect', () => {
    if (!currentUser) return
    users.delete(socket.id)
    const leaveMsg = systemMessage(`${currentUser.name} left the network`)
    pushHistory(leaveMsg)
    io.emit('user-left', { user: { id: currentUser.id, name: currentUser.name }, message: leaveMsg })
    io.emit('users-list', { users: onlineUsersList() })
    console.log(`[chat] ${currentUser.name} left (${users.size} online)`)
  })

  socket.on('error', (err: unknown) => {
    console.error(`[chat] socket error ${socket.id}:`, err)
  })
})

httpServer.listen(PORT, () => {
  console.log(`[chat] LitaBible chat service listening on port ${PORT}`)
})

// Graceful shutdown
function shutdown(signal: string) {
  console.log(`[chat] ${signal} received, shutting down…`)
  io.close(() => httpServer.close(() => process.exit(0)))
}
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
