// src/components/ui/Sidebar.tsx
'use client'
import React, { useState } from 'react'
import clsx from 'clsx'
import { Plus, FolderPlus, Settings as IconSettings, Trash2, Menu, X } from 'lucide-react'
import { useStore } from '@/lib/store'
import ConversationItem from './ConversationItem'
import ThemeToggle from './ThemeToggle'
import SettingsModal from './SettingsModal'

export default function Sidebar() {
  const { conversations, folders, createConversation, createFolder, clearAll, setActiveConversation } = useStore()
  const [folderName, setFolderName] = useState('')
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})
  const [showSettings, setShowSettings] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [auth, setAuth] = useState<{ logged: boolean; name?: string }>({ logged: false, name: undefined })

  function newConversation(folderId?: string | null) {
    const conv = createConversation('Nouvelle conversation', folderId ?? null)
    setActiveConversation(conv.id)
    // if mobile, close drawer
    setDrawerOpen(false)
  }

  function createFolderClick() {
    const t = folderName.trim()
    if (!t) return
    createFolder(t)
    setFolderName('')
  }

  function toggleFolder(id: string) {
    setExpandedFolders(p => ({ ...p, [id]: !p[id] }))
  }

  function toggleAuth() {
    setAuth(a => a.logged ? { logged: false } : { logged: true, name: 'Dr. Aurora' })
  }

  const ungrouped = conversations.filter(c => !c.folderId)

  return (
    <>
      {/* mobile: burger top-left (visible only on small screens) */}
      <div className="md:hidden p-3 fixed top-3 left-3 z-50">
        <button
          aria-label="Ouvrir le menu"
          onClick={() => setDrawerOpen(true)}
          className="px-3 py-2 rounded-lg bg-[var(--color-surface)] shadow"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Desktop sidebar (visible on md and up) */}
      <aside className="sidebar hidden md:flex flex-col h-full p-5" style={{ minWidth: 300 }}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[var(--color-accent)]/20 text-[var(--color-primary)] font-bold">A</div>
            <div>
              <div className="text-lg font-semibold">Aura IA</div>
              <div className="text-xs text-[var(--color-text-muted)]">Assistant nouvelle génération</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="mb-4 space-y-3">
          <button onClick={() => newConversation(null)} className="w-full px-4 py-3 rounded-2xl bg-[var(--color-primary)] text-white font-semibold shadow-md">
            <Plus size={16} /> Nouvelle conversation
          </button>

          <div className="flex gap-2">
            <input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Nom du dossier"
              className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-transparent"
            />
            <button onClick={createFolderClick} className="px-3 py-2 rounded-lg bg-[var(--color-accent)] text-white">
              <FolderPlus size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto pr-2 space-y-3">
          {folders.length > 0 && folders.map(folder => (
            <div key={folder.id}>
              <div className="flex items-center justify-between">
                <button onClick={() => toggleFolder(folder.id)} className="flex-1 text-left px-2 py-2 rounded-lg hover:bg-[var(--color-bg)]">
                  <div className="flex items-center gap-2">
                    <FolderPlus size={14} className="text-[var(--color-primary)]" />
                    <span className="font-medium">{folder.title}</span>
                  </div>
                </button>
                <button onClick={() => newConversation(folder.id)} className="ml-2 px-2 py-2 rounded-md bg-[var(--color-primary-600)] text-white">
                  <Plus size={14} />
                </button>
              </div>

              {expandedFolders[folder.id] && (
                <div className="ml-4 mt-2 space-y-2">
                  {conversations.filter(c => c.folderId === folder.id).map(c => <ConversationItem key={c.id} conv={c} />)}
                  {conversations.filter(c => c.folderId === folder.id).length === 0 && <div className="text-xs text-[var(--color-text-muted)] px-2">Aucune conversation</div>}
                </div>
              )}
            </div>
          ))}

          <div>
            {ungrouped.length > 0 && <div className="mb-2 text-xs text-[var(--color-text-muted)] px-2">Conversations</div>}
            <div className="space-y-2 px-1">
              {ungrouped.map(c => <ConversationItem key={c.id} conv={c} />)}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-transparent space-y-2">
          <div className="flex gap-2">
            <button onClick={() => setShowSettings(true)} className="flex-1 px-3 py-2 rounded-lg border bg-[var(--color-surface)] shadow-sm">
              <IconSettings size={14} /> <span className="ml-2 text-sm">Paramètres</span>
            </button>

            <button onClick={() => clearAll()} className="flex-1 px-3 py-2 rounded-lg border bg-transparent text-[var(--color-text-muted)]">
              <Trash2 size={14} /> <span className="ml-2 text-sm">Vider</span>
            </button>
          </div>

          <div>
            <button onClick={toggleAuth} className="w-full px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white">
              {auth.logged ? 'Déconnexion' : 'Connexion'}
            </button>
          </div>
        </div>

        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </aside>

      {/* Mobile drawer (overlay) */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-80 bg-[var(--color-surface)] p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--color-accent)]/20 text-[var(--color-primary)] font-bold">A</div>
                <div>
                  <div className="text-md font-semibold">Aura IA</div>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="px-2 py-2 rounded-md">
                <X size={18} />
              </button>
            </div>

            <div className="mb-4 space-y-3">
              <button onClick={() => newConversation(null)} className="w-full px-4 py-3 rounded-2xl bg-[var(--color-primary)] text-white">Nouvelle conversation</button>
              <div className="flex gap-2">
                <input value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Nom du dossier" className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-surface)]" />
                <button onClick={() => { createFolderClick(); setDrawerOpen(false) }} className="px-3 py-2 rounded-lg bg-[var(--color-accent)] text-white">
                  <FolderPlus size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {folders.map(folder => (
                <div key={folder.id} className="mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FolderPlus size={14} />
                      <div>{folder.title}</div>
                    </div>
                    <button onClick={() => newConversation(folder.id)} className="ml-2 px-2 py-2 rounded-md bg-[var(--color-primary-600)] text-white">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 space-y-2">
                {conversations.map(c => <ConversationItem key={c.id} conv={c} />)}
              </div>
            </div>

            <div className="mt-4">
              <button onClick={() => { setShowSettings(true); setDrawerOpen(false) }} className="w-full px-4 py-2 rounded-lg bg-[var(--color-surface)] shadow-sm">Paramètres</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
