// src/components/ui/ChatWindow.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import MessageBubble from './MessageBubble'

export default function ChatWindow(){
  const { conversations, activeConversationId } = useStore()
  const conv = conversations.find(c=>c.id===activeConversationId)
  const ref = useRef<HTMLDivElement|null>(null)
  const [typing, setTyping] = useState(false)

  useEffect(()=>{
    if(!ref.current) return
    ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
  }, [conv?.messages.length, typing])

  if(!conv) return <div className="flex-1 flex items-center justify-center text-muted">Sélectionne ou crée une conversation</div>

  return (
    <div className="flex-1 overflow-auto message-list" ref={ref}>
      <div className="message-list-inner">
        <div className="mb-6">
          <div className="text-lg font-semibold">{conv.title}</div>
          <div className="text-xs text-muted">Dernière mise à jour {new Date(conv.updatedAt).toLocaleString()}</div>
        </div>

        {conv.messages.map(m => <MessageBubble key={m.id} msg={m} />)}

        {typing && (
          <div className="mb-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-semibold">AI</div>
            <div className="bg-[var(--color-surface)] p-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-pulse delay-75"></span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-text-muted)] animate-pulse delay-150"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
