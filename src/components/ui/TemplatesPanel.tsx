'use client'
import React from 'react'

export default function TemplatesPanel({ onSelect, small=false }: { onSelect?: (t:string)=>void, small?: boolean }) {
  const templates = [
    { id:'1', title:'Résumé 3 points', text:"Résume cet article scientifique en 3 points clairs et concis." },
    { id:'2', title:'Plan détaillé', text:"Propose un plan détaillé pour un article académique sur le sujet suivant : ..." },
    { id:'3', title:'Checklist validation', text:"Donne une checklist pour valider les expériences et analyses." },
    { id:'4', title:'Titres', text:"Propose 5 titres percutants et scientifiques pour cet article." }
  ]
  return (
    <div className={`p-3 card ${small ? 'text-sm' : ''}`}>
      <h4 className="font-semibold mb-3">Prompts & Templates</h4>
      <div className="grid gap-2">
        {templates.map(t=>(
          <button key={t.id} onClick={()=>onSelect?.(t.text)} className="text-left p-2 rounded-md hover:bg-[var(--color-bg)]">
            <div className="font-medium">{t.title}</div>
            <div className="text-xs text-[var(--color-text-muted)] truncate">{t.text}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
