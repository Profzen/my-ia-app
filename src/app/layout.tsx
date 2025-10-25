// src/app/layout.tsx
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import { StoreProvider } from '@/lib/store'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system">
          <StoreProvider>
            <div className="app-shell">
              {children}
            </div>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
