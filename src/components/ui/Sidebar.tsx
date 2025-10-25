// src/components/ui/Sidebar.tsx
'use client'
/**
 * Sidebar gauche — refonte visuelle soignée.
 * - Gros bouton "Nouvelle conversation" plein largeur
 * - Création dossier par bouton (évite problèmes de submit)
 * - Toggle thème très visible (bouton large)
 * - Liste scrollable
 * - Footer actions arrondies
 *
 * Emplacement: src/components/ui/Sidebar.tsx
 */

import React, { useState } from 'react'
import clsx from 'clsx'
import { Plus, FolderPlus, Settings, Trash2, Sun, Moon } from 'lucide-react'
import Button from './Button'
import ConversationItem from './ConversationItem'
import { useStore } from '@/lib/store'
import { useTheme } from 'next-themes'

export default function Sidebar() {
  const { conversations, createConversation, createFolder, clearAll } = useStore()
  const [folderName, setFolderName] = useState('')
  const { theme, setTheme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  // New conversation (strong CTA)
  function handleNewConversation() {
    createConversation('Nouvelle conversation')
  }

  // Create folder via button (no form submit surprises)
  function handleCreateFolderClick() {
    const t = folderName.trim()
    if (!t) return
    createFolder(t)
    setFolderName('')
  }

  // Prominent theme toggle
  function toggleTheme() {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <aside aria-label="Barre latérale" className="sidebar flex flex-col h-full">
      {/* TOP - branding + prominent theme toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-lg font-extrabold shadow-sm">
            IA
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight">IA Générative</div>
            <div className="text-xs text-[var(--color-text-muted)]">Conversations • {conversations.length}</div>
          </div>
        </div>

        {/* Big visible theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Basculer thème"
          className="ml-2 flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm hover:brightness-95 transition"
          title="Basculer thème"
        >
          {currentTheme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}
          <span className="text-sm">{currentTheme === 'dark' ? 'Clair' : 'Sombre'}</span>
        </button>
      </div>

      {/* CTA - Nouvelle conversation */}
      <div className="mb-4">
        <button
          onClick={handleNewConversation}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold shadow-md hover:brightness-95 transition"
        >
          <Plus size={16} />
          Nouvelle conversation
        </button>
      </div>

      {/* Quick search */}
      <div className="mb-3">
        <input
          aria-label="Rechercher une conversation"
          placeholder="Rechercher..."
          className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-transparent shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>

      {/* List of conversations (scrollable) */}
      <div className="flex-1 overflow-auto space-y-2 pb-4">
        {conversations.length === 0 ? (
          <div className="text-sm text-[var(--color-text-muted)] p-3">Aucune conversation — créez-en une</div>
        ) : (
          conversations.map(conv => <ConversationItem key={conv.id} conv={conv} />)
        )}
      </div>

      {/* Folder creation (inline, button-driven) */}
      <div className="mt-4 mb-4">
        <div className="flex gap-2">
          <input
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Nom du dossier"
            className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-transparent shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            aria-label="Nom du dossier"
          />
          <button
            onClick={handleCreateFolderClick}
            className={clsx('px-3 py-2 rounded-lg flex items-center gap-2 border shadow-sm transition', 'bg-[var(--color-accent)] text-white')}
            aria-label="Créer dossier"
          >
            <FolderPlus size={16} />
          </button>
        </div>
      </div>

      {/* Footer - actions */}
      <div className="mt-auto pt-3">
        <div className="flex gap-2">
          <button
            onClick={() => clearAll()}
            className="flex-1 px-3 py-2 rounded-lg border bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] transition"
          >
            <Trash2 size={14} /> <span className="ml-2 text-sm">Vider</span>
          </button>

          <button
            onClick={() => alert('Paramètres (placeholder)')}
            className="flex-1 px-3 py-2 rounded-lg border bg-[var(--color-surface)] shadow-sm hover:brightness-95 transition"
          >
            <Settings size={14} /> <span className="ml-2 text-sm">Paramètres</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
