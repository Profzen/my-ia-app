// src/components/ui/AudioRecorder.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react'

export default function AudioRecorder({ onResult }: { onResult:(t:string)=>void }) {
  const [listening, setListening] = useState(false)
  const recRef = useRef<any>(null)

  useEffect(()=> {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if(SpeechRecognition){
      const r = new SpeechRecognition()
      r.lang = 'fr-FR'
      r.interimResults = false
      r.maxAlternatives = 1
      r.onresult = (ev:any) => onResult(ev.results?.[0]?.[0]?.transcript || '')
      r.onend = () => setListening(false)
      recRef.current = r
    }
  }, [onResult])

  function toggle(){
    if(recRef.current){
      try { if(listening) recRef.current.stop(); else recRef.current.start(); setListening(s=>!s) } catch { setListening(false) }
      return
    }
    setListening(true)
    setTimeout(()=> { onResult('Transcription mock : saisie vocale'); setListening(false) }, 1200 + Math.random()*800)
  }

  return <button onClick={toggle} style={{padding:10,borderRadius:10, border:'1px solid rgba(16,24,40,0.04)', background:listening ? 'var(--color-primary)' : 'transparent', color: listening ? '#fff' : 'var(--color-text)'}}>{listening ? 'Arrêter' : '🎙️'}</button>
}
