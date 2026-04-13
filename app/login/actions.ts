'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/feed')
}


export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const data = {
        email,
        password,
    }

    const { data: authData, error } = await supabase.auth.signUp(data)

    if (error) {
        console.error('Signup error:', error)
        let errorMessage = error.message
        
        if (errorMessage.toLowerCase().includes('already registered') || errorMessage.toLowerCase().includes('already exists')) {
            errorMessage = 'This email already is signedup and exists you cannot sign up with this email anymore'
        }
        redirect(`/signup?error=${encodeURIComponent(errorMessage)}`)
    }

    if (authData.user && authData.user.identities && authData.user.identities.length === 0) {
        const errorMessage = 'This email already is signedup and exists you cannot sign up with this email anymore'
        redirect(`/signup?error=${encodeURIComponent(errorMessage)}`)
    }

    if (authData.session) {
        
        revalidatePath('/', 'layout')
        redirect('/pickyourprofile')
    } else {
        
        redirect('/verify-email')
    }
}
