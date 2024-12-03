// components/pages/admin/settings/create-admin/CreateAdmin.jsx
'use client'

import React, { useState } from 'react'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import AddButton from '@/components/buttons/add-button/AddButton'
import styles from './CreateAdmin.module.scss'
import CreateAdminModal from '@/components/modals/create-admin-modal/CreateAdminModal'

const CreateAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => setIsModalOpen((prev) => !prev)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className={styles.createAdmin}>
      <div className={styles.header}>
        <ParagraphHeading>Create Admin</ParagraphHeading>
        <AddButton
          onClick={toggleModal}
          className={styles.addButton}
          text='Create Admin'
        />
      </div>
      {isModalOpen && <CreateAdminModal onClose={closeModal} />}
    </div>
  )
}

export default CreateAdmin
