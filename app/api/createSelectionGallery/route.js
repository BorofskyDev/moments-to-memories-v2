// app/api/createSelectionGallery/route.js

import { db } from '@/libs/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  // Extract data
  const { clientId, galleryName, password } = await request.json()

  // Hash password and create gallery in 'selectionGalleries'
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  const galleriesCol = collection(db, 'clients', clientId, 'selectionGalleries')
  const galleryRef = await addDoc(galleriesCol, {
    name: galleryName,
    passwordHash,
    createdAt: serverTimestamp(),
  })

  return NextResponse.json({ galleryId: galleryRef.id })
}
