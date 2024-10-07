// components/layout/input-field/InputField.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './InputField.module.scss'
import BodyText from '@/components/layout/body-text/BodyText'

const InputField = ({
    className,
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  error = '',
  as = 'input', // 'input' or 'textarea'
  ...rest
}) => {
  return (
    <div className={`${styles.formGroup} ${className}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${styles.inputField} ${error ? styles.errorInput : ''}`}
          required={required}
          {...rest}
        ></textarea>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${styles.inputField} ${error ? styles.errorInput : ''}`}
          required={required}
          {...rest}
        />
      )}

      {error && <BodyText className={styles.errorText}>{error}</BodyText>}
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  as: PropTypes.oneOf(['input', 'textarea']),
}

export default InputField
