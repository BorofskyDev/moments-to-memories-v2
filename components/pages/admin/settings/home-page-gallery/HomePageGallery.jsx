// components/pages/admin/home-page-gallery/HomePageGallery.jsx

'use client'

import React, { useState } from 'react'
import styles from './HomePageGallery.module.scss'
// import GalleryModal from '@/components/modals/gallery-modal/GalleryModal'
import AddButton from '@/components/buttons/add-button/AddButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import AdminGridGallery from '@/components/galleries/admin-grid-gallery/AdminGridGallery'

const HomePageGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className={styles.homePageGallery}>
      <div className={styles.header}>
        <ParagraphHeading>Main Page Gallery</ParagraphHeading>
        <AddButton
          onClick={openModal}
          className={styles.addButton}
          text='Edit Gallery'
        />
      </div>
      {/* Gallery Modal */}
      {isModalOpen && <AdminGridGallery onClose={closeModal} />}
    </div>
  )
}

export default HomePageGallery
