// components/form-components/type-toggle/TypeToggle.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './TypeToggle.module.scss'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import FlashWrapper from '@/libs/hoc/FlashWrapper'

const TypeToggle = ({ value, onChange, error }) => {
  return (
    <FlashWrapper>
      <div className={styles.typeToggle}>
        <ParagraphHeading>
          Type<span style={{ color: 'red' }}>*</span>
        </ParagraphHeading>
        <div className={styles.options}>
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
    </FlashWrapper>
  )
}

TypeToggle.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default TypeToggle
