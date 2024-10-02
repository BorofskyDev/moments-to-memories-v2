// components/form-components/important-date-entry/ImportantDateEntry.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'
import FormInput from '../form-input/FormInput'

const ImportantDateEntry = ({
  dateValue,
  reasonValue,
  tagValue,
  setDateValue,
  setReasonValue,
  setTagValue,
  handleAddDate,
  error,
}) => {
  return (
    <div>
      <FormInput
        label='Date'
        type='date'
        id='important-date'
        name='importantDate'
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
        required
      />
      <FormInput
        label='Reason'
        type='text'
        id='important-reason'
        name='importantReason'
        value={reasonValue}
        onChange={(e) => setReasonValue(e.target.value)}
        required
        placeholder='Why is this date important?'
      />
      <FormInput
        label='Tag'
        type='text'
        id='important-tag'
        name='importantTag'
        value={tagValue}
        onChange={(e) => setTagValue(e.target.value)}
        required
        placeholder='e.g., Birthday, Christmas'
      />
      <button type='button' onClick={handleAddDate}>
        Add Important Date
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

ImportantDateEntry.propTypes = {
  dateValue: PropTypes.string.isRequired,
  reasonValue: PropTypes.string.isRequired,
  tagValue: PropTypes.string.isRequired,
  setDateValue: PropTypes.func.isRequired,
  setReasonValue: PropTypes.func.isRequired,
  setTagValue: PropTypes.func.isRequired,
  handleAddDate: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default ImportantDateEntry
