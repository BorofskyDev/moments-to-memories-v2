// components/galleries/image-card/ImageCard.jsx

'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './ImageCard.module.scss'

const ImageCard = ({ photo, selected, submitted, onToggle }) => {
  return (
    <div className={`${styles.imageCard} ${selected ? styles.selected : ''}`}>
      <img src={photo.url} alt={photo.name} className={styles.image} />
      <button
        className={styles.toggleButton}
        onClick={onToggle}
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
}

export default ImageCard
