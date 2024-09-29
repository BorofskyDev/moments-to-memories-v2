// components/galleries/GridGallery/GridGallery.jsx
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import PropTypes from 'prop-types'
import styles from './GridGallery.module.scss'
import useCarouselOpacity from '@/libs/hooks/carousel/useCarouselOpacity'
import images from '@/libs/data/images'
import Modal from '../modal/Modal'

const GridGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const gridRef = useRef(null)
  const imageRefs = useRef([])

  // Optional: Reuse the opacity hook if desired
  // useCarouselOpacity(gridRef, imageRefs)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const handleClose = () => {
    setSelectedImage(null)
  }

  return (
    <div className={styles.gridGallery} ref={gridRef}>
      {images.map((image, index) => (
        <motion.div
          className={`${styles.gridGallery__item} ${styles[`img${index + 1}`]}`}
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
          layoutId={`grid-image-${index + 1}`} // Unique layoutId for each image
        >
          <Image
            src={image}
            alt={`Gallery Image ${index + 1}`}
            className={styles.gridGallery__img}
            width={1920} 
            height={1680} 
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority={index === 0}
          />
        </motion.div>
      ))}

      {/* Fullscreen Modal */}
      <Modal isOpen={!!selectedImage} onClose={handleClose}>
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className={styles.gridGallery__expandedImageWrapper}
              layoutId={`grid-image-${images.indexOf(selectedImage) + 1}`} // Match layoutId with grid item
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Image
                src={selectedImage}
                alt='Expanded Gallery'
                className={styles.gridGallery__expandedImage}
                width={1920} // Adjust as needed
                height={1680} // Adjust as needed
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw'
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  )
}

GridGallery.propTypes = {
  // Define prop types if necessary
}

export default GridGallery
