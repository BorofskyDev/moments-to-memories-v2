'use client'


import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import styles from './FeatureItem.module.scss'
import PhotoSvg from '@/components/layout/svgs/photo-svg/PhotoSvg'

function FeatureItem({   title, description }) {
  return (
    <div className={styles.featureItem}>
      
        <PhotoSvg />
        <ParagraphHeading className={styles.featureItem__title}>{title}</ParagraphHeading>
        <BodyText className={styles.featureItem__description}>{description}</BodyText>
      
    </div>
  )
}



export default FeatureItem
