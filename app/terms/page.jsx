import PageHeading from '@/components/headings/page-heading/PageHeading'
import Subheading from '@/components/headings/subheading/Subheading'
import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './TermsPage.module.scss'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import SmallBodyText from '@/components/layout/body-text/small-body-text/SmallBodyText'

function TermsPage() {
  return (
    <SectionContainer className={styles.termsPage}>
      <div className={styles.header}>
        <PageHeading>Our commitment and your responsibilities</PageHeading>
        <Subheading>Terms and Agreements</Subheading>
        <SmallBodyText text='Updated October 14, 2024' />
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>Introduction</ParagraphHeading>
        <BodyText>
          Welcome to Moments to Memories. These Terms and Conditions ("Terms")
          govern your access to and use of our website, services, and content.
          By accessing or using the site, you agree to be bound by these Terms.
          Please read them carefully, as they outline your rights, obligations,
          and the legal framework governing your use of the app.{' '}
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>1. Acceptance of Terms</ParagraphHeading>
        <BodyText>
          By accessing our website or using any of our services, you acknowledge
          that you have read, understood, and agreed to be bound by these Terms.
          If you do not agree with any part of these Terms, please refrain from
          using the site.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>2. Eligibility</ParagraphHeading>
        <BodyText>
          You must be at least 18 years old to use this site. If you are under
          18, your access is only permitted with the involvement of a parent or
          guardian.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>3. User Responsibilities</ParagraphHeading>
        <BodyText>
          As a user, you agree to use our platform responsibly, respecting the
          rights and privacy of others. This includes:
          <br />
          <br />
          Content Use: You agree not to copy, modify, distribute, or transmit
          any content from our website without our prior written consent.
          <br />
          <br />
          Account Security: You are responsible for maintaining the
          confidentiality of your login information and for all activities that
          occur under your account.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>
          4. Copyright and Intellectual Property
        </ParagraphHeading>
        <BodyText>
          All content on this site, including images, text, graphics, and logos,
          is protected by copyright law and other intellectual property laws.
          Unauthorized use or reproduction of any content is strictly
          prohibited. All images displayed on the site are used with the
          explicit permission of the individuals involved, and any unauthorized
          use of these images will result in legal action.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>5. Image Use Policy</ParagraphHeading>
        <BodyText>
          All public images displayed on the site have been shared with the
          consent of the individuals or their legal guardians. These images are
          copyrighted and may not be used, reproduced, or distributed without
          our express permission. Any unauthorized use will be considered an
          infringement and pursued accordingly.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>6. Data Collection and Privacy</ParagraphHeading>
        <BodyText>
          We collect data for the sole purpose of improving the functionality
          and experience of our web app. This data includes, but is not limited
          to, user activity tracked via Google Analytics. Please refer to our
          Privacy Policy for a detailed explanation of how your information is
          collected, stored, and protected.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>7. Limitation of Liability</ParagraphHeading>
        <BodyText>
          While we strive to ensure the content on our site is accurate and
          up-to-date, we make no warranties or representations regarding the
          completeness, accuracy, or reliability of any information. Your use of
          the site is at your own risk. We will not be liable for any damages or
          losses arising from your use of the website.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>8. Account Termination</ParagraphHeading>
        <BodyText>
          We reserve the right to suspend or terminate your access to the site
          at any time, for any reason, including but not limited to violations
          of these Terms or applicable law.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>9. Modifications to Terms</ParagraphHeading>
        <BodyText>
          We may update these Terms from time to time to reflect changes in our
          services or legal requirements. We will notify users of significant
          changes by posting a notice on our website. Your continued use of the
          site following such updates constitutes your acceptance of the revised
          Terms.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>10. Governing Law</ParagraphHeading>
        <BodyText>
          These Terms shall be governed by and construed in accordance with the
          laws of Kansas, USA, without regard to its conflict of law provisions.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>11. Contact Information</ParagraphHeading>
        <BodyText>
          If you have any questions about these Terms, please contact us at
          <a href="emailto: admin@momentstomemories.com">admin@momentstomemories.com</a>.
        </BodyText>
      </div>
    </SectionContainer>
  )
}
export default TermsPage
