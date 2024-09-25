'use client'

import FlashWrapper from '@/libs/hoc/FlashWrapper'
import styles from './MediumBodyText.module.scss'

function MediumBodyText({ children, className }) {
  return (
    <FlashWrapper>
      <p className={`${className} ${styles.mediumBodyText}`}>{children}</p>
    </FlashWrapper>
  )
}

export default MediumBodyText
