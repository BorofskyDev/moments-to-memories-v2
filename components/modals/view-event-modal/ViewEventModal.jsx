// components/ViewEventModal/ViewEventModal.jsx

import React from 'react'
import styles from './ViewEventModal.module.scss'

const ViewEventModal = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{event.title}</h2>
        <p>
          <strong>Client Name:</strong> {event.clientName}
        </p>
        <p>
          <strong>Contact Phone:</strong> {event.contactPhone}
        </p>
        <p>
          <strong>Contact Email:</strong> {event.contactEmail}
        </p>
        <p>
          <strong>Event Type:</strong> {event.eventType}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Start Time:</strong> {event.start.toLocaleString()}
        </p>
        <p>
          <strong>End Time:</strong> {event.end.toLocaleString()}
        </p>
        <p>
          <strong>Notes:</strong>
        </p>
        <p>{event.notes}</p>
        <div className={styles.buttonGroup}>
          <button type='button' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button type='button' onClick={() => onEdit(event)}>
          Edit
        </button>
        <button type='button' onClick={() => onDelete(event)}>
          Delete
        </button>
        <button type='button' onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default ViewEventModal
