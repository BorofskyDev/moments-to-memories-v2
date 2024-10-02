// components/form-components/type-toggle/TypeToggle.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'

const TypeToggle = ({ value, onChange, error }) => {
  return (
    <div>
      <label>
        Type<span style={{ color: 'red' }}>*</span>
      </label>
      <div>
        <label>
          <input
            type='radio'
            name='type'
            value='client'
            checked={value === 'client'}
            onChange={onChange}
            required
          />
          Client
        </label>
        <label>
          <input
            type='radio'
            name='type'
            value='prospect'
            checked={value === 'prospect'}
            onChange={onChange}
            required
          />
          Prospect
        </label>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

TypeToggle.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default TypeToggle
