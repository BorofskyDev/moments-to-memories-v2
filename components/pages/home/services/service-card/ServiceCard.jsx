import Subheading from '@/components/headings/subheading/Subheading'
import styles from './ServiceCard.module.scss'
import PortraitImage from '@/components/images/portrait-image/PortraitImage'
import MediumBodyText from '@/components/layout/body-text/medium-body-text/MediumBodyText'

function ServiceCard({
  title,
  src,
  alt,
  description,
  serviceTitle1,
  serviceDesc1,
  serviceTitle2,
  serviceDesc2,
}) {
  return (
    <div className={styles.serviceCard}>
        <div className={styles.serviceCard__}>
      <Subheading className={styles.serviceCard__title}>{title}</Subheading>
      <PortraitImage
        src={src}
        alt={alt}
        className={styles.serviceCard__serviceImage}
      />
      <MediumBodyText className={styles.serviceCard__serviceDescription}>
        {description}
      </MediumBodyText>

        </div>

    </div>
  )
}
export default ServiceCard
