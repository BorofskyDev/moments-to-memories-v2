// app/api/checkGalleryAuth/route.js

import { NextResponse } from 'next/server'
import { parse } from 'cookie'

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get('cookie')

    if (!cookieHeader) {
      return NextResponse.json({ isAuthenticated: false }, { status: 200 })
    }

    const cookies = parse(cookieHeader)
    const authCookie = cookies.galleryAuth

    if (!authCookie) {
      return NextResponse.json({ isAuthenticated: false }, { status: 200 })
    }

    // Optionally, verify the cookie's validity here (e.g., check against a database or token store)

    return NextResponse.json({ isAuthenticated: true }, { status: 200 })
  } catch (error) {
    console.error('Error checking authentication:', error)
    return NextResponse.json({ isAuthenticated: false }, { status: 200 })
  }
}
