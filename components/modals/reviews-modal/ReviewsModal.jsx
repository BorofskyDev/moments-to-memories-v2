// components/modals/reviews-modal/ReviewsModal.jsx

'use client'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './ReviewsModal.module.scss'
import { storage, db } from '@/libs/firebase'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDocs,
} from 'firebase/firestore'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation-modal/DeleteConfirmationModal'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import EditField from '@/components/layout/edit-field/EditField'

const ReviewsModal = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])
  const [selectedReview, setSelectedReview] = useState(null) // For deletion
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch existing reviews when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchReviews()
    } else {
      // Reset state when modal closes
      setImage(null)
      setTitle('')
      setReviewText('')
      setError(null)
      setReviews([])
      setSelectedReview(null)
      setIsDeleting(false)
    }
  }, [isOpen])

  const fetchReviews = async () => {
    try {
      const reviewsCol = collection(db, 'siteReviews')
      const reviewsSnapshot = await getDocs(reviewsCol)
      const reviewsList = reviewsSnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))
      setReviews(reviewsList)
    } catch (err) {
      console.error('Error fetching reviews:', err)
      setError('Failed to fetch reviews.')
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!image || !title || !reviewText) {
      setError('All fields are required.')
      return
    }

    setIsUploading(true)

    try {
      // 1. Upload image to Firebase Storage
      const storageRefInstance = ref(
        storage,
        `siteReviews/${Date.now()}_${image.name}`
      )
      const uploadResult = await uploadBytes(storageRefInstance, image)
      const imageUrl = await getDownloadURL(uploadResult.ref)

      // 2. Save review data to Firestore
      const reviewsCollection = collection(db, 'siteReviews')
      const newReviewRef = await addDoc(reviewsCollection, {
        imageUrl,
        title,
        clientLink: '#', // Placeholder link
        reviewText,
        createdAt: serverTimestamp(),
      })

      // 3. Update local state
      setReviews((prev) => [
        ...prev,
        {
          id: newReviewRef.id,
          imageUrl,
          title,
          clientLink: '#',
          reviewText,
          createdAt: new Date(),
        },
      ])

      // 4. Reset form and close modal
      setImage(null)
      setTitle('')
      setReviewText('')
      onClose()
    } catch (err) {
      console.error('Error uploading review:', err)
      setError('Failed to upload review. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  // Handle updating a review
  const handleUpdateReview = async (reviewId, field, newValue) => {
    try {
      const reviewDocRef = doc(db, 'siteReviews', reviewId)
      await updateDoc(reviewDocRef, {
        [field]: newValue,
      })
      // Update local state
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, [field]: newValue } : review
        )
      )
    } catch (err) {
      console.error('Error updating review:', err)
      setError('Failed to update review. Please try again.')
    }
  }

  // Handle deletion of a review
  const handleDeleteReview = async () => {
    if (!selectedReview) return
    setIsDeleting(true)
    try {
      const reviewDocRef = doc(db, 'siteReviews', selectedReview.id)
      // Optionally, delete the image from Storage
      const imageRef = ref(storage, selectedReview.imageUrl)
      await deleteObject(imageRef)
      // Delete the Firestore document
      await deleteDoc(reviewDocRef)
      // Update local state
      setReviews((prev) =>
        prev.filter((review) => review.id !== selectedReview.id)
      )
      setSelectedReview(null)
    } catch (err) {
      console.error('Error deleting review:', err)
      setError('Failed to delete review. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <ParagraphHeading>Upload New Review</ParagraphHeading>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <div className={styles.formGroup}>
            <label htmlFor='reviewImage'>Upload Image:</label>
            <input
              type='file'
              id='reviewImage'
              accept='image/*'
              onChange={handleImageChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='reviewTitle'>Title (Link to Client Page):</label>
            <input
              type='text'
              id='reviewTitle'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter review title'
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='reviewText'>Review Text:</label>
            <textarea
              id='reviewText'
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder='Enter review text'
              required
            ></textarea>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttonGroup}>
            <DeleteButton
              type='submit'
              className={styles.submitButton}
              disabled={isUploading}
              text={isUploading ? 'Uploading...' : 'Submit Review'}
            />
            <CancelButton
              onClick={onClose}
              className={styles.cancelButton}
              text='Cancel'
              disabled={isUploading}
            />
          </div>
        </form>

        {/* Existing Reviews */}
        <div className={styles.existingReviews}>
          <ParagraphHeading>Existing Reviews</ParagraphHeading>
          {reviews.length > 0 ? (
            <ul className={styles.reviewList}>
              {reviews.map((review) => (
                <li key={review.id} className={styles.reviewItem}>
                  <div className={styles.reviewImage}>
                    <img src={review.imageUrl} alt={review.title} />
                  </div>
                  <div className={styles.reviewDetails}>
                    <EditField
                      label='Title'
                      fieldName={`title-${review.id}`}
                      type='text'
                      value={review.title}
                      onChange={(field, newValue) =>
                        handleUpdateReview(review.id, 'title', newValue)
                      }
                    />
                    <EditField
                      label='Review Text'
                      fieldName={`reviewText-${review.id}`}
                      type='textarea'
                      value={review.reviewText}
                      onChange={(field, newValue) =>
                        handleUpdateReview(review.id, 'reviewText', newValue)
                      }
                    />
                  </div>
                  <div className={styles.reviewActions}>
                    <DeleteButton
                      onClick={() => setSelectedReview(review)}
                      className={styles.deleteButton}
                      text='Delete Review'
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={!!selectedReview}
          onConfirmDelete={handleDeleteReview}
          onCancel={() => setSelectedReview(null)}
          isDeleting={isDeleting}
          text={`Are you sure you want to delete the review "${selectedReview?.title}"? This action cannot be undone.`}
        />
      </div>
    </div>
  )
}

ReviewsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ReviewsModal
