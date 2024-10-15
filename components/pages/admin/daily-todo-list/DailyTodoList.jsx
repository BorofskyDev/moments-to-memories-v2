// components/DailyTodoList/DailyTodoList.jsx
'use client'
import React, { useState, useEffect } from 'react'
import styles from './DailyTodoList.module.scss'
import { db } from '@/libs/firebase'
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { format, addDays } from 'date-fns'
import EventDetailsModal from '@/components/modals/event-details-modal/EventDetailsModal'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import NextPrevSvg from '@/components/layout/svgs/next-prev-svg/NextPrevSvg'

const DailyTodoList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const startOfDay = new Date(selectedDate)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(selectedDate)
    endOfDay.setHours(23, 59, 59, 999)

    const eventsRef = collection(db, 'events')
    const q = query(
      eventsRef,
      where('start', '>=', startOfDay),
      where('start', '<=', endOfDay)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
      }))
      setEvents(eventsData)
    })

    return () => unsubscribe()
  }, [selectedDate])

  const handleEventClick = (event) => {
    console.log('Event clicked:', event)
    setSelectedEvent(event)
    setModalOpen(true)
  }

  const toggleCompleted = async (event) => {
    try {
      const eventRef = doc(db, 'events', event.id)
      await updateDoc(eventRef, {
        completed: !event.completed,
      })
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  }

  return (
    <div className={styles.todoListContainer}>
      <ParagraphHeading>
        To-Do List for {format(selectedDate, 'MMMM do, yyyy')}
      </ParagraphHeading>
      <div className={styles.navigation}>
        <button onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
          <NextPrevSvg /> <span>Previous Day</span>
        </button>
        <button onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
          <NextPrevSvg /> <span>Next Day</span>
        </button>
      </div>
      <ul className={styles.todoList}>
        {events.map((event) => (
          <li
            key={event.id}
            onClick={() => handleEventClick(event)}
            className={`${styles.todoItem} ${
              event.completed ? styles.completed : ''
            }`}
          >
            <input
              type='checkbox'
              checked={event.completed || false}
              onChange={() => toggleCompleted(event)}
              onClick={(e) => e.stopPropagation()}
            />
            <span className={styles.title}>{event.title}</span>
            <span className={styles.time}>{format(event.start, 'h:mm a')}</span>
            <span className={styles.clientName}>{event.clientName}</span>
          </li>
        ))}
      </ul>
      {modalOpen && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}




export default DailyTodoList
