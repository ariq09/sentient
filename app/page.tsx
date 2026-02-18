import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f7] px-6">
      <div className="flex flex-col items-center gap-10 text-center max-w-lg">
        {/* Logo */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80">
          <Image
            src="/sentient-logo.png"
            alt="Sentient"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 256px, 320px"
          />
        </div>

        {/* Tagline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] tracking-tight">
            Sentient
          </h1>
          <p className="text-gray-600 text-lg">
            Where everyday objects come to life
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/login"
          className="group inline-flex items-center gap-2 rounded-full bg-[#1e3a5f] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#2d4a6f] hover:shadow-xl hover:scale-105"
        >
          Let&apos;s start
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  )
}
