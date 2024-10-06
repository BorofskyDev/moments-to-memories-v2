'use client'

import React from 'react'
import PropTypes from 'prop-types'
import SaveButton from '@/components/buttons/save-button/SaveButton'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'
import styles from './ActionButtons.module.scss'

export const ActionButtons = ({ handleSave, handleCancel, isSaving }) => {
  return (
    <div className={styles.actionButtons}>
      <SaveButton
        onClick={handleSave}
        className={styles.saveButton}
        disabled={isSaving}
        text='Save Profile'
      />
      <CancelButton
        onClick={handleCancel}
        className={styles.cancelButton}
        disabled={isSaving}
        text='Cancel'
      />
    </div>
  )
}

ActionButtons.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
}

