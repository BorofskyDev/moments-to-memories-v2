// components/galleries/image-card/ImageCard.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './ImageCard.module.scss'
import Image from 'next/image'
import { motion } from 'framer-motion'

const MotionImage = motion(Image)

const ImageCard = ({ photo, selected, submitted, onToggle, onImageClick }) => {
  return (
    <div className={`${styles.imageCard} ${selected ? styles.selected : ''}`}>
      <MotionImage
        src={photo.url}
        alt={photo.name}
        className={styles.image}
        width={1260}
        height={1080}
        layoutId={`gallery-image-${photo.id}`} // Added layoutId for shared element transition
        onClick={() => onImageClick(photo)} // Handle image click
      />
      <button
        className={styles.toggleButton}
        onClick={(e) => {
          e.stopPropagation() // Prevent click event from propagating to the image
          onToggle()
        }}
        disabled={submitted}
      >
        {submitted ? 'Submitted' : selected ? 'Deselect' : 'Select'}
      </button>
    </div>
  )
}

ImageCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
    isSelected: PropTypes.bool,
    isSubmitted: PropTypes.bool,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired, // Added propTypes for onImageClick
}

export default ImageCard
