// src/components/ui/ProfileMode.tsx
'use client'
import React from 'react'

export default function ProfileMode({ value, onChange }: { value:string, onChange:(v:string)=>void }) {
  const modes = [
    { key:'Chercheur', label:'🔬 Chercheur' },
    { key:'Designer', label:'🎨 Designer' },
    { key:'Dev', label:'💻 Dev' },
    { key:'Etudiant', label:'🎓 Étudiant' },
    { key:'Marketing', label:'📈 Marketing' },
  ]
  return (
    <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
      {modes.map(m => (
        <button key={m.key} onClick={()=>onChange(m.key)} style={{
          padding:'8px 12px', borderRadius:999, border: value===m.key ? '1px solid var(--color-primary)' : '1px solid transparent',
          background: value===m.key ? 'linear-gradient(90deg,var(--color-accent),var(--color-primary))' : 'transparent',
          color: value===m.key ? '#fff' : 'var(--color-text)', fontSize:13, cursor:'pointer'
        }}>{m.label}</button>
      ))}
    </div>
  )
}
