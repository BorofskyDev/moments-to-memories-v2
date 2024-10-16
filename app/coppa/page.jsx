import PageHeading from '@/components/headings/page-heading/PageHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './CoppaPage.module.scss'

function CoppaPage() {
    return (
      <SectionContainer className={styles.coppaPage}>
        <div className={styles.header}>
          <PageHeading>Coppa compliance</PageHeading>
          <BodyText>
            Moments to Memories is committed to protecting the privacy of
            children who use our website. We comply with the Children&apos;s Online
            Privacy Protection Act (COPPA) and its regulations, which are
            designed to protect the personal information of children under 13
            years old.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>
            1. Information Collection from Children
          </ParagraphHeading>
          <BodyText>
            We do not knowingly collect, use, or disclose personal information
            from children under the age of 13. If we become aware that we have
            inadvertently collected personal information from a child under 13
            without verifiable parental consent, we will take immediate steps to
            delete such information from our records.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>2. Parental Consent</ParagraphHeading>
          <BodyText>
            In the event that we wish to collect personal information from a
            child under 13, we will first obtain verifiable parental consent.
            Parents will be informed of the type of information being collected,
            how it will be used, and the measures we will take to protect their
            child&apos;s privacy.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>3. Rights of Parents</ParagraphHeading>
          <BodyText>
            Parents or legal guardians have the following rights regarding their
            child&apos;s personal information:
            <br />
            <br />
            Review Information: Parents can review the personal information we
            have collected about their child.
            <br />
            <br />
            Request Deletion: Parents can request the deletion of their child&apos;s
            personal information from our records.
            <br />
            <br />
            Withdraw Consent: Parents may withdraw consent at any time,
            preventing any further collection or use of their child&apos;s personal
            information.
            <br />
            <br />
            If you are a parent and wish to exercise any of these rights, please
            contact us at admin@momentstomemories.com.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>
            4. Cookies and Tracking Technologies
          </ParagraphHeading>
          <BodyText>
            We do not knowingly use cookies or tracking technologies to collect
            information from children under 13. We use Google Analytics to track
            user activity, but this tracking does not target children under 13.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>5. Third-Party Services</ParagraphHeading>
          <BodyText>
            We take steps to ensure that any third-party service providers we
            use comply with COPPA requirements. We do not permit third-party
            advertising or data collection from children under 13 on our site.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>6. Changes to this Policy</ParagraphHeading>
          <BodyText>
            We may update this COPPA Compliance Statement from time to time to
            reflect changes in our practices. Any updates will be posted on this
            page, and the revised policy will indicate the date of the latest
            revision.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>7. Contact Information</ParagraphHeading>
          <BodyText>
            If you have any questions or concerns about our COPPA compliance or
            the handling of children&apos;s personal information, please contact us
            at: 
            <br />
            Email: admin@momentstomemories.com
          </BodyText>
        </div>
      </SectionContainer>
    )
}

export default CoppaPage