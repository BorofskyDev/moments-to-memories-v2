import SvgSectionContainer from '@/components/layout/containers/svg-section-container/SvgSectionContainer'
import styles from './HeroSection.module.scss'
import SvgBackgroundContainer from '@/components/layout/containers/svg-background-container/SvgBackgroundContainer'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'
import CtaButton from '@/components/links/cta-button/CtaButton'
import InternalPageLink from '@/components/links/internal-page-link/InternalPageLink'

function HeroSection() {
  return (
    <SvgSectionContainer>
      <div className={styles.heroSection}>
        <div className={styles.heroSection__mainTitle}>
          <PageHeading>Moments to memories</PageHeading>
          <div>
            <SectionHeading>By</SectionHeading>
            <SectionHeading>kelli ann leibold</SectionHeading>
          </div>
        </div>
        <SectionSubtitle>
          Capturing life&apos;s most cherished moments through photography, art,
          and hearts
        </SectionSubtitle>
        <div className={styles.heroSection__btnGroup}>
          <CtaButton href='/contact'>Book Your Session</CtaButton>
          <InternalPageLink href='#about'>
            Learn more about moments to memories
          </InternalPageLink>
        </div>
      </div>
      <SvgBackgroundContainer
        src='/page-images/hero/hero-image.svg'
        className={`${styles.heroBackground} bottomRight `}
      />
    </SvgSectionContainer>
  )
}
export default HeroSection
