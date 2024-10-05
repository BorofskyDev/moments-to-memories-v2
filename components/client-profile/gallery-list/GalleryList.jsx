// components/client-profile/gallery-list/GalleryList.jsx

'use client' // Ensure this is at the top

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { db } from '@/libs/firebase' // Ensure correct import
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import styles from './GalleryList.module.scss'
import CustomGallery from '@/components/galleries/custom-gallery/CustomGallery' // Import the CustomGallery
import DeleteConfirmationModal from '@/components/modals/delete-confirmation-modal/DeleteConfirmationModal' // Not used now
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import ViewButton from '@/components/buttons/view-button/ViewButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'

const GalleryList = ({ galleries, onDelete, clientId, deletePhoto }) => {
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [photos, setPhotos] = useState([])

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
          console.log('Fetched Photos:', photosList) // Debugging
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

  return (
    <div className={styles.galleryList}>
      {galleries.length > 0 ? (
        <ul>
          {galleries.map((gallery) => (
            <li key={gallery.id} className={styles.galleryItem}>
              <div className={styles.galleryInfo}>
                <ParagraphHeading>{gallery.name}</ParagraphHeading>
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
                <ViewButton
                  onClick={() => setSelectedGallery(gallery)}
                  className={styles.viewButton}
                  text='View Gallery'
                />
                <DeleteButton
                  onClick={() => onDelete(gallery.id)}
                  className={styles.deleteButton}
                  text='Delete Gallery'
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No galleries available.</p>
      )}

      {/* Custom Gallery Modal */}
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
            <CustomGallery
              images={photos}
              onDelete={deletePhoto} // Pass the deletePhoto function
            />
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
