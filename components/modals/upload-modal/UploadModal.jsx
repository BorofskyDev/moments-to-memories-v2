// components/modals/upload-modal/UploadModal.jsx

'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './UploadModal.module.scss'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'
import SubmitButton from '@/components/buttons/submit-button/SubmitButton'
import BodyText from '@/components/layout/body-text/BodyText'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import Image from 'next/image'

const UploadModal = ({ onClose, uploadImage }) => {
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!imageFile) {
      setError('Please select an image to upload.')
      return
    }
    setIsUploading(true)
    setError(null)
    setSuccessMessage('')
    try {
      await uploadImage(imageFile)
      setSuccessMessage('Image uploaded successfully!')
      setImageFile(null)
      // Allow user to upload another image
    } catch (err) {
      setError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  // Close modal when clicking outside the content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <ParagraphHeading>Upload Image</ParagraphHeading>
        <form onSubmit={handleSubmit}>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {imageFile && (
            <div className={styles.imagePreview}>
              <Image
                src={URL.createObjectURL(imageFile)}
                alt='Preview'
                className={styles.previewImage}
              />
            </div>
          )}
          {error && <BodyText className={styles.errorText}>{error}</BodyText>}
          {successMessage && (
            <BodyText className={styles.successText}>{successMessage}</BodyText>
          )}
          <div className={styles.modalButtons}>
            <SubmitButton
              type='submit'
              text={isUploading ? 'Uploading...' : 'Upload'}
              disabled={isUploading || !imageFile}
            />
            <CancelButton
              onClick={onClose}
              text='Done'
              disabled={isUploading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

UploadModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
}

export default UploadModal
