// components/form-components/date-input/DateInput.jsx

'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormInput from '../form-input/FormInput'

const DateInput = ({
  label,
  dateValue,
  setDateValue,
  handleAddDate,
  dates,
  handleRemoveDate,
  isDateWithReason = false, // New prop to determine if reason field is needed
}) => {
  const [reasonInput, setReasonInput] = useState('')
  const [tagInput, setTagInput] = useState('')

  const [tagOptions] = useState([
    'Birthdays',
    'Christmas',
    'Anniversary',
    'Other',
  ]) // Placeholder tags

  const handleAdd = () => {
    if (
      dateValue.trim() === '' ||
      (isDateWithReason && reasonInput.trim() === '')
    )
      return
    const newDate = {
      date: dateValue,
      reason: isDateWithReason ? reasonInput : '',
      tag: isDateWithReason ? tagInput : '',
    }
    handleAddDate(newDate)
    setDateValue('')
    setReasonInput('')
    setTagInput('')
  }

  return (
    <div>
      <label>
        {label}
        {isDateWithReason && <span style={{ color: 'red' }}>*</span>}
      </label>
      <div>
        <input
          type='date'
          value={dateValue}
          onChange={(e) => setDateValue(e.target.value)}
          required={isDateWithReason}
        />
        <button type='button' onClick={handleAdd}>
          + {/* Placeholder for add date icon */}
        </button>
      </div>
      {isDateWithReason && (
        <div>
          <FormInput
            label='Reason'
            type='text'
            id={`${label}-reason`}
            name='reason'
            value={reasonInput}
            onChange={(e) => setReasonInput(e.target.value)}
            required
            placeholder='Enter reason for the date'
          />

          {/* Tag Selector */}
          <div>
            <label>
              Tag<span style={{ color: 'red' }}>*</span>
            </label>
            <select
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              required
            >
              <option value=''>Select a tag</option>
              {tagOptions.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <ul>
        {dates.map((dateObj, index) => (
          <li key={index}>
            <span>
              {dateObj.date} - {dateObj.reason} - Tag: {dateObj.tag}
            </span>
            <button type='button' onClick={() => handleRemoveDate(index)}>
              ✕ {/* Placeholder for delete date icon */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  dateValue: PropTypes.string.isRequired,
  setDateValue: PropTypes.func.isRequired,
  handleAddDate: PropTypes.func.isRequired,
  dates: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      reason: PropTypes.string,
      tag: PropTypes.string,
    })
  ).isRequired,
  handleRemoveDate: PropTypes.func.isRequired,
  isDateWithReason: PropTypes.bool,
}

export default DateInput
