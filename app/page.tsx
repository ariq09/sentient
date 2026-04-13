import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
const a = 0;
export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <main className="w-full min-h-screen bg-[#3037ff] flex items-center justify-center relative overflow-hidden px-4">
      

      <section
        className="flex flex-col items-center justify-center w-full max-w-5xl h-fit absolute top-80 -translate-y-1/2 gap-10 z-[61] text-center px-4"
        aria-label="Sentient Hero Section"
      >
        <article className="flex flex-col items-center justify-center text-white gap-3">
          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-bold leading-tight">
            Welcome to Sentient.
          </h1>
          <h2 className="text-lg sm:text-xl md:text-xl lg:text-3xl leading-snug">
            {user
              ? `Good to see you, ${user.email}`
              : 'Sign in or create an account to get started'}
          </h2>
        </article>

        {user ? (
          /* ── Logged-in state ── */
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="CustomGlass w-fit h-fit p-1">
              <a
                href="/feed"
                className="rounded-2xl flex items-center gap-2 px-6 py-3 bg-white text-black font-extrabold text-sm whitespace-nowrap hover:bg-white/90 transition-colors"
              >
                Go to Feed
              </a>
            </div>

            <div className="CustomGlass w-fit h-fit p-1">
              <form action={signOut}>
                <button
                  type="submit"
                  className="rounded-2xl px-6 py-3 bg-white text-black font-extrabold text-sm whitespace-nowrap hover:bg-white/90 transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ── Logged-out state ── */
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="CustomGlass w-fit h-fit p-1">
              <a
                href="/signup"
                className="rounded-3xl flex items-center gap-2 px-6 py-3 bg-white text-black text-sm whitespace-nowrap hover:bg-white/90 transition-colors"
              >
                Sign Up
              </a>
            </div>

            <div className="CustomGlass w-fit h-fit p-1">
              <a
                href="/login"
                className="rounded-3xl px-6 py-3 bg-white text-black text-sm whitespace-nowrap hover:bg-white/90 transition-colors inline-block"
              >
                Sign In
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}