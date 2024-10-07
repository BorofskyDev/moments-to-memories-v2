import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'
import SocialMediaContainer from './social-media-container/SocialMediaContainer'
import ContactForm from './contact-form/ContactForm'
import styles from './ContactSection.module.scss'

function ContactSection() {
  return (
    <SectionContainer className={styles.contactSection}>
      <SectionHeading>Start your journey</SectionHeading>
      <SectionSubtitle>
        Ready To Capture Your Moments? Fill Out The Form Below And I Will Be In Touch Soon.
      </SectionSubtitle>
      <SocialMediaContainer />
      <ContactForm />
    </SectionContainer>
  )
}
export default ContactSection
