// components/client-profile/create-gallery-form/CreateGalleryForm.jsx

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './CreateGalleryForm.module.scss'
import Image from 'next/image'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import AddButton from '@/components/buttons/add-button/AddButton'
import SubmitButton from '@/components/buttons/submit-button/SubmitButton'

const CreateGalleryForm = ({ onCreate, onCancel, isCreating }) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [photos, setPhotos] = useState([]) // Array of { file: File, preview: string }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      setPhotos((prev) => [...prev, { file, preview }])
    }
  }

  const handleAddPhoto = () => {
    // Trigger the hidden file input
    document.getElementById('fileInput').click()
  }

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !date || photos.length === 0) {
      alert('Please fill in all fields and upload at least one photo.')
      return
    }
    const files = photos.map((photo) => photo.file)
    onCreate(name, date, files)
  }

  return (
    <div className={styles.createGalleryForm}>
      <h2>Create New Gallery</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label>Gallery Name:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formField}>
          <label>Date:</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formField}>
          <label>Photos:</label>
          <div className={styles.photosContainer}>
            {photos.map((photo, index) => (
              <div key={index} className={styles.photoItem}>
                <Image
                  src={photo.preview}
                  alt={`Photo ${index + 1}`}
                  className={styles.photoPreview}
                  width={1900}
                  height={1600}
                />
                <DeleteButton
                  type='button'
                  onClick={() => handleRemovePhoto(index)}
                  className={styles.removeButton}
                  text='Remove Photo'
                />
              </div>
            ))}
            <AddButton
              type='button'
              onClick={handleAddPhoto}
              className={styles.addPhotoButton}
              text='Add Photo'
            />
            {/* Hidden file input */}
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              accept='image/*'
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className={styles.formActions}>
          <SubmitButton
            type='submit'
            className={styles.saveButton}
            disabled={isCreating}
            text={isCreating ? 'Creating...' : 'Save'}/>
          <button
            type='button'
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isCreating}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

CreateGalleryForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
}

export default CreateGalleryForm
