// app/api/createSelectionGallery/route.js

import { NextResponse } from 'next/server'
import { db } from '@/libs/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const body = await request.json()
    const { clientId, galleryName, password } = body

    if (!clientId || !galleryName || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10)

    // Reference to the selectionGalleries collection
    const galleriesCol = collection(
      db,
      'clients',
      clientId,
      'selectionGalleries'
    )

    // Create the new gallery
    const galleryRef = await addDoc(galleriesCol, {
      name: galleryName,
      passwordHash,
      createdAt: serverTimestamp(),
    })

    // Return the new gallery's ID
    return NextResponse.json({ id: galleryRef.id }, { status: 200 })
  } catch (error) {
    console.error('Error creating selection gallery:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
