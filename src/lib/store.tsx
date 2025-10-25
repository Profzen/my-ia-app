// src/lib/store.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

export type Role = 'user'|'assistant'
export type Message = { id: string; role: Role; text: string; createdAt: string }
export type Conversation = { id: string; title: string; folderId?: string|null; messages: Message[]; createdAt: string; updatedAt: string }
export type Folder = { id: string; title: string; createdAt: string }

type Store = {
  folders: Folder[]
  conversations: Conversation[]
  activeConversationId?: string | null
  createFolder: (title: string) => Folder
  createConversation: (title?: string, folderId?: string|null) => Conversation
  setActiveConversation: (id?: string|null) => void
  addMessage: (convId:string, role: Role, text:string) => void
  deleteConversation: (id:string) => void
  renameConversation: (id:string, title:string) => void
  clearAll: () => void
}

const KEY = 'ia_state_v1'
const Ctx = createContext<Store|null>(null)

function uId(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8) }
function now(){ return new Date().toISOString() }

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string|null|undefined>(undefined)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setFolders(parsed.folders || [])
        setConversations(parsed.conversations || [])
        setActiveConversationId(parsed.activeConversationId)
        return
      }
    } catch(e) { console.warn(e) }

    // seed conversation
        const seed: Conversation = {
          id: uId(),
          title: 'Bienvenue',
          folderId: null,
          messages: [
            { id: uId(), role: 'assistant', text: 'Bienvenue ! Pose ta première question.', createdAt: now() }
          ],
          createdAt: now(),
          updatedAt: now()
        }
        setConversations([seed])
        setActiveConversationId(seed.id)
  }, [])

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ folders, conversations, activeConversationId })) } catch(e){ console.warn(e) }
  }, [folders, conversations, activeConversationId])

  function createFolder(title: string) { const f = { id: uId(), title: title || 'Dossier', createdAt: now() }; setFolders(p=>[f,...p]); return f }
  function createConversation(title?:string, folderId?:string|null) { const c = { id: uId(), title: title||'Nouvelle conversation', folderId: folderId ?? null, messages: [], createdAt: now(), updatedAt: now() }; setConversations(p=>[c,...p]); setActiveConversationId(c.id); return c }
  function setActiveConversation(id?:string|null){ setActiveConversationId(id ?? null) }
  function addMessage(convId:string, role:Role, text:string){ setConversations(prev => prev.map(c => c.id===convId ? { ...c, messages:[...c.messages, { id: uId(), role, text, createdAt: now() }], updatedAt: now() } : c)) }
  function deleteConversation(id:string){ setConversations(prev=>prev.filter(c=>c.id!==id)); if (activeConversationId===id) setActiveConversationId(undefined) }
  function renameConversation(id:string, title:string){ setConversations(prev=>prev.map(c=>c.id===id ? { ...c, title, updatedAt: now() } : c)) }
  function clearAll(){ setConversations([]); setFolders([]); setActiveConversationId(undefined); localStorage.removeItem(KEY) }

  return <Ctx.Provider value={{ folders, conversations, activeConversationId, createFolder, createConversation, setActiveConversation, addMessage, deleteConversation, renameConversation, clearAll }}>{children}</Ctx.Provider>
}

export function useStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
