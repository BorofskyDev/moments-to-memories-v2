// components/pages/admin/settings/gallery-page/GalleryPage.jsx

'use client'

import React, { useState } from 'react'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import AdminCarouselGallery from '@/components/galleries/admin-carousel-gallery/AdminCarouselGallery'
import AddButton from '@/components/buttons/add-button/AddButton'
import styles from './GallerySettingsPage.module.scss'

const GallerySettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => setIsModalOpen((prev) => !prev)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className={styles.galleryPage}>
      <div className={styles.header}>
        <ParagraphHeading>Gallery Page</ParagraphHeading>
        <AddButton
          onClick={toggleModal}
          className={styles.addButton}
          text='Create Gallery'
        />
      </div>
      <AdminCarouselGallery isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default GallerySettingsPage
