'use client'

import FlashWrapper from '@/libs/hoc/FlashWrapper'
import styles from './BodyText.module.scss'

function BodyText({ children, className }) {
  return (
    <FlashWrapper className={className}>
      <p className={styles.bodyText}>{children}</p>
    </FlashWrapper>
  )
}

export default BodyText
