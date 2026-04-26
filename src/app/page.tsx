'use client'

import { useState, useCallback, useEffect } from 'react'
import Topbar from '@/components/Topbar'
import Sidebar from '@/components/Sidebar'
import CardBlock, { CardData } from '@/components/CardBlock'
import CanvasToolbar from '@/components/CanvasToolbar'
import CommandPalette from '@/components/CommandPalette'
import { useDrag } from '@/hooks/useDrag'

const INITIAL_CARDS: CardData[] = [
  {
    id: '1', title: 'Product Roadmap Q4', x: 60, y: 50,
    body: 'Define key milestones for the spatial canvas launch. Prioritize block system, multiplayer sync, and onboarding flow.',
    iconColor: 'rgba(99,102,241,0.12)', iconStroke: '#818cf8',
    iconPath: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    tags: [{ label: '✦ active', bg: 'rgba(99,102,241,0.1)', color: '#818cf8' }, { label: 'on track', bg: 'rgba(16,185,129,0.1)', color: '#34d399' }],
    avatars: [{ initials: 'AJ', gradient: 'linear-gradient(135deg,#6366f1,#a78bfa)' }, { initials: 'ML', gradient: 'linear-gradient(135deg,#0ea5e9,#38bdf8)' }],
    meta: '4 subtasks',
  },
  {
    id: '2', title: 'Design Tokens', x: 400, y: 80,
    body: 'Establish color primitives, spacing scale, and type ramp. Export to Figma variables + CSS custom properties.',
    iconColor: 'rgba(16,185,129,0.1)', iconStroke: '#34d399',
    iconPath: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    tags: [{ label: '✓ done', bg: 'rgba(16,185,129,0.1)', color: '#34d399' }],
    avatars: [{ initials: 'SR', gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)' }],
    meta: '8 tokens',
  },
  {
    id: '3', title: 'Performance Audit', x: 120, y: 290,
    body: 'Canvas render budget: 16ms/frame target. Audit virtualization for 1000+ block workspaces. Profile DOM diff cost.',
    iconColor: 'rgba(245,158,11,0.1)', iconStroke: '#fbbf24',
    iconPath: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    tags: [{ label: '⚡ in review', bg: 'rgba(245,158,11,0.1)', color: '#fbbf24' }, { label: 'high priority', bg: 'rgba(239,68,68,0.08)', color: '#f87171' }],
    avatars: [{ initials: 'AJ', gradient: 'linear-gradient(135deg,#6366f1,#a78bfa)' }, { initials: 'KP', gradient: 'linear-gradient(135deg,#ec4899,#f9a8d4)' }],
    meta: 'Due Nov 12',
  },
]

const CARD_COLORS = [
  { iconColor: 'rgba(99,102,241,0.12)', iconStroke: '#818cf8', iconPath: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>', tags: [{ label: '✦ draft', bg: 'rgba(99,102,241,0.1)', color: '#818cf8' }] },
  { iconColor: 'rgba(236,72,153,0.1)', iconStroke: '#f472b6', iconPath: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>', tags: [{ label: '★ starred', bg: 'rgba(236,72,153,0.1)', color: '#f472b6' }] },
  { iconColor: 'rgba(20,184,166,0.1)', iconStroke: '#2dd4bf', iconPath: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', tags: [{ label: '◎ pending', bg: 'rgba(20,184,166,0.1)', color: '#2dd4bf' }] },
]

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS)
  const [zoom, setZoom] = useState(100)
  const { canvasRef, onDragStart, onMouseMove, onMouseUp } = useDrag(cards, setCards)

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(v => !v) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const addCard = useCallback(() => {
    const color = CARD_COLORS[cards.length % CARD_COLORS.length]
    setCards(prev => [...prev, {
      id: String(Date.now()),
      title: 'Untitled Block',
      body: '',
      x: 60 + (prev.length * 30) % 200,
      y: 160 + (prev.length * 20) % 120,
      avatars: [],
      meta: '0 subtasks',
      ...color,
    }])
  }, [cards.length])

  const updateCard = useCallback((id: string, field: 'title' | 'body', value: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))
  }, [])

  const handleZoom = useCallback((delta: number) => {
    setZoom(z => Math.max(50, Math.min(200, z + delta)))
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Topbar
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(v => !v)}
        onOpenCommand={() => setCmdOpen(true)}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(v => !v)} />

        {/* Canvas */}
        <div
          ref={canvasRef}
          style={{
            flex: 1, position: 'relative', overflow: 'hidden',
            backgroundColor: '#020617',
            backgroundImage: 'radial-gradient(circle, rgba(51,65,85,0.5) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            cursor: 'default',
          }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Status hint */}
          <div style={{
            position: 'absolute', top: 16, right: 16,
            background: 'var(--glass)', backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-2)', borderRadius: 8,
            padding: '6px 10px', fontSize: 11, color: 'var(--text-3)',
            fontFamily: 'var(--mono)', zIndex: 50,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span className="pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            {cards.length} blocks · drag to arrange
          </div>

          {/* Cards */}
          {cards.map(card => (
            <div key={card.id} id={`card-${card.id}`}>
              <CardBlock card={card} onDragStart={onDragStart} onUpdate={updateCard} />
            </div>
          ))}

          <CanvasToolbar onAddCard={addCard} zoom={zoom} onZoom={handleZoom} />
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        height: 26, background: 'rgba(2,6,23,0.9)', borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', padding: '0 12px', gap: 16,
        fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)', flexShrink: 0,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
        <span>synced</span>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        <span>{cards.length} blocks</span>
        <span style={{ color: 'var(--border-2)' }}>·</span>
        <span>Sprint Canvas</span>
        <div style={{ flex: 1 }} />
        <span style={{ color: 'var(--accent-2)' }}>Vellum v0.1.0</span>
      </div>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  )
}
