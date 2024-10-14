import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import SectionContainer from '../containers/section-container/SectionContainer'
import styles from './Footer.module.scss'
import InternalPageLink from '@/components/links/internal-page-link/InternalPageLink'

function Footer() {
  return (
    <SectionContainer className={styles.footer}>
      <div className={styles.footerNav}>
        <ParagraphHeading>Navigation</ParagraphHeading>
        <InternalPageLink href="/">Home</InternalPageLink>
        <InternalPageLink href="/about">About</InternalPageLink>
        <InternalPageLink href='/gallery'>Gallery</InternalPageLink>
        <InternalPageLink href="/services">Services</InternalPageLink>
        <InternalPageLink href="/blog">Blog</InternalPageLink>
        <InternalPageLink href="#contact">Contact</InternalPageLink>
      </div>
      <div className={styles.footerContact}>
        <ParagraphHeading>Contact</ParagraphHeading>
      </div>
      <div className={styles.footerLegal}>
        <ParagraphHeading>Legal</ParagraphHeading>
        <InternalPageLink href="/terms">Terms and Conditions</InternalPageLink>
        <InternalPageLink href="/privacy">Privacy Policy</InternalPageLink>
        <InternalPageLink href='/image-usage'>Image Usage</InternalPageLink>
        <InternalPageLink href='/cookies'>Cookies</InternalPageLink>
        <InternalPageLink href='/accessibility'>Accessibility</InternalPageLink>
        <InternalPageLink href='/copyright-notice'>Copyright Notice</InternalPageLink>
        <InternalPageLink href='/dmca'>DMCA Policy</InternalPageLink>
        <InternalPageLink href='/coppa'>COPPA Compliance</InternalPageLink>
      </div>
    </SectionContainer>
  )
}
export default Footer
