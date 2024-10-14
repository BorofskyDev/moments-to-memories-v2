import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './CookiesPage.module.scss'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import BodyText from '@/components/layout/body-text/BodyText'

function CookiesPage() {
  return (
    <SectionContainer className={styles.cookiesPage}>
      <div className={styles.header}>
        <PageHeading>Cookies Policy</PageHeading>
        <BodyText>
          At Moments to Memories, we use cookies and similar tracking
          technologies to enhance your browsing experience and analyze website
          traffic. This Cookies Policy explains what cookies are, how we use
          them, and how you can control their use.
          <br />
          <br />
          By using our website, you agree to the use of cookies in accordance
          with this policy.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>1. What Are Cookies?</ParagraphHeading>
        <BodyText>
          Cookies are small text files that are stored on your device (computer,
          tablet, or mobile) when you visit a website. Cookies allow websites to
          recognize your device and store information about your preferences or
          past actions.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>2. Types of Cookies We Use</ParagraphHeading>
        <BodyText>
          We use the following types of cookies on our website:
          <br />
          <br />
          Essential Cookies: These cookies are necessary for the website to
          function and cannot be switched off. They are usually set in response
          to actions you take, such as logging in or filling out forms.
          <br />
          <br />
          Performance and Analytics Cookies: We use Google Analytics to track
          how users interact with our website, allowing us to analyze traffic
          and improve the user experience. These cookies collect information
          about how visitors use our site, such as the pages visited and the
          time spent on the site.
          <br />
          <br />
          Functional Cookies: These cookies allow the website to remember
          choices you make, such as your language preference, and provide
          enhanced features.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>3. How We Use Cookies</ParagraphHeading>
        <BodyText>
          We use cookies to:
          <br />
          <br />
          Ensure the website operates efficiently.
          <br />
          <br />
          Improve your browsing experience by remembering preferences and
          settings.
          <br />
          <br />
          Analyze user behavior to improve our website's functionality and
          performance.
          <br />
          <br />
          Help us understand which pages are the most popular and how users
          navigate through the site.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>4. Third-Party Cookies</ParagraphHeading>
        <BodyText>
          We also allow third parties, such as Google Analytics, to set cookies
          on your device for performance and analytics purposes. These
          third-party cookies may collect information about your browsing
          activities across different websites and services.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>5. Managing Cookies</ParagraphHeading>
        <BodyText>
          You have the option to manage or disable cookies through your browser
          settings. You can block or delete cookies by adjusting your browser’s
          settings; however, please note that doing so may impact your user
          experience on our website.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>6. Your Consent</ParagraphHeading>
        <BodyText>
          By continuing to use our site, you consent to the placement of cookies
          on your device. If you do not wish to accept cookies, you can disable
          them by adjusting your browser settings as described above.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>7. Changes to This Cookies Policy</ParagraphHeading>
        <BodyText>
          We may update this Cookies Policy from time to time to reflect changes
          in our use of cookies or legal requirements. Any updates will be
          posted on this page, and the revised policy will indicate the date of
          the latest revision.
        </BodyText>
      </div>
      <div className={styles.bodyText}>
        <ParagraphHeading>8. Contact Us</ParagraphHeading>
        <BodyText>
          If you have any questions about our use of cookies or how we handle
          your data, please contact us at admin@momentstomemories.com.
        </BodyText>
      </div>
    </SectionContainer>
  )
}
export default CookiesPage
