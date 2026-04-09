'use client'

import { useState, useEffect, useCallback } from 'react'

// Lightweight toast notification system.
// Usage: const { toasts, push } = useToast()
//        push({ message: 'Posted!', type: 'success' })
//        Render <ToastStack toasts={toasts} onDismiss={dismiss} /> anywhere in a client layout.

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

const ICONS: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'i',
}

const COLORS: Record<ToastType, string> = {
  success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  error:   'bg-red-500/10 border-red-500/20 text-red-400',
  info:    'bg-[#6366F1]/10 border-[#6366F1]/20 text-[#818CF8]',
}

const ICON_COLORS: Record<ToastType, string> = {
  success: 'bg-emerald-500/20 text-emerald-400',
  error:   'bg-red-500/20 text-red-400',
  info:    'bg-[#6366F1]/20 text-[#818CF8]',
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 3500)
    return () => clearTimeout(t)
  }, [toast.id, onDismiss])

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium
        animate-in slide-in-from-right-4 fade-in duration-200 ${COLORS[toast.type]}`}
    >
      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${ICON_COLORS[toast.type]}`}>
        {ICONS[toast.type]}
      </span>
      <span>{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-auto opacity-50 hover:opacity-100 transition-opacity text-base leading-none"
      >
        ×
      </button>
    </div>
  )
}

export function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-80">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((opts: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { ...opts, id }])
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, push, dismiss }
}
