// libs/hooks/calendar/useCalendar.js
import { useState, useEffect } from 'react'
import { db } from '@/libs/firebase'
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore'

const useCalendar = () => {
  // State variables
  const [events, setEvents] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState('month')

  // Fetch events from Firestore
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

  // Handlers
  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end,
    })
    setModalOpen(true)
  }

  const handleEventAdd = (newEvent) => {
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
      setModalOpen(false)
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

  return {
    events,
    date,
    view,
    modalOpen,
    viewModalOpen,
    selectedSlot,
    selectedEvent,
    editingEvent,
    handleSelectSlot,
    handleSelectEvent,
    handleNavigate,
    handleViewChange,
    handleEventAdd,
    handleEventSave,
    handleEditEvent,
    handleDeleteEvent,
    setModalOpen,
    setEditingEvent,
    setViewModalOpen,
  }
}

export default useCalendar
