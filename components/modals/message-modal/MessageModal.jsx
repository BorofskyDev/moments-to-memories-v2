// components/modals/message-modal/MessageModal.jsx

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './MessageModal.module.scss'
import BodyText from '@/components/layout/body-text/BodyText'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation-modal/DeleteConfirmationModal'
import useMessageList from '@/libs/hooks/messages/useMessageList'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'

const MessageModal = ({ message, onClose }) => {
  const {
    name,
    email,
    phone,
    subject,
    contactMethod,
    message: content,
    imageUrls,
    createdAt,
    id, // Ensure you pass the id of the message
  } = message

  const { deleteMessage } = useMessageList() // Use the delete function from the hook

  // State for Delete Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  // Format date and time
  const formattedDate = createdAt
    ? createdAt.toLocaleDateString()
    : 'Unknown Date'
  const formattedTime = createdAt
    ? createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Unknown Time'

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  // Close modal when clicking outside the content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await deleteMessage(id)
      setIsDeleting(false)
      setIsDeleteModalOpen(false)
      onClose()
    } catch (err) {
      setIsDeleting(false)
      setDeleteError('Failed to delete the message. Please try again.')
    }
  }

  return (
    <>
      <div className={styles.messageModal} onClick={handleOverlayClick}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <ParagraphHeading>{subject}</ParagraphHeading>
            <CancelButton
              className={styles.closeButton}
              onClick={onClose}
              aria-label='Close Modal'
              text='Close'
            />
            <DeleteButton
              className={styles.deleteButton}
              onClick={() => setIsDeleteModalOpen(true)}
              text='Delete'
            />
          </div>
          <div className={styles.modalBody}>
            <div className={styles.modalBody__contentContainer}>
              <strong>Name:</strong> {name}
            </div>
            <div className={styles.modalBody__contentContainer}>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${email}`} className={styles.contactLink}>
                {email}
              </a>
            </div>
            <div className={styles.modalBody__contentContainer}>
              <strong>Phone:</strong>{' '}
              <a href={`tel:${phone}`} className={styles.contactLink}>
                {phone}
              </a>
            </div>
            <div className={styles.modalBody__contentContainer}>
              <strong>Preferred Contact Method:</strong> {contactMethod}
            </div>
            <div className={styles.modalBody__contentContainer}>
              <strong>Received:</strong> {formattedDate} at {formattedTime}
            </div>
            <div className={styles.modalbody__messageContent}>
              <strong>Message:</strong>
              <BodyText>{content}</BodyText>
            </div>
            {imageUrls && imageUrls.length > 0 && (
              <div className={styles.imageContainer}>
                {imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Submitted Image ${index + 1}`}
                    className={styles.messageImage}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirmDelete={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isDeleting={isDeleting}
        text='Are you sure you want to delete this message? This action cannot be undone.'
      />

      {/* Display delete error if any */}
      {deleteError && (
        <BodyText className={styles.deleteError}>{deleteError}</BodyText>
      )}
    </>
  )
}

MessageModal.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired, // Ensure id is included
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    contactMethod: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default MessageModal
