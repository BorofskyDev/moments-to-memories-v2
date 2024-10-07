// components/galleries/grid-gallery/GridGallery.jsx

'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import styles from './GridGallery.module.scss'
import Modal from '../modal/Modal'
import useFeaturedImages from '@/libs/hooks/gallery/useFeaturedImages'

const GridGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const gridRef = useRef(null)
  const imageRefs = useRef([])
  const { images, loading, error } = useFeaturedImages()

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  const handleClose = () => {
    setSelectedImage(null)
  }

  // Define the grid items (assuming 22 images as per your styles)
  const gridItems = Array.from({ length: 22 }, (_, index) => index + 1)

  return (
    <div className={styles.gridGallery} ref={gridRef}>
      {loading && <div className={styles.loading}>Loading images...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}

      {!loading &&
        !error &&
        gridItems.map((itemId, index) => {
          const image = images.find((img) => img.id === itemId)
          return (
            <motion.div
              className={`${styles.gridGallery__item} ${
                styles[`img${itemId}`]
              }`}
              key={itemId}
              onClick={() => image && handleImageClick(image.url)}
              role={image ? 'button' : 'img'}
              aria-label={
                image ? `View Image ${itemId}` : `Empty Image Slot ${itemId}`
              }
              tabIndex={image ? '0' : undefined}
              onKeyDown={(e) => {
                if (image && e.key === 'Enter') handleImageClick(image.url)
              }}
              ref={(el) => (imageRefs.current[index] = el)}
              whileHover={image ? { scale: 1.05 } : {}}
              layoutId={`grid-image-${itemId}`} // Unique layoutId for each image
            >
              {image && image.url ? (
                <Image
                  src={image.url}
                  alt={`Gallery Image ${itemId}`}
                  className={styles.gridGallery__img}
                  width={1920}
                  height={1680}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  priority={index === 0}
                />
              ) : (
                // Optionally display a placeholder for empty slots
                <div className={styles.gridGallery__placeholder}></div>
              )}
            </motion.div>
          )
        })}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Modal isOpen={!!selectedImage} onClose={handleClose}>
            <motion.div
              className={styles.gridGallery__expandedImageWrapper}
              key='modal'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Image
                src={selectedImage}
                alt='Expanded Gallery Image'
                className={styles.gridGallery__expandedImage}
                width={1920}
                height={1680}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw'
                priority
              />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GridGallery
