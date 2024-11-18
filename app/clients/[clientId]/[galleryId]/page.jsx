// app/clients/[clientId]/[galleryId]/page.jsx

'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import useSelectionGallery from '@/libs/hooks/client-profile/useSelectionGallery'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import ImageCard from '@/components/galleries/image-card/ImageCard'
import styles from './GalleryPage.module.scss'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SubmitButton from '@/components/buttons/submit-button/SubmitButton'
import SaveButton from '@/components/buttons/save-button/SaveButton'
import BodyText from '@/components/layout/body-text/BodyText'
import { db } from '@/libs/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { functions } from '@/libs/firebase'
import { httpsCallable } from 'firebase/functions'
import Modal from '@/components/modals/modal/Modal'
import Image from 'next/image'

const MotionImage = motion(Image)

const GalleryPage = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const clientId = pathSegments[2]
  const galleryId = pathSegments[3]
  const [password, setPassword] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)
  const [selectedImages, setSelectedImages] = useState([])
  const [submittedImages, setSubmittedImages] = useState([])
  const [expandedImage, setExpandedImage] = useState(null) // Added for modal

  const { galleries } = useSelectionGallery(clientId)
  const gallery = galleries.find((g) => g.id === galleryId)

  // Initialize selectedImages and submittedImages when gallery data is available
  useEffect(() => {
    if (gallery) {
      const selected = gallery.photos
        .filter((photo) => photo.isSelected && !photo.isSubmitted)
        .map((photo) => photo.id)
      const submitted = gallery.photos
        .filter((photo) => photo.isSubmitted)
        .map((photo) => photo.id)
      setSelectedImages(selected)
      setSubmittedImages(submitted)
    }
  }, [gallery])

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

  // Handle toggling image selection
  const handleToggleImage = (photoId) => {
    if (submittedImages.includes(photoId)) {
      // Cannot toggle submitted images
      return
    }
    setSelectedImages((prevSelected) => {
      if (prevSelected.includes(photoId)) {
        return prevSelected.filter((id) => id !== photoId)
      } else {
        return [...prevSelected, photoId]
      }
    })
  }

  // Handle saving selections
  const handleSave = async () => {
    setIsSaving(true)
    try {
      const promises = gallery.photos.map(async (photo) => {
        const photoRef = doc(
          db,
          'clients',
          clientId,
          'selectionGalleries',
          galleryId,
          'photos',
          photo.id
        )
        const isSelected = selectedImages.includes(photo.id)
        await updateDoc(photoRef, { isSelected })
      })
      await Promise.all(promises)
      toast.success('Selections saved.')
    } catch (error) {
      console.error('Error saving selections:', error)
      toast.error('Failed to save selections.')
    } finally {
      setIsSaving(false)
    }
  }

  // Handle submitting selections
  const handleSubmit = async () => {
    if (selectedImages.length < 10) {
      toast.warn('Please select at least 10 images before submitting.')
      return
    }
    if (
      !confirm(
        'Once submitted, selections cannot be changed. Do you want to proceed?'
      )
    ) {
      return
    }
    setIsSubmitting(true)
    try {
      // Update isSubmitted field of selected images
      const promises = selectedImages.map(async (photoId) => {
        const photoRef = doc(
          db,
          'clients',
          clientId,
          'selectionGalleries',
          galleryId,
          'photos',
          photoId
        )
        await updateDoc(photoRef, {
          isSubmitted: true,
          isSelected: false, // Reset isSelected after submission
        })
      })
      await Promise.all(promises)

      // Send selection message to admins
      const sendSelectionMessage = httpsCallable(
        functions,
        'sendSelectionMessage'
      )
      await sendSelectionMessage({
        clientId,
        galleryId,
        submittedImageIds: selectedImages,
      })

      // Update submittedImages state
      setSubmittedImages((prev) => [...prev, ...selectedImages])
      setSelectedImages([])
      toast.success('Selections submitted.')
    } catch (error) {
      console.error('Error submitting selections:', error)
      toast.error('Failed to submit selections.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle image click to expand
  const handleImageClick = (photo) => {
    setExpandedImage(photo)
  }

  // Handle modal close
  const handleCloseModal = () => {
    setExpandedImage(null)
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.passwordPrompt}>
        <SectionHeading>Enter Password to Access Gallery</SectionHeading>
        <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className={styles.passwordInput}
            required
          />
          <SubmitButton
            type='submit'
            disabled={isSubmitting}
            className={styles.submitButton}
            text={isSubmitting ? 'Verifying...' : 'Submit'}
          />
        </form>
      </div>
    )
  }

  if (!gallery) {
    return <p>Gallery not found.</p>
  }

  return (
    <>
      <div className={styles.galleryContainer}>
        <div className={styles.header}>
          <ParagraphHeading>{gallery.name}</ParagraphHeading>
          <BodyText>
            Please select at least 10 photos before submitting. Once submitted,
            decisions are final. If you&apos;re unsure or trying to decide, save
            your progress and come back to it later. If you decide you want to
            order more photos later, you can come back, select the photo, and
            submit.
          </BodyText>
        </div>

        <div className={styles.imageGrid}>
          {gallery.photos.map((photo) => (
            <ImageCard
              key={photo.id}
              photo={photo}
              selected={
                selectedImages.includes(photo.id) ||
                submittedImages.includes(photo.id)
              }
              submitted={submittedImages.includes(photo.id)}
              onToggle={() => handleToggleImage(photo.id)}
              onImageClick={handleImageClick} // Pass the handler
            />
          ))}
        </div>

        <div className={styles.actionButtons}>
          <SaveButton
            onClick={handleSave}
            className={styles.saveButton}
            disabled={isSaving}
            text={isSaving ? 'Saving...' : 'Save'}
          />

          <SubmitButton
            onClick={handleSubmit}
            className={styles.submitButton}
            disabled={isSubmitting}
            text={isSubmitting ? 'Submitting...' : 'Submit'}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
      </div>

      {/* Modal for Expanded Image */}
      <AnimatePresence>
        {expandedImage && (
          <Modal isOpen={!!expandedImage} onClose={handleCloseModal}>
            <div className={styles.expandedImageWrapper}>
              <MotionImage
                src={expandedImage.url}
                alt={expandedImage.name || 'Expanded Image'}
                className={styles.expandedImage}
                width={1920}
                height={1680}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw'
                layoutId={`gallery-image-${expandedImage.id}`} // Must match the layoutId in ImageCard
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default GalleryPage
