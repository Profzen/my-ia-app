// src/components/ui/ConversationItem.tsx
'use client'
/**
 * Item réactif et visuellement propre
 * - Highlight fort quand actif
 * - Arrondis, spacing, hover subtil
 */

import React from 'react'
import clsx from 'clsx'
import { useStore, Conversation } from '@/lib/store'

export default function ConversationItem({ conv }: { conv: Conversation }) {
  const { activeConversationId, setActiveConversation, deleteConversation } = useStore()
  const active = activeConversationId === conv.id

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setActiveConversation(conv.id)}
      onKeyDown={(e) => { if (e.key === 'Enter') setActiveConversation(conv.id) }}
      className={clsx(
        'flex items-center justify-between gap-3 p-3 rounded-lg transition cursor-pointer',
        active ? 'bg-[var(--color-primary)] text-white shadow-[0_12px_30px_rgba(0,122,255,0.12)]' : 'hover:bg-[var(--color-bg)]'
      )}
      aria-current={active ? 'true' : undefined}
    >
      <div className="min-w-0">
        <div className="text-sm font-medium truncate" title={conv.title}>{conv.title}</div>
        <div className="text-xs text-[var(--color-text-muted)] truncate">
          {conv.messages.length} messages • {new Date(conv.updatedAt).toLocaleDateString()}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id) }}
          aria-label={`Supprimer ${conv.title}`}
          className="px-2 py-1 rounded-md text-xs text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] transition"
        >
          Suppr
        </button>
      </div>
    </div>
  )
}
