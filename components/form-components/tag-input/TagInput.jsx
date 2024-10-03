// components/form-components/tag-input/TagInput.jsx
'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './TagInput.module.scss'
import AddButton from '@/components/buttons/add-button/AddButton'
import FormInput from '../form-input/FormInput'

const TagInput = ({
  tagValue,
  setTagValue,
  handleAddTag,
  tags,
  handleRemoveTag,
}) => {
  return (
    <div className={styles.tagInputGroup}>
      
      <div className={styles.tagInput}>
        <FormInput
          type='text'
          placeholder='Add a tag'
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
        />
        <AddButton
          type='button'
          onClick={handleAddTag}
        >
          + {/* Placeholder for add tag icon */}
        </AddButton>
      </div>
      <ul className={styles.tagList}>
        {tags.map((tag, index) => (
          <li key={index} className={styles.tagItem}>
            {tag}
            <button
              type='button'
              onClick={() => handleRemoveTag(index)}
              className={styles.removeButton}
            >
              ✕ {/* Placeholder for delete tag icon */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

TagInput.propTypes = {
  tagValue: PropTypes.string.isRequired,
  setTagValue: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
}

export default TagInput
