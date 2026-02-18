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
      title="Create an account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 transition-all">
            Sign in here
          </Link>
        </>
      }
    >
      {error && (
        <div className="rounded-md bg-red-100 p-4 border border-red-200">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-900">Error</h3>
              <div className="mt-2 text-sm text-red-800">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <form className="mt-8 space-y-5 group" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="space-y-4">
          <div className="relative">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="relative block w-full px-4 py-3.5 pl-11 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-300"
              placeholder="Email address"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full px-4 py-3.5 pl-11 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:border-gray-300"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="relative pt-2">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-xl blur opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
          <button
            formAction={signup}
            className="relative w-full px-4 py-3.5 rounded-xl bg-white text-blue-600 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-blue-200"
          >
            <span className="relative z-10 text-black">Sign up</span>
            <svg className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
