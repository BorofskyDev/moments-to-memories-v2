// libs/hooks/gallery/useFeaturedImages.js

import { useState, useEffect } from 'react'
import { db, storage } from '@/libs/firebase'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const useFeaturedImages = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchImages = async () => {
    setLoading(true)
    setError(null)
    try {
      const imagesCollection = collection(db, 'featuredImages')
      const snapshot = await getDocs(imagesCollection)
      const fetchedImages = []
      snapshot.forEach((docSnap) => {
        fetchedImages.push({
          id: parseInt(docSnap.id, 10), // Parse ID to integer
          ...docSnap.data(),
        })
      })
      // Sort images by id to maintain order
      fetchedImages.sort((a, b) => a.id - b.id)
      setImages(fetchedImages)
    } catch (err) {
      console.error('Error fetching images:', err)
      setError('Failed to load images.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const getNextImageId = () => {
    if (images.length === 0) {
      return 1
    }
    const maxId = Math.max(...images.map((img) => img.id))
    return maxId + 1
  }

  const uploadImage = async (imageFile, imageId) => {
    setLoading(true)
    setError(null)

    // If no imageId provided, generate one
    const finalImageId =
      typeof imageId === 'undefined' || imageId === null
        ? getNextImageId()
        : imageId

    try {
      const storageRef = ref(storage, `featuredImages/${finalImageId}`)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error('Upload error:', error)
            reject(error)
          },
          async () => {
            // Upload completed successfully
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadURL)
          }
        )
      })

      const downloadURL = await getDownloadURL(storageRef)

      // Update Firestore with the new image URL
      const imageDocRef = doc(db, 'featuredImages', finalImageId.toString())
      await setDoc(imageDocRef, { url: downloadURL })

      // Update local state
      setImages((prevImages) => {
        const updatedImages = prevImages.map((img) =>
          img.id === finalImageId ? { ...img, url: downloadURL } : img
        )
        // If the image wasn't in the array yet (new upload), add it
        if (!updatedImages.find((img) => img.id === finalImageId)) {
          updatedImages.push({ id: finalImageId, url: downloadURL })
          // Sort images to maintain order
          updatedImages.sort((a, b) => a.id - b.id)
        }
        return updatedImages
      })
    } catch (err) {
      console.error('Error uploading image:', err)
      setError('Failed to upload image.')
      throw err // Re-throw for handling in the component
    } finally {
      setLoading(false)
    }
  }

  return { images, loading, error, uploadImage }
}

export default useFeaturedImages
