import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './AboutSection.module.scss'
import BodyText from '@/components/layout/body-text/BodyText'
import Image from 'next/image'
import InternalPageLink from '@/components/links/internal-page-link/InternalPageLink'

function AboutSection() {
  return (
    <SectionContainer className={styles.aboutSection}>
      <SectionHeading>capturing the art in every moment</SectionHeading>
      <div className={styles.aboutSection__content}>
      <Image src='/page-images/about/about-image.png' width='1600' height='1096' alt='image of model' />
      <BodyText>
        Time is a fleeting artist, painting our lives with vibrant movements
        that, like brushstrokes, gradually fade. As days turn into years, our
        memories may blur, yet the essence of those cherished experiences
        lingers in the corners of our minds. Photographs are more than mere
        images, they are gateways to the past, windows that let us revisit the
        laughter of a family celebration, the pride of a graduation, the warmth
        of an intimate embrace. They are silent storytellers, capturing the joy,
        love, and beauty that we hold dear, ensuring that these moments are
        never lost to time. 
        <br />
        <br />
        At Moments to Memories I stive to transform these
        fleeting seconds into lasting works of art. each photoshoot is not just
        a session; it is a dance of light and shadow, where every click of the
        camera weaves another stand of your unique story. I approach each client
        with the care and precession of an artist, aiming to capture the
        authenticity of your spirit and the elegance of your journey. These
        aren&apos;t just photos; they are pieces of your legacy, designed with a
        vision that turns everyday moments into extraordinary memories. Let me
        help you capture the art in every moment, creating photographs that are
        not only beautiful but resonate with the heart&apos;s deepest memoirs.
        Here, memories don&apos;t just last a lifetime - they become timeless.
      </BodyText>

      </div>
      <InternalPageLink className={styles.aboutSection__learnMore} href='/about'>Learn more about moments to memories</InternalPageLink>
    </SectionContainer>
  )
}
export default AboutSection