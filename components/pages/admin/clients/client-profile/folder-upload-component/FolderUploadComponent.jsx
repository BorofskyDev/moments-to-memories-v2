// FolderUploadComponent.jsx

'use client'

import PropTypes from 'prop-types'
import MainActionButton from '@/components/buttons/main-action-button/MainActionButton'
import InternalPageLink from '@/components/links/internal-page-link/InternalPageLink'
import styles from './FolderUploadComponent.module.scss'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import useGalleryManagement from '@/libs/hooks/ui/useGalleryManagement'

const FolderUploadComponent = ({ clientId }) => {
  const {
    galleries,
    selectedFiles,
    uploadProgress,
    selectedGalleryId,
    isCreateGalleryOpen,
    newGalleryName,
    password,
    confirmPassword,
    isUploading,
    error,
    handleFolderSelect,
    handleUpload,
    handleCreateGallery,
    setIsCreateGalleryOpen,
    setNewGalleryName,
    setPassword,
    setConfirmPassword,
    setSelectedGalleryId,
  } = useGalleryManagement(clientId)

  return (
    <div className={styles.folderUpload}>
      <ParagraphHeading>Client Selection Gallery</ParagraphHeading>

      {/* Gallery Selection */}
      <div className={styles.gallerySelection}>
        <label htmlFor='gallerySelect'>Select Gallery:</label>
        <select
          id='gallerySelect'
          value={selectedGalleryId}
          onChange={(e) => setSelectedGalleryId(e.target.value)}
          className={styles.gallerySelect}
        >
          <option value=''>-- Select a Gallery --</option>
          {galleries.map((gallery) => (
            <option key={gallery.id} value={gallery.id}>
              {gallery.name}
            </option>
          ))}
        </select>

        <MainActionButton
          onClick={() => setIsCreateGalleryOpen(true)}
          text='Create New Gallery'
          className={styles.createGalleryButton}
        />
      </div>

      {/* Create Gallery Modal */}
      {isCreateGalleryOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Create New Gallery</h4>
            <input
              type='text'
              value={newGalleryName}
              onChange={(e) => setNewGalleryName(e.target.value)}
              placeholder='Gallery Name'
              className={styles.galleryNameInput}
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className={styles.passwordInput}
            />
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Password'
              className={styles.confirmPasswordInput}
            />
            <div className={styles.modalActions}>
              <MainActionButton onClick={handleCreateGallery} text='Create' />
              <button
                type='button'
                onClick={() => setIsCreateGalleryOpen(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Folder Selection */}
      <input
        type='file'
        webkitdirectory='true'
        directory=''
        multiple
        onChange={handleFolderSelect}
        className={styles.fileInput}
        accept='image/png, image/jpeg, image/jpg, image/gif'
      />

      {galleries.length > 0 && (
        <div className={styles.galleryList}>
          <h3>Available Galleries</h3>
          <ul className={styles.galleryUl}>
            {galleries.map((gallery) => (
              <li key={gallery.id} className={styles.galleryItem}>
                <span className={styles.galleryName}>{gallery.name}</span>
                <InternalPageLink
                  href={`/clients/${clientId}/${gallery.id}`}
                  className={styles.viewGalleryLink}
                >
                  View Gallery
                </InternalPageLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div className={styles.selectedFiles}>
          <p>{selectedFiles.length} files selected</p>
          <ul>
            {selectedFiles.slice(0, 5).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
            {selectedFiles.length > 5 && (
              <li>and {selectedFiles.length - 5} more...</li>
            )}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <MainActionButton
        onClick={handleUpload}
        disabled={
          isUploading || selectedFiles.length === 0 || !selectedGalleryId
        }
        text={isUploading ? `Uploading... ${uploadProgress}%` : 'Upload Folder'}
        className={styles.uploadButton}
      />
    </div>
  )
}

FolderUploadComponent.propTypes = {
  clientId: PropTypes.string.isRequired,
}

export default FolderUploadComponent
