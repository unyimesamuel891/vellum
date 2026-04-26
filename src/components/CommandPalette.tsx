'use client'

import { useEffect, useRef, useState } from 'react'

const COMMANDS = [
  { group: 'Blocks', icon: '📄', label: 'New Text Block', sub: 'Add a rich text block to canvas', kbd: 'T' },
  { group: 'Blocks', icon: '🗂', label: 'New Card Block', sub: 'Structured block with header', kbd: 'C' },
  { group: 'Blocks', icon: '📊', label: 'New Database', sub: 'Table, board, or timeline view', kbd: 'D' },
  { group: 'Navigate', icon: '🗺', label: 'Jump to Space', sub: 'Engineering, Design, Growth…', kbd: '⌘G' },
  { group: 'Navigate', icon: '🔍', label: 'Full-text Search', sub: 'Search across all workspaces', kbd: '⌘F' },
  { group: 'Actions', icon: '⚡', label: 'Toggle Dark Mode', sub: '', kbd: '⌘⇧L' },
  { group: 'Actions', icon: '🔗', label: 'Copy Block Link', sub: '', kbd: '⌘L' },
]

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) { setQuery(''); setSelected(0); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1))
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const filtered = COMMANDS.filter(c =>
    !query || c.label.toLowerCase().includes(query.toLowerCase()) || c.sub.toLowerCase().includes(query.toLowerCase())
  )

  const groups = [...new Set(filtered.map(c => c.group))]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.7)', backdropFilter: 'blur(4px)',
        zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh',
        opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', transition: 'opacity 0.2s',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 520, background: 'rgba(15,23,42,0.97)', border: '1px solid var(--border-2)',
          borderRadius: 14, boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
          overflow: 'hidden',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.98)',
          transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
          <svg width={16} height={16} fill="none" stroke="var(--text-3)" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx={11} cy={11} r={8}/><path d="m21 21-4.35-4.35"/></svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0) }}
            placeholder="Search blocks, pages, commands…"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 15, color: 'var(--text)' }}
          />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, background: 'var(--bg-3)', border: '1px solid var(--border-2)', borderRadius: 4, padding: '1px 5px', color: 'var(--text-3)' }}>ESC</span>
        </div>

        {/* Results */}
        <div style={{ padding: 8, maxHeight: 320, overflowY: 'auto' }}>
          {groups.map(group => (
            <div key={group}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '8px 10px 4px' }}>{group}</div>
              {filtered.filter(c => c.group === group).map((cmd, i) => {
                const globalIdx = filtered.indexOf(cmd)
                return (
                  <div
                    key={cmd.label}
                    onMouseEnter={() => setSelected(globalIdx)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                      background: selected === globalIdx ? 'var(--accent-glow)' : 'transparent',
                      borderLeft: selected === globalIdx ? '2px solid var(--accent)' : '2px solid transparent',
                      marginLeft: -2,
                    }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>{cmd.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: 'var(--text)' }}>{cmd.label}</div>
                      {cmd.sub && <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{cmd.sub}</div>}
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-3)' }}>{cmd.kbd}</div>
                  </div>
                )
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>No results for "{query}"</div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>ESC close</span>
        </div>
      </div>
    </div>
  )
}
