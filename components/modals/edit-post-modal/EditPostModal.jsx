// components/EditPostModal.jsx
'use client'

import React, { useState } from 'react'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/libs/firebase'
import styles from './EditPostModal.module.scss'

const EditPostModal = ({ post, onClose }) => {
  const [title, setTitle] = useState(post.title)
  const [status, setStatus] = useState(post.status)
  const [publishDate, setPublishDate] = useState(
    post.publishDate
      ? new Date(post.publishDate.seconds * 1000).toISOString().slice(0, 16)
      : ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    try {
      const postRef = doc(db, 'posts', post.id)
      const updatedData = {
        title,
        status,
        dateModified: serverTimestamp(),
      }

      if (status === 'published') {
        updatedData.publishDate = publishDate
          ? new Date(publishDate)
          : serverTimestamp()
      } else {
        updatedData.publishDate = null
      }

      await updateDoc(postRef, updatedData)
      alert('Post updated successfully!')
      onClose()
    } catch (err) {
      console.error('Error updating post:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Edit Post</h3>
        <form>
          {/* Title */}
          <label>
            Title:
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          {/* Status */}
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value='draft'>Draft</option>
              <option value='published'>Published</option>
            </select>
          </label>
          {/* Publish Date */}
          {status === 'published' && (
            <label>
              Publish Date:
              <input
                type='datetime-local'
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </label>
          )}
          {/* Error Message */}
          {error && <p className={styles.error}>Error: {error.message}</p>}
          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button type='button' onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type='button' onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPostModal
