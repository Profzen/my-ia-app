// src/components/ui/SettingsModal.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useStore } from '@/lib/store'

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const { setTheme } = useTheme() as any
  const { clearAll } = useStore()
  const [lang, setLang] = useState('fr')
  const [profileName, setProfileName] = useState('')
  const [profileType, setProfileType] = useState('Chercheur')
  const [domain, setDomain] = useState('')

  useEffect(() => {
    // prevent scroll behind modal
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  function handleReset() {
    if (confirm('Réinitialiser les données locales ?')) {
      clearAll()
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-70 w-full max-w-lg bg-[var(--color-surface)] rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Paramètres</h3>
          <button onClick={onClose} className="px-2 py-1 rounded">Fermer</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-1">Langue</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="w-full p-2 rounded-lg border">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-1">Thème</label>
            <div className="flex gap-2">
              <button onClick={() => setTheme('light')} className="p-2 rounded-lg border">Clair</button>
              <button onClick={() => setTheme('dark')} className="p-2 rounded-lg border">Sombre</button>
              <button onClick={() => setTheme('system')} className="p-2 rounded-lg border">Système</button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-1">Nom d'utilisateur</label>
            <input value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Ton nom" className="w-full p-2 rounded-lg border" />
          </div>

          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-1">Type de profil</label>
            <select value={profileType} onChange={(e) => setProfileType(e.target.value)} className="w-full p-2 rounded-lg border">
              <option>Chercheur</option>
              <option>Designer</option>
              <option>Dev</option>
              <option>Étudiant</option>
              <option>Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-1">Domaine</label>
            <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="ex: Bioinformatique" className="w-full p-2 rounded-lg border" />
          </div>

          <div className="flex gap-2">
            <button onClick={handleReset} className="flex-1 px-3 py-2 rounded-lg border bg-[var(--color-danger)] text-white">Réinitialiser</button>
            <button onClick={onClose} className="flex-1 px-3 py-2 rounded-lg border">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  )
}
