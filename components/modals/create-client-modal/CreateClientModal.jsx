// components/modals/create-client-modal/CreateClientModal.jsx

'use client'

import React from 'react'
import { db } from '@/libs/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useAuth } from '@/libs/context/AuthContext'
import FormInput from '@/components/form-components/form-input/FormInput'
import FormTextarea from '@/components/form-components/form-textarea/FormTextarea'
import RelationForm from '@/components/form-components/relation-form/RelationForm'
import TagInput from '@/components/form-components/tag-input/TagInput'
import TypeToggle from '@/components/form-components/type-toggle/TypeToggle'
import ImportantDateForm from '@/components/form-components/important-date-form/ImportantDateForm'
import useClientForm from '@/libs/hooks/form/useClientForm'
import useAddRelation from '@/libs/hooks/ui/useAddRelation'
import useAddImportantDate from '@/libs/hooks/ui/useAddImportantDate'
import PlusSvg from '@/components/layout/svgs/plus-svg/PlusSvg'
import styles from './CreateClientModal.module.scss'
import Subheading from '@/components/headings/subheading/Subheading'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import SaveButton from '@/components/buttons/save-button/SaveButton'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'
import AddButton from '@/components/buttons/add-button/AddButton'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import SubmitButton from '@/components/buttons/submit-button/SubmitButton'

function CreateClientModal({ isOpen, onClose }) {
  const { user, isAdmin } = useAuth()
  const {
    formData,
    setFormData,
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

  const {
    isAdding: isAddingRelation,
    handleStart: handleStartAddRelation,
    handleCancel: handleCancelAddRelation,
  } = useAddRelation()
  const {
    isAdding: isAddingImportantDate,
    handleStart: handleStartAddImportantDate,
    handleCancel: handleCancelAddImportantDate,
  } = useAddImportantDate()

  const [typeError, setTypeError] = React.useState('')

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
      // Reset UI states
      handleCancelAddRelation()
      handleCancelAddImportantDate()
    } catch (error) {
      console.error('Error adding document: ', error)
      alert('Failed to create client')
    }
  }

  if (!isOpen) return null

  // Handlers for ImportantDateForm
  const handleSaveImportantDate = () => {
    handleAddImportantDate()
    handleCancelAddImportantDate()
  }

  return (
    <div className={styles.createClientModal}>
      <div className={styles.modalContent}>
        <Subheading>Create Client</Subheading>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
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
          <div className={styles.relations}>
            <ParagraphHeading>Relations</ParagraphHeading>
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
              <AddButton type='button' onClick={handleStartAddRelation}>
                <PlusSvg /> Add Relation
              </AddButton>
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
                  handleRemoveRelation={() => {}}
                />
                <div className={styles.relationButtons}>
                  <SaveButton type='button' onClick={handleAddRelation}>
                    Save Relation
                  </SaveButton>
                  <CancelButton type='button' onClick={handleCancelAddRelation}>
                    Cancel
                  </CancelButton>
                </div>
              </div>
            )}
          </div>

          {/* Important Dates */}
          <div className={styles.importantDates}>
            <ParagraphHeading>Important Dates</ParagraphHeading>
            {formData.importantDates.map((date, index) => (
              <div key={index} className={styles.importantDates__importantDate} >
                <div>
                  <p>
                    {date.month}/{date.day}
                  </p>
                  <p>

                  - {date.reason}
                  </p>
                </div>
                <DeleteButton
                  type='button'
                  onClick={() => handleRemoveImportantDate(index)}
                />
              </div>
            ))}

            {/* Add Important Date Button */}
            {!isAddingImportantDate && (
              <AddButton type='button' onClick={handleStartAddImportantDate} />
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
          <div className={styles.photoshootDates}>
            <ParagraphHeading>Photoshoot Dates</ParagraphHeading>
            {formData.photoshootDates.map((date, index) => (
              <div key={index} className={styles.photoshootDates__date}>
                <p>{date}</p>
                <DeleteButton
                  type='button'
                  onClick={() => handleRemovePhotoshootDate(index)}
                ></DeleteButton>
              </div>
            ))}
            <div>
              <input
                type='date'
                value={photoshootDateInput}
                onChange={(e) => setPhotoshootDateInput(e.target.value)}
                placeholder='Enter photoshoot date'
                className={styles.photoshootDates__calendar}
              />
              <AddButton
                type='button'
                onClick={handleAddPhotoshootDate}
              ></AddButton>
            </div>
          </div>

          {/* Photoshoot Notes */}
          <div>
            <ParagraphHeading>Photoshoot Notes</ParagraphHeading>
            <FormTextarea
              label=''
              id='photoshootNotes'
              name='photoshootNotes'
              value={formData.photoshootNotes}
              onChange={handleChange}
              placeholder='Enter photoshoot notes'
            />
          </div>

          {/* General Notes */}
          <div>
            <ParagraphHeading>Notes</ParagraphHeading>
            <FormTextarea
              label=''
              id='notes'
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              placeholder='Enter general notes'
            />
          </div>

          {/* Marketing Tags */}
          <div>
            <ParagraphHeading>Marketing Tags</ParagraphHeading>
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
            <SubmitButton type='submit' text='Submit'></SubmitButton>
            <CancelButton type='button' onClick={onClose}>
              Cancel
            </CancelButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateClientModal
