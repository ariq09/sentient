import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import SentientFeed from './SentientFeed'

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const signOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return <SentientFeed userEmail={user.email ?? ''} onSignOut={signOut} />
}
