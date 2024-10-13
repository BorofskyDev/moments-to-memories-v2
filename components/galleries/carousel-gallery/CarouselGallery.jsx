// components/galleries/carousel-gallery/CarouselGallery.jsx

'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import useCarouselOpacity from '@/libs/hooks/carousel/useCarouselOpacity'
import Modal from '../../modals/modal/Modal'
import styles from './CarouselGallery.module.scss'
import PropTypes from 'prop-types'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'

const CarouselGallery = ({ images, canDelete = false, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const carouselRef = useRef(null)
  const imageRefs = useRef([])

  useCarouselOpacity(carouselRef, imageRefs)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const handleClose = () => {
    setSelectedImage(null)
  }

  const handleDelete = (imageUrl) => {
    if (confirm('Are you sure you want to delete this image?')) {
      onDelete(imageUrl)
    }
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel} ref={carouselRef}>
        {images.map((image, index) => (
          <motion.div
            className={styles.imageWrapper}
            key={index}
            onClick={() => handleImageClick(image)}
            role='button'
            aria-label={`View Image ${index + 1}`}
            tabIndex='0'
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleImageClick(image)
            }}
            ref={(el) => (imageRefs.current[index] = el)}
            whileHover={{ scale: 1.05 }}
            layoutId={`image-${image}`} // Shared layoutId for smooth animation
          >
            <Image
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className={styles.image}
              width={1920}
              height={1680}
              priority={index === 0}
            />
            {/* Conditionally render the delete button */}
            {canDelete && onDelete && (
              <DeleteButton
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation() // Prevent triggering the image click
                  handleDelete(image)
                }}
                title='Delete Image'
              />
            )}
          </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selectedImage} onClose={handleClose}>
        {selectedImage && (
          <motion.div
            className={styles.expandedImageWrapper}
            layoutId={`image-${selectedImage}`} // Shared layoutId for smooth animation
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Image
              src={selectedImage}
              alt='Expanded Gallery'
              className={styles.expandedImage}
              width={1920}
              height={1680}
              priority
            />
          </motion.div>
        )}
      </Modal>
    </div>
  )
}

CarouselGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  canDelete: PropTypes.bool,
  onDelete: PropTypes.func,
}

export default CarouselGallery
