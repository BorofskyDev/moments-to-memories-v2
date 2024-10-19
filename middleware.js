// middleware.js

import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protect gallery pages: /clients/:clientId/:galleryId/
  const galleryPageRegex = /^\/clients\/[^/]+\/[^/]+\//i

  if (galleryPageRegex.test(pathname)) {
    const cookie = request.headers.get('cookie') || ''
    const hasAuth = cookie.includes('galleryAuth=')

    if (!hasAuth) {
      // Allow the page to render, which will prompt for password
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/clients/:clientId/:galleryId/:path*'],
}
