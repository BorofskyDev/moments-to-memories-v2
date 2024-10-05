'use client'

import React from 'react'
import PropTypes from 'prop-types'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'
import styles from './DeleteConfirmationModal.module.scss'
import Subheading from '@/components/headings/subheading/Subheading'

const DeleteConfirmationModal = ({
  onConfirmDelete,
  onCancel,
  isDeleting,
  isOpen,
  text
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <Subheading>Confirm Deletion</Subheading>
        <p>
          {text}
        </p>
        <div className={styles.modalButtons}>
          <DeleteButton
            onClick={onConfirmDelete}
            className={styles.confirmDeleteButton}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </DeleteButton>
          <CancelButton
            onClick={onCancel}
            className={styles.cancelModalButton}
            disabled={isDeleting}
          >
            Cancel
          </CancelButton>
        </div>
      </div>
    </div>
  )
}

DeleteConfirmationModal.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default DeleteConfirmationModal
