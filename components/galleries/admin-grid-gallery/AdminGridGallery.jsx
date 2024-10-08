// components/galleries/admin-grid-gallery/AdminGridGallery.jsx

'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './AdminGridGallery.module.scss'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { modalVariants } from '@/libs/animations/modalAnimations'
import useFeaturedImages from '@/libs/hooks/gallery/useFeaturedImages'
import UploadModal from '@/components/modals/upload-modal/UploadModal'
import UploadButton from '@/components/buttons/upload-button/UploadButton'

const AdminGridGallery = () => {
  const { images, loading, error, uploadImage } = useFeaturedImages()
  const [selectedImageId, setSelectedImageId] = useState(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  // Define the grid items (assuming 22 images as per your styles)
  const gridItems = Array.from({ length: 22 }, (_, index) => index + 1)

  const handleImageClick = (imageId) => {
    setSelectedImageId(imageId)
    setIsUploadModalOpen(true)
  }

  const handleUploadModalClose = () => {
    setSelectedImageId(null)
    setIsUploadModalOpen(false)
  }

  return (
    <motion.div
      className={styles.gridGallery}
      variants={modalVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      {gridItems.map((itemId) => {
        const image = images.find((img) => img.id === itemId)
        return (
          <motion.div
            className={`${styles.gridGallery__item} ${styles[`img${itemId}`]}`}
            key={itemId}
            onClick={() => handleImageClick(itemId)}
            role='button'
            aria-label={`Upload Image ${itemId}`}
            tabIndex='0'
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleImageClick(itemId)
            }}
            whileHover={{ scale: 1.02 }}
          >
            {image && image.url ? (
              <Image
                src={image.url}
                alt={`Featured Image ${itemId}`}
                className={styles.gridGallery__img}
                width={1920}
                height={1680}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            ) : (
              <UploadButton text='Upload Image' />
            )}
          </motion.div>
        )
      })}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadModal
          imageId={selectedImageId}
          onClose={handleUploadModalClose}
          uploadImage={uploadImage}
        />
      )}
    </motion.div>
  )
}

AdminGridGallery.propTypes = {
  // Define prop types if necessary
}

export default AdminGridGallery
