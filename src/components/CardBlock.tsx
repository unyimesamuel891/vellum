'use client'

import { useRef, useEffect } from 'react'

export interface CardData {
  id: string
  title: string
  body: string
  x: number
  y: number
  iconColor: string
  iconStroke: string
  iconPath: string
  tags: { label: string; bg: string; color: string }[]
  avatars: { initials: string; gradient: string }[]
  meta: string
}

interface CardBlockProps {
  card: CardData
  onDragStart: (id: string, e: React.MouseEvent) => void
  onUpdate: (id: string, field: 'title' | 'body', value: string) => void
}

function ThreeDots() {
  return (
    <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx={12} cy={5} r={1}/><circle cx={12} cy={12} r={1}/><circle cx={12} cy={19} r={1}/>
    </svg>
  )
}

export default function CardBlock({ card, onDragStart, onUpdate }: CardBlockProps) {
  const titleRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current && titleRef.current.textContent !== card.title) {
      titleRef.current.textContent = card.title
    }
    if (bodyRef.current && bodyRef.current.textContent !== card.body) {
      bodyRef.current.textContent = card.body
    }
  }, [])

  return (
    <div
      className="animate-in"
      style={{
        position: 'absolute',
        left: card.x,
        top: card.y,
        width: 300,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)',
        zIndex: 10,
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Header */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px', borderBottom: '1px solid var(--border)', cursor: 'grab' }}
        onMouseDown={e => onDragStart(card.id, e)}
      >
        <div style={{ width: 28, height: 28, borderRadius: 7, background: card.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width={14} height={14} fill="none" stroke={card.iconStroke} strokeWidth={1.8} viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: card.iconPath }} />
        </div>
        <div
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text)', fontFamily: 'inherit', background: 'transparent', outline: 'none' }}
          onBlur={e => onUpdate(card.id, 'title', e.currentTarget.textContent || '')}
          onMouseDown={e => e.stopPropagation()}
        />
        <div
          style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, cursor: 'pointer', color: 'var(--text-3)', opacity: 0 }}
          className="card-menu"
        >
          <ThreeDots />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px' }}>
        <div
          ref={bodyRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Start typing…"
          style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-2)', outline: 'none', minHeight: 60 }}
          onBlur={e => onUpdate(card.id, 'body', e.currentTarget.textContent || '')}
        />
        <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
          {card.tags.map((tag, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 500, fontFamily: 'var(--mono)', background: tag.bg, color: tag.color }}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 14px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>{card.meta}</span>
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          {card.avatars.map((av, i) => (
            <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', border: '1.5px solid var(--surface)', marginLeft: i === 0 ? 0 : -6, background: av.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 600, color: 'white' }}>
              {av.initials}
            </div>
          ))}
        </div>
      </div>

      <style suppressHydrationWarning>{`.card-menu { opacity: 0; transition: opacity 0.12s; } div:hover > .card-menu { opacity: 1; }`}</style>
    </div>
  )
}
