// src/components/ui/ThemeToggle.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggle(){
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(()=> setMounted(true), [])
  if(!mounted) return null
  const current = theme === 'system' ? systemTheme : theme
  return (
    <button onClick={()=> setTheme(current === 'dark' ? 'light' : 'dark')} style={{padding:'8px 10px', borderRadius:10, border:'1px solid rgba(16,24,40,0.04)'}}>
      {current === 'dark' ? '☀️ Clair' : '🌙 Sombre'}
    </button>
  )
}
