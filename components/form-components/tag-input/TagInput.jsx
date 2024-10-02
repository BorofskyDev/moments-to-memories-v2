// components/form-components/tag-input/TagInput.jsx
'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './TagInput.module.scss'

const TagInput = ({
  tagValue,
  setTagValue,
  handleAddTag,
  tags,
  handleRemoveTag,
}) => {
  return (
    <div className={styles.tagInputGroup}>
      <label className={styles.label}>Marketing Tags</label>
      <div className={styles.tagInput}>
        <input
          type='text'
          placeholder='Add a tag'
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
        />
        <button
          type='button'
          onClick={handleAddTag}
          className={styles.addButton}
        >
          + {/* Placeholder for add tag icon */}
        </button>
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
