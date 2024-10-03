// libs/hooks/client-profile/useGallery.js

import { useState, useEffect } from 'react'
import { db, storage } from '@/libs/firebase' // Ensure correct import
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

const useGallery = (clientId) => {
  const [galleries, setGalleries] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(null)

  // Fetch galleries from Firestore
  const fetchGalleries = async () => {
    if (!clientId) {
      setGalleries([])
      return
    }
    try {
      const galleriesCol = collection(db, 'clients', clientId, 'galleries')
      const galleriesSnapshot = await getDocs(galleriesCol)
      const galleriesList = await Promise.all(
        galleriesSnapshot.docs.map(async (docSnap) => {
          const photosSnapshot = await getDocs(
            collection(
              db,
              'clients',
              clientId,
              'galleries',
              docSnap.id,
              'photos'
            )
          )
          const photosList = photosSnapshot.docs.map((photoDoc) =>
            photoDoc.data()
          )
          return {
            id: docSnap.id,
            ...docSnap.data(),
            photos: photosList,
          }
        })
      )
      setGalleries(galleriesList)
    } catch (err) {
      console.error('Error fetching galleries:', err)
      setError('Failed to fetch galleries.')
    }
  }

  // Create a new gallery
  const createGallery = async (name, date, files) => {
    if (!clientId) {
      setError('Client ID is missing.')
      return
    }
    setIsCreating(true)
    try {
      // Create a new gallery document
      const galleriesCol = collection(db, 'clients', clientId, 'galleries')
      const newGalleryRef = await addDoc(galleriesCol, {
        name,
        date: new Date(date), // Ensure date is stored as Firestore Timestamp
        createdAt: serverTimestamp(),
      })

      // Upload each file to Firebase Storage
      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(
          storage,
          `clients/${clientId}/galleries/${newGalleryRef.id}/${file.name}`
        )
        const snapshot = await uploadBytes(storageRef, file)
        const url = await getDownloadURL(snapshot.ref)
        return { name: file.name, url }
      })

      const uploadedPhotos = await Promise.all(uploadPromises)

      // Save photo URLs in Firestore
      const photosCol = collection(
        db,
        'clients',
        clientId,
        'galleries',
        newGalleryRef.id,
        'photos'
      )
      const addPhotoPromises = uploadedPhotos.map((photo) =>
        addDoc(photosCol, photo)
      )
      await Promise.all(addPhotoPromises)

      // Refresh galleries list
      await fetchGalleries()
    } catch (err) {
      console.error('Error creating gallery:', err)
      setError('Failed to create gallery.')
    } finally {
      setIsCreating(false)
    }
  }

  // Delete a gallery
  const deleteGallery = async (galleryId) => {
    if (!clientId) {
      setError('Client ID is missing.')
      return
    }
    setIsDeleting(true)
    try {
      // Fetch all photos in the gallery to delete from Storage
      const photosCol = collection(
        db,
        'clients',
        clientId,
        'galleries',
        galleryId,
        'photos'
      )
      const photosSnapshot = await getDocs(photosCol)
      const deletePromises = photosSnapshot.docs.map(async (docSnap) => {
        const photo = docSnap.data()
        const storageRef = ref(
          storage,
          `clients/${clientId}/galleries/${galleryId}/${photo.name}`
        )
        await deleteObject(storageRef)
        return deleteDoc(
          doc(
            db,
            'clients',
            clientId,
            'galleries',
            galleryId,
            'photos',
            docSnap.id
          )
        )
      })

      await Promise.all(deletePromises)

      // Delete the gallery document
      await deleteDoc(doc(db, 'clients', clientId, 'galleries', galleryId))

      // Refresh galleries list
      await fetchGalleries()
    } catch (err) {
      console.error('Error deleting gallery:', err)
      setError('Failed to delete gallery.')
    } finally {
      setIsDeleting(false)
    }
  }

  // Initialize by fetching galleries
  useEffect(() => {
    fetchGalleries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId])

  return {
    galleries,
    isCreating,
    isDeleting,
    error,
    fetchGalleries,
    createGallery,
    deleteGallery,
  }
}

export default useGallery
