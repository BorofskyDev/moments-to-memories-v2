// components/galleries/admin-carousel-gallery/AdminCarouselGallery.jsx

'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './AdminCarouselGallery.module.scss'
import useUserGalleries from '@/libs/hooks/gallery/useUserGalleries'
import { useAuth } from '@/libs/context/AuthContext'
import BodyText from '@/components/layout/body-text/BodyText'
import UploadModal from '@/components/modals/upload-modal/UploadModal'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import CreateNewButton from '@/components/buttons/create-new/CreateNewButton'
import AddButton from '@/components/buttons/add-button/AddButton'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import MediumBodyText from '@/components/layout/body-text/medium-body-text/MediumBodyText'
import Image from 'next/image'

const AdminCarouselGallery = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const {
    galleries,
    loading,
    error,
    createGallery,
    uploadImageToGallery,
    editGallery,
    deleteGallery,
    deleteImageFromGallery,
  } = useUserGalleries()

  // State for creating a new gallery within the modal
  const [isCreating, setIsCreating] = useState(false)
  const [newGalleryTitle, setNewGalleryTitle] = useState('')
  const [newGalleryDescription, setNewGalleryDescription] = useState('')
  const [newGalleryImages, setNewGalleryImages] = useState([]) // Array to hold image files
  const [creationError, setCreationError] = useState(null)
  const [creationLoading, setCreationLoading] = useState(false)

  // State for uploading images to existing galleries
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  if (!isOpen) return null

  // Handler for creating a new gallery
  const handleCreateGallery = async () => {
    if (!newGalleryTitle.trim()) {
      setCreationError('Gallery title is required.')
      return
    }

    setCreationLoading(true)
    setCreationError(null)
    try {
      // Create the gallery first
      const createdGallery = await createGallery(
        newGalleryTitle,
        newGalleryDescription
      )

      // Upload selected images to the newly created gallery
      const uploadPromises = newGalleryImages.map((imageFile) =>
        uploadImageToGallery(createdGallery.id, imageFile)
      )

      await Promise.all(uploadPromises)

      // Reset form fields
      setNewGalleryTitle('')
      setNewGalleryDescription('')
      setNewGalleryImages([])
      setIsCreating(false)
      onClose() // Close the modal after successful creation
    } catch (err) {
      setCreationError('Failed to create gallery and upload images.')
    } finally {
      setCreationLoading(false)
    }
  }

  // Handler for deleting a gallery
  const handleDeleteGallery = async (galleryId) => {
    if (confirm('Are you sure you want to delete this gallery?')) {
      await deleteGallery(galleryId)
    }
  }

  // Handler for deleting an image from a gallery
  const handleDeleteImage = async (galleryId, imageUrl) => {
    if (confirm('Are you sure you want to delete this image?')) {
      // Ensure that the user has the right to delete the image
      await deleteImageFromGallery(galleryId, imageUrl)
    }
  }

  // Handlers for uploading images to existing galleries
  const handleOpenUploadModal = (gallery) => {
    setSelectedGallery(gallery)
    setIsUploadModalOpen(true)
  }

  const handleUploadModalClose = () => {
    setSelectedGallery(null)
    setIsUploadModalOpen(false)
  }

  // Handler for selecting images during gallery creation
  const handleNewGalleryImageChange = (e) => {
    const files = Array.from(e.target.files)
    setNewGalleryImages((prev) => [...prev, ...files])
  }

  // Handler for removing an image from the new gallery
  const handleRemoveNewGalleryImage = (index) => {
    setNewGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Handler to close the modal when clicking outside the content or on the close button
  const handleOverlayClick = () => {
    onClose()
    setIsCreating(false)
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {loading && <p>Loading galleries...</p>}
        {error && <BodyText className={styles.error}>{error}</BodyText>}

        {/* Button to open gallery creation form */}
        <CreateNewButton
          onClick={() => setIsCreating(true)}
          text='Create New Gallery'
        />

        {/* Gallery Creation Form */}
        {isCreating && (
          <div className={styles.newGalleryForm}>
            <ParagraphHeading>Create New Gallery</ParagraphHeading>
            <input
              type='text'
              placeholder='Gallery Title'
              value={newGalleryTitle}
              onChange={(e) => setNewGalleryTitle(e.target.value)}
              disabled={creationLoading}
              required
            />
            <textarea
              placeholder='Gallery Description'
              value={newGalleryDescription}
              onChange={(e) => setNewGalleryDescription(e.target.value)}
              disabled={creationLoading}
            />
            <div className={styles.imageUploadSection}>
              <input
                type='file'
                accept='image/*'
                multiple // Allow multiple files to be selected
                onChange={handleNewGalleryImageChange}
                disabled={creationLoading}
              />
              <p>Upload images by selecting multiple files at once.</p>
            </div>
            {/* Display uploaded images with option to remove */}
            {newGalleryImages.length > 0 && (
              <div className={styles.imagePreviews}>
                {newGalleryImages.map((file, index) => (
                  <div key={index} className={styles.imagePreview}>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className={styles.previewImage}
                      width={200} // Adjust as needed
                      height={150} // Adjust as needed
                    />
                    <DeleteButton
                      type='button'
                      onClick={() => handleRemoveNewGalleryImage(index)}
                      className={styles.removeImageButton}
                      text='Remove Image'
                    />
                  </div>
                ))}
              </div>
            )}
            {/* Error and Success Messages */}
            {creationError && (
              <BodyText className={styles.errorText}>{creationError}</BodyText>
            )}
            {/* Buttons */}
            <div className={styles.formButtons}>
              <button onClick={handleCreateGallery} disabled={creationLoading}>
                {creationLoading ? 'Creating...' : 'Save Gallery'}
              </button>
              <button
                onClick={() => setIsCreating(false)}
                disabled={creationLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* List of Existing Galleries */}
        <div className={styles.galleriesList}>
          {galleries.map((gallery) => (
            <div key={gallery.id} className={styles.galleryItem}>
              <ParagraphHeading>{gallery.title}</ParagraphHeading>
              <BodyText>{gallery.description}</BodyText>
              <div className={styles.galleryButtons}>
                <AddButton
                  onClick={() => handleOpenUploadModal(gallery)}
                  text='Add Image'
                />
                <DeleteButton
                  onClick={() => handleDeleteGallery(gallery.id)}
                  text='Delete Gallery'
                />
              </div>
              {/* Display images in a simple grid with delete functionality */}
              {gallery.images.length > 0 ? (
                <div className={styles.imageGrid}>
                  {gallery.images.map((imageUrl, index) => (
                    <div key={index} className={styles.imageWrapper}>
                      <Image
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className={styles.image}
                        width={200}
                        height={150}
                      />
                      <DeleteButton
                        className={styles.deleteButton}
                        onClick={() => handleDeleteImage(gallery.id, imageUrl)}
                        text='Delete Image'
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <MediumBodyText>No images in this gallery.</MediumBodyText>
              )}
            </div>
          ))}
        </div>

        {/* Upload Modal for Existing Galleries */}
        {isUploadModalOpen && selectedGallery && (
          <UploadModal
            isOpen={isUploadModalOpen}
            onClose={handleUploadModalClose}
            uploadImage={async (imageFile) => {
              await uploadImageToGallery(selectedGallery.id, imageFile)
              // Modal remains open to allow multiple uploads
            }}
          />
        )}
      </div>
    </div>
  )
}

AdminCarouselGallery.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AdminCarouselGallery
