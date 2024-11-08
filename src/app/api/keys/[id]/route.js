import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(request, { params }) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { id } = params

    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting API key:', error)
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error in DELETE handler:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function PUT(request, { params }) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { name } = await request.json()
    const { id } = params

    const { data, error } = await supabase
      .from('api_keys')
      .update({ name })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating API key:', error)
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
    console.error('Error in PUT handler:', error)
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
} 