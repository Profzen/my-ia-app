// src/components/ui/ChatWindow.tsx
'use client'
import React, { useEffect, useRef } from 'react'
import { useStore } from '@/lib/store'
import MessageBubble from './MessageBubble'

export default function ChatWindow(){
  const { conversations, activeConversationId } = useStore()
  const conv = conversations.find(c => c.id === activeConversationId)
  const ref = useRef<HTMLDivElement|null>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' })
  }, [conv?.messages.length])

  if (!conv) return <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%'}} className="text-muted">Sélectionne une conversation</div>

  return (
    <div ref={ref} className="message-list">
      <div className="message-list-inner">
        <div style={{marginBottom:18}}>
          <div style={{fontWeight:700, fontSize:18}}>{conv.title}</div>
        </div>

        {conv.messages.map(m => <MessageBubble key={m.id} msg={m} />)}
      </div>
    </div>
  )
}
