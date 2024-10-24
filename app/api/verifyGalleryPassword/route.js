import { NextResponse } from 'next/server'
import { db } from '@/libs/firebase'
import { doc, getDoc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  const { clientId, galleryId, password } = await request.json()

  try {
    const galleryRef = doc(
      db,
      'clients',
      clientId,
      'selectionGalleries',
      galleryId
    )
    const gallerySnap = await getDoc(galleryRef)

    if (!gallerySnap.exists()) {
      return NextResponse.json(
        { message: 'Gallery not found.' },
        { status: 404 }
      )
    }

    const galleryData = gallerySnap.data()
    const passwordHash = galleryData.passwordHash

    const isMatch = await bcrypt.compare(password, passwordHash)

    if (isMatch) {
      // Here, you can set a session cookie or similar to maintain authentication
      return NextResponse.json({ message: 'Authenticated' }, { status: 200 })
    } else {
      return NextResponse.json(
        { message: 'Incorrect password.' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Error verifying password:', error)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
