'use client'


import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import styles from './FeatureItem.module.scss'
import PhotoSvg from '@/components/layout/svgs/photo-svg/PhotoSvg'

function FeatureItem({   title, description }) {
  return (
    <div className={styles.featureItem}>
      <div className={styles.iconWrapper}>
        <PhotoSvg />
      </div>
      <div className={styles.contentWrapper}>
        <ParagraphHeading>{title}</ParagraphHeading>
        <BodyText>{description}</BodyText>
      </div>
    </div>
  )
}



export default FeatureItem
