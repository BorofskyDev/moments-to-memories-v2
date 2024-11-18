// components/galleries/grid-gallery/GridGallery.jsx

'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import styles from './GridGallery.module.scss'
import Modal from '../../modals/modal/Modal'
import useFeaturedImages from '@/libs/hooks/gallery/useFeaturedImages'

const MotionImage = motion(Image)

const GridGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const gridRef = useRef(null)
  const imageRefs = useRef([])
  const { images, loading, error } = useFeaturedImages()

  const handleImageClick = (imageUrl, itemId) => {
    setSelectedImage({ url: imageUrl, id: itemId })
  }

  const handleClose = () => {
    setSelectedImage(null)
  }

  // Define the grid items (assuming 22 images as per your styles)
  const gridItems = Array.from({ length: 22 }, (_, index) => index + 1)

  return (
    <>
      <div className={styles.gridGallery} ref={gridRef}>
        {loading && <div className={styles.loading}>Loading images...</div>}
        {error && <div className={styles.error}>Error: {error}</div>}

        {!loading &&
          !error &&
          gridItems.map((itemId, index) => {
            const image = images.find((img) => img.id === itemId)
            return (
              <div
                className={`${styles.gridGallery__item} ${
                  styles[`img${itemId}`]
                }`}
                key={itemId}
              >
                {image && image.url ? (
                  <MotionImage
                    src={image.url}
                    alt={`Gallery Image ${itemId}`}
                    className={styles.gridGallery__img}
                    width={1920}
                    height={1680}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    priority={index === 0}
                    layoutId={`grid-image-${itemId}`} // Assign layoutId here
                    onClick={() => image && handleImageClick(image.url, itemId)}
                    whileHover={image ? { scale: 1.05 } : {}}
                  />
                ) : (
                  // Optionally display a placeholder for empty slots
                  <div className={styles.gridGallery__placeholder}></div>
                )}
              </div>
            )
          })}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Modal isOpen={!!selectedImage} onClose={handleClose}>
            <div className={styles.gridGallery__expandedImageWrapper}>
              <MotionImage
                src={selectedImage.url}
                alt='Expanded Gallery Image'
                className={styles.gridGallery__expandedImage}
                width={1920}
                height={1680}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw'
                priority
                layoutId={`grid-image-${selectedImage.id}`} // Match layoutId here
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default GridGallery
