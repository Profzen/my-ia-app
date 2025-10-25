// src/components/ui/ConversationList.tsx
'use client'
import React from 'react'
import { useStore } from '@/lib/store'
import ConversationItem from './ConversationItem'

export default function ConversationList() {
  const { folders, conversations } = useStore()

  // conversations without folder
  const ungrouped = conversations.filter(c => !c.folderId)

  return (
    <div>
      <div className="mb-3">
        {ungrouped.map(conv => <ConversationItem key={conv.id} conv={conv} />)}
      </div>

      {folders.map(folder => (
        <div key={folder.id} className="mb-4">
          <div className="text-xs font-semibold mb-2">{folder.title}</div>
          <div className="space-y-2">
            {conversations.filter(c => c.folderId === folder.id).map(c => <ConversationItem key={c.id} conv={c} />)}
            {conversations.filter(c=>c.folderId===folder.id).length === 0 && <div className="text-xs text-muted">Aucune conversation</div>}
          </div>
        </div>
      ))}
    </div>
  )
}
