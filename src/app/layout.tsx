// src/app/layout.tsx
import '../styles/globals.css' // <- chemin CORRECT vers src/styles/globals.css
import { ThemeProvider } from 'next-themes'
import { StoreProvider } from '@/lib/store'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Aura IA',
  description: 'Votre assistant IA nouvelle génération',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system">
          <StoreProvider>
            {children}
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
