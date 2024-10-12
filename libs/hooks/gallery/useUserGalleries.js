// libs/hooks/gallery/useUserGalleries.js

import { useState, useEffect } from 'react'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  arrayUnion,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/libs/firebase'
import { useAuth } from '@/libs/context/AuthContext'

const useUserGalleries = () => {
  const { user } = useAuth()
  const [galleries, setGalleries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch user's galleries
  const fetchGalleries = async () => {
    if (!user) return

    setLoading(true)
    setError(null)
    try {
      const galleriesRef = collection(db, 'galleries')
      const q = query(galleriesRef, where('userId', '==', user.uid))
      const snapshot = await getDocs(q)
      const fetchedGalleries = []
      snapshot.forEach((docSnap) => {
        fetchedGalleries.push({
          id: docSnap.id,
          ...docSnap.data(),
        })
      })
      setGalleries(fetchedGalleries)
    } catch (err) {
      console.error('Error fetching galleries:', err)
      setError('Failed to load galleries.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleries()
  }, [user])

  // Create a new gallery and return its data
  const createGallery = async (title, description) => {
    if (!user) throw new Error('User not authenticated')

    setLoading(true)
    setError(null)
    try {
      const galleriesRef = collection(db, 'galleries')
      const newGallery = {
        title,
        description,
        userId: user.uid,
        createdAt: new Date(),
        images: [],
      }
      const docRef = await addDoc(galleriesRef, newGallery)
      const createdGallery = { id: docRef.id, ...newGallery }
      setGalleries((prev) => [...prev, createdGallery])
      return createdGallery // Return the created gallery
    } catch (err) {
      console.error('Error creating gallery:', err)
      setError('Failed to create gallery.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Upload an image to a gallery
  const uploadImageToGallery = async (galleryId, imageFile) => {
    if (!user) throw new Error('User not authenticated')

    setLoading(true)
    setError(null)
    try {
      const storageRef = ref(
        storage,
        `userGalleries/${user.uid}/${galleryId}/${imageFile.name}`
      )
      const uploadTask = uploadBytesResumable(storageRef, imageFile)

      const downloadURL = await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error('Upload error:', error)
            reject(error)
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(url)
          }
        )
      })

      // Update gallery document with the new image URL using arrayUnion
      const galleryDocRef = doc(db, 'galleries', galleryId)
      await updateDoc(galleryDocRef, {
        images: arrayUnion(downloadURL),
      })

      // Update local state
      setGalleries((prevGalleries) =>
        prevGalleries.map((gallery) =>
          gallery.id === galleryId
            ? { ...gallery, images: [...gallery.images, downloadURL] }
            : gallery
        )
      )
    } catch (err) {
      console.error('Error uploading image:', err)
      setError('Failed to upload image.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Edit a gallery
  const editGallery = async (galleryId, updates) => {
    if (!user) throw new Error('User not authenticated')

    setLoading(true)
    setError(null)
    try {
      const galleryDocRef = doc(db, 'galleries', galleryId)
      await updateDoc(galleryDocRef, updates)

      // Update local state
      setGalleries((prevGalleries) =>
        prevGalleries.map((gallery) =>
          gallery.id === galleryId ? { ...gallery, ...updates } : gallery
        )
      )
    } catch (err) {
      console.error('Error updating gallery:', err)
      setError('Failed to update gallery.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete a gallery
  const deleteGallery = async (galleryId) => {
    if (!user) throw new Error('User not authenticated')

    setLoading(true)
    setError(null)
    try {
      const galleryDocRef = doc(db, 'galleries', galleryId)
      await deleteDoc(galleryDocRef)

      // Optionally, delete images from storage here

      // Update local state
      setGalleries((prevGalleries) =>
        prevGalleries.filter((g) => g.id !== galleryId)
      )
    } catch (err) {
      console.error('Error deleting gallery:', err)
      setError('Failed to delete gallery.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete an image from a gallery
  const deleteImageFromGallery = async (galleryId, imageUrl) => {
    if (!user) throw new Error('User not authenticated')

    setLoading(true)
    setError(null)
    try {
      // Optionally, delete the image from storage here

      // Update gallery document using arrayRemove
      const galleryDocRef = doc(db, 'galleries', galleryId)
      await updateDoc(galleryDocRef, {
        images: arrayRemove(imageUrl),
      })

      // Update local state
      setGalleries((prevGalleries) =>
        prevGalleries.map((g) =>
          g.id === galleryId
            ? { ...g, images: g.images.filter((url) => url !== imageUrl) }
            : g
        )
      )
    } catch (err) {
      console.error('Error deleting image:', err)
      setError('Failed to delete image.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    galleries,
    loading,
    error,
    createGallery,
    uploadImageToGallery,
    editGallery,
    deleteGallery,
    deleteImageFromGallery,
  }
}

export default useUserGalleries
