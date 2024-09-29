import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './CTA.module.scss'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'
import BodyText from '@/components/layout/body-text/BodyText'
import CtaButton from '@/components/links/cta-button/CtaButton'

function CTA() {
  return (
    <SectionContainer>
      <div className={styles.cta}>
        <div className={styles.cta__title}>
          <SectionHeading>Your story deserves to be timeless</SectionHeading>
          <SectionSubtitle>
            Where Every Frame Tells Your Unique Story
          </SectionSubtitle>
        </div>
        <BodyText>
          Our lives are filled with moments - big and small - that define who we
          are. But moments slip away.
          <br />
          <br />
          At Moments to Memories, I don’t just capture images; I create art that
          lasts long after the moment fades. Each session is a personal
          collaboration, revealing your authentic story. This is photography
          with a purpose - turning fleeting moments into timeless memories.
          <br />
          <br />
          Let’s make your story unforgettable. Book your session today, and
          let’s create memories that stand the test of time.{' '}
        </BodyText>
        <CtaButton href='#'>Book a session</CtaButton>
      </div>
    </SectionContainer>
  )
}
export default CTA
