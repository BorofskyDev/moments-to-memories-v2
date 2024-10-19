// components/client-profile/gallery-list/GalleryList.jsx

'use client' // Ensure this is at the top

import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link' // Import Link from Next.js
import styles from './GalleryList.module.scss'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import ViewButton from '@/components/buttons/view-button/ViewButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'

const GalleryList = ({ galleries, onDelete, clientId }) => {
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
                {/* Link to the dedicated gallery page */}
                <Link href={`/clients/${clientId}/${gallery.id}`}>
                  <ViewButton
                    className={styles.viewButton}
                    text='View Gallery'
                  />
                </Link>
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
      // Removed 'photos' prop as it's handled in the dedicated gallery page
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired, // New PropType
}

export default GalleryList
