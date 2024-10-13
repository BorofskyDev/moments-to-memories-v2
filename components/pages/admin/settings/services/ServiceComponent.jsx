// components/admin/settings/services/ServicesComponent.jsx

'use client'

import React, { useState } from 'react'
import styles from './ServicesComponent.module.scss'
import Modal from '@/components/modals/modal/Modal'
import ServicesModal from '@/components/modals/services-modal/ServicesModal'
import DeleteConfirmationModal from '@/components/modals/delete-confirmation-modal/DeleteConfirmationModal'
import AddButton from '@/components/buttons/add-button/AddButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import useServices from '@/libs/hooks/services/useServices'
import BodyText from '@/components/layout/body-text/BodyText'
import ServiceItem from '@/components/pages/home/services/service-item/ServiceItem'

const ServicesComponent = () => {
  const { services, loading, error, addService, editService, deleteService } =
    useServices()

  const [isManageServicesModalOpen, setIsManageServicesModalOpen] =
    useState(false)
  const [currentService, setCurrentService] = useState(null) // null for adding new service
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Toggle Manage Services Modal
  const toggleManageServicesModal = () => {
    setIsManageServicesModalOpen((prev) => !prev)
    setCurrentService(null) // Reset any current service being edited
  }

  // Open Edit Service Modal
  const openEditServiceModal = (service) => {
    setCurrentService(service)
    setIsManageServicesModalOpen(true)
  }

  // Open Delete Confirmation Modal
  const openDeleteModal = (service) => {
    setServiceToDelete(service)
    setIsDeleteModalOpen(true)
  }

  // Handle Manage Services Modal Close
  const closeManageServicesModal = () => {
    setIsManageServicesModalOpen(false)
    setCurrentService(null)
  }

  // Handle Delete Modal Close
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setServiceToDelete(null)
    setIsDeleting(false)
  }

  // Handle Add/Edit Service Submission
  const handleServiceSubmit = async (serviceData, imageFile) => {
    if (currentService) {
      // Editing existing service
      await editService(currentService.id, serviceData, imageFile)
    } else {
      // Adding new service
      await addService(serviceData, imageFile)
    }
    closeManageServicesModal()
  }

  // Handle Service Deletion
  const handleServiceDelete = async () => {
    if (!serviceToDelete) return
    setIsDeleting(true)
    try {
      await deleteService(serviceToDelete.id)
      closeDeleteModal()
    } catch (err) {
      // Error handling can be enhanced here
      console.error('Deletion failed:', err)
      setIsDeleting(false)
    }
  }

  return (
    <div className={styles.servicesComponent}>
      <div className={styles.header}>
        <ParagraphHeading>Services</ParagraphHeading>
        <AddButton
          onClick={toggleManageServicesModal}
          className={styles.manageButton}
          text={
            isManageServicesModalOpen
              ? 'Close Manage Services'
              : 'Manage Services'
          }
        />
      </div>

      {/* Manage Services Modal */}
      <div
        isOpen={isManageServicesModalOpen}
        onClose={closeManageServicesModal}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <ParagraphHeading>Manage Services</ParagraphHeading>
            <AddButton
              onClick={() => {
                setCurrentService(null) // Set to null to indicate adding new service
              }}
              className={styles.addButton}
              text='Add New Service'
            />
          </div>

          {loading && <BodyText>Loading services...</BodyText>}
          {error && <BodyText className={styles.error}>{error}</BodyText>}

          <div className={styles.servicesList}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceItemWrapper}>
                <ServiceItem
                  title={service.title}
                  imageSrc={service.imageSrc}
                  imageAlt={service.imageAlt}
                  description={service.description}
                  features={service.features}
                />
                <div className={styles.serviceActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => openEditServiceModal(service)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => openDeleteModal(service)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Services Modal */}
      <div
        isOpen={
          currentService !== null ||
          (isManageServicesModalOpen && !currentService)
        }
        onClose={closeManageServicesModal}
      >
        {currentService !== null ? (
          <ServicesModal
            service={currentService}
            onSubmit={handleServiceSubmit}
            onClose={closeManageServicesModal}
          />
        ) : null}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirmDelete={handleServiceDelete}
        onCancel={closeDeleteModal}
        isDeleting={isDeleting}
        text={`Are you sure you want to delete the service "${serviceToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  )
}

export default ServicesComponent
