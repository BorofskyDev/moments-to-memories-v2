// libs/hooks/client-profile/usePublicGallery.js

import { useState, useEffect } from 'react'
import { db, storage } from '@/libs/firebase'
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
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

const usePublicGallery = (clientId) => {
  const [galleries, setGalleries] = useState([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(null)

  // Fetch galleries from Firestore
  const fetchGalleries = async () => {
    if (!clientId) return
    setLoading(true)
    try {
      const galleriesCol = collection(
        db,
        'clients',
        clientId,
        'publicGalleries'
      )
      const galleriesSnapshot = await getDocs(galleriesCol)

      const galleriesList = await Promise.all(
        galleriesSnapshot.docs.map(async (docSnap) => {
          const photosSnapshot = await getDocs(
            collection(
              db,
              'clients',
              clientId,
              'publicGalleries',
              docSnap.id,
              'photos'
            )
          )
          const photosList = photosSnapshot.docs.map((photoDoc) => ({
            id: photoDoc.id,
            ...photoDoc.data(),
          }))
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
      const galleriesCol = collection(
        db,
        'clients',
        clientId,
        'publicGalleries'
      )
      const newGalleryRef = await addDoc(galleriesCol, {
        name,
        date,
        createdAt: serverTimestamp(),
      })
      const galleryId = newGalleryRef.id

      // Upload photos to Storage and add references to Firestore
      const photosCol = collection(
        db,
        'clients',
        clientId,
        'publicGalleries',
        galleryId,
        'photos'
      )

      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(
          storage,
          `clients/${clientId}/publicGalleries/${galleryId}/${file.name}`
        )
        const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file)
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref)

        await addDoc(photosCol, {
          name: file.name,
          url: downloadURL,
          uploadDate: serverTimestamp(),
        })
      })

      await Promise.all(uploadPromises)

      // Refresh galleries
      await fetchGalleries()
    } catch (err) {
      console.error('Error creating gallery:', err)
      setError('Failed to create gallery.')
    } finally {
      setIsCreating(false)
    }
  }

  // Add photos to an existing gallery
  const addPhotosToGallery = async (galleryId, files) => {
    if (!clientId || !galleryId) {
      setError('Client ID or Gallery ID is missing.')
      return
    }
    setIsCreating(true)
    try {
      const photosCol = collection(
        db,
        'clients',
        clientId,
        'publicGalleries',
        galleryId,
        'photos'
      )

      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(
          storage,
          `clients/${clientId}/publicGalleries/${galleryId}/${file.name}`
        )
        const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file)
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref)

        await addDoc(photosCol, {
          name: file.name,
          url: downloadURL,
          uploadDate: serverTimestamp(),
        })
      })

      await Promise.all(uploadPromises)

      // Refresh galleries
      await fetchGalleries()
    } catch (err) {
      console.error('Error adding photos to gallery:', err)
      setError('Failed to add photos to gallery.')
    } finally {
      setIsCreating(false)
    }
  }

  // Delete a gallery and its photos
  const deleteGallery = async (galleryId) => {
    if (!clientId || !galleryId) {
      setError('Client ID or Gallery ID is missing.')
      return
    }
    setIsDeleting(true)
    try {
      // Delete photos from Storage and Firestore
      const photosCol = collection(
        db,
        'clients',
        clientId,
        'publicGalleries',
        galleryId,
        'photos'
      )
      const photosSnapshot = await getDocs(photosCol)

      const deletePromises = photosSnapshot.docs.map(async (photoDoc) => {
        const photoData = photoDoc.data()
        const storageRef = ref(
          storage,
          `clients/${clientId}/publicGalleries/${galleryId}/${photoData.name}`
        )
        await deleteObject(storageRef)
        await deleteDoc(photoDoc.ref)
      })

      await Promise.all(deletePromises)

      // Delete the gallery document
      const galleryRef = doc(
        db,
        'clients',
        clientId,
        'publicGalleries',
        galleryId
      )
      await deleteDoc(galleryRef)

      // Refresh galleries
      await fetchGalleries()
    } catch (err) {
      console.error('Error deleting gallery:', err)
      setError('Failed to delete gallery.')
    } finally {
      setIsDeleting(false)
    }
  }

  // Delete a specific photo from a gallery
  const deletePhoto = async (galleryId, photoId, photoName) => {
    if (!clientId || !galleryId || !photoId || !photoName) {
      setError('Missing parameters.')
      return
    }
    setIsDeleting(true)
    try {
      // Delete photo from Storage
      const storageRef = ref(
        storage,
        `clients/${clientId}/publicGalleries/${galleryId}/${photoName}`
      )
      await deleteObject(storageRef)

      // Delete photo document from Firestore
      const photoRef = doc(
        db,
        'clients',
        clientId,
        'publicGalleries',
        galleryId,
        'photos',
        photoId
      )
      await deleteDoc(photoRef)

      // Refresh galleries
      await fetchGalleries()
    } catch (err) {
      console.error('Error deleting photo:', err)
      setError('Failed to delete photo.')
    } finally {
      setIsDeleting(false)
    }
  }

  // Fetch galleries on clientId change
  useEffect(() => {
    fetchGalleries()
  }, [clientId])

  return {
    galleries,
    isCreating,
    isDeleting,
    error,
    createGallery,
    addPhotosToGallery,
    deleteGallery,
    deletePhoto,
  }
}

export default usePublicGallery
