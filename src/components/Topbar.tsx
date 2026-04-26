'use client'

interface TopbarProps {
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
  onOpenCommand: () => void
}

export default function Topbar({ sidebarCollapsed, onToggleSidebar, onOpenCommand }: TopbarProps) {
  return (
    <header style={{
      height: 44, background: 'rgba(2,6,23,0.9)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16, flexShrink: 0,
      backdropFilter: 'blur(12px)', zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 15, letterSpacing: '-0.02em' }}>
        <div style={{ width: 22, height: 22, background: 'var(--accent)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={13} height={13} viewBox="0 0 12 12" fill="none">
            <rect x={1} y={1} width={4} height={4} rx={1} fill="white" opacity={0.9}/>
            <rect x={7} y={1} width={4} height={4} rx={1} fill="white" opacity={0.5}/>
            <rect x={1} y={7} width={4} height={4} rx={1} fill="white" opacity={0.5}/>
            <rect x={7} y={7} width={4} height={4} rx={1} fill="white" opacity={0.9}/>
          </svg>
        </div>
        Vellum
      </div>

      {/* Sidebar toggle (shown when collapsed) */}
      {sidebarCollapsed && (
        <button
          onClick={onToggleSidebar}
          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', color: 'var(--text-2)', background: 'transparent', border: 'none' }}
        >
          <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      )}

      <div style={{ width: 1, height: 20, background: 'var(--border-2)' }} />

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)', fontSize: 13 }}>
        <span>Design</span>
        <span style={{ color: 'var(--text-3)' }}>/</span>
        <span>Q4 Planning</span>
        <span style={{ color: 'var(--text-3)' }}>/</span>
        <span style={{ color: 'var(--text)', fontWeight: 500 }}>Sprint Canvas</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Command palette button */}
      <button
        onClick={onOpenCommand}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px',
          background: 'var(--surface-2)', border: '1px solid var(--border-2)', borderRadius: 8,
          color: 'var(--text-2)', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor='var(--accent)'; el.style.color='var(--text)'; el.style.background='var(--accent-glow)'; }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor='var(--border-2)'; el.style.color='var(--text-2)'; el.style.background='var(--surface-2)'; }}
      >
        <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx={11} cy={11} r={8}/><path d="m21 21-4.35-4.35"/></svg>
        Search & commands
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, background: 'var(--bg-3)', border: '1px solid var(--border-2)', borderRadius: 4, padding: '1px 5px', color: 'var(--text-3)' }}>⌘K</span>
      </button>

      {/* Avatar */}
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: 'white', cursor: 'pointer' }}>
        AJ
      </div>
    </header>
  )
}
