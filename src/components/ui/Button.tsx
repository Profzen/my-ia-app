// src/components/ui/Button.tsx
'use client'
import React from 'react'
import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'outline'|'ghost', icon?: React.ReactNode }

export default function Button({ children, variant='primary', icon, className, ...props }: Props) {
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 focus:outline-none select-none'
  const map:Record<string,string> = {
    primary: 'bg-[var(--color-primary)] text-white shadow-sm hover:brightness-95',
    outline: 'bg-transparent text-[var(--color-text)] border border-neutral-200 hover:bg-[color-mix(in srgb,var(--color-primary) 4%,transparent)]',
    ghost: 'bg-transparent text-[var(--color-text-muted)] hover:bg-[color-mix(in srgb,var(--color-primary) 4%,transparent)]'
  }
  return <button className={clsx(base, map[variant], className)} {...props}>{icon && <span className="w-4 h-4">{icon}</span>}<span className="font-medium">{children}</span></button>
}

//test