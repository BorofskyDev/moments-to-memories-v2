// components/modals/create-gallery-modal/CreateGalleryModal.jsx

'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './CreateGalleryModal.module.scss'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'
import SubmitButton from '@/components/buttons/submit-button/SubmitButton'
import BodyText from '@/components/layout/body-text/BodyText'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import Image from 'next/image'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'

const CreateGalleryModal = ({ isOpen, onClose, createGallery }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFiles, setImageFiles] = useState([])
  const [currentImage, setCurrentImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCurrentImage(file)
    }
  }

  const handleUploadImage = async () => {
    if (!currentImage) {
      setError('Please select an image to upload.')
      return
    }
    setIsUploading(true)
    setError(null)
    try {
      await createGallery(title, description, currentImage)
      setImageFiles((prev) => [...prev, currentImage])
      setCurrentImage(null)
      setSuccessMessage('Image uploaded successfully!')
    } catch (err) {
      setError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Gallery title is required.')
      return
    }
    if (imageFiles.length === 0) {
      setError('Please upload at least one image.')
      return
    }
    setIsUploading(true)
    setError(null)
    try {
      // All images are already uploaded and associated during creation
      onClose()
    } catch (err) {
      setError('Failed to finalize gallery. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <ParagraphHeading>Create New Gallery</ParagraphHeading>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Gallery Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUploading}
            required
          />
          <textarea
            placeholder='Gallery Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUploading}
          />
          <div className={styles.imageUploadSection}>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <button
              type='button'
              onClick={handleUploadImage}
              disabled={isUploading || !currentImage}
              className={styles.uploadButton}
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
          {/* Display uploaded images with option to remove */}
          {imageFiles.length > 0 && (
            <div className={styles.imagePreviews}>
              {imageFiles.map((file, index) => (
                <div key={index} className={styles.imagePreview}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className={styles.previewImage}
                    height={1260}
                    width={1920}
                  />
                  <DeleteButton
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className={styles.removeImageButton}
                    text='Remove Image'
                  />
                </div>
              ))}
            </div>
          )}
          {/* Error and Success Messages */}
          {error && <BodyText className={styles.errorText}>{error}</BodyText>}
          {successMessage && (
            <BodyText className={styles.successText}>{successMessage}</BodyText>
          )}
          {/* Buttons */}
          <div className={styles.formButtons}>
            <SubmitButton
              type='submit'
              text='Finalize Gallery'
              disabled={isUploading || imageFiles.length === 0}
            />
            <CancelButton
              onClick={onClose}
              text='Cancel'
              disabled={isUploading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

CreateGalleryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createGallery: PropTypes.func.isRequired,
}

export default CreateGalleryModal
