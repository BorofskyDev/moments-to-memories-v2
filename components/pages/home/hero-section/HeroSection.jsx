import SvgSectionContainer from '@/components/layout/containers/svg-section-container/SvgSectionContainer'
import styles from './HeroSection.module.scss'
import SvgBackgroundContainer from '@/components/layout/containers/svg-background-container/SvgBackgroundContainer'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'

function HeroSection() {
  return (
    <SvgSectionContainer>
      <div className={styles.heroSection}>
        <PageHeading>Moments to memories</PageHeading>
        <SectionHeading>By</SectionHeading>
        <SectionHeading>kelli ann leibold</SectionHeading>
        <SectionSubtitle>
          Capturing life&apos;s most cherished moments through photography,
          art, and hearts
        </SectionSubtitle>
      </div>
      {/* <SvgBackgroundContainer
        src='/page-images/hero/hero-image.svg'
        className={`${styles.heroBackground} `}
      /> */}
    </SvgSectionContainer>
  )
}
export default HeroSection
