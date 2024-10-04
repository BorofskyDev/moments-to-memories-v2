'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/libs/context/AuthContext'
import useClientProfile from '@/libs/hooks/client-profile/useClientProfile'
import useGallery from '@/libs/hooks/client-profile/useGallery'
import CreateGalleryForm from '@/components/client-profile/create-gallery-form/CreateGalleryForm'
import GalleryList from '@/components/client-profile/gallery-list/GalleryList'
import styles from './ClientProfile.module.scss'
import EditField from '@/components/layout/edit-field/EditField'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import AddButton from '@/components/buttons/add-button/AddButton'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import SaveButton from '@/components/buttons/save-button/SaveButton'
import CancelButton from '@/components/buttons/cancel-button/CancelButton'

const ClientProfile = ({ client }) => {
  const { user, isAdmin } = useAuth() // Get current user and admin status

  // Log user and admin status for debugging
  useEffect(() => {
    console.log('User:', user)
    console.log('Is Admin:', isAdmin)
  }, [user, isAdmin])

  const {
    clientData,
    editedFields,
    isSaving,
    isDeleting,
    isModalOpen,
    handleInputChange,
    handleSave,
    handleCancel,
    handleDelete,
    setIsModalOpen,
    hasEdits,
    handleAddImportantDate,
    handleDeleteImportantDate,
    handleAddMarketingTag,
    handleDeleteMarketingTag,
    handleAddPhotoshootDate,
    handleDeletePhotoshootDate,
    handleAddRelation,
    handleDeleteRelation,
  } = useClientProfile(client)

  // Log clientData to ensure it loads correctly
  useEffect(() => {
    console.log('Client Data:', clientData)
  }, [clientData])

  const {
    galleries,
    isCreating,
    error: galleryError,
    createGallery,
    deleteGallery,
  } = useGallery(clientData?.id)

  // Log gallery data for debugging
  useEffect(() => {
    console.log('Galleries:', galleries)
    if (galleryError) {
      console.error('Gallery Error:', galleryError)
    }
  }, [galleries, galleryError])

  const [isCreatingGallery, setIsCreatingGallery] = useState(false)

  // Check if the user is allowed to edit the profile
  const canEdit = isAdmin || user?.uid === client?.id

  // Log whether the user can edit the profile
  useEffect(() => {
    console.log('Can Edit Profile:', canEdit)
  }, [canEdit])

  // Handle creating a new gallery
  const handleCreateGallery = async (name, date, files) => {
    try {
      console.log('Creating gallery with:', { name, date, files })
      await createGallery(name, date, files)
      setIsCreatingGallery(false)
      console.log('Gallery created successfully')
    } catch (err) {
      console.error('Error creating gallery:', err)
    }
  }

  // Utility function to format date
  const formatDate = (date) => {
    if (!date) return ''

    if (date.seconds) {
      return new Date(date.seconds * 1000).toISOString().split('T')[0]
    }

    const parsedDate = new Date(date)
    return isNaN(parsedDate) ? '' : parsedDate.toISOString().split('T')[0]
  }

  if (!clientData) {
    return <p>Loading client data...</p>
  }

  return (
    <div className={styles.clientProfile}>
      {/* Basic Information Section */}
      <SectionHeading>{clientData.name}</SectionHeading>
      <section className={styles.basicInfo}>
        {canEdit ? (
          <>
            <EditField
              label='Name'
              fieldName='name'
              type='text'
              value={editedFields.name ?? clientData.name}
              onChange={handleInputChange}
            />
            <EditField
              label='Email'
              fieldName='email'
              type='email'
              value={editedFields.email ?? clientData.email}
              onChange={handleInputChange}
            />
            <EditField
              label='Phone'
              fieldName='phone'
              type='text'
              value={editedFields.phone ?? clientData.phone}
              onChange={handleInputChange}
            />
            <EditField
              label='Age'
              fieldName='age'
              type='number'
              value={editedFields.age ?? clientData.age}
              onChange={handleInputChange}
            />
            <EditField
              label='Birthday'
              fieldName='birthday'
              type='date'
              value={
                editedFields.birthday
                  ? formatDate(editedFields.birthday)
                  : formatDate(clientData.birthday)
              }
              onChange={handleInputChange}
            />
            <EditField
              label={
                clientData.type === 'client' ? 'Client Since' : 'Prospect Since'
              }
              fieldName='createdAt'
              type='date'
              value={
                editedFields.createdAt
                  ? formatDate(editedFields.createdAt)
                  : formatDate(clientData.createdAt)
              }
              onChange={handleInputChange}
            />
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {clientData.name}
            </p>
            <p>
              <strong>Email:</strong> {clientData.email}
            </p>
            <p>
              <strong>Phone:</strong> {clientData.phone}
            </p>
            <p>
              <strong>Age:</strong> {clientData.age}
            </p>
            <p>
              <strong>Birthday:</strong> {formatDate(clientData.birthday)}
            </p>
            <p>
              <strong>
                {clientData.type === 'client'
                  ? 'Client Since'
                  : 'Prospect Since'}
                :
              </strong>{' '}
              {formatDate(clientData.createdAt)}
            </p>
          </>
        )}
      </section>

      {/* Important Dates Section */}
      <section className={styles.importantDates}>
        <ParagraphHeading>Important Dates</ParagraphHeading>
        {clientData.importantDates && clientData.importantDates.length > 0 ? (
          <ul>
            {clientData.importantDates.map((date, index) => (
              <li key={index} className={styles.listItem}>
                {canEdit ? (
                  <>
                    <EditField
                      label='Tag'
                      fieldName={`importantDate-tag-${index}`}
                      type='text'
                      value={
                        editedFields[`importantDate-tag-${index}`] ?? date.tag
                      }
                      onChange={handleInputChange}
                    />
                    <EditField
                      label='Reason'
                      fieldName={`importantDate-reason-${index}`}
                      type='text'
                      value={
                        editedFields[`importantDate-reason-${index}`] ??
                        date.reason
                      }
                      onChange={handleInputChange}
                    />
                    <EditField
                      label='Date'
                      fieldName={`importantDate-date-${index}`}
                      type='date'
                      value={
                        editedFields[`importantDate-date-${index}`]
                          ? formatDate(
                              editedFields[`importantDate-date-${index}`]
                            )
                          : formatDate(date.date)
                      }
                      onChange={handleInputChange}
                    />
                    <DeleteButton
                      onClick={() => handleDeleteImportantDate(index)}
                      className={styles.deleteButton}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Tag:</strong> {date.tag}
                    </p>
                    <p>
                      <strong>Reason:</strong> {date.reason}
                    </p>
                    <p>
                      <strong>Date:</strong> {formatDate(date.date)}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No important dates added.</p>
        )}
        {canEdit && (
          <AddButton
            onClick={handleAddImportantDate}
            className={styles.addButton}
          />
        )}
      </section>

      {/* Marketing Tags Section */}
      <section className={styles.marketingTags}>
        <ParagraphHeading>Marketing Tags</ParagraphHeading>
        {clientData.marketingTags && clientData.marketingTags.length > 0 ? (
          <ul className={styles.marketingTags__list}>
            {clientData.marketingTags.map((tag, index) => (
              <li key={index} className={styles.marketingTag}>
                {canEdit ? (
                  <>
                    <EditField
                      label='Tag'
                      fieldName={`marketingTag-${index}`}
                      type='text'
                      value={editedFields[`marketingTag-${index}`] ?? tag}
                      onChange={handleInputChange}
                    />
                    <DeleteButton
                      onClick={() => handleDeleteMarketingTag(index)}
                    >
                      Delete
                    </DeleteButton>
                  </>
                ) : (
                  <p className={styles.marketingTag__tag}>{tag}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No marketing tags added.</p>
        )}
        {canEdit && (
          <AddButton
            onClick={handleAddMarketingTag}
            className={styles.addButton}
          />
        )}
      </section>

      {/* Photoshoots Section */}
      <section className={styles.photoshoots}>
        <ParagraphHeading>Photoshoots</ParagraphHeading>
        {clientData.photoshootDates && clientData.photoshootDates.length > 0 ? (
          <ul className={styles.photoshoots__list}>
            {clientData.photoshootDates.map((date, index) => (
              <li key={index} className={styles.listItem}>
                {canEdit ? (
                  <>
                    <EditField
                      label='Tag'
                      fieldName={`photoshootDate-tag-${index}`}
                      type='text'
                      value={
                        editedFields[`photoshootDate-tag-${index}`] ?? date.tag
                      }
                      onChange={handleInputChange}
                    />
                    <EditField
                      label='Reason'
                      fieldName={`photoshootDate-reason-${index}`}
                      type='text'
                      value={
                        editedFields[`photoshootDate-reason-${index}`] ??
                        date.reason
                      }
                      onChange={handleInputChange}
                    />
                    <EditField
                      label='Date'
                      fieldName={`photoshootDate-date-${index}`}
                      type='date'
                      value={
                        editedFields[`photoshootDate-date-${index}`]
                          ? formatDate(
                              editedFields[`photoshootDate-date-${index}`]
                            )
                          : formatDate(date.date)
                      }
                      onChange={handleInputChange}
                    />
                    <DeleteButton
                      onClick={() => handleDeletePhotoshootDate(index)}
                      className={styles.deleteButton}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Tag:</strong> {date.tag}
                    </p>
                    <p>
                      <strong>Reason:</strong> {date.reason}
                    </p>
                    <p>
                      <strong>Date:</strong> {formatDate(date.date)}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No photoshoots scheduled.</p>
        )}
        {canEdit && (
          <AddButton
            onClick={handleAddPhotoshootDate}
            className={styles.addButton}
          />
        )}
      </section>

      {/* Relations Section */}
      <section className={styles.relations}>
        <h2>Relations</h2>
        {clientData.relations && clientData.relations.length > 0 ? (
          <ul>
            {clientData.relations.map((relation, index) => (
              <li key={index} className={styles.relationItem}>
                {canEdit ? (
                  <>
                    <EditField
                      label={`Name `}
                      fieldName={`relationName-${index}`}
                      type='text'
                      value={
                        editedFields[`relationName-${index}`] ?? relation.name
                      }
                      onChange={handleInputChange}
                    />
                    <EditField
                      label={`Age `}
                      fieldName={`relationAge-${index}`}
                      type='number'
                      value={
                        editedFields[`relationAge-${index}`] ?? relation.age
                      }
                      onChange={handleInputChange}
                    />
                    <EditField
                      label={`Relationship `}
                      fieldName={`relationshipType-${index}`}
                      type='text'
                      value={
                        editedFields[`relationshipType-${index}`] ??
                        relation.relationshipType
                      }
                      onChange={handleInputChange}
                    />
                    <DeleteButton
                      onClick={() => handleDeleteRelation(index)}
                      className={styles.deleteButton}
                    />
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Name:</strong> {relation.name}
                    </p>
                    <p>
                      <strong>Age:</strong> {relation.age}
                    </p>
                    <p>
                      <strong>Relationship:</strong> {relation.relationshipType}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No relations added.</p>
        )}
        {canEdit && (
          <AddButton onClick={handleAddRelation} className={styles.addButton} />
        )}
      </section>

      {/* Action Buttons */}
      {canEdit && hasEdits && (
        <div className={styles.actionButtons}>
          <SaveButton
            onClick={handleSave}
            className={styles.saveButton}
            disabled={isSaving}
          />
          <CancelButton
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={isSaving}
          />
        </div>
      )}

      {/* Delete Profile Button */}
      {isAdmin && (
        <div className={styles.deleteButtonContainer}>
          <DeleteButton
            onClick={() => setIsModalOpen(true)}
            className={styles.deleteButton}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete this profile? This action cannot
              be undone.
            </p>
            <div className={styles.modalButtons}>
              <button
                onClick={handleDelete}
                className={styles.confirmDeleteButton}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className={styles.cancelModalButton}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <ParagraphHeading>Galleries</ParagraphHeading>
        {canEdit && (
          <AddButton
            onClick={() => setIsCreatingGallery(true)}
            className={styles.createGalleryButton}
          />
        )}

        {isCreatingGallery && (
          <CreateGalleryForm
            onCreate={handleCreateGallery}
            onCancel={() => setIsCreatingGallery(false)}
            isCreating={isCreating}
          />
        )}

        <GalleryList
          galleries={galleries}
          onDelete={(galleryId) => deleteGallery(galleryId)}
        />

        {galleryError && (
          <p className={styles.error}>
            Gallery Error: {galleryError.message || galleryError}
          </p>
        )}
      </section>
    </div>
  )
}

export default ClientProfile
