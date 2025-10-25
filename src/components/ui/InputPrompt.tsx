// src/components/ui/InputPrompt.tsx
'use client'
import React, { useState } from 'react'
import Button from './Button'
import TemplatesPanel from './TemplatesPanel' // for small screen, optional
import { useStore } from '@/lib/store'
import { MOCK_RESPONSES } from '@/lib/mockResponses'

type Props = {
  value?: string
  onSubmitPrompt?: (prompt: string) => Promise<void> | void
}

/**
 * Champ de prompt qui envoie le message à la conversation via useStore.
 * Cette version gère l'envoi et déclenche une réponse mock (à appeler depuis parent si nécessaire).
 */
export default function InputPrompt({ value = '', onSubmitPrompt }: Props) {
  const [text, setText] = useState(value)
  const [loading, setLoading] = useState(false)
  const { addMessage } = useStore()

  async function send() {
    if (!text.trim()) return
    addMessage('user', text.trim())
    setLoading(true)
    setText('')
    // option : laisser parent s'occuper de la réponse; sinon on génère local
    try {
      if (onSubmitPrompt) {
        await onSubmitPrompt(text.trim())
      } else {
        // generate a mock reply locally
        await new Promise(r => setTimeout(r, 600 + Math.random() * 600))
        const resp = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
        addMessage('assistant', resp)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <label htmlFor="prompt" className="block mb-2 text-sm text-[var(--color-text-muted)]">Prompt</label>
      <textarea
        id="prompt"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écris ton prompt ici — ex: 'Résumé en 3 points…'"
        className="w-full p-4 rounded-lg border border-transparent shadow-sm resize-none min-h-[140px] focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-surface)]"
      />
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setText('')}>Effacer</Button>
          <Button variant="primary" onClick={send} disabled={loading}>{loading ? 'Génération…' : 'Générer'}</Button>
        </div>
        <div className="text-sm text-[var(--color-text-muted)]">Astuce : tu peux choisir un modèle ou utiliser le micro.</div>
      </div>
    </div>
  )
}
