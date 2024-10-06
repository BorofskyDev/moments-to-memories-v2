// components/galleries/custom-gallery/CustomGallery.jsx

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import PropTypes from 'prop-types'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation-modal/DeleteConfirmationModal'
import styles from './CustomGallery.module.scss'

const CustomGallery = ({ images, onDelete }) => {
  const [photoToDelete, setPhotoToDelete] = useState(null) // State for the photo to delete
  const [isDeleting, setIsDeleting] = useState(false)
  const galleryRef = useRef(null)
  const imageRefs = useRef([])

  // Optional: Opacity and scaling effects
  const handleScroll = () => {
    if (!galleryRef.current || !imageRefs.current.length) return

    const gallery = galleryRef.current
    const galleryRect = gallery.getBoundingClientRect()
    const galleryCenter = galleryRect.left + galleryRect.width / 2

    imageRefs.current.forEach((img) => {
      if (img) {
        const imgRect = img.getBoundingClientRect()
        const imgCenter = imgRect.left + imgRect.width / 2
        const distance = Math.abs(galleryCenter - imgCenter)

        const maxDistance = galleryRect.width / 2
        const opacity = Math.max(1 - distance / maxDistance, 0.5) // Minimum opacity
        const scale = 1 + 0.05 * (1 - distance / maxDistance) // Scale between 1 and 1.05

        img.style.opacity = opacity
        img.style.transform = `scale(${scale})`
      }
    })
  }

  useEffect(() => {
    const gallery = galleryRef.current
    if (gallery) {
      handleScroll()

      gallery.addEventListener('scroll', handleScroll)

      return () => {
        gallery.removeEventListener('scroll', handleScroll)
      }
    }
  }, [images])

  const handleImageClick = (image) => {
    setPhotoToDelete(image)
  }

  const handleConfirmDeletePhoto = async () => {
    if (!photoToDelete) return
    setIsDeleting(true)
    try {
      await onDelete(photoToDelete.id, photoToDelete.name) // Pass both photoId and photoName
      setPhotoToDelete(null)
    } catch (error) {
      console.error('Error deleting photo:', error)
      alert('Failed to delete the photo. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDeletePhoto = () => {
    setPhotoToDelete(null)
  }

  return (
    <div className={styles.customGallery}>
      <div className={styles.galleryContainer} ref={galleryRef}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className={styles.imageWrapper}
            onClick={() => handleImageClick(image)}
            role='button'
            aria-label={`Delete Image ${index + 1}`}
            tabIndex='0'
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleImageClick(image)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            ref={(el) => (imageRefs.current[index] = el)}
          >
            <Image
              src={image.url}
              alt={image.name}
              className={styles.image}
              fill
              style={{ objectFit: 'cover' }}
              loading='lazy'
            />
          </motion.div>
        ))}
      </div>

      {/* Delete Photo Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!photoToDelete}
        onConfirmDelete={handleConfirmDeletePhoto}
        onCancel={handleCancelDeletePhoto}
        isDeleting={isDeleting}
        text={`Are you sure you want to delete "${
          photoToDelete ? photoToDelete.name : ''
        }"? This action cannot be undone.`}
      />
    </div>
  )
}

CustomGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Ensure each image has a unique 'id'
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired, // Function to handle image deletion
}

export default CustomGallery
