// components/client-profile/gallery-list/GalleryList.jsx

'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './GalleryList.module.scss'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import ViewButton from '@/components/buttons/view-button/ViewButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import CarouselGallery from '@/components/galleries/carousel-gallery/CarouselGallery'

const GalleryList = ({ galleries, onDelete, deletePhoto }) => {
  const [selectedGalleryId, setSelectedGalleryId] = useState(null)

  const handleViewGallery = (galleryId) => {
    if (selectedGalleryId === galleryId) {
      // If the gallery is already selected, close it
      setSelectedGalleryId(null)
    } else {
      setSelectedGalleryId(galleryId)
    }
  }

  return (
    <div className={styles.galleryList}>
      {galleries.length > 0 ? (
        <ul className={styles.galleryUl}>
          {galleries.map((gallery) => (
            <li key={gallery.id} className={styles.galleryItem}>
              <div className={styles.galleryInfo}>
                <ParagraphHeading>{gallery.name}</ParagraphHeading>
                <p>
                  Date:{' '}
                  {gallery.createdAt?.seconds
                    ? new Date(
                        gallery.createdAt.seconds * 1000
                      ).toLocaleDateString('en-US')
                    : 'Date not available'}
                </p>
              </div>
              <div className={styles.galleryActions}>
                <ViewButton
                  className={styles.viewButton}
                  text={
                    selectedGalleryId === gallery.id
                      ? 'Hide Gallery'
                      : 'View Gallery'
                  }
                  onClick={() => handleViewGallery(gallery.id)}
                />
                <DeleteButton
                  onClick={() => onDelete(gallery.id)}
                  className={styles.deleteButton}
                  text='Delete Gallery'
                />
              </div>
              {/* Render CarouselGallery if this gallery is selected */}
              {selectedGalleryId === gallery.id && (
                <div className={styles.carouselContainer}>
                  <CarouselGallery
                    images={gallery.photos.map((photo) => photo.url)}
                    canDelete={true}
                    onDelete={(imageUrl) => {
                      // Find the photoId and photoName based on imageUrl
                      const photoToDelete = gallery.photos.find(
                        (photo) => photo.url === imageUrl
                      )
                      if (photoToDelete) {
                        deletePhoto(
                          gallery.id,
                          photoToDelete.id,
                          photoToDelete.name
                        )
                      }
                    }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No galleries available.</p>
      )}
    </div>
  )
}

GalleryList.propTypes = {
  galleries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.shape({
        seconds: PropTypes.number.isRequired,
      }),
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
}

export default GalleryList
