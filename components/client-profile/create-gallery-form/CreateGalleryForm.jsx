// components/client-profile/CreateGalleryForm.jsx

import React, { useState } from 'react'
import styles from './CreateGalleryForm.module.scss'

const CreateGalleryForm = ({ onCreate, onCancel, isCreating }) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    setFiles([...e.target.files])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !date || files.length === 0) {
      alert('Please fill in all fields and upload at least one photo.')
      return
    }
    onCreate(name, date, files)
  }

  return (
    <div className={styles.createGalleryForm}>
      <h2>Create New Photoshoot</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label>Photoshoot Name:</label>
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
          <input
            type='file'
            multiple
            onChange={handleFileChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formActions}>
          <button
            type='submit'
            className={styles.saveButton}
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Save'}
          </button>
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

export default CreateGalleryForm
