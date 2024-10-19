// libs/hooks/client-profile/useGallery.js

import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { db, storage } from '@/libs/firebase' // Ensure correct import paths
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

const useGallery = (clientId) => {
  const [galleries, setGalleries] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(null)
  const auth = getAuth()
  const user = auth.currentUser

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

  // Create a new gallery and return its ID
  const createGallery = async (name) => {
    if (!clientId) {
      setError('Client ID is missing.')
      return null
    }
    setIsCreating(true)

    try {
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Create a new gallery document in Firestore
      const galleriesCol = collection(db, 'clients', clientId, 'galleries')
      const newGalleryRef = await addDoc(galleriesCol, {
        name,
        createdAt: serverTimestamp(),
      })

      const newGallery = { id: newGalleryRef.id, name }

      setGalleries((prevGalleries) => [...prevGalleries, newGallery])

      return newGalleryRef.id
    } catch (err) {
      console.error('Error creating gallery:', err)
      setError('Failed to create gallery.')
      return null
    } finally {
      setIsCreating(false)
    }
  }

  // Add photos to a gallery with progress tracking
  const addPhotosToGallery = async (galleryId, files, onProgress) => {
    if (!clientId) {
      setError('Client ID is missing.')
      throw new Error('Client ID is missing.')
    }
    if (!galleryId) {
      setError('Gallery ID is missing.')
      throw new Error('Gallery ID is missing.')
    }
    if (!files || !Array.isArray(files)) {
      setError('Files must be an array.')
      throw new Error('Files must be an array.')
    }

    setIsCreating(true) // Reuse isCreating for adding photos

    try {
      if (!user) {
        throw new Error('User not authenticated')
      }

      const photosCol = collection(
        db,
        'clients',
        clientId,
        'galleries',
        galleryId,
        'photos'
      )

      const totalFiles = files.length
      let uploadedFiles = 0

      for (const file of files) {
        const storageRef = ref(
          storage,
          `clients/${clientId}/galleries/${galleryId}/${file.name}`
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
                  selectionStatus: false,
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

      // Refresh galleries list
      await fetchGalleries()
    } catch (error) {
      console.error('Error adding photos to gallery:', error)
      setError('Failed to add photos to gallery.')
      throw error
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
      if (!user) {
        throw new Error('User not authenticated')
      }

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
        await deleteObject(storageRef) // Delete the photo from Firebase Storage
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

  // Delete a specific photo
  const deletePhoto = async (galleryId, photoId, photoName) => {
    if (!clientId) {
      setError('Client ID is missing.')
      return
    }
    setIsDeleting(true)
    try {
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Delete the photo from Firebase Storage
      const storageRef = ref(
        storage,
        `clients/${clientId}/galleries/${galleryId}/${photoName}`
      )
      await deleteObject(storageRef)

      // Delete the photo document from Firestore
      await deleteDoc(
        doc(db, 'clients', clientId, 'galleries', galleryId, 'photos', photoId)
      )
    } catch (err) {
      console.error('Error deleting photo:', err)
      setError('Failed to delete photo.')
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
    deletePhoto,
    addPhotosToGallery,
  }
}

export default useGallery
