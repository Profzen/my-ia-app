// src/app/settings/page.tsx
'use client'
import React, { useState } from 'react'
import Sidebar from '@/components/ui/Sidebar'
import { useTheme } from 'next-themes'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState('fr')

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 p-6 container-max">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Paramètres</h1>
          <p className="text-[var(--color-text-muted)]">Personnalisation de l'interface (thème, langue, préférences IA).</p>
        </header>

        <section className="card p-4">
          <div className="mb-4">
            <label className="block mb-2 text-sm text-[var(--color-text-muted)]">Langue de l'interface</label>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="p-2 rounded-md border">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-[var(--color-text-muted)]">Thème</label>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-md border" onClick={() => setTheme('light')}>Clair</button>
              <button className="px-3 py-1 rounded-md border" onClick={() => setTheme('dark')}>Sombre</button>
              <button className="px-3 py-1 rounded-md border" onClick={() => setTheme('system')}>Système</button>
            </div>
          </div>

          <div>
            <p className="text-[var(--color-text-muted)] text-sm">Autres préférences (ex: ton de génération) seront ajoutées plus tard.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
