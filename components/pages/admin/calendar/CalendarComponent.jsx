// components/CalendarComponent/CalendarComponent.jsx
'use client'
import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import styles from './CalendarComponent.module.scss'
import AddEventModal from '@/components/modals/add-event-modal/AddEventModal'
import ViewEventModal from '@/components/modals/view-event-modal/ViewEventModal'
import CalendarEvent from './CalendarEvent'
import useCalendar from '@/libs/hooks/calendar/useCalendar'

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
  // Use the custom hook
  const {
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
    handleEventSave,
    handleEditEvent,
    handleDeleteEvent,
    setModalOpen,
    setEditingEvent,
    setViewModalOpen,
  } = useCalendar()

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
          slotInfo={editingEvent ? null : selectedSlot}
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
