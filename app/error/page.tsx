import { ThemeToggle } from '@/app/components/ThemeToggle'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] flex items-center justify-center px-4 font-sans">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-10 text-center shadow-xl">

        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[var(--app-text)] mb-3 font-display">Something went wrong</h1>
        <p className="text-[var(--app-text-2)] text-sm leading-relaxed mb-8">
          An unexpected error occurred. Even objects malfunction sometimes.
        </p>

        <a
          href="/login"
          className="inline-block px-6 py-2.5 text-sm font-semibold text-[#6366F1] border border-[#6366F1]/30 rounded-xl hover:bg-[#6366F1]/10 transition-colors"
        >
          Back to login
        </a>
      </div>
    </div>
  )
}
