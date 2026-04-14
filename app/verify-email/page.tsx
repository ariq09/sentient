import { ThemeToggle } from '@/app/components/ThemeToggle'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] flex items-center justify-center px-4 font-sans">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6366F1]/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-10 text-center shadow-xl">

        <div className="w-14 h-14 rounded-full bg-[#6366F1]/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#6366F1]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[var(--app-text)] mb-3 font-display">Check your email</h1>
        <p className="text-[var(--app-text-2)] text-sm leading-relaxed mb-8">
          We&apos;ve sent you a verification link. Click it to activate your account and start becoming something.
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
