// components/client-profile/gallery-list/GalleryList.jsx

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { db } from '@/libs/firebase' // Ensure correct import
import { collection, getDocs } from 'firebase/firestore'
import styles from './GalleryList.module.scss'
import Image from 'next/image'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation-modal/DeleteConfirmationModal' // Import your existing modal

const GalleryList = ({ galleries, onDelete, clientId, deletePhoto }) => {
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [photos, setPhotos] = useState([])
  const [photoToDelete, setPhotoToDelete] = useState(null) // State for the photo to delete
  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false) // State for deleting photo

  useEffect(() => {
    if (selectedGallery) {
      // Fetch photos for the selected gallery
      const fetchPhotos = async () => {
        try {
          const photosCol = collection(
            db,
            'clients',
            clientId,
            'galleries',
            selectedGallery.id,
            'photos'
          )
          const photosSnapshot = await getDocs(photosCol)
          const photosList = photosSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setPhotos(photosList)
        } catch (err) {
          console.error('Error fetching photos:', err)
        }
      }
      fetchPhotos()
    } else {
      setPhotos([])
    }
  }, [selectedGallery, clientId])

  const handlePhotoClick = (photo) => {
    setPhotoToDelete(photo)
  }

  const handleConfirmDeletePhoto = async () => {
    if (!photoToDelete || !selectedGallery) return
    setIsDeletingPhoto(true)
    try {
      await deletePhoto(
        selectedGallery.id,
        photoToDelete.id,
        photoToDelete.name
      )
      setPhotoToDelete(null)
    } catch (err) {
      console.error('Error deleting photo:', err)
    } finally {
      setIsDeletingPhoto(false)
    }
  }

  const handleCancelDeletePhoto = () => {
    setPhotoToDelete(null)
  }

  return (
    <div className={styles.galleryList}>
      {galleries.length > 0 ? (
        <ul>
          {galleries.map((gallery) => (
            <li key={gallery.id} className={styles.galleryItem}>
              <div className={styles.galleryInfo}>
                <h3>{gallery.name}</h3>
                <p>
                  Date:{' '}
                  {gallery.date.seconds
                    ? new Date(gallery.date.seconds * 1000).toLocaleDateString(
                        'en-US'
                      )
                    : 'Invalid Date'}
                </p>
              </div>
              <div className={styles.galleryActions}>
                <button
                  onClick={() => setSelectedGallery(gallery)}
                  className={styles.viewButton}
                >
                  View
                </button>
                <button
                  onClick={() => onDelete(gallery.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No galleries available.</p>
      )}

      {/* Gallery Modal */}
      {selectedGallery && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{selectedGallery.name}</h3>
            <p>
              Date:{' '}
              {selectedGallery.date.seconds
                ? new Date(
                    selectedGallery.date.seconds * 1000
                  ).toLocaleDateString('en-US')
                : 'Invalid Date'}
            </p>
            <div className={styles.photosGrid}>
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={styles.photoContainer}
                  onClick={() => handlePhotoClick(photo)}
                >
                  <Image
                    src={photo.url}
                    alt={photo.name}
                    className={styles.photo}
                    height={1600}
                    width={1900}
                    // Optional: Add placeholder and blur for better UX
                    // placeholder="blur"
                    // blurDataURL="/placeholder.png"
                  />
                  <p>{photo.name}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedGallery(null)}
              className={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Photo Confirmation Modal */}
      {photoToDelete && (
        <DeleteConfirmationModal
          isOpen={!!photoToDelete}
          onConfirmDelete={handleConfirmDeletePhoto}
          onCancel={handleCancelDeletePhoto}
          isDeleting={isDeletingPhoto}
          text={`Are you sure you want to delete "${photoToDelete.name}"? This action cannot be undone.`}
        />
      )}
    </div>
  )
}

GalleryList.propTypes = {
  galleries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          seconds: PropTypes.number,
        }),
      ]).isRequired,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired, // Ensure each photo has an ID
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired, // New PropType
  deletePhoto: PropTypes.func.isRequired, // New PropType
}

export default GalleryList
