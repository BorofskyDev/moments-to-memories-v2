// components/CalendarComponent/CalendarComponent.jsx
'use client'
import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import styles from './CalendarComponent.module.scss'
import { db } from '@/libs/firebase'
import { collection, addDoc, onSnapshot, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import AddEventModal from '@/components/modals/add-event-modal/AddEventModal'
import ViewEventModal from '@/components/modals/view-event-modal/ViewEventModal'
import CalendarEvent from './CalendarEvent'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const CalendarComponent = () => {
  const [events, setEvents] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  // Add date and view state variables
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState('month')

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
      }))
      setEvents(eventsData)
    })

    return () => unsubscribe()
  }, [])

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end,
    })
    setModalOpen(true)
  }

  const handleEventAdd = (newEvent) => {
    // Conflict checking as before...

    // Save the event to Firebase
    saveEventToFirebase(newEvent)
    setModalOpen(false)
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setModalOpen(true)
    setViewModalOpen(false)
  }

   const handleDeleteEvent = async (event) => {
     const confirmDelete = window.confirm(
       'Are you sure you want to delete this event?'
     )
     if (confirmDelete) {
       try {
         await deleteDoc(doc(db, 'events', event.id))
         setViewModalOpen(false)
       } catch (error) {
         console.error('Error deleting document: ', error)
       }
     }
   }

  const handleEventUpdate = async (updatedEvent) => {
    try {
      const eventRef = doc(db, 'events', updatedEvent.id)
      await updateDoc(eventRef, updatedEvent)
      setModalOpen(false)
      setEditingEvent(null)
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  }

   const handleEventSave = (eventData) => {
     if (editingEvent) {
       handleEventUpdate({ ...editingEvent, ...eventData })
     } else {
       saveEventToFirebase(eventData)
     }
   }

  const saveEventToFirebase = async (event) => {
    try {
      await addDoc(collection(db, 'events'), event)
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setViewModalOpen(true)
  }

  // Update handlers to modify state
  const handleNavigate = (newDate, newView, action) => {
    console.log(
      'Navigated to date:',
      newDate,
      'View:',
      newView,
      'Action:',
      action
    )
    setDate(newDate)
  }

  const handleViewChange = (newView) => {
    console.log('View changed to:', newView)
    setView(newView)
  }

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        localizer={localizer}
        events={events}
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 600 }}
        components={{
          event: CalendarEvent,
        }}
      />
      {modalOpen && (
        <AddEventModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setEditingEvent(null)
          }}
          onEventAdd={handleEventSave}
          slotInfo={selectedSlot}
          existingEvent={editingEvent}
        />
      )}
      {viewModalOpen && selectedEvent && (
        <ViewEventModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          event={selectedEvent}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  )
}

export default CalendarComponent
