// components/layout/edit-field/EditField.jsx

'use client'

import React from 'react'
import useFieldClickOutside from '@/libs/hooks/useFieldClickOutside'
import styles from './EditField.module.scss' // Ensure you have appropriate styles

const EditField = ({
  label,
  fieldName,
  type = 'text',
  value,
  onChange,
  onDelete,
}) => {
  const [isActive, setIsActive] = React.useState(false)

  const handleClickOutside = () => {
    setIsActive(false)
  }

  const ref = useFieldClickOutside(handleClickOutside)

  const handleFieldClick = () => {
    setIsActive(true)
  }

  const handleInputChange = (e) => {
    onChange(fieldName, e.target.value)
  }

  return (
    <div className={styles.field} ref={ref}>
      <label htmlFor={fieldName}>{label}:</label>
      {isActive ? (
        type === 'textarea' ? (
          <textarea
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleInputChange}
            onBlur={() => setIsActive(false)}
            className={styles.textarea}
            autoFocus
          />
        ) : (
          <input
            type={type}
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleInputChange}
            onBlur={() => setIsActive(false)}
            className={styles.fieldInput}
            autoFocus
          />
        )
      ) : (
        <p
          className={`${styles.fieldValue} ${isActive ? styles.active : ''}`}
          onClick={handleFieldClick}
        >
          {value || 'N/A'}
        </p>
      )}
      {/* Conditionally render Delete button only when active */}
      {isActive && onDelete && (
        <button onClick={() => onDelete()} className={styles.deleteButton}>
          Delete
        </button>
      )}
    </div>
  )
}

export default EditField
