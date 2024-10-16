import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './ContactPage.module.scss'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import Subheading from '@/components/headings/subheading/Subheading'
import SocialMediaContainer from '@/components/pages/home/contact-section/social-media-container/SocialMediaContainer'
import ContactForm from '@/components/pages/home/contact-section/contact-form/ContactForm'

function ContactPage() {
  return (
    <SectionContainer className={styles.contactPage}>
        <PageHeading>Start Your journey</PageHeading>
        <Subheading>Ready To Capture Your Moments? Fill Out The Form Below And I Will Be In Touch Soon.</Subheading>
    <SocialMediaContainer />
    <ContactForm />
    </SectionContainer>
  )
}
export default ContactPage