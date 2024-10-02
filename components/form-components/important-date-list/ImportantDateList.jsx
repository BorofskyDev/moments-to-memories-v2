// components/form-components/important-date-list/ImportantDateList.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'

const ImportantDateList = ({ importantDates, handleRemoveDate }) => {
  return (
    <ul>
      {importantDates.map((dateObj, index) => (
        <li key={index}>
          {dateObj.date} - {dateObj.reason} - Tag: {dateObj.tag}
          <button type='button' onClick={() => handleRemoveDate(index)}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}

ImportantDateList.propTypes = {
  importantDates: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      reason: PropTypes.string,
      tag: PropTypes.string,
    })
  ).isRequired,
  handleRemoveDate: PropTypes.func.isRequired,
}

export default ImportantDateList
