// components/client-profile/gallery-list/GalleryList.jsx

'use client' // Ensure this is at the top

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { db } from '@/libs/firebase' // Ensure correct import
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import styles from './GalleryList.module.scss'
import CustomGallery from '@/components/galleries/custom-gallery/CustomGallery' // Import the CustomGallery
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import ViewButton from '@/components/buttons/view-button/ViewButton'
import AddButton from '@/components/buttons/add-button/AddButton' // Add this import
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'

const GalleryList = ({
  galleries,
  onDelete,
  clientId,
  deletePhoto,
  addPhotosToGallery,
}) => {
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [photos, setPhotos] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

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

  // Handle adding photos
  const handleAddPhotos = async (e) => {
    const files = e.target.files
    if (files.length === 0) return

    try {
      setIsUploading(true)
      setUploadError(null)
      await addPhotosToGallery(selectedGallery.id, Array.from(files))
      // After adding, refresh the photos list
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
      console.error('Error adding photos:', err)
      setUploadError('Failed to add photos.')
    } finally {
      setIsUploading(false)
    }
  }

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
              onDelete={(photoId, photoName) =>
                deletePhoto(selectedGallery.id, photoId, photoName)
              } // Pass galleryId along with photoId and photoName
            />
            {/* Add Photos Button */}
            <AddButton
              onClick={() => document.getElementById('addPhotoInput').click()}
              className={styles.addPhotoButton}
              text={isUploading ? 'Uploading...' : 'Add Photos'}
              disabled={isUploading}
            />
            {/* Hidden File Input */}
            <input
              type='file'
              id='addPhotoInput'
              style={{ display: 'none' }}
              accept='image/*'
              multiple
              onChange={handleAddPhotos}
            />
            {uploadError && <p className={styles.error}>{uploadError}</p>}
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
  addPhotosToGallery: PropTypes.func.isRequired, // New PropType
}

export default GalleryList
