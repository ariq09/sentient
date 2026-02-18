import { NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    
    const next = searchParams.get('next') ?? '/home'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            
            const { data: { user } } = await supabase.auth.getUser()
            const isNewSignup = user?.created_at
                ? (Date.now() - new Date(user.created_at).getTime()) < 5 * 60 * 1000
                : false
            const destination = isNewSignup ? `${next}?new_signup=1` : next

            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${destination}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${destination}`)
            } else {
                return NextResponse.redirect(`${origin}${destination}`)
            }
        }
    }

    
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
