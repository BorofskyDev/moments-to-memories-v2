import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './Dmca.module.scss'
import BodyText from '@/components/layout/body-text/BodyText'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import PageHeading from '@/components/headings/page-heading/PageHeading'

function DmcaPolicyPage() {
    return (
      <SectionContainer className={styles.dmcaPolicypage}>
        <div className={styles.header}>
          <PageHeading>DMCA Policy</PageHeading>
          <BodyText>
            Moments to Memories respects the intellectual property rights of
            others and expects our users to do the same. In accordance with the
            Digital Millennium Copyright Act (DMCA), we will promptly respond to
            claims of copyright infringement on this site. If you believe that
            any content on our website infringes upon your copyright, please
            notify us as outlined below.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>1. Filing a DMCA Takedown Notice</ParagraphHeading>
          <BodyText>
            If you are a copyright owner (or authorized to act on behalf of one)
            and believe that any material on Moments to Memories infringes your
            copyright, you may submit a written DMCA notice to our designated
            agent. Your notice must include the following information:
            <br />
            <br />
            Identification of the copyrighted work: A description of the
            copyrighted work that you claim has been infringed.
            <br />
            <br />
            Identification of the infringing material: A description of where
            the allegedly infringing material is located on our website (please
            provide a URL or other specific location).
            <br />
            <br />
            Contact information: Your name, address, telephone number, and email
            address.
            <br />
            <br />
            Statement of good faith belief: A statement that you have a good
            faith belief that the use of the material in the manner complained
            of is not authorized by the copyright owner, its agent, or the law.
            <br />
            <br />
            Statement of accuracy: A statement that the information in the
            notice is accurate, and under penalty of perjury, that you are the
            copyright owner or authorized to act on the copyright owner’s
            behalf.
            <br />
            <br />
            Signature: A physical or electronic signature of the copyright owner
            or a person authorized to act on their behalf.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>2. DMCA Counter-Notification</ParagraphHeading>
          <BodyText>
            If you believe that the material that was removed or disabled is not
            infringing or that you have the right to use the material, you may
            file a counter-notification. Your counter-notification must include
            the following information:
            <br />
            <br />
            Identification of the material: A description of the material that
            has been removed or disabled, including the URL or location where
            the material appeared before it was removed.
            <br />
            <br />
            Statement of good faith belief: A statement under penalty of perjury
            that you have a good faith belief that the material was removed or
            disabled as a result of a mistake or misidentification.
            <br />
            <br />
            Contact information: Your name, address, telephone number, and email
            address.
            <br />
            <br />
            Statement of consent: A statement that you consent to the
            jurisdiction of the federal court in your judicial district or, if
            you are outside the United States, to the jurisdiction of any
            judicial district in which Moments to Memories may be found, and
            that you will accept service of process from the person who filed
            the DMCA notice or their agent.
            <br />
            <br />
            Signature: A physical or electronic signature of the person making
            the counter-notification.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>3. Repeat Infringers</ParagraphHeading>
          <BodyText>
            Moments to Memories reserves the right to terminate the accounts or
            restrict access to our website for users who are found to be repeat
            infringers of copyright.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>4. Modifications</ParagraphHeading>
          <BodyText>
            We reserve the right to modify this DMCA policy at any time. Changes
            will be posted on this page, and the updated policy will indicate
            the date of the latest revision.
          </BodyText>
        </div>
      </SectionContainer>
    )
}

export default DmcaPolicyPage