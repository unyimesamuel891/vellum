'use client'

interface CanvasToolbarProps {
  onAddCard: () => void
  zoom: number
  onZoom: (delta: number) => void
}

function ToolBtn({ children, active, title, onClick }: { children: React.ReactNode; active?: boolean; title?: string; onClick?: () => void }) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 8, cursor: 'pointer', border: 'none', fontFamily: 'inherit',
        background: active ? 'var(--accent-glow)' : 'transparent',
        color: active ? 'var(--accent-2)' : 'var(--text-2)',
        transition: 'all 0.12s',
      }}
      onMouseEnter={e => { if (!active) { (e.currentTarget).style.background='var(--surface-2)'; (e.currentTarget).style.color='var(--text)'; }}}
      onMouseLeave={e => { if (!active) { (e.currentTarget).style.background='transparent'; (e.currentTarget).style.color='var(--text-2)'; }}}
    >
      {children}
    </button>
  )
}

export default function CanvasToolbar({ onAddCard, zoom, onZoom }: CanvasToolbarProps) {
  return (
    <div style={{
      position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: 2,
      background: 'var(--glass)', backdropFilter: 'blur(20px)',
      border: '1px solid var(--border-2)', borderRadius: 12, padding: 6, zIndex: 50,
    }}>
      <ToolBtn active title="Select">
        <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M5 3l14 9-7 1-3 7z"/></svg>
      </ToolBtn>
      <ToolBtn title="Hand">
        <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
      </ToolBtn>

      <div style={{ width: 1, height: 20, background: 'var(--border-2)', margin: '0 4px' }} />

      <ToolBtn title="Add card" onClick={onAddCard}>
        <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x={3} y={3} width={18} height={18} rx={2}/><path d="M12 8v8M8 12h8"/></svg>
      </ToolBtn>
      <ToolBtn title="Add note">
        <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
      </ToolBtn>
      <ToolBtn title="Add image">
        <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x={3} y={3} width={18} height={18} rx={2}/><circle cx={8.5} cy={8.5} r={1.5}/><polyline points="21 15 16 10 5 21"/></svg>
      </ToolBtn>

      <div style={{ width: 1, height: 20, background: 'var(--border-2)', margin: '0 4px' }} />

      <ToolBtn title="Zoom out" onClick={() => onZoom(-10)}>
        <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1={5} y1={12} x2={19} y2={12}/></svg>
      </ToolBtn>
      <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)', padding: '0 4px', minWidth: 36, textAlign: 'center' }}>{zoom}%</span>
      <ToolBtn title="Zoom in" onClick={() => onZoom(10)}>
        <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1={12} y1={5} x2={12} y2={19}/><line x1={5} y1={12} x2={19} y2={12}/></svg>
      </ToolBtn>
    </div>
  )
}
