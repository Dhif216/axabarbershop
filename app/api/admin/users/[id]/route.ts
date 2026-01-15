import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// Verify admin token
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return { valid: false, user: null, error: 'Unauthorized' }
  }

  const token = authHeader.slice(7)

  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      return { valid: false, user: null, error: 'Invalid token' }
    }

    return { valid: true, user }
  } catch {
    return { valid: false, user: null, error: 'Token verification failed' }
  }
}

// DELETE admin user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { valid, error: authError } = await verifyAdmin(request)

  if (!valid) {
    return NextResponse.json({ error: authError }, { status: 401 })
  }

  try {
    const userId = id

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete user' },
      { status: 500 }
    )
  }
}
