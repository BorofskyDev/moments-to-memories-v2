// components/form-components/important-date-form/ImportantDateForm.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './ImportantDateForm.module.scss'
import FormInput from '../form-input/FormInput'
import SaveButton from '@/components/buttons/save-button/SaveButton'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'

const ImportantDateForm = ({
  month,
  day,
  reason,
  tag,
  handleMonthChange,
  handleDayChange,
  handleReasonChange,
  handleTagChange,
  handleSave,
  handleCancel,
}) => {
  // Generate options for months and days
  const months = [
    { value: '', label: 'Select Month' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ]

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1),
  }))

  return (
    <div className={styles.importantDateForm}>
      <div className={styles.dateGroup}>
        <label htmlFor='month'>
          Month<span style={{ color: 'red' }}>*</span>
        </label>
        <select id='month' value={month} onChange={handleMonthChange} required>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.dateGroup}>
        <label htmlFor='day'>
          Day<span style={{ color: 'red' }}>*</span>
        </label>
        <select id='day' value={day} onChange={handleDayChange} required>
          <option value=''>Select Day</option>
          {days.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <FormInput label='Reason for Importance'
        
        
          type='text'
          id='reason'
          value={reason}
          onChange={handleReasonChange}
          placeholder='Enter reason'
        />
      </div>
      <div>
        <FormInput label='Tag'
        
          type='text'
          id='tag'
          value={tag}
          onChange={handleTagChange}
          placeholder='Enter tag (e.g., Birthdays, Christmas)'
        />
      </div>
      <div className={styles.buttonGroup}>
        <SaveButton type='button' onClick={handleSave} />
        <CancelButton type='button' onClick={handleCancel} />
          
      
      </div>
    </div>
  )
}

ImportantDateForm.propTypes = {
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  handleMonthChange: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired,
  handleReasonChange: PropTypes.func.isRequired,
  handleTagChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
}

export default ImportantDateForm
