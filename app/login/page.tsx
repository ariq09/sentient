import { login } from './actions'
import AuthLayout from '@/app/components/AuthLayout'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Or{' '}
          <a href="/signup" className="font-medium text-[#1e3a5f] hover:text-[#2d4a6f]">
            create a new account
          </a>
        </>
      }
    >
      <form className="mt-8 space-y-6">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              className="relative block w-full rounded-t-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#1e3a5f] sm:text-sm sm:leading-6 pl-3"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full rounded-b-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#1e3a5f] sm:text-sm sm:leading-6 pl-3"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            formAction={login}
            className="group relative flex w-full justify-center rounded-md bg-[#1e3a5f] px-3 py-3 text-sm font-semibold text-white hover:bg-[#2d4a6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3a5f] transition-colors"
          >
            Sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
