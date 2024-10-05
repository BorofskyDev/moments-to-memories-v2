// components/pages/admin/clients/client-profile/client-profile-edit-components/important-dates-edit/ImportantDatesEdit.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'
import EditField from '@/components/layout/edit-field/EditField'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import AddButton from '@/components/buttons/add-button/AddButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import styles from './ImportantDatesEdit.module.scss'

export const ImportantDatesEdit = ({
  importantDates,
  canEdit,
  handleUpdateImportantDate,
  handleDeleteImportantDate,
  handleAddImportantDate,
  formatDate,
}) => {

  return (
    <section className={styles.importantDates}>
      <ParagraphHeading>Important Dates</ParagraphHeading>
      {importantDates && importantDates.length > 0 ? (
        <ul className={styles.list}>
          {importantDates.map((date, index) => (
            <li key={index} className={styles.listItem}>
              {canEdit ? (
                <div className={styles.editFields}>
                  {/* Tag Field */}
                  <EditField
                    label='Tag'
                    fieldName={`importantDate-tag-${index}`}
                    type='text'
                    value={date.tag}
                    onChange={(fieldName, value) => {
                     
                      handleUpdateImportantDate(index, 'tag', value)
                    }}
                  />

                  {/* Reason Field */}
                  <EditField
                    label='Reason'
                    fieldName={`importantDate-reason-${index}`}
                    type='text'
                    value={date.reason}
                    onChange={(fieldName, value) => {
                     
                      handleUpdateImportantDate(index, 'reason', value)
                    }}
                  />

                  {/* Month Field */}
                  <EditField
                    label='Month'
                    fieldName={`importantDate-month-${index}`}
                    type='text'
                    value={date.month}
                    onChange={(fieldName, value) => {
                    
                      handleUpdateImportantDate(index, 'month', value)
                    }}
                  />

                  {/* Day Field */}
                  <EditField
                    label='Day'
                    fieldName={`importantDate-day-${index}`}
                    type='text'
                    value={date.day}
                    onChange={(fieldName, value) => {
                   
                      handleUpdateImportantDate(index, 'day', value)
                    }}
                  />

                  {/* Delete Button */}
                  <DeleteButton
                    onClick={() => handleDeleteImportantDate(index)}
                    className={styles.deleteButton}
                    disabled={false} 
                    text='Delete Important Date'
                  />
                </div>
              ) : (
                <div className={styles.displayFields}>
                  <p>
                    <strong>Tag:</strong> {date.tag}
                  </p>
                  <p>
                    <strong>Reason:</strong> {date.reason}
                  </p>
                  <p>
                    <strong>Date:</strong> {date.month}/{date.day}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No important dates added.</p>
      )}
      {canEdit && (
        <AddButton
          onClick={handleAddImportantDate}
          className={styles.addButton}
          text='Add Important Date'
        />
      )}
    </section>
  )
}

ImportantDatesEdit.propTypes = {
  importantDates: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
    })
  ).isRequired,
  canEdit: PropTypes.bool.isRequired,
  handleUpdateImportantDate: PropTypes.func.isRequired,
  handleDeleteImportantDate: PropTypes.func.isRequired,
  handleAddImportantDate: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
}
