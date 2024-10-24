// components/pages/admin/client-profile/ClientProfile.jsx

'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/libs/context/AuthContext'
import useClientProfile from '@/libs/hooks/client-profile/useClientProfile'
import usePublicGallery from '@/libs/hooks/client-profile/usePublicGallery'
import useSelectionGallery from '@/libs/hooks/client-profile/useSelectionGallery'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import {
  ActionButtons,
  BasicClientInfoEdit,
  GallerySectionEdit, // Ensure consistent naming
  ImportantDatesEdit,
  MarketingTagsEdit,
  PhotoshootsEdit,
  RelationsEdit,
} from './client-profile-edit-components/'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation-modal/DeleteConfirmationModal'
import FolderUploadComponent from './folder-upload-component/FolderUploadComponent'
import styles from './ClientProfile.module.scss'

const ClientProfile = ({ client }) => {
  const { user, isAdmin } = useAuth() // Get current user and admin status

 

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
    handleUpdateImportantDate,
    handleDeleteImportantDate,
    handleAddMarketingTag,
    handleUpdateMarketingTag,
    handleDeleteMarketingTag,
    handleAddPhotoshootDate,
    handleUpdatePhotoshootDate,
    handleDeletePhotoshootDate,
    handleAddRelation,
    handleDeleteRelation,
    handleUpdateRelation,
  } = useClientProfile(client)

  

  const {
    galleries: publicGalleries,
    isCreating: isCreatingPublicGallery,
    error: publicGalleryError,
    createGallery: createPublicGallery,
    deleteGallery: deletePublicGallery,
    deletePhoto: deletePublicPhoto,
    addPhotosToGallery: addPhotosToPublicGallery,
  } = usePublicGallery(clientData?.id)

  const {
    galleries: selectionGalleries,
    isUploading: isUploadingSelectionGallery,
    error: selectionGalleryError,
    createGallery: createSelectionGallery,
    deleteGallery: deleteSelectionGallery,
    deletePhoto: deleteSelectionPhoto,
    addPhotosToGallery: addPhotosToSelectionGallery,
  } = useSelectionGallery(clientData?.id)

  

  const [isCreatingGallery, setIsCreatingGallery] = useState(false)
  const [isDeletingModal, setIsDeletingModal] = useState(false) // Separate state for modal deletion

  // Check if the user is allowed to edit the profile
  const canEdit = isAdmin || user?.uid === client?.id

  

  // Handle creating a new gallery
  const handleCreatePublicGallery = async (name, date, files) => {
    try {
      await createPublicGallery(name, date, files)
      setIsCreatingGallery(false)
    } catch (err) {
      console.error('Error creating public gallery:', err)
    }
  }

  // Handle confirming deletion
  const handleConfirmDelete = async () => {
    setIsDeletingModal(true)
    try {
      console.log('Deleting profile:', client.id)
      await handleDelete() // Assuming handleDelete handles the actual deletion
      // Optionally, redirect or update state after deletion
    } catch (error) {
      console.error('Error deleting profile:', error)
    } finally {
      setIsDeletingModal(false)
      setIsModalOpen(false)
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
      <BasicClientInfoEdit
        clientData={clientData}
        editedFields={editedFields}
        canEdit={canEdit}
        handleInputChange={handleInputChange}
        formatDate={formatDate}
      />

      {/* Important Dates Section */}
      <ImportantDatesEdit
        importantDates={clientData.importantDates}
        canEdit={canEdit}
        editedFields={editedFields}
        handleInputChange={handleInputChange}
        handleDeleteImportantDate={handleDeleteImportantDate}
        handleAddImportantDate={handleAddImportantDate}
        handleUpdateImportantDate={handleUpdateImportantDate}
        formatDate={formatDate}
      />

      {/* Marketing Tags Section */}
      <MarketingTagsEdit
        marketingTags={clientData.marketingTags}
        canEdit={canEdit}
        editedFields={editedFields}
        handleInputChange={handleInputChange}
        handleUpdateMarketingTag={handleUpdateMarketingTag}
        handleDeleteMarketingTag={handleDeleteMarketingTag}
        handleAddMarketingTag={handleAddMarketingTag}
      />

      {/* Photoshoots Section */}
      <PhotoshootsEdit
        photoshootDates={clientData.photoshootDates}
        canEdit={canEdit}
        editedFields={editedFields}
        handleInputChange={handleInputChange}
        handleDeletePhotoshootDate={handleDeletePhotoshootDate}
        handleUpdatePhotoshootDate={handleUpdatePhotoshootDate}
        handleAddPhotoshootDate={handleAddPhotoshootDate}
        formatDate={formatDate}
      />

      {/* Relations Section */}
      <RelationsEdit
        relations={clientData.relations}
        canEdit={canEdit}
        editedFields={editedFields}
        handleInputChange={handleInputChange}
        handleUpdateRelation={handleUpdateRelation}
        handleDeleteRelation={handleDeleteRelation}
        handleAddRelation={handleAddRelation}
      />

      {/* Gallery Selection Upload */}

      <FolderUploadComponent
        clientId={clientData.id}
        galleries={selectionGalleries}
        createGallery={createSelectionGallery}
        addPhotosToGallery={addPhotosToSelectionGallery}
        isUploading={isUploadingSelectionGallery}
        error={selectionGalleryError}
      />

      {/* Gallery Section for Public Galleries */}
      <GallerySectionEdit
        canEdit={canEdit}
        isCreatingGallery={isCreatingGallery}
        handleCreateGallery={handleCreatePublicGallery}
        handleCancelCreateGallery={() => setIsCreatingGallery(false)}
        handleAddGallery={() => setIsCreatingGallery(true)}
        galleries={publicGalleries}
        deleteGallery={deletePublicGallery}
        galleryError={publicGalleryError}
        isCreating={isCreatingPublicGallery}
        clientId={clientData.id}
        deletePhoto={deletePublicPhoto}
        addPhotosToGallery={addPhotosToPublicGallery}
      />

      {/* Action Buttons */}
      {canEdit && hasEdits && (
        <ActionButtons
          handleSave={handleSave}
          handleCancel={handleCancel}
          isSaving={isSaving}
        />
      )}

      {/* Delete Profile Button */}
      {isAdmin && (
        <div className={styles.deleteButtonContainer}>
          <DeleteButton
            onClick={() => setIsModalOpen(true)}
            className={styles.deleteButton}
            text='Delete Profile'
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirmDelete={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
        isDeleting={isDeletingModal}
      />
    </div>
  )
}

export default ClientProfile
