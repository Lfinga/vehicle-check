import { createClient } from '@/server/supabase/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Get user role
  const { data: userData } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  const isAdmin = userData?.is_admin
  const path = request.nextUrl.pathname

  // Protect admin routes
  if (path.startsWith('/admin') && !isAdmin) {
    return NextResponse.redirect(new URL('/driver/dashboard', request.url))
  }

  // Protect driver routes
  if (path.startsWith('/driver') && isAdmin) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/driver/:path*']
}