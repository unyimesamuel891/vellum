import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vellum — Spatial Workspace',
  description: 'A spatial-first alternative to Notion',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
