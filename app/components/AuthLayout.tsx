import Image from 'next/image'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: React.ReactNode
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f7] py-12 px-4 sm:px-6 lg:px-8">
      <Link href="/" className="mb-8 block">
        <div className="relative w-24 h-24">
          <Image
            src="/sentient-logo.png"
            alt="Sentient"
            fill
            className="object-contain"
          />
        </div>
      </Link>
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#1e3a5f]">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
