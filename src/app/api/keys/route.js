import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

// GET all API keys
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching API keys:', error)
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in GET handler:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// POST new API key
export async function POST(request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { name, monthlyLimit } = await request.json()

    const apiKey = `dandi-${nanoid(32)}`
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        {
          name,
          key: apiKey,
          monthly_limit: monthlyLimit,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating API key:', error)
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in POST handler:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
} 