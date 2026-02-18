import Link from 'next/link'
import { login } from './actions'
import AuthLayout from '@/app/components/AuthLayout'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle={
        <>
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 transition-all">
            Create one now
          </Link>
        </>
      }
    >
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" name="remember" className="w-4 h-4 rounded bg-white border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer" />
            <span className="ml-2 text-gray-700 hover:text-gray-900 transition-colors">Keep me signed in</span>
          </label>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Forgot password?</a>
        </div>

        <div className="relative pt-2">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-xl blur opacity-60 group-hover:opacity-80 transition-all duration-300"></div>
          <button
            formAction={login}
            className="relative w-full px-4 py-3.5 rounded-xl bg-white text-blue-600 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-blue-200"
          >
            <span className="relative z-10 text-black">Sign in</span>
            <svg className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
