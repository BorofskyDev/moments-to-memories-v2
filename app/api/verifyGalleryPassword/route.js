// app/api/verifyGalleryPassword/route.js

import { NextResponse } from 'next/server'
import { db } from '@/libs/firebase'
import { doc, getDoc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'
import { serialize } from 'cookie'

export async function POST(request) {
  try {
    const { clientId, galleryId, password } = await request.json()

    if (!clientId || !galleryId || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const galleryRef = doc(db, 'clients', clientId, 'galleries', galleryId)
    const gallerySnap = await getDoc(galleryRef)

    if (!gallerySnap.exists()) {
      return NextResponse.json(
        { message: 'Gallery not found' },
        { status: 404 }
      )
    }

    const { passwordHash } = gallerySnap.data()
    console.log('Password Hash from DB:', passwordHash)

    const isMatch = await bcrypt.compare(password, passwordHash)
    console.log('Password Match:', isMatch)

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Incorrect password' },
        { status: 401 }
      )
    }

    // Set a session cookie (HTTP-only)
    const cookie = serialize('galleryAuth', `${clientId}:${galleryId}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'strict',
    })

    const response = NextResponse.json(
      { message: 'Authentication successful' },
      { status: 200 }
    )
    response.headers.set('Set-Cookie', cookie)
    console.log('Authentication successful, cookie set.')
    return response
  } catch (error) {
    console.error('Error verifying password:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
