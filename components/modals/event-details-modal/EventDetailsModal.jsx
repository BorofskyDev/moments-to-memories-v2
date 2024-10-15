
import styles from './EventDetailsModal.module.scss'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'

const EventDetailsModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
          <strong>Notes:</strong> {event.notes}
        </p>
        <CancelButton onClick={onClose} text='Close'/>
      </div>
    </div>
  )
}

export default EventDetailsModal