// components/pages/admin/clients/client-profile/client-profile-edit-components/MarketingTagsEdit.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'
import EditField from '@/components/layout/edit-field/EditField'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import AddButton from '@/components/buttons/add-button/AddButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import styles from './MarketingTagsEdit.module.scss'

export const MarketingTagsEdit = ({
  marketingTags,
  canEdit,
  handleUpdateMarketingTag, // New prop
  handleDeleteMarketingTag,
  handleAddMarketingTag,
}) => {
  return (
    <section className={styles.marketingTags}>
      <ParagraphHeading>Marketing Tags</ParagraphHeading>
      {marketingTags && marketingTags.length > 0 ? (
        <ul className={styles.marketingTags__list}>
          {marketingTags.map((tag, index) => (
            <li key={index} className={styles.marketingTag}>
              {canEdit ? (
                <>
                  <EditField
                    label='Tag'
                    fieldName={`marketingTag-${index}`}
                    type='text'
                    value={tag} // Directly use the tag value
                    onChange={(fieldName, value) => {
                    
                      handleUpdateMarketingTag(index, value) // Use dedicated handler
                    }}
                  />
                  <DeleteButton
                    onClick={() => handleDeleteMarketingTag(index)}
                    className={styles.deleteButton}
                    text='Delete Marketing Tag'
                  />
                </>
              ) : (
                <p className={styles.marketingTag__tag}>{tag}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No marketing tags added.</p>
      )}
      {canEdit && (
        <AddButton
          onClick={handleAddMarketingTag}
          className={styles.addButton}
          text='Add Marketing Tag'
        />
      )}
    </section>
  )
}

MarketingTagsEdit.propTypes = {
  marketingTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  canEdit: PropTypes.bool.isRequired,
  handleUpdateMarketingTag: PropTypes.func.isRequired, // New PropType
  handleDeleteMarketingTag: PropTypes.func.isRequired,
  handleAddMarketingTag: PropTypes.func.isRequired,
}
