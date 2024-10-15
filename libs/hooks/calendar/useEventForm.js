import { useState, useEffect } from 'react'

const useEventForm = (existingEvent, slotInfo) => {
  // Initialize state variables
  const [title, setTitle] = useState('')
  const [clientName, setClientName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [eventType, setEventType] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [customEventType, setCustomEventType] = useState('')

  useEffect(() => {
    if (existingEvent) {
      // Editing an existing event
      setTitle(existingEvent.title || '')
      setClientName(existingEvent.clientName || '')
      setContactPhone(existingEvent.contactPhone || '')
      setContactEmail(existingEvent.contactEmail || '')
      setEventType(existingEvent.eventType || '')
      setLocation(existingEvent.location || '')
      setNotes(existingEvent.notes || '')
      setStartTime(
        existingEvent.start
          ? existingEvent.start.toISOString().slice(0, 16)
          : ''
      )
      setEndTime(
        existingEvent.end ? existingEvent.end.toISOString().slice(0, 16) : ''
      )
    } else if (slotInfo) {
      // Adding a new event using slotInfo
      setStartTime(slotInfo.start.toISOString().slice(0, 16))
      setEndTime(slotInfo.end.toISOString().slice(0, 16))
    } else {
      // Default to current time
      const now = new Date()
      const later = new Date(now.getTime() + 60 * 60 * 1000) // One hour later
      setStartTime(now.toISOString().slice(0, 16))
      setEndTime(later.toISOString().slice(0, 16))
    }
  }, [existingEvent, slotInfo])

  // Return state variables and handlers
  return {
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
  }
}

export default useEventForm
