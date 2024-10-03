'use client'

import React, { useState } from 'react'
import useClientProfile from '@/libs/hooks/client-profile/useClientProfile'
import useGallery from '@/libs/hooks/client-profile/useGallery'
import CreateGalleryForm from '@/components/client-profile/create-gallery-form/CreateGalleryForm'
import GalleryList from '@/components/client-profile/gallery-list/GalleryList'
import styles from './ClientProfile.module.scss'
import EditField from '@/components/layout/edit-field/EditField'

const ClientProfile = ({ client }) => {
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

  // Pass clientData?.id to handle undefined cases
  const {
    galleries,
    isCreating,
    error: galleryError,
    createGallery,
    deleteGallery,
  } = useGallery(clientData?.id)

  const [isCreatingGallery, setIsCreatingGallery] = useState(false)

  // Handle creating a new gallery
  const handleCreateGallery = async (name, date, files) => {
    await createGallery(name, date, files)
    setIsCreatingGallery(false)
  }

  // Utility function to format date
  const formatDate = (date) => {
    if (!date) return ''

    // If date is a Firestore Timestamp
    if (date.seconds) {
      return new Date(date.seconds * 1000).toISOString().split('T')[0]
    }

    // If date is a string that can be parsed
    const parsedDate = new Date(date)
    return isNaN(parsedDate) ? '' : parsedDate.toISOString().split('T')[0]
  }

  // Early return if clientData is not yet loaded
  if (!clientData) {
    return <p>Loading client data...</p>
  }

  return (
    <div className={styles.clientProfile}>
      {/* Basic Information Section */}
      <section className={styles.basicInfo}>
        <h2>Basic Information</h2>
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
      </section>

      {/* Important Dates Section */}
      <section className={styles.importantDates}>
        <h2>Important Dates</h2>
        {clientData.importantDates && clientData.importantDates.length > 0 ? (
          <ul>
            {clientData.importantDates.map((date, index) => (
              <li key={index} className={styles.listItem}>
                <EditField
                  label='Tag'
                  fieldName={`importantDate-tag-${index}`}
                  type='text'
                  value={editedFields[`importantDate-tag-${index}`] ?? date.tag}
                  onChange={handleInputChange}
                />
                <EditField
                  label='Reason'
                  fieldName={`importantDate-reason-${index}`}
                  type='text'
                  value={
                    editedFields[`importantDate-reason-${index}`] ?? date.reason
                  }
                  onChange={handleInputChange}
                />
                <EditField
                  label='Date'
                  fieldName={`importantDate-date-${index}`}
                  type='date'
                  value={
                    editedFields[`importantDate-date-${index}`]
                      ? formatDate(editedFields[`importantDate-date-${index}`])
                      : formatDate(date.date)
                  }
                  onChange={handleInputChange}
                />
                <button
                  onClick={() => handleDeleteImportantDate(index)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No important dates added.</p>
        )}
        <button onClick={handleAddImportantDate} className={styles.addButton}>
          Add Important Date
        </button>
      </section>

      {/* Marketing Tags Section */}
      <section className={styles.marketingTags}>
        <h2>Marketing Tags</h2>
        {clientData.marketingTags && clientData.marketingTags.length > 0 ? (
          <ul>
            {clientData.marketingTags.map((tag, index) => (
              <li key={index} className={styles.marketingTag}>
                <EditField
                  label='Tag'
                  fieldName={`marketingTag-${index}`}
                  type='text'
                  value={editedFields[`marketingTag-${index}`] ?? tag}
                  onChange={handleInputChange}
                />
                <button
                  onClick={() => handleDeleteMarketingTag(index)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No marketing tags added.</p>
        )}
        <button onClick={handleAddMarketingTag} className={styles.addButton}>
          Add Marketing Tag
        </button>
      </section>

      {/* Photoshoots Section */}
      <section className={styles.photoshoots}>
        <h2>Photoshoots</h2>
        {clientData.photoshootDates && clientData.photoshootDates.length > 0 ? (
          <ul>
            {clientData.photoshootDates.map((date, index) => (
              <li key={index} className={styles.listItem}>
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
                      ? formatDate(editedFields[`photoshootDate-date-${index}`])
                      : formatDate(date.date)
                  }
                  onChange={handleInputChange}
                />
                <button
                  onClick={() => handleDeletePhotoshootDate(index)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No photoshoots scheduled.</p>
        )}
        <button onClick={handleAddPhotoshootDate} className={styles.addButton}>
          Add Photoshoot Date
        </button>
      </section>

      {/* Relations Section */}
      <section className={styles.relations}>
        <h2>Relations</h2>
        {clientData.relations && clientData.relations.length > 0 ? (
          <ul>
            {clientData.relations.map((relation, index) => (
              <li key={index} className={styles.relationItem}>
                <EditField
                  label={`Name (${relation.relationshipType})`}
                  fieldName={`relationName-${index}`}
                  type='text'
                  value={editedFields[`relationName-${index}`] ?? relation.name}
                  onChange={handleInputChange}
                />
                <EditField
                  label={`Age (${relation.relationshipType})`}
                  fieldName={`relationAge-${index}`}
                  type='number'
                  value={editedFields[`relationAge-${index}`] ?? relation.age}
                  onChange={handleInputChange}
                />
                <EditField
                  label={`Relationship (${relation.relationshipType})`}
                  fieldName={`relationshipType-${index}`}
                  type='text'
                  value={
                    editedFields[`relationshipType-${index}`] ??
                    relation.relationshipType
                  }
                  onChange={handleInputChange}
                />
                <button
                  onClick={() => handleDeleteRelation(index)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No relations added.</p>
        )}
        <button onClick={handleAddRelation} className={styles.addButton}>
          Add Relation
        </button>
      </section>

      {/* Action Buttons */}
      {hasEdits && (
        <div className={styles.actionButtons}>
          <button
            onClick={handleSave}
            className={styles.saveButton}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={isSaving}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Delete Profile Button */}
      <div className={styles.deleteButtonContainer}>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.deleteButton}
        >
          Delete Profile
        </button>
      </div>

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
        <h2>Galleries</h2>
        <button
          onClick={() => setIsCreatingGallery(true)}
          className={styles.createGalleryButton}
        >
          Create Photoshoot
        </button>

        {/* Create Gallery Form */}
        {isCreatingGallery && (
          <CreateGalleryForm
            onCreate={handleCreateGallery}
            onCancel={() => setIsCreatingGallery(false)}
            isCreating={isCreating}
          />
        )}

        {/* Gallery List */}
        <GalleryList
          galleries={galleries}
          onDelete={(galleryId) => deleteGallery(galleryId)}
        />

        {/* Display Gallery Errors */}
        {galleryError && <p className={styles.error}>{galleryError}</p>}
      </section>
    </div>
  )
}

export default ClientProfile
