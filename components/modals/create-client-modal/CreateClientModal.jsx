// components/modals/create-client-modal/CreateClientModal.jsx

'use client'

import React, { useState } from 'react'
import { db, } from '@/libs/firebase' // Ensure this path is correct
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useAuth } from '@/libs/context/AuthContext'
import FormInput from '@/components/form-components/form-input/FormInput'
import FormTextarea from '@/components/form-components/form-textarea/FormTextarea'
import RelationForm from '@/components/form-components/relation-form/RelationForm'
import TagInput from '@/components/form-components/tag-input/TagInput'
import TypeToggle from '@/components/form-components/type-toggle/TypeToggle'
import ImportantDateForm from '@/components/form-components/important-date-form/ImportantDateForm'
import useClientForm from '@/libs/hooks/form/useClientForm'
import styles from './CreateClientModal.module.scss'

function CreateClientModal({ isOpen, onClose }) {
    const { user, isAdmin} = useAuth()
  const {
    formData,
    setFormData, // Ensure setFormData is destructured
    handleChange,
    handleBirthdayChange,
    relationInput,
    setRelationInput,
    handleAddRelation,
    handleRemoveRelation,
    importantDateInput,
    setImportantDateInput,
    handleAddImportantDate,
    handleRemoveImportantDate,
    photoshootDateInput,
    setPhotoshootDateInput,
    handleAddPhotoshootDate,
    handleRemovePhotoshootDate,
    marketingTagInput,
    setMarketingTagInput,
    handleAddMarketingTag,
    handleRemoveMarketingTag,
    handleTypeChange,
    resetForm,
  } = useClientForm()

  const [typeError, setTypeError] = useState('')
  const [isAddingRelation, setIsAddingRelation] = useState(false)
  const [isAddingImportantDate, setIsAddingImportantDate] = useState(false)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate required fields
    if (formData.name.trim() === '') {
      alert('Name is required')
      return
    }

    if (formData.type === '') {
      setTypeError('Please classify as Client or Prospect')
      return
    } else {
      setTypeError('')
    }

    // Log user and formData
    console.log('User:', user)
    console.log('Submitting formData:', formData)
    console.log('Firestore DB instance:', db)

    // Ensure user is authenticated
    if (!user) {
      alert('You must be signed in to create a client/prospect.')
      return
    }

    // Proceed with Firestore write
    try {
      const clientsCollectionRef = collection(db, 'clients')
      console.log('Clients Collection Reference:', clientsCollectionRef)

      await addDoc(clientsCollectionRef, {
        ...formData,
        createdAt: Timestamp.now(),
        createdBy: user.uid, // Optionally track who created the document
      })

      alert('Client created successfully')
      onClose()
      resetForm()
      setIsAddingRelation(false)
      setIsAddingImportantDate(false)
    } catch (error) {
      console.error('Error adding document: ', error)
      alert('Failed to create client')
    }
  }


  if (!isOpen) return null

  // Handlers for adding relations and important dates
  const handleStartAddRelation = () => {
    setIsAddingRelation(true)
  }

  const handleCancelAddRelation = () => {
    setIsAddingRelation(false)
    setRelationInput({ name: '', relationshipType: '', age: '' })
  }

  const handleStartAddImportantDate = () => {
    setIsAddingImportantDate(true)
  }

  const handleCancelAddImportantDate = () => {
    setIsAddingImportantDate(false)
    setImportantDateInput({ month: '', day: '', reason: '', tag: '' })
  }

  // Handlers for ImportantDateForm
  const handleSaveImportantDate = () => {
    handleAddImportantDate()
    setIsAddingImportantDate(false)
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create Client</h2>
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <FormInput
            label='Name'
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            placeholder='Enter client name'
          />

          <FormInput
            label='Age'
            type='number'
            id='age'
            name='age'
            value={formData.age}
            onChange={handleChange}
            placeholder='Enter age'
          />

          <FormInput
            label='Email'
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter email'
          />

          <FormInput
            label='Birthday'
            type='date'
            id='birthday'
            name='birthday'
            value={formData.birthday}
            onChange={handleBirthdayChange} // Auto-update age
          />

          <FormInput
            label='Phone'
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Enter phone number'
          />

          {/* Type Toggle */}
          <TypeToggle
            value={formData.type}
            onChange={handleTypeChange}
            error={typeError}
          />

          {/* Relations */}
          <div>
            <h3>Relations</h3>
            {formData.relations.map((relation, index) => (
              <RelationForm
                key={index}
                relation={relation}
                index={index}
                handleRelationChange={(field, value) => {
                  const updatedRelations = [...formData.relations]
                  updatedRelations[index][field] = value
                  setFormData((prev) => ({
                    ...prev,
                    relations: updatedRelations,
                  }))
                }}
                handleRemoveRelation={handleRemoveRelation}
              />
            ))}

            {/* Add Relation Button */}
            {!isAddingRelation && (
              <button type='button' onClick={handleStartAddRelation}>
                + Add Relation
              </button>
            )}

            {/* Relation Input Fields */}
            {isAddingRelation && (
              <div>
                <RelationForm
                  relation={relationInput}
                  index={formData.relations.length}
                  handleRelationChange={(field, value) => {
                    setRelationInput((prev) => ({ ...prev, [field]: value }))
                  }}
                  handleRemoveRelation={() => {}} // No removal for the new relation being added
                />
                <div>
                  <button type='button' onClick={handleAddRelation}>
                    Save Relation
                  </button>
                  <button type='button' onClick={handleCancelAddRelation}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Important Dates */}
          <div>
            <h3>Important Dates</h3>
            {formData.importantDates.map((date, index) => (
              <div key={index}>
                <p>
                  {date.month}/{date.day} - {date.reason} - Tag: {date.tag}
                </p>
                <button
                  type='button'
                  onClick={() => handleRemoveImportantDate(index)}
                >
                  ✕ {/* Placeholder for delete date icon */}
                </button>
              </div>
            ))}

            {/* Add Important Date Button */}
            {!isAddingImportantDate && (
              <button type='button' onClick={handleStartAddImportantDate}>
                + Add Important Date
              </button>
            )}

            {/* Important Date Input Fields */}
            {isAddingImportantDate && (
              <ImportantDateForm
                month={importantDateInput.month}
                day={importantDateInput.day}
                reason={importantDateInput.reason}
                tag={importantDateInput.tag}
                handleMonthChange={(e) =>
                  setImportantDateInput((prev) => ({
                    ...prev,
                    month: e.target.value,
                  }))
                }
                handleDayChange={(e) =>
                  setImportantDateInput((prev) => ({
                    ...prev,
                    day: e.target.value,
                  }))
                }
                handleReasonChange={(e) =>
                  setImportantDateInput((prev) => ({
                    ...prev,
                    reason: e.target.value,
                  }))
                }
                handleTagChange={(e) =>
                  setImportantDateInput((prev) => ({
                    ...prev,
                    tag: e.target.value,
                  }))
                }
                handleSave={handleSaveImportantDate}
                handleCancel={handleCancelAddImportantDate}
              />
            )}
          </div>

          {/* Photoshoot Dates */}
          <div>
            <h3>Photoshoot Dates</h3>
            {formData.photoshootDates.map((date, index) => (
              <div key={index}>
                <p>{date}</p>
                <button
                  type='button'
                  onClick={() => handleRemovePhotoshootDate(index)}
                >
                  ✕ {/* Placeholder for delete date icon */}
                </button>
              </div>
            ))}
            <div>
              <input
                type='date'
                value={photoshootDateInput}
                onChange={(e) => setPhotoshootDateInput(e.target.value)}
                placeholder='Enter photoshoot date'
              />
              <button type='button' onClick={handleAddPhotoshootDate}>
                + Add Photoshoot Date
              </button>
            </div>
          </div>

          {/* Photoshoot Notes */}
          <div>
            <h3>Photoshoot Notes</h3>
            <FormTextarea
              label='Photoshoot Notes'
              id='photoshootNotes'
              name='photoshootNotes'
              value={formData.photoshootNotes}
              onChange={handleChange}
              placeholder='Enter photoshoot notes'
            />
          </div>

          {/* General Notes */}
          <div>
            <h3>Notes</h3>
            <FormTextarea
              label='Notes'
              id='notes'
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              placeholder='Enter general notes'
            />
          </div>

          {/* Marketing Tags */}
          <div>
            <h3>Marketing Tags</h3>
            <TagInput
              tagValue={marketingTagInput}
              setTagValue={setMarketingTagInput}
              handleAddTag={handleAddMarketingTag}
              tags={formData.marketingTags}
              handleRemoveTag={handleRemoveMarketingTag}
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div>
            <button type='submit'>Submit</button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateClientModal
