import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import SmallBodyText from '@/components/layout/body-text/small-body-text/SmallBodyText'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import ExternalPageLink from '@/components/links/external-page-link/ExternalPageLink'
import Subheading from '@/components/headings/subheading/Subheading'
import styles from './PrivacyPage.module.scss'

function PrivacyPage() {
  return (
    <SectionContainer className={styles.privacyPage}>
      <div className={styles.header}>
        <PageHeading>Privacy Policy for moments to memories</PageHeading>
        <Subheading>
          At Moments to Memories, we respect your privacy and are committed to
          protecting the personal information you share with us. This Privacy
          Policy explains how we collect, use, and protect your information when
          you use our website. By accessing and using our site, you agree to the
          practices described in this policy.
        </Subheading>
        <SmallBodyText text='Last updated: October 14, 2024' />
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>1. Information We Collect</ParagraphHeading>
        <BodyText>
          We collect personal information to improve your experience on the site
          and provide you with the best possible service. The types of
          information we may collect include:
          <br />
          <br />
          Personal Information: This may include your name, email address, and
          other contact details if you submit them via our contact form or other
          site interactions.
          <br />
          <br />
          Automatically Collected Data: We use Google Analytics to collect
          information about your browsing behavior, such as IP address, browser
          type, device type, and pages visited.
        </BodyText>
      </div>

      <div className={styles.bodyText}>
        <ParagraphHeading>2. How We Use Your Information</ParagraphHeading>
        <BodyText>
          The information we collect is used for the following purposes:
          <br />
          <br />
          To Improve Our Website: We analyze data to understand how visitors
          interact with the site to enhance its functionality and user
          experience.
          <br />
          <br />
          To Communicate with You: If you provide your contact information, we
          may send you updates or respond to your inquiries.
          <br />
          <br />
          Compliance and Security: We may use your information to ensure that
          the website remains secure and complies with legal obligations.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>3. Google Analytics</ParagraphHeading>
        <BodyText>
          We use Google Analytics to track and report website traffic. Google
          Analytics collects information such as:
          <br />
          <br />
          Pages visited
          <br />
          <br />
          Time spent on the site
          <br />
          <br />
          Referring websites
          <br />
          <br />
          This data helps us understand how visitors use the site and allows us
          to make improvements. Google may use the data it collects for its own
          purposes, such as improving its own services. For more information,
          you can visit{' '}
          <ExternalPageLink href='https://policies.google.com/privacy?hl=en-US'>
            Google&apos;s Privacy Policy
          </ExternalPageLink>
          .
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>4. Cookies</ParagraphHeading>
        <BodyText>
          Cookies are small data files that are stored on your device when you
          visit our site. We use cookies to:
          <br />
          <br />
          Recognize your browser or device
          <br />
          <br />
          Track site usage and performance via Google Analytics
          <br />
          <br />
          Remember your preferences
          <br />
          <br />
          You can manage cookie settings through your browser preferences.
          Please note that disabling cookies may affect your user experience on
          the site.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>5. Sharing of Information</ParagraphHeading>
        <BodyText>
          We do not sell or share your personal information with third parties,
          except in the following circumstances:
          <br />
          <br />
          Service Providers: We may share data with trusted third-party service
          providers who assist us in operating our website, such as Google
          Analytics.
          <br />
          <br />
          Legal Requirements: We may disclose your information if required to do
          so by law or in response to legal requests.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>6. Data Security</ParagraphHeading>
        <BodyText>
          We take reasonable measures to protect the personal information we
          collect from unauthorized access, alteration, or disclosure. However,
          no system is completely secure, and we cannot guarantee the absolute
          security of your data.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>7. Your Rights</ParagraphHeading>
        <BodyText>
          You have the right to:
          <br />
          <br />
          Access and Update Information: You may request access to or updates to
          your personal information at any time by contacting us at
          admin@momentstomemories.com.
          <br />
          <br />
          Opt-Out: If you no longer wish to receive communications from us, you
          can opt-out by following the instructions provided in our emails or
          contacting us directly.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>8. Children&apos;s Privacy</ParagraphHeading>
        <BodyText>
          Our website is not directed at children under the age of 13, and we do
          not knowingly collect personal information from children. If we become
          aware that we have inadvertently collected personal data from a child
          under 13, we will take steps to delete it as soon as possible.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>9. Changes to This Privacy Policy</ParagraphHeading>
        <BodyText>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. Any changes will be posted on
          this page, and the updated policy will indicate the date of the latest
          revision.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>10. Contact Us</ParagraphHeading>
        <BodyText>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at admin@momentstomemories.com.
        </BodyText>
      </div>
    </SectionContainer>
  )
}

export default PrivacyPage
