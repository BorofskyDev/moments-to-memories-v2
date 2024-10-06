// components/pages/admin/settings/reviews/Reviews.jsx

'use client'

import React, { useState } from 'react'
import styles from './Reviews.module.scss'
import ReviewsModal from '@/components/modals/reviews-modal/ReviewsModal'
import AddButton from '@/components/buttons/add-button/AddButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'

const Reviews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className={styles.reviews}>
      <div className={styles.header}>
        <ParagraphHeading>Site Reviews</ParagraphHeading>
        <AddButton
          onClick={openModal}
          className={styles.addButton}
          text='Upload Review'
        />
      </div>
      {/* Reviews List can be implemented here in the future */}

      {/* Reviews Modal */}
      <ReviewsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Reviews
