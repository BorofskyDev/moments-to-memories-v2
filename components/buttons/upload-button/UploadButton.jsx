// components/buttons/upload-button/UploadButton.jsx

import React from 'react'
import PropTypes from 'prop-types'
import styles from './UploadButton.module.scss'
import UploadSvg from '@/components/layout/svgs/upload-svg/UploadSvg'

const UploadButton = ({ text, className }) => {
  return (
    <div className={`${styles.uploadButton} ${className}`}>
     <UploadSvg /> <span>{text}</span>
    </div>
  )
}

UploadButton.propTypes = {
  text: PropTypes.string.isRequired,
}

export default UploadButton
