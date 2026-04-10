'use client'

import { useState, useRef } from 'react'

// Textarea with a live character count ring and shrinking counter.
// Intended to replace the plain <textarea> in the feed post composer.
// Not wired up yet — drop in as a swap for the existing textarea.

interface CharacterCountProps {
  name?: string
  placeholder?: string
  maxLength?: number
  rows?: number
  disabled?: boolean
  className?: string
}

function RingProgress({ value, max }: { value: number; max: number }) {
  const radius = 10
  const circumference = 2 * Math.PI * radius
  const ratio = Math.min(value / max, 1)
  const offset = circumference * (1 - ratio)

  const color =
    ratio >= 1     ? '#EF4444' :
    ratio >= 0.85  ? '#F59E0B' :
    '#6366F1'

  if (value === 0) return null

  return (
    <svg width="28" height="28" className="flex-shrink-0">
      {/* Track */}
      <circle
        cx="14" cy="14" r={radius}
        fill="none"
        stroke="var(--app-border)"
        strokeWidth="2.5"
      />
      {/* Fill */}
      <circle
        cx="14" cy="14" r={radius}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 14 14)"
        style={{ transition: 'stroke-dashoffset 0.15s ease, stroke 0.2s ease' }}
      />
      {/* Remaining count — only shown in the danger zone */}
      {ratio >= 0.85 && (
        <text
          x="14" y="14"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="7"
          fontWeight="600"
          fill={color}
        >
          {max - value}
        </text>
      )}
    </svg>
  )
}

export default function CharacterCount({
  name = 'status',
  placeholder = "What's resonating with you?",
  maxLength = 280,
  rows = 3,
  disabled = false,
  className,
}: CharacterCountProps) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)
  const over = value.length > maxLength

  return (
    <div className="flex flex-col gap-2">
      <textarea
        ref={ref}
        name={name}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className={`w-full bg-[var(--app-elevated)] border rounded-xl p-3
          text-[var(--app-text)] text-sm resize-none transition-all
          placeholder:text-[var(--app-text-3)]
          focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent
          disabled:opacity-50
          ${over ? 'border-red-500' : 'border-[var(--app-border)]'}
          ${className ?? ''}`}
      />
      <div className="flex items-center justify-end gap-2">
        <RingProgress value={value.length} max={maxLength} />
        {over && (
          <span className="text-xs text-red-400 font-medium">
            {value.length - maxLength} over limit
          </span>
        )}
      </div>
    </div>
  )
}
