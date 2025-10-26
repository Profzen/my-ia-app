// src/components/ui/SettingsPanel.tsx
'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { useStore } from '@/lib/store'

export default function SettingsPanel(){
  const { setTheme, theme } = useTheme() as any
  const { clearAll } = useStore()

  return (
    <div style={{padding:16}}>
      <h3 style={{margin:0, marginBottom:8}}>Paramètres</h3>
      <div style={{marginBottom:12}}>
        <label style={{display:'block',fontSize:13,marginBottom:6}}>Thème</label>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=> setTheme('light')} style={{padding:8,borderRadius:8}}>Clair</button>
          <button onClick={()=> setTheme('dark')} style={{padding:8,borderRadius:8}}>Sombre</button>
          <button onClick={()=> setTheme('system')} style={{padding:8,borderRadius:8}}>Système</button>
        </div>
      </div>

      <div>
        <button onClick={()=> { if(confirm('Réinitialiser tout le stockage local ?')) clearAll() }} style={{padding:10,borderRadius:10,background:'#fff',border:'1px solid rgba(16,24,40,0.06)'}}>Réinitialiser l’app</button>
      </div>
    </div>
  )
}
