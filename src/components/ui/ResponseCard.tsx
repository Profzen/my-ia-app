// src/components/ui/ResponseCard.tsx
'use client'
import React from 'react'
import Button from './Button'

/**
 * Carte d'affichage d'une réponse et du prompt associé.
 * Place dans src/components/ui/ResponseCard.tsx
 */
export default function ResponseCard({ prompt, response, onSave }: { prompt: string, response: string, onSave?: () => void }) {
  return (
    <div className="card p-4 mb-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Prompt</div>
          <div className="mb-3 text-base">{prompt}</div>

          <div className="text-sm text-[var(--color-text-muted)] mb-2">Réponse</div>
          <div className="prose max-w-none">{response}</div>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="ghost" onClick={() => { navigator.clipboard?.writeText(response) }}>Copier</Button>
          {onSave && <Button onClick={onSave}>Sauvegarder</Button>}
        </div>
      </div>
    </div>
  )
}
