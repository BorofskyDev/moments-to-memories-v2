import PageHeading from '@/components/headings/page-heading/PageHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './AccessibilityPage.module.scss'

function AccessibilityPage() {
    return (
      <SectionContainer className={styles.accessibilityPage}>
        <div className={styles.header}>
          <PageHeading>Accessibility Statement</PageHeading>
          <BodyText>
            At Moments to Memories, we are committed to making our website
            accessible to everyone, including individuals with disabilities. We
            continuously strive to enhance the usability of our site and ensure
            that all users have an equitable and seamless experience.
          </BodyText>
        </div>

        <div className={styles.bodyText}>
          <ParagraphHeading>1. Our Accessibility Commitment</ParagraphHeading>
          <BodyText>
            We aim to comply with applicable accessibility standards and follow
            the Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level.
            These guidelines help ensure that our content is perceivable,
            operable, understandable, and robust for all users, including those
            who rely on assistive technologies such as screen readers, voice
            recognition software, and other adaptive devices.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>2. Accessibility Features</ParagraphHeading>
          <BodyText>
            The following are some of the features that make our website more
            accessible:
            <br />
            <br />
            Alternative Text: All images on the site include alternative text
            descriptions to ensure users who use screen readers can access the
            content.
            <br />
            <br />
            Keyboard Navigation: Our site is designed to be navigable using a
            keyboard alone, for users who cannot use a mouse.
            <br />
            <br />
            Text Resizing: Visitors can adjust the text size within their
            browsers to improve readability without affecting the usability of
            the site.
            <br />
            <br />
            Color Contrast: We ensure sufficient contrast between foreground and
            background elements to make the content more readable for visually
            impaired users.
            <br />
            <br />
            Accessible Forms: All forms are designed with accessible labels and
            instructions, making it easy for assistive technologies to interpret
            them.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>3. Ongoing Efforts</ParagraphHeading>
          <BodyText>
            We continually seek opportunities to improve the accessibility of
            our website. This includes regularly auditing our site to identify
            potential accessibility issues and implementing solutions to ensure
            compliance with the latest accessibility standards.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>4. Feedback</ParagraphHeading>
          <BodyText>
            We welcome your feedback on the accessibility of Moments to
            Memories. If you encounter any barriers or have suggestions on how
            we can improve the accessibility of our website, please contact us
            at: admin@momentstomemories.com We will respond to your inquiry
            within a reasonable time frame and take appropriate actions to
            address any accessibility issues.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>5. Third-Party Content</ParagraphHeading>
          <BodyText>
            While we make every effort to ensure the accessibility of our
            website, some content, such as third-party plugins or embedded
            media, may not fully conform to accessibility standards. We do not
            control third-party platforms but encourage them to provide
            accessible content.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>6. Future Enhancements</ParagraphHeading>
          <BodyText>
            We are committed to continually improving our site's accessibility
            and ensuring it evolves alongside technological advancements. We are
            dedicated to maintaining a site that everyone can enjoy, regardless
            of their abilities.
          </BodyText>
        </div>
      </SectionContainer>
    )
}

export default AccessibilityPage