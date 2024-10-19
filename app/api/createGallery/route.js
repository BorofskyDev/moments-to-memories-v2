// app/api/createGallery/route.js

import { NextResponse } from 'next/server'
import { db } from '@/libs/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { clientId, galleryName, password } = await request.json()

    if (!clientId || !galleryName || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create the gallery document in Firestore
    const galleriesCol = collection(db, 'clients', clientId, 'galleries')
    const galleryRef = await addDoc(galleriesCol, {
      name: galleryName,
      passwordHash,
      createdAt: serverTimestamp(),
      images: [], // Initialize with an empty array or as per your schema
    })

    return NextResponse.json({ galleryId: galleryRef.id }, { status: 200 })
  } catch (error) {
    console.error('Error creating gallery:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
