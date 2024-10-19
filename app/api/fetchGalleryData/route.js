// app/api/fetchGalleryData/route.js

import { NextResponse } from 'next/server'
import { db } from '@/libs/firebase'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { parse } from 'cookie'

export async function POST(request) {
  try {
    const { clientId, galleryId } = await request.json()

    if (!clientId || !galleryId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const cookieHeader = request.headers.get('cookie')

    if (!cookieHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const cookies = parse(cookieHeader)
    const authCookie = cookies.galleryAuth

    if (!authCookie) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const [authClientId, authGalleryId] = authCookie.split(':')

    if (authClientId !== clientId || authGalleryId !== galleryId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const galleryRef = doc(db, 'clients', clientId, 'galleries', galleryId)
    const gallerySnap = await getDoc(galleryRef)

    if (!gallerySnap.exists()) {
      return NextResponse.json(
        { message: 'Gallery not found' },
        { status: 404 }
      )
    }

    const gallery = gallerySnap.data()
    console.log('Fetched Gallery:', gallery)

    const photosSnapshot = await getDocs(
      collection(db, 'clients', clientId, 'galleries', galleryId, 'photos')
    )
    const photos = photosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    console.log('Fetched Photos:', photos)

    const responseData = {
      gallery: {
        id: gallerySnap.id,
        name: gallery.name,
        createdAt: gallery.createdAt,
        images: photos,
      },
    }

    console.log('Response Data:', responseData)

    return NextResponse.json(responseData, { status: 200 })
  } catch (error) {
    console.error('Error fetching gallery data:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
