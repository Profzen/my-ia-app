// src/app/page.tsx
'use client'
/**
 * Page principale Aura IA — version corrigée
 * - utilise store.conversations pour retrouver la conversation active
 * - scroll interne dans la zone des messages
 * - Composer placé en bas (importé)
 */

import React, { useEffect, useRef } from 'react'
import Sidebar from '@/components/ui/Sidebar'
import Composer from '@/components/ui/Composer'
import { useStore } from '@/lib/store'
import MessageBubble from '@/components/ui/MessageBubble'

export default function Page() {
  const { conversations, activeConversationId } = useStore()
  const conv = conversations.find(c => c.id === activeConversationId) ?? null
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (!scrollRef.current) return
    // delay slightly to allow DOM update
    setTimeout(() => {
      try {
        scrollRef.current!.scrollTo({ top: scrollRef.current!.scrollHeight, behavior: 'smooth' })
      } catch {}
    }, 50)
  }, [conv?.messages.length])

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col h-full">
        {/* Header minimal (reduced height per spec) */}
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Aura IA</div>
            {/* You can add small controls here if needed */}
          </div>
        </header>

        {/* Messages area (internal scroll only) */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto message-list">
          <div className="message-list-inner">
            {!conv && (
              <div className="h-full flex items-center justify-center text-[var(--color-text-muted)] p-6">
                Sélectionne ou crée une conversation pour commencer.
              </div>
            )}

            {conv && (
              <div className="max-w-[var(--max-width)] mx-auto px-4 py-6">
                <div className="mb-6">
                  <div className="text-lg font-semibold">{conv.title}</div>
                </div>

                <div className="flex flex-col">
                  {conv.messages.map((m) => (
                    <MessageBubble key={m.id} msg={m} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Composer fixed at bottom of the content column */}
        <div className="composer-wrap">
          <div className="max-w-4xl mx-auto w-full">
            <Composer />
          </div>
        </div>
      </main>
    </div>
  )
}
