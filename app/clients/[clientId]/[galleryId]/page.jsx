'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { toast } from 'react-toastify'
import useSelectionGallery from '@/libs/hooks/client-profile/useSelectionGallery'
import AddButton from '@/components/buttons/add-button/AddButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import ImageCard from '@/components/galleries/image-card/ImageCard'
import styles from './GalleryPage.module.scss'

const GalleryPage = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const clientId = pathSegments[2]
  const galleryId = pathSegments[3]
  const [selectedImages, setSelectedImages] = useState([])
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  const { galleries, addPhotosToGallery } = useSelectionGallery(clientId)
  const gallery = galleries.find((g) => g.id === galleryId)

  // Handle password submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (!password) {
      toast.warn('Please enter the password.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/verifyGalleryPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          galleryId,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        toast.success('Access granted.')
      } else {
        toast.error(data.message || 'Authentication failed.')
      }
    } catch (error) {
      console.error('Error Verifying Password:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddPhotos = async (e) => {
    const files = e.target.files
    if (files.length === 0) return

    try {
      setIsSubmitting(true)
      setError(null)
      await addPhotosToGallery(galleryId, Array.from(files))
      toast.success('Photos added successfully!')
    } catch (err) {
      console.error('Error Adding Photos:', err)
      setError('Failed to add photos.')
      toast.error('Failed to add photos.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleImage = (photoId) => {
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(photoId)) {
        return prevSelected.filter((id) => id !== photoId)
      } else {
        return [...prevSelected, photoId]
      }
    })
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.passwordPrompt}>
        <h2>Enter Password to Access Gallery</h2>
        <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className={styles.passwordInput}
            required
          />
          <button
            type='submit'
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Verifying...' : 'Submit'}
          </button>
        </form>
      </div>
    )
  }

  if (!gallery) {
    return <p>Gallery not found.</p>
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.header}>
        <ParagraphHeading>{gallery.name}</ParagraphHeading>
      </div>
      <AddButton
        onClick={() => document.getElementById('addPhotoInput').click()}
        className={styles.addPhotoButton}
        text={isSubmitting ? 'Uploading...' : 'Add Photos'}
        disabled={isSubmitting}
      />
      <input
        type='file'
        id='addPhotoInput'
        style={{ display: 'none' }}
        accept='image/*'
        multiple
        onChange={handleAddPhotos}
      />
      <div className={styles.imageGrid}>
        {gallery.photos.map((photo) => (
          <ImageCard
            key={photo.id}
            photo={photo}
            selected={selectedImages.includes(photo.id)}
            onToggle={() => handleToggleImage(photo.id)}
          />
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default GalleryPage
