// src/components/ui/Composer.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import Button from './Button'
import AudioRecorder from './AudioRecorder'
import { MOCK_RESPONSES } from '@/lib/mockResponses'

export default function Composer(){
  const { activeConversationId, createConversation, addMessage } = useStore()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLTextAreaElement|null>(null)

  useEffect(()=>{
    if(!activeConversationId) createConversation('Nouvelle conversation')
  }, [activeConversationId, createConversation])

  function send(){
    if(!text.trim() || !activeConversationId) return
    const t = text.trim()
    addMessage(activeConversationId, 'user', t)
    setText('')
    setLoading(true)
    setTimeout(()=> {
      const resp = MOCK_RESPONSES[Math.floor(Math.random()*MOCK_RESPONSES.length)]
      addMessage(activeConversationId, 'assistant', resp)
      setLoading(false)
    }, 700 + Math.random()*700)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>){
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send() }
  }

  function onAudioResult(t: string){
    setText(prev => (prev ? prev + ' ' + t : t))
    ref.current?.focus()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-3">
        <textarea
          ref={ref}
          value={text}
          onChange={e=>setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Écris ta question — Entrée pour envoyer, Shift+Entrée nouvelle ligne"
          className="flex-1 p-4 rounded-xl bg-[var(--color-surface)] border border-transparent shadow-sm min-h-[88px] focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
          aria-label="Champ du message"
        />
        <div className="flex flex-col gap-2">
          <AudioRecorder onResult={onAudioResult} />
          <Button variant="primary" onClick={send} disabled={loading}>{loading ? '...' : 'Envoyer'}</Button>
        </div>
      </div>
      <div className="mt-2 text-xs text-[var(--color-text-muted)]">Shift+Enter → nouvelle ligne · Entrée → Envoyer</div>
    </div>
  )
}
