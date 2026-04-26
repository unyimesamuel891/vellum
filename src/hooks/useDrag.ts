'use client'

import { useCallback, useRef } from 'react'
import { CardData } from '@/components/CardBlock'

export function useDrag(
  cards: CardData[],
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>
) {
  const dragging = useRef<{ id: string; ox: number; oy: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const onDragStart = useCallback((id: string, e: React.MouseEvent) => {
    const card = document.getElementById(`card-${id}`)
    if (!card) return
    const rect = card.getBoundingClientRect()
    dragging.current = { id, ox: e.clientX - rect.left, oy: e.clientY - rect.top }
    e.preventDefault()
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !canvasRef.current) return
    const { id, ox, oy } = dragging.current
    const cRect = canvasRef.current.getBoundingClientRect()
    const x = Math.max(0, e.clientX - cRect.left - ox)
    const y = Math.max(0, e.clientY - cRect.top - oy)
    setCards(prev => prev.map(c => c.id === id ? { ...c, x, y } : c))
  }, [setCards])

  const onMouseUp = useCallback(() => { dragging.current = null }, [])

  return { canvasRef, onDragStart, onMouseMove, onMouseUp }
}
