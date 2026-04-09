'use client'

import { useState, useEffect, useRef } from 'react'

// Typewriter effect component — cycles through an array of strings,
// typing and deleting each one. Intended for the landing page hero
// or any display heading. Not wired up to any page yet.

interface TypewriterProps {
  phrases: string[]
  typingSpeed?: number   // ms per character typed
  deletingSpeed?: number // ms per character deleted
  pauseMs?: number       // ms to hold the completed phrase before deleting
  className?: string
  cursorClassName?: string
}

type Phase = 'typing' | 'pausing' | 'deleting'

export default function Typewriter({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseMs = 1800,
  className,
  cursorClassName,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const [index, setIndex] = useState(0)
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (phrases.length === 0) return
    const current = phrases[index % phrases.length]

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        frameRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, typingSpeed)
      } else {
        frameRef.current = setTimeout(() => setPhase('pausing'), pauseMs)
      }
    }

    if (phase === 'pausing') {
      frameRef.current = setTimeout(() => setPhase('deleting'), 0)
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        frameRef.current = setTimeout(() => {
          setDisplayed(prev => prev.slice(0, -1))
        }, deletingSpeed)
      } else {
        setIndex(i => i + 1)
        setPhase('typing')
      }
    }

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current)
    }
  }, [displayed, phase, index, phrases, typingSpeed, deletingSpeed, pauseMs])

  return (
    <span className={className}>
      {displayed}
      <span
        className={`inline-block w-[2px] h-[1em] align-middle ml-0.5 rounded-sm
          animate-pulse bg-current ${cursorClassName ?? ''}`}
      />
    </span>
  )
}

// Example usage:
//
// <Typewriter
//   phrases={['a Lamp.', 'a Plant.', 'a Book.', 'a Camera.']}
//   className="text-[#6366F1] font-display font-bold"
// />
//
// Renders as: "Log into being  a Lamp.|"  (cursor blinks)
