'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Render a same-size placeholder until mounted to avoid layout shift
  if (!mounted) {
    return <div className={`w-9 h-9 ${className ?? ''}`} suppressHydrationWarning />
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-elevated)] text-[var(--app-text-2)] hover:text-[var(--app-text)] hover:border-[#6366F1]/50 transition-all ${className ?? ''}`}
    >
      {isDark ? (
        /* Sun */
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" strokeLinecap="round" />
          <line x1="12" y1="21" x2="12" y2="23" strokeLinecap="round" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeLinecap="round" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeLinecap="round" />
          <line x1="1" y1="12" x2="3" y2="12" strokeLinecap="round" />
          <line x1="21" y1="12" x2="23" y2="12" strokeLinecap="round" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeLinecap="round" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeLinecap="round" />
        </svg>
      ) : (
        /* Moon */
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}
