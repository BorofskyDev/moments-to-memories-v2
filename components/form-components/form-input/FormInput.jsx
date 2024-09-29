// components/form-components/form-input/FormInput.jsx
'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './FormInput.module.scss'

const FormInput = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  required = false,
  placeholder = '',
  error = '',
  ...rest
}) => {
  return (
    <div className={styles.formInput}>
      <label htmlFor={id} className={styles.formInput__label}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${styles.formInput__input }${
          error ? styles.formInput__error : styles.formInput__success
        } `}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className={styles.formInput__errorText}>
          {error}
        </p>
      )}
    </div>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
}

export default FormInput
