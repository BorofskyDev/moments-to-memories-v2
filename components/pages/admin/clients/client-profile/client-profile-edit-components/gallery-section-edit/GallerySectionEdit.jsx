// components/pages/admin/client-profile/client-profile-edit-components/GallerySectionEdit.jsx

import React from 'react'
import PropTypes from 'prop-types'
import AddButton from '@/components/buttons/add-button/AddButton'
import CreateGalleryForm from '@/components/client-profile/create-gallery-form/CreateGalleryForm'
import GalleryList from '@/components/client-profile/gallery-list/GalleryList'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import styles from './GallerySectionEdit.module.scss'

export const GallerySectionEdit = ({
  canEdit,
  isCreatingGallery,
  handleCreateGallery,
  handleCancelCreateGallery,
  handleAddGallery,
  galleries,
  deleteGallery,
  galleryError,
  isCreating,
  clientId, // New prop
  deletePhoto, // New prop
}) => {
  return (
    <section className={styles.gallerySection}>
      <ParagraphHeading>Galleries</ParagraphHeading>
      {canEdit && (
        <AddButton
          onClick={handleAddGallery}
          className={styles.createGalleryButton}
          text='Add Gallery'
        />
      )}

      {isCreatingGallery && (
        <CreateGalleryForm
          onCreate={handleCreateGallery}
          onCancel={handleCancelCreateGallery}
          isCreating={isCreating} // Pass the actual isCreating state
        />
      )}

      <GalleryList
        galleries={galleries}
        onDelete={(galleryId) => deleteGallery(galleryId)}
        clientId={clientId} // Pass clientId
        deletePhoto={deletePhoto} // Pass deletePhoto
      />

      {galleryError && (
        <p className={styles.error}>
          Gallery Error: {galleryError.message || galleryError}
        </p>
      )}
    </section>
  )
}

GallerySectionEdit.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  isCreatingGallery: PropTypes.bool.isRequired,
  handleCreateGallery: PropTypes.func.isRequired,
  handleCancelCreateGallery: PropTypes.func.isRequired,
  handleAddGallery: PropTypes.func.isRequired,
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
      // Add other gallery properties as needed
    })
  ).isRequired,
  deleteGallery: PropTypes.func.isRequired,
  galleryError: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isCreating: PropTypes.bool.isRequired,
  clientId: PropTypes.string.isRequired, // New PropType
  deletePhoto: PropTypes.func.isRequired, // New PropType
}

GallerySectionEdit.defaultProps = {
  galleryError: null,
}

export default GallerySectionEdit
