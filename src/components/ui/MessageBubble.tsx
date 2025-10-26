// src/components/ui/MessageBubble.tsx
'use client'
import React from 'react'
import clsx from 'clsx'
import { Message } from '@/lib/store'

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'

  return (
    <div style={{display:'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom:14}}>
      {!isUser && (
        <div style={{width:36,height:36,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginRight:10,background:'rgba(0,163,255,0.08)', color:'var(--color-primary)'}}>AI</div>
      )}

      <div style={{
        maxWidth:'78%',
        padding:'14px 16px',
        borderRadius:14,
        background: isUser ? 'linear-gradient(90deg,var(--color-accent),var(--color-primary))' : 'var(--color-surface)',
        color: isUser ? '#fff' : 'var(--color-text)',
        boxShadow: isUser ? '0 8px 30px rgba(0,122,255,0.12)' : 'var(--shadow-sm)',
        whiteSpace:'pre-wrap',
        lineHeight:1.5
      }}>
        <div style={{fontSize:15}}>{msg.text}</div>
      </div>

      {isUser && (
        <div style={{width:36,height:36,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',marginLeft:10,background:'var(--color-primary)', color:'#fff'}}>U</div>
      )}
    </div>
  )
}
