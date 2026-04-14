import Link from 'next/link'
import { signup } from '@/app/login/actions'
import AuthLayout from '@/app/components/AuthLayout'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#6366F1] hover:text-[#818CF8] transition-colors">
            Sign in
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

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
          formAction={signup}
          className="w-full py-3 px-4 rounded-xl bg-[#6366F1] text-white font-semibold text-sm hover:bg-[#818CF8] transition-colors shadow-lg shadow-[#6366F1]/20 mt-2"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  )
}
