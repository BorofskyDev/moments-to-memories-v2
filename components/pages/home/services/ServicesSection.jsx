import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './ServicesSection.module.scss'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'

function ServicesSection() {
  return (
    <SectionContainer className={styles.servicesSection}>
        <SectionHeading>It&apos;s your story - how will it be written?</SectionHeading>
        <SectionSubtitle>Services For Every Occasion</SectionSubtitle>
        </SectionContainer>
  )
}
export default ServicesSection