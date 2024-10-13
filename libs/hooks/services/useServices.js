// libs/hooks/services/useServices.js

import { useState, useEffect } from 'react'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage } from '@/libs/firebase'
import { useAuth } from '@/libs/context/AuthContext'

const useServices = () => {
  const { user } = useAuth()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all services from Firestore
  const fetchServices = async () => {
    if (!user) {
      setServices([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const servicesRef = collection(db, 'services')
      const snapshot = await getDocs(servicesRef)
      const fetchedServices = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))
      setServices(fetchedServices)
    } catch (err) {
      console.error('Error fetching services:', err)
      setError('Failed to load services.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [user])

  // Add a new service
  const addService = async (serviceData, imageFile) => {
    if (!user) throw new Error('User not authenticated')

    setLoading(true)
    setError(null)

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `services/${Date.now()}_${imageFile.name}`)
      const uploadTask = uploadBytesResumable(imageRef, imageFile)

      // Await upload completion
      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error('Image upload error:', error)
            reject(error)
          },
          () => {
            resolve()
          }
        )
      })

      // Get download URL
      const imageSrc = await getDownloadURL(uploadTask.snapshot.ref)

      // Prepare service data
      const newService = {
        title: serviceData.title,
        imageSrc,
        imageAlt: serviceData.imageAlt,
        description: serviceData.description,
        features: serviceData.features,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      // Add to Firestore
      const servicesRef = collection(db, 'services')
      const docRef = await addDoc(servicesRef, newService)

      // Update local state
      setServices((prev) => [...prev, { id: docRef.id, ...newService }])
    } catch (err) {
      console.error('Error adding service:', err)
      setError('Failed to add service.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Edit an existing service
  const editService = async (serviceId, updatedData, newImageFile = null) => {
    if (!user) throw new Error('User not authenticated')

    setLoading(true)
    setError(null)

    try {
      const serviceDocRef = doc(db, 'services', serviceId)
      let imageSrc = updatedData.imageSrc

      // If a new image is uploaded, handle image replacement
      if (newImageFile) {
        // Delete old image from Storage
        const oldImageRef = ref(storage, imageSrc)
        await deleteObject(oldImageRef)

        // Upload new image
        const imageRef = ref(
          storage,
          `services/${Date.now()}_${newImageFile.name}`
        )
        const uploadTask = uploadBytesResumable(imageRef, newImageFile)

        // Await upload completion
        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            (error) => {
              console.error('Image upload error:', error)
              reject(error)
            },
            () => {
              resolve()
            }
          )
        })

        // Get new download URL
        imageSrc = await getDownloadURL(uploadTask.snapshot.ref)
      }

      // Prepare updated service data
      const serviceUpdates = {
        title: updatedData.title,
        imageSrc,
        imageAlt: updatedData.imageAlt,
        description: updatedData.description,
        features: updatedData.features,
        updatedAt: serverTimestamp(),
      }

      // Update Firestore document
      await updateDoc(serviceDocRef, serviceUpdates)

      // Update local state
      setServices((prev) =>
        prev.map((service) =>
          service.id === serviceId
            ? { id: serviceId, ...serviceUpdates }
            : service
        )
      )
    } catch (err) {
      console.error('Error editing service:', err)
      setError('Failed to edit service.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete a service
  const deleteService = async (serviceId) => {
    if (!user) throw new Error('User not authenticated')

    setLoading(true)
    setError(null)

    try {
      // Find the service to get imageSrc
      const serviceToDelete = services.find(
        (service) => service.id === serviceId
      )
      if (!serviceToDelete) {
        throw new Error('Service not found.')
      }

      const imageSrc = serviceToDelete.imageSrc

      // Delete image from Firebase Storage
      const imageRef = ref(storage, imageSrc)
      await deleteObject(imageRef)

      // Delete service document from Firestore
      const serviceDocRef = doc(db, 'services', serviceId)
      await deleteDoc(serviceDocRef)

      // Update local state
      setServices((prev) => prev.filter((service) => service.id !== serviceId))
    } catch (err) {
      console.error('Error deleting service:', err)
      setError('Failed to delete service.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    services,
    loading,
    error,
    addService,
    editService,
    deleteService,
    fetchServices,
  }
}

export default useServices
