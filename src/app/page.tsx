// src/app/page.tsx
'use client'
import React from 'react'
import Sidebar from '@/components/ui/Sidebar'
import ChatArea from '@/components/ui/ChatArea'

export default function Page() {
  return (
    <>
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main className="content">
        <header className="header">
          <div className="container-max">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold">IA Générative</h1>
                <p className="text-sm text-muted">Prototype — interface conversationnelle</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <div className="container-max chat-shell">
            <ChatArea />
          </div>
        </div>
      </main>
    </>
  )
}
