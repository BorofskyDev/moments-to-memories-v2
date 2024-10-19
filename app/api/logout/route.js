// app/api/logout/route.js

import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST(request) {
  try {
    const cookie = serialize('galleryAuth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
      path: '/',
      sameSite: 'strict',
    })

    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
    response.headers.set('Set-Cookie', cookie)
    return response
  } catch (error) {
    console.error('Error during logout:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
