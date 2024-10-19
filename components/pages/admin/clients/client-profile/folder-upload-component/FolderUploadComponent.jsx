// components/admin/clients/client-profile/folder-upload-component/FolderUploadComponent.jsx

'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './FolderUploadComponent.module.scss'
import useGallery from '@/libs/hooks/client-profile/useGallery'
import MainActionButton from '@/components/buttons/main-action-button/MainActionButton'
import { toast } from 'react-toastify'

const FolderUploadComponent = ({ clientId }) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedGalleryId, setSelectedGalleryId] = useState('')
  const [isCreateGalleryOpen, setIsCreateGalleryOpen] = useState(false)
  const [newGalleryName, setNewGalleryName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { galleries, addPhotosToGallery } = useGallery(clientId)

  // Handle folder selection and file validation
  const handleFolderSelect = (event) => {
    const files = Array.from(event.target.files)

    // Validate file types
    const supportedFormats = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
    ]
    const invalidFiles = files.filter(
      (file) => !supportedFormats.includes(file.type)
    )

    if (invalidFiles.length > 0) {
      toast.error('Some files have unsupported formats and will be ignored.')
      const validFiles = files.filter((file) =>
        supportedFormats.includes(file.type)
      )
      setSelectedFiles(validFiles)
    } else {
      setSelectedFiles(files)
    }
  }

  // Handle the upload process
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.warn('No files selected for upload.')
      return
    }

    if (!selectedGalleryId) {
      toast.warn('Please select a gallery to upload to.')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Call addPhotosToGallery with galleryId and files
      await addPhotosToGallery(selectedGalleryId, selectedFiles, (progress) => {
        setUploadProgress(progress)
      })

      toast.success('Folder uploaded successfully!')
      setSelectedFiles([])
    } catch (error) {
      console.error('Error uploading folder:', error)
      toast.error('Failed to upload folder. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Handle creating a new gallery with password
  const handleCreateGallery = async () => {
    if (!newGalleryName.trim()) {
      toast.warn('Gallery name cannot be empty.')
      return
    }

    if (!password || !confirmPassword) {
      toast.warn('Please enter and confirm the password.')
      return
    }

    if (password !== confirmPassword) {
      toast.warn('Passwords do not match.')
      return
    }

    try {
      // Call the API to create a new gallery with password
      const response = await fetch('/api/createGallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          galleryName: newGalleryName,
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSelectedGalleryId(data.galleryId)
        toast.success(`Gallery "${newGalleryName}" created successfully!`)
        setIsCreateGalleryOpen(false)
        setNewGalleryName('')
        setPassword('')
        setConfirmPassword('')
      } else {
        throw new Error(data.message || 'Failed to create gallery.')
      }
    } catch (error) {
      console.error('Error creating gallery:', error)
      toast.error('Failed to create gallery. Please try again.')
    }
  }

  return (
    <div className={styles.folderUpload}>
      <h3>Upload Image Folder</h3>

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
