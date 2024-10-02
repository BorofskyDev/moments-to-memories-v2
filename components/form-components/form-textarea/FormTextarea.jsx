// components/form-components/form-textarea/FormTextarea.jsx
'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './FormTextarea.module.scss'

const FormTextarea = ({
  label,
  id,
  value,
  onChange,
  required = false,
  placeholder = '',
  error = '',
  ...rest
}) => {
  return (
    <div className={styles.formTextarea}>
      <label htmlFor={id} className={styles.formTextarea__label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${styles.formTextarea__textarea} ${
          error ? styles.formTextarea__error : styles.formTextarea__success
        }`}
        {...rest}
      ></textarea>
      {error && (
        <p id={`${id}-error`} className={styles.formTextarea__errorText}>
          {error}
        </p>
      )}
    </div>
  )
}

FormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
}

export default FormTextarea
