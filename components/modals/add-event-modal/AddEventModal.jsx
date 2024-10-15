

import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc} from 'firebase/firestore'
import styles from './AddEventModal.module.scss';

const eventTypes = ['Contact', 'Engagement', 'Meeting', 'Other'];

const AddEventModal = ({ isOpen, onClose, onEventAdd, slotInfo, existingEvent }) => {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [customEventType, setCustomEventType] = useState('');

  useEffect(() => {
    if (existingEvent) {
      // Editing an existing event
      setTitle(existingEvent.title || '');
      setClientName(existingEvent.clientName || '');
      setContactPhone(existingEvent.contactPhone || '');
      setContactEmail(existingEvent.contactEmail || '');
      setEventType(existingEvent.eventType || '');
      setLocation(existingEvent.location || '');
      setNotes(existingEvent.notes || '');
      setStartTime(
        existingEvent.start ? existingEvent.start.toISOString().slice(0, 16) : ''
      );
      setEndTime(
        existingEvent.end ? existingEvent.end.toISOString().slice(0, 16) : ''
      );
    } else if (slotInfo) {
      // Adding a new event using slotInfo
      setStartTime(slotInfo.start.toISOString().slice(0, 16));
      setEndTime(slotInfo.end.toISOString().slice(0, 16));
    } else {
      // Default to current time
      const now = new Date();
      const later = new Date(now.getTime() + 60 * 60 * 1000); // One hour later
      setStartTime(now.toISOString().slice(0, 16));
      setEndTime(later.toISOString().slice(0, 16));
    }
  }, [existingEvent, slotInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

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
    };

    onEventAdd(newEvent);
    onClose();
  };


  
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{existingEvent ? 'Edit Event' : 'Add Event'}</h2>
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
            <button type='submit'>
              {existingEvent ? 'Update Event' : 'Add Event'}
            </button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
