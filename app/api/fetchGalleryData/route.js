import { NextResponse } from 'next/server'
import { db } from '@/libs/firebase'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'

export async function POST(request) {
  const { clientId, galleryId } = await request.json()

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
    // Exclude sensitive data like passwordHash
    delete galleryData.passwordHash

    // Fetch photos
    const photosCol = collection(galleryRef, 'photos')
    const photosSnap = await getDocs(photosCol)
    const photos = photosSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    galleryData.images = photos

    return NextResponse.json({ gallery: galleryData }, { status: 200 })
  } catch (error) {
    console.error('Error fetching gallery data:', error)
    return NextResponse.json({ message: 'Server error.' }, { status: 500 })
  }
}
