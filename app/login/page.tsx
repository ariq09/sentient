import Link from 'next/link'
import { login } from './actions'
import AuthLayout from '@/app/components/AuthLayout'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-[#6366F1] hover:text-[#818CF8] transition-colors">
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-5" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />

        <div>
          <label htmlFor="email-address" className="block text-sm font-medium text-[var(--app-text-2)] mb-1.5">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--app-elevated)] border border-[var(--app-border)] text-[var(--app-text)] placeholder:text-[var(--app-text-3)] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[var(--app-text-2)] mb-1.5">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--app-elevated)] border border-[var(--app-border)] text-[var(--app-text)] placeholder:text-[var(--app-text-3)] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          formAction={login}
          className="w-full py-3 px-4 rounded-xl bg-[#6366F1] text-white font-semibold text-sm hover:bg-[#818CF8] transition-colors shadow-lg shadow-[#6366F1]/20 mt-2"
        >
          Sign in
        </button>
      </form>
    </AuthLayout>
  )
}
