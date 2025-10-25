// src/components/ui/MessageBubble.tsx
'use client'
import React from 'react'
import clsx from 'clsx'
import { Message } from '@/lib/store'
import { Copy } from 'lucide-react'

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div className={clsx('flex gap-4 mb-4 items-end', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-semibold">AI</div>}

      <div className={clsx('max-w-[80%] p-4 rounded-2xl', isUser ? 'msg-user user-glow' : 'msg-assistant card')}>
        <div className="text-sm leading-7 whitespace-pre-wrap">{msg.text}</div>
        <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>{new Date(msg.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
          <button aria-label="Copier" onClick={() => navigator.clipboard?.writeText(msg.text)} className="p-1 rounded hover:bg-[var(--color-bg)]">
            <Copy size={14} />
          </button>
        </div>
      </div>

      {isUser && <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-semibold">U</div>}
    </div>
  )
}
