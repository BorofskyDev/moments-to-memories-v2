// libs/hooks/client-profile/useSelectionGallery.js

import { useState, useEffect } from 'react'
import { db, storage } from '@/libs/firebase'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

const useSelectionGallery = (clientId) => {
  const [galleries, setGalleries] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(null)

  // Fetch selection galleries from Firestore
  const fetchGalleries = async () => {
    if (!clientId) return
    try {
      const galleriesCol = collection(
        db,
        'clients',
        clientId,
        'selectionGalleries'
      )
      const galleriesSnapshot = await getDocs(galleriesCol)

      const galleriesList = await Promise.all(
        galleriesSnapshot.docs.map(async (docSnap) => {
          const galleryData = docSnap.data()
          // Exclude sensitive data like passwordHash
          const { passwordHash, ...rest } = galleryData

          // Fetch photos
          const photosSnapshot = await getDocs(
            collection(
              db,
              'clients',
              clientId,
              'selectionGalleries',
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
            ...rest,
            photos: photosList,
          }
        })
      )

      setGalleries(galleriesList)
    } catch (err) {
      console.error('Error fetching selection galleries:', err)
      setError('Failed to fetch selection galleries.')
    }
  }

  // Create a new selection gallery via API
  const createGallery = async (name, password) => {
    try {
      const response = await fetch('/api/createSelectionGallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, galleryName: name, password }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create gallery')
      }
      // Refresh galleries
      await fetchGalleries()
    } catch (err) {
      console.error('Error creating selection gallery:', err)
      setError(err.message)
    }
  }

  // Add photos to a selection gallery with progress tracking
  const addPhotosToGallery = async (galleryId, files, onProgress) => {
    if (!clientId || !galleryId) {
      setError('Client ID or Gallery ID is missing.')
      return
    }
    setIsUploading(true)
    try {
      const photosCol = collection(
        db,
        'clients',
        clientId,
        'selectionGalleries',
        galleryId,
        'photos'
      )

      const totalFiles = files.length
      let uploadedFiles = 0

      for (const file of files) {
        const storageRef = ref(
          storage,
          `clients/${clientId}/selectionGalleries/${galleryId}/${file.name}`
        )
        const uploadTask = uploadBytesResumable(storageRef, file)

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              if (onProgress) {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                const overallProgress = Math.round(
                  ((uploadedFiles + progress / 100) / totalFiles) * 100
                )
                onProgress(overallProgress)
              }
            },
            (error) => {
              console.error('Upload error:', error)
              reject(error)
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                )
                await addDoc(photosCol, {
                  name: file.name,
                  url: downloadURL,
                  uploadDate: serverTimestamp(),
                })
                uploadedFiles += 1
                if (onProgress) {
                  const overallProgress = Math.round(
                    (uploadedFiles / totalFiles) * 100
                  )
                  onProgress(overallProgress)
                }
                resolve()
              } catch (err) {
                console.error('Error adding photo to Firestore:', err)
                reject(err)
              }
            }
          )
        })
      }

      // Refresh galleries
      await fetchGalleries()
    } catch (err) {
      console.error('Error adding photos to selection gallery:', err)
      setError('Failed to add photos to selection gallery.')
    } finally {
      setIsUploading(false)
    }
  }

  // Delete a selection gallery and its photos
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
        'selectionGalleries',
        galleryId,
        'photos'
      )
      const photosSnapshot = await getDocs(photosCol)

      const deletePromises = photosSnapshot.docs.map(async (photoDoc) => {
        const photoData = photoDoc.data()
        const storageRef = ref(
          storage,
          `clients/${clientId}/selectionGalleries/${galleryId}/${photoData.name}`
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
        'selectionGalleries',
        galleryId
      )
      await deleteDoc(galleryRef)

      // Refresh galleries
      await fetchGalleries()
    } catch (err) {
      console.error('Error deleting selection gallery:', err)
      setError('Failed to delete selection gallery.')
    } finally {
      setIsDeleting(false)
    }
  }

  // Delete a specific photo from a selection gallery
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
        `clients/${clientId}/selectionGalleries/${galleryId}/${photoName}`
      )
      await deleteObject(storageRef)

      // Delete photo document from Firestore
      const photoRef = doc(
        db,
        'clients',
        clientId,
        'selectionGalleries',
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
    isUploading,
    isDeleting,
    error,
    createGallery,
    addPhotosToGallery,
    deleteGallery,
    deletePhoto,
  }
}

export default useSelectionGallery
