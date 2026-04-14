'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ThemeToggle } from './ThemeToggle'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: React.ReactNode
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] flex flex-col items-center justify-center py-12 px-4">

      {/* Subtle background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6366F1]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Theme toggle — top right */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <Link href="/" className="flex justify-center mb-10">
          <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-3">
            <Image
              src="/sentient-logo.png"
              alt="Sentient"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--app-text)] font-display mb-2">
            {title}
          </h2>
          <p className="text-sm text-[var(--app-text-2)]">{subtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-8 shadow-xl">
          {children}
        </div>

      </div>
    </div>
  )
}
