'use client'

import React from 'react'
import PropTypes from 'prop-types'
import styles from './ImageCard.module.scss'
import Image from 'next/image'

const ImageCard = ({ photo, selected, onToggle }) => {
  return (
    <div className={`${styles.imageCard} ${selected ? styles.selected : ''}`}>
      <Image
        src={photo.url}
        alt={photo.name}
        className={styles.image}
        width={1960}
        height={1620}
      />
      <button className={styles.toggleButton} onClick={onToggle}>
        {selected ? 'Deselect' : 'Select'}
      </button>
    </div>
  )
}

ImageCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default ImageCard
