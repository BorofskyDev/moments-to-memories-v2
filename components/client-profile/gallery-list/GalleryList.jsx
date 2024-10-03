// components/client-profile/GalleryList.jsx

import React, { useState, useEffect } from 'react'
import styles from './GalleryList.module.scss'

const GalleryList = ({ galleries, onDelete }) => {
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    if (selectedGallery) {
      // Fetch photos for the selected gallery
      const fetchPhotos = async () => {
        try {
          const photosSnapshot = await getDocs(
            collection(
              db,
              'clients',
              clientId,
              'galleries',
              selectedGallery.id,
              'photos'
            )
          )
          const photosList = photosSnapshot.docs.map((doc) => doc.data())
          setPhotos(photosList)
        } catch (err) {
          console.error('Error fetching photos:', err)
        }
      }
      fetchPhotos()
    }
  }, [selectedGallery])

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
                  {new Date(gallery.date.seconds * 1000).toLocaleDateString(
                    'en-US'
                  )}
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
              {new Date(selectedGallery.date.seconds * 1000).toLocaleDateString(
                'en-US'
              )}
            </p>
            <div className={styles.photosGrid}>
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.url}
                  alt={photo.name}
                  className={styles.photo}
                />
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
    </div>
  )
}

export default GalleryList
