import React from 'react'
import styles from './AddEventModal.module.scss'
import useEventForm from '@/libs/hooks/calendar/useEventForm'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import AddButton from '@/components/buttons/add-button/AddButton'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'

const eventTypes = ['Contact', 'Engagement', 'Meeting', 'Other']

const AddEventModal = ({
  isOpen,
  onClose,
  onEventAdd,
  slotInfo,
  existingEvent,
}) => {
  const {
    title,
    setTitle,
    clientName,
    setClientName,
    contactPhone,
    setContactPhone,
    contactEmail,
    setContactEmail,
    eventType,
    setEventType,
    location,
    setLocation,
    notes,
    setNotes,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    customEventType,
    setCustomEventType,
  } = useEventForm(existingEvent, slotInfo)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newEvent = {
      title,
      clientName,
      contactPhone,
      contactEmail,
      eventType: eventType === 'Custom' ? customEventType : eventType,
      location,
      notes,
      start: new Date(startTime),
      end: new Date(endTime),
    }

    onEventAdd(newEvent)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <ParagraphHeading>
          {existingEvent ? 'Edit Event' : 'Add Event'}
        </ParagraphHeading>
        <form onSubmit={handleSubmit}>
          <label>
            Event Title:
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Client Name:
            <input
              type='text'
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </label>

          <label>
            Contact Phone:
            <input
              type='tel'
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </label>

          <label>
            Contact Email:
            <input
              type='email'
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </label>

          <label>
            Event Type:
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              required
            >
              <option value=''>Select Type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
              <option value='Custom'>Custom</option>
            </select>
          </label>

          {eventType === 'Custom' && (
            <label>
              Custom Event Type:
              <input
                type='text'
                value={customEventType}
                onChange={(e) => setCustomEventType(e.target.value)}
                required
              />
            </label>
          )}

          <label>
            Location:
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>

          <label>
            Start Time:
            <input
              type='datetime-local'
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>

          <label>
            End Time:
            <input
              type='datetime-local'
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>

          <label>
            Notes:
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <div className={styles.buttonGroup}>
            <AddButton
              type='submit'
              text={existingEvent ? 'Update Event' : 'Add Event'}
            />

            <CancelButton type='button' onClick={onClose} text='Cancel' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEventModal
