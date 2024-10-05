'use client'

import React from 'react'
import PropTypes from 'prop-types'
import EditField from '@/components/layout/edit-field/EditField'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import AddButton from '@/components/buttons/add-button/AddButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import styles from './PhotoshootsEdit.module.scss'

export const PhotoshootsEdit = ({
  photoshootDates,
  canEdit,
  editedFields,
  handleInputChange,
  handleDeletePhotoshootDate,
  handleAddPhotoshootDate,
  handleUpdatePhotoshootDate,
  formatDate,
}) => {
  return (
    <section className={styles.photoshoots}>
      <ParagraphHeading>Photoshoots</ParagraphHeading>
      {photoshootDates && photoshootDates.length > 0 ? (
        <ul className={styles.photoshoots__list}>
          {photoshootDates.map((date, index) => (
            <li key={index} className={styles.listItem}>
              {canEdit ? (
                <>
                  <EditField
                    label='Tag'
                    fieldName={`photoshootDate-tag-${index}`}
                    type='text'
                    value={
                      editedFields[`photoshootDate-tag-${index}`] ?? date.tag
                    }
                    onChange={(fieldName, value) => {
                      handleUpdatePhotoshootDate(index, 'tag', value)
                    }}
                  />
                  <EditField
                    label='Reason'
                    fieldName={`photoshootDate-reason-${index}`}
                    type='text'
                    value={
                      editedFields[`photoshootDate-reason-${index}`] ??
                      date.reason
                    }
                    onChange={(fieldName, value) => {
                      handleUpdatePhotoshootDate(index, 'reason', value)
                    }}
                  />
                  <EditField
                    label='Date'
                    fieldName={`photoshootDate-date-${index}`}
                    type='date'
                    value={
                      editedFields[`photoshootDate-date-${index}`]
                        ? formatDate(
                            editedFields[`photoshootDate-date-${index}`]
                          )
                        : formatDate(date.date)
                    }
                    onChange={(fieldName, value) => {
                      handleUpdatePhotoshootDate(index, 'date', value)
                    }}
                  />
                  <DeleteButton
                    onClick={() => handleDeletePhotoshootDate(index)}
                    className={styles.deleteButton}
                    text='Delete Photoshoot Date'
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>Tag:</strong> {date.tag}
                  </p>
                  <p>
                    <strong>Reason:</strong> {date.reason}
                  </p>
                  <p>
                    <strong>Date:</strong> {formatDate(date.date)}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No photoshoots scheduled.</p>
      )}
      {canEdit && (
        <AddButton
          onClick={handleAddPhotoshootDate}
          className={styles.addButton}
          text='Add Photoshoot'
        />
      )}
    </section>
  )
}

PhotoshootsEdit.propTypes = {
  photoshootDates: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          seconds: PropTypes.number,
        }),
      ]).isRequired,
    })
  ).isRequired,
  canEdit: PropTypes.bool.isRequired,
  editedFields: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDeletePhotoshootDate: PropTypes.func.isRequired,
  handleAddPhotoshootDate: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
}


