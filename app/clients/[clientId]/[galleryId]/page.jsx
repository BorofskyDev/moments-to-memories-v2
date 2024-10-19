// app/clients/[clientId]/[galleryId]/page.jsx

'use client' // Ensure client-side functionality

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import PropTypes from 'prop-types'

import styles from './GalleryPage.module.scss'
import { toast } from 'react-toastify'
import CustomGallery from '@/components/galleries/custom-gallery/CustomGallery'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import AddButton from '@/components/buttons/add-button/AddButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'

const GalleryPage = ({ deletePhoto, addPhotosToGallery }) => {
  const router = useRouter()
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const clientId = pathSegments[2]
  const galleryId = pathSegments[3]

  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [galleryData, setGalleryData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch gallery data if authenticated
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch(`/api/fetchGalleryData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clientId, galleryId }),
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Fetched Gallery Data:', data.gallery)
          setGalleryData(data.gallery)
        } else {
          const errorData = await response.json()
          console.error('Error Fetching Gallery Data:', errorData.message)
          setError(errorData.message || 'Failed to fetch gallery data.')
        }
      } catch (err) {
        console.error('Error Fetching Gallery Data:', err)
        setError('Failed to fetch gallery data.')
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchGalleryData()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated, clientId, galleryId])

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

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (response.ok) {
        setIsAuthenticated(false)
        setGalleryData(null)
        setPassword('')
        toast.success('Logged out successfully.')
      } else {
        throw new Error('Logout failed.')
      }
    } catch (error) {
      console.error('Error Logging Out:', error)
      toast.error('Failed to log out. Please try again.')
    }
  }

  const handleDeletePhoto = async (photoId, photoName) => {
    try {
      await deletePhoto(clientId, galleryId, photoId, photoName)
      // Refresh the gallery data after deletion
      const response = await fetch(`/api/fetchGalleryData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, galleryId }),
      })

      if (response.ok) {
        const data = await response.json()
        setGalleryData(data.gallery)
        toast.success('Photo deleted successfully.')
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to delete photo.')
      }
    } catch (error) {
      console.error('Error Deleting Photo:', error)
      toast.error('Failed to delete photo.')
    }
  }

  const handleAddPhotos = async (e) => {
    const files = e.target.files
    if (files.length === 0) return

    try {
      setIsSubmitting(true)
      setError(null)
      await addPhotosToGallery(clientId, galleryId, Array.from(files))
      // After adding, refresh the gallery data
      const response = await fetch(`/api/fetchGalleryData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, galleryId }),
      })

      if (response.ok) {
        const data = await response.json()
        setGalleryData(data.gallery)
        toast.success('Photos added successfully!')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add photos.')
      }
    } catch (err) {
      console.error('Error Adding Photos:', err)
      setError('Failed to add photos.')
      toast.error('Failed to add photos.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Prevent rendering when loading
  if (loading) {
    return <p>Loading...</p>
  }

  // Password Prompt
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

  // Error Display
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.error}>{error}</p>
        <button onClick={() => router.refresh()} className={styles.retryButton}>
          Retry
        </button>
      </div>
    )
  }

  // Ensure galleryData is available before rendering
  if (!galleryData) {
    return <p>No gallery data available.</p>
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.header}>
        <ParagraphHeading>{galleryData.name}</ParagraphHeading>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
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
        {galleryData.images && galleryData.images.length > 0 ? (
          galleryData.images.map((image) => (
            <div key={image.id} className={styles.imageWrapper}>
              <img src={image.url} alt={image.name} className={styles.image} />
              <DeleteButton
                onClick={() => handleDeletePhoto(image.id, image.name)}
                className={styles.deleteButton}
                text='Delete'
              />
            </div>
          ))
        ) : (
          <p>No photos in this gallery.</p>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

GalleryPage.propTypes = {
  deletePhoto: PropTypes.func.isRequired,
  addPhotosToGallery: PropTypes.func.isRequired,
}

export default GalleryPage
