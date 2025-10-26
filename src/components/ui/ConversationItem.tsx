// src/components/ui/ConversationItem.tsx
'use client'
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
      className={clsx('p-3 rounded-lg cursor-pointer flex items-center justify-between transition', active ? 'bg-[var(--color-primary)] text-white shadow-md' : 'hover:bg-[var(--color-bg)]')}
      style={{display:'flex', gap:12, alignItems:'center'}}
    >
      <div style={{display:'flex', gap:12, alignItems:'center', minWidth:0, flex:1}}>
        <div style={{width:36,height:36,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',background: active ? 'rgba(255,255,255,0.06)' : 'rgba(0,163,255,0.06)', color:'var(--color-primary)'}}>
          C
        </div>

        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:14,fontWeight:600,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{conv.title}</div>
          <div className="text-muted" style={{fontSize:12}}>{conv.folderId ? 'Dans dossier' : ''}</div>
        </div>
      </div>

      <div>
        <button onClick={(e)=>{ e.stopPropagation(); deleteConversation(conv.id) }} className="px-2 py-1 rounded-md text-xs text-[var(--color-text-muted)]">Suppr</button>
      </div>
    </div>
  )
}
