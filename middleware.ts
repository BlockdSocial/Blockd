
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // get cookie token
  const hasToken = req.cookies.get('token')

  // login & register routes
  if (['/'].includes(req.nextUrl.pathname)) {
    if (!hasToken) {
      return NextResponse.redirect(new URL('/auth/signup', req.url))
    }
  }
  if (['/auth/signup', '/auth/signin'].includes(req.nextUrl.pathname)) {
    if (hasToken) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}
