import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isEmpty } from 'lodash'

// Set the paths that don't require the user to be signed in
const publicPaths = ['/images/*', '/auth/signin*', '/auth/signup*']

const isPublic = (path: string) => {
  return publicPaths.find(x =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  )
}

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request)
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  if (authToken === null || authToken === '') {
    // redirect the users to /pages/sign-in/[[...index]].ts
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('redirect_url', request.url)
    return NextResponse.redirect(signInUrl)
  }
  return NextResponse.next()
})

export const config = { matcher: '/((?!.*\\.).*)' }