'use client'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const NAV_ITEMS = {
  recent: [
    { icon: 'grid', label: 'Sprint Canvas', dot: true },
    { icon: 'file', label: 'Product Roadmap', active: true },
    { icon: 'clock', label: 'Weekly Sync Notes' },
  ],
  favorites: [
    { icon: 'star', label: 'Design System' },
    { icon: 'box', label: 'Architecture Docs' },
  ],
  spaces: [
    { icon: 'briefcase', label: 'Engineering' },
    { icon: 'users', label: 'Design' },
    { icon: 'bar-chart', label: 'Growth' },
  ],
}

function Icon({ name }: { name: string }) {
  const props = { width: 14, height: 14, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, viewBox: '0 0 24 24' }
  switch (name) {
    case 'grid': return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
    case 'file': return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    case 'clock': return <svg {...props}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    case 'star': return <svg {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    case 'box': return <svg {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
    case 'briefcase': return <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
    case 'users': return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    case 'bar-chart': return <svg {...props}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    case 'settings': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
    case 'chevron-left': return <svg {...props}><path d="M15 18l-6-6 6-6"/></svg>
    case 'plus': return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>
    default: return null
  }
}

function NavItem({ icon, label, active, dot }: { icon: string; label: string; active?: boolean; dot?: boolean }) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-100"
      style={{
        color: active ? 'var(--accent-2)' : 'var(--text-2)',
        background: active ? 'var(--accent-glow)' : 'transparent',
        border: active ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
        fontSize: 13,
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.08)'; if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; }}
    >
      <span style={{ opacity: active ? 1 : 0.7, flexShrink: 0 }}><Icon name={icon} /></span>
      <span style={{ flex: 1, fontWeight: active ? 500 : 400 }}>{label}</span>
      {dot && <span className="pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />}
    </div>
  )
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      style={{
        width: collapsed ? 0 : 232,
        flexShrink: 0,
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ width: 232, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 4px' }}>
          <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>workspace</span>
          <button
            onClick={onToggle}
            style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, cursor: 'pointer', color: 'var(--text-2)', background: 'transparent', border: 'none' }}
          >
            <Icon name="chevron-left" />
          </button>
        </div>

        {/* Recent */}
        <div style={{ padding: '16px 12px 8px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '0 8px', marginBottom: 4 }}>Recent</div>
          {NAV_ITEMS.recent.map(item => <NavItem key={item.label} {...item} />)}
        </div>

        <div style={{ height: 1, background: 'var(--border)', margin: '4px 12px' }} />

        {/* Favorites */}
        <div style={{ padding: '16px 12px 8px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '0 8px', marginBottom: 4 }}>Favorites</div>
          {NAV_ITEMS.favorites.map(item => <NavItem key={item.label} {...item} />)}
        </div>

        <div style={{ height: 1, background: 'var(--border)', margin: '4px 12px' }} />

        {/* Spaces */}
        <div style={{ padding: '16px 12px 8px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '0 8px', marginBottom: 4 }}>Spaces</div>
          {NAV_ITEMS.spaces.map(item => <NavItem key={item.label} {...item} />)}
        </div>

        {/* New Space */}
        <div style={{ padding: '0 12px', marginTop: 8 }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 8, cursor: 'pointer', color: 'var(--text-3)', fontSize: 12, border: '1px dashed var(--border-2)', transition: 'all 0.12s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color='var(--accent-2)'; el.style.borderColor='var(--accent)'; el.style.background='var(--accent-glow)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color='var(--text-3)'; el.style.borderColor='var(--border-2)'; el.style.background='transparent'; }}
          >
            <Icon name="plus" />
            New Space
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto', padding: 12, borderTop: '1px solid var(--border)' }}>
          <NavItem icon="settings" label="Settings" />
        </div>

      </div>
    </aside>
  )
}
