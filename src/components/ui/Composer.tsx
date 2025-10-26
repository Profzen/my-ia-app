// src/components/ui/Composer.tsx
'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import Button from './Button'
import AudioRecorder from './AudioRecorder'
import ProfileMode from './ProfileMode'
import { MOCK_RESPONSES } from '@/lib/mockResponses'

export default function Composer(){
  const { activeConversationId, createConversation, addMessage } = useStore()
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState('Chercheur')
  const ref = useRef<HTMLTextAreaElement|null>(null)

  useEffect(()=>{ if(!activeConversationId) createConversation('Nouvelle conversation') }, [activeConversationId, createConversation])

  function send(){
    if(!text.trim() || !activeConversationId) return
    const t = text.trim()
    addMessage(activeConversationId, 'user', `${t} (${profile})`) // include profile tag
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

  function handleAudioResult(t:string){
    setText(prev => prev ? prev + ' ' + t : t)
    ref.current?.focus()
  }

  return (
    <div>
      <div style={{marginBottom:10, display:'flex', justifyContent:'center'}}>
        <ProfileMode value={profile} onChange={(v)=>setProfile(v)} />
      </div>

      <div style={{display:'flex', gap:12}}>
        <textarea ref={ref} value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={onKeyDown}
          placeholder="Écris ta question… (Entrée envoie, Shift+Entrée nouvelle ligne)"
          aria-label="Champ message"
          style={{flex:1,padding:14,borderRadius:12,border:'1px solid rgba(16,24,40,0.04)', minHeight:92, resize:'none', background:'var(--color-surface)'}} />

        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <AudioRecorder onResult={handleAudioResult} />
          <Button variant="primary" onClick={send}>{loading ? '…' : 'Envoyer'}</Button>
        </div>
      </div>
    </div>
  )
}
