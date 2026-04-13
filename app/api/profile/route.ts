import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, fullName, bio, image, icon, selectedInterests } = body

    // Validate required fields
    if (!username || !image) {
      return NextResponse.json(
        { error: 'Username and image are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Insert profile into Supabase
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        name: username,
        photo_url: image,
        icon: icon,
      })
      .select()
      .single()

    console.error('Request body:', body)
    console.error('Supabase error:', error)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save profile', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        profileId: data?.id,
        data,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}
