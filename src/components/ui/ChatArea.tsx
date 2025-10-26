// src/components/ui/ChatArea.tsx
'use client'
import React from 'react'
import ChatWindow from './ChatWindow'
import Composer from './Composer'

export default function ChatArea() {
  return (
    <>
      <section className="chat-area card">
        <ChatWindow />
        <div className="composer-wrap">
          <Composer />
        </div>
      </section>
    </>
  )
}
