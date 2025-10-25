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
    <button onClick={()=> setTheme(current === 'dark' ? 'light' : 'dark')} className="px-3 py-1 rounded-md border">
      {current === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
