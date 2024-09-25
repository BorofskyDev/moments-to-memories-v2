import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './ServicesSection.module.scss'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'
import Subheading from '@/components/headings/subheading/Subheading'
import PortraitImage from '@/components/images/portrait-image/PortraitImage'
import MediumBodyText from '@/components/layout/body-text/medium-body-text/MediumBodyText'
import image1 from '@/public/profile-photos/baby1.png'
import PhotoSvg from '@/components/layout/svgs/photo-svg/PhotoSvg'

function ServicesSection() {
  return (
    <SectionContainer className={styles.servicesSection}>
      <SectionHeading>
        It&apos;s your story - how will it be written?
      </SectionHeading>
      <SectionSubtitle>Services For Every Occasion</SectionSubtitle>
      <div>
        <Subheading className={styles.serviceCard__title}>portraits</Subheading>
        <PortraitImage
          src={image1}
          alt='baby wrapped in a blue towel on a soft white blanket'
          className={styles.serviceCard__serviceImage}
        />
        <MediumBodyText className={styles.serviceCard__serviceDescription}>
          Capturing the essense of who you are, whether it&apos;s a personal
          portrait or the personality of a beloved pet. These sessions are
          designed to tell your unique story with grace and authenticity.
        </MediumBodyText>
        <PhotoSvg />
      </div>
    </SectionContainer>
  )
}
export default ServicesSection
