'use client'

import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import styles from './ServiceItem.module.scss'
import FeatureItem from '../feature-item/FeatureItem'
import PortraitImage from '@/components/images/portrait-image/PortraitImage'

function ServiceItem({ title, imageSrc, imageAlt, description, features }) {
  return (
    <div className={styles.serviceItem}>
      <ParagraphHeading className={styles.serviceItem__title}>{title}</ParagraphHeading>

      <div className={styles.serviceItem__imageWrapper}>
        <PortraitImage src={imageSrc} alt={imageAlt} />
      </div>

      <BodyText className={styles.serviceItem__description}>{description}</BodyText>

      {features && features.length > 0 && (
        <div className={styles.serviceItem__featuresWrapper}>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ServiceItem
