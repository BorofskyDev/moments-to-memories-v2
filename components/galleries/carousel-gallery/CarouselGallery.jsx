// components/galleries/carousel-gallery/CarouselGallery.jsx

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Modal from '../../modals/modal/Modal'
import styles from './CarouselGallery.module.scss'
import PropTypes from 'prop-types'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import Swiper modules
import { Navigation, Pagination, A11y } from 'swiper/modules'

const CarouselGallery = ({ images, canDelete = false, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null)

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
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className={styles.imageWrapper}>
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className={styles.image}
                width={1920}
                height={1080}
                onClick={() => handleImageClick(image)}
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <Modal isOpen={!!selectedImage} onClose={handleClose}>
          <div className={styles.modalContent}>
            <Image
              src={selectedImage}
              alt='Enlarged Image'
              className={styles.enlargedImage}
              width={1920}
              height={1080}
            />
          </div>
        </Modal>
      )}
    </div>
  )
}

CarouselGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  canDelete: PropTypes.bool,
  onDelete: PropTypes.func,
}

export default CarouselGallery
