import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="bg-[#F5F6FF] min-h-screen font-sans">

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#F5F6FF]/90 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-[#6366F1] font-display tracking-tight">
            sentient
          </a>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <a
                  href="/feed"
                  className="px-4 py-2 text-sm font-semibold text-[#6366F1] hover:text-[#818CF8] transition-colors"
                >
                  Go to Feed
                </a>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-[#6B7280] hover:text-[#1F2937] transition-colors"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#6B7280] hover:text-[#1F2937] transition-colors"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#6366F1] rounded-xl hover:bg-[#818CF8] transition-colors shadow-sm"
                >
                  Become an Object
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6366F1]/10 text-[#6366F1] rounded-full text-sm font-semibold mb-8">
          <span className="w-2 h-2 bg-[#6366F1] rounded-full animate-pulse inline-block" />
          Social, but make it weird
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1F2937] leading-[1.1] mb-6 font-display">
          Log out of yourself.<br />
          <span className="text-[#6366F1]">Log into Sentient.</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed">
          Sentient is a social space where people step into the perspective of everyday objects
          and share life from their side of the shelf.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <a
              href="/feed"
              className="px-8 py-4 text-base font-semibold text-white bg-[#6366F1] rounded-2xl hover:bg-[#818CF8] transition-all shadow-lg shadow-[#6366F1]/20"
            >
              Go to Feed
            </a>
          ) : (
            <>
              <a
                href="/signup"
                className="px-8 py-4 text-base font-semibold text-white bg-[#6366F1] rounded-2xl hover:bg-[#818CF8] transition-all shadow-lg shadow-[#6366F1]/20"
              >
                Become an Object
              </a>
              <a
                href="/login"
                className="px-8 py-4 text-base font-semibold text-[#6366F1] bg-white border-2 border-[#6366F1] rounded-2xl hover:bg-[#6366F1] hover:text-white transition-all"
              >
                Log In
              </a>
            </>
          )}
        </div>
      </section>

      {/* ── Brand tagline banner ── */}
      <section className="bg-[#6366F1] py-16">
        <p className="text-center text-2xl sm:text-3xl font-bold text-white/90 italic font-display px-6">
          &ldquo;Life from the other side of the shelf.&rdquo;
        </p>
      </section>

      {/* ── Features / example posts ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4 font-display">
            Ordinary objects. Unexpected perspectives.
          </h2>
          <p className="text-[#6B7280] text-lg">Here&apos;s what objects are saying right now.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Chairlin */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-xl flex-shrink-0">
                🪑
              </div>
              <div>
                <div className="font-bold text-[#1F2937] text-sm">Chairlin</div>
                <div className="text-[#6B7280] text-xs">Chair · just now</div>
              </div>
            </div>
            <p className="text-[#1F2937] text-sm leading-relaxed">
              &ldquo;Someone worked from me for 9 hours today.&rdquo;
            </p>
          </div>

          {/* Muguel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#818CF8]/10 flex items-center justify-center text-xl flex-shrink-0">
                ☕
              </div>
              <div>
                <div className="font-bold text-[#1F2937] text-sm">Muguel</div>
                <div className="text-[#6B7280] text-xs">Coffee Mug · 3m ago</div>
              </div>
            </div>
            <p className="text-[#1F2937] text-sm leading-relaxed">
              &ldquo;Third coffee already.&rdquo;
            </p>
          </div>

          {/* Rusty */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#A5B4FC]/20 flex items-center justify-center text-xl flex-shrink-0">
                💡
              </div>
              <div>
                <div className="font-bold text-[#1F2937] text-sm">Rusty</div>
                <div className="text-[#6B7280] text-xs">Desk Lamp · 12m ago</div>
              </div>
            </div>
            <p className="text-[#1F2937] text-sm leading-relaxed">
              &ldquo;Still on.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#0A0B14] py-28 text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-display">
          So? Tired of being yourself today?
        </h2>
        <p className="text-[#9CA3AF] text-lg mb-10">Let&apos;s become something else now.</p>
        <a
          href={user ? '/feed' : '/signup'}
          className="inline-block px-10 py-4 text-base font-semibold text-white bg-[#6366F1] rounded-2xl hover:bg-[#818CF8] transition-all shadow-lg shadow-[#6366F1]/25"
        >
          {user ? 'Go to Feed' : 'Become an Object'}
        </a>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0A0B14] border-t border-[#2D2F45] py-8 text-center">
        <p className="text-[#6B7280] text-sm">
          © {new Date().getFullYear()} Sentient &mdash; Life from the other side of the shelf.
        </p>
      </footer>

    </div>
  )
}
