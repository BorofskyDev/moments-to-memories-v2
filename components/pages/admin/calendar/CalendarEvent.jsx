// components/CalendarEvent/CalendarEvent.jsx

import React from 'react'

const CalendarEvent = ({ event }) => {
  return (
    <div>
      <strong>{event.title}</strong>
      <div>{event.clientName}</div>
      {/* Add more fields as needed */}
    </div>
  )
}

export default CalendarEvent
