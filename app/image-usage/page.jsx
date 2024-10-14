import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './ImageUsePage.module.scss'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import BodyText from '@/components/layout/body-text/BodyText'

function ImageUsePage() {
    return (
      <SectionContainer className={styles.imageUsePage}>
        <div className={styles.header}>
          <PageHeading>Image use policy</PageHeading>
          <BodyText>
            At Moments to Memories, we take the privacy and rights of
            individuals depicted in our images seriously. This policy explains
            how we use images on our website and the guidelines for protecting
            the images from unauthorized use. By accessing and using our
            website, you agree to comply with this Image Use Policy.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>1. Permission and Consent</ParagraphHeading>
          <BodyText>
            All images featured on Moments to Memories have been used with
            explicit permission from the individuals depicted or their legal
            guardians. Prior to displaying any image, we obtain signed public
            disclosure forms allowing the images to be used for marketing,
            promotional purposes, and inclusion on our website.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>2. Copyright Protection</ParagraphHeading>
          <BodyText>
            All images on this site are the exclusive property of Moments to
            Memories or the individuals depicted, and they are protected by
            copyright law. Unauthorized use, reproduction, distribution, or
            modification of these images is strictly prohibited.
            <br />
            <br />
            You may not:
            <br />
            <br />
            Download, copy, or distribute any images without prior written
            consent from Moments to Memories.
            <br />
            <br />
            Use any images from our site for commercial purposes or personal
            projects without permission.
            <br />
            <br />
            Remove any watermark or copyright notice embedded in the images.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>3. How Images May Be Used</ParagraphHeading>
          <BodyText>
            With written permission, images from Moments to Memories may be used
            for:
            <br />
            <br />
            Personal viewing and reference.
            <br />
            <br />
            Educational purposes, provided proper attribution is given.
            <br />
            <br />
            To request permission for image use, please contact us at
            admin@momentstomemories.com. Any authorized use will require proper
            attribution to Moments to Memories and may be subject to specific
            terms outlined in a separate agreement.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>4. Reporting Unauthorized Use</ParagraphHeading>
          <BodyText>
            If you believe that any images from Moments to Memories have been
            used without permission or in violation of copyright law, please
            contact us immediately at admin@momentstomemories.com. We take
            copyright infringement seriously and will take appropriate action,
            including legal recourse, to protect our content.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>
            5. Consequences of Unauthorized Use
          </ParagraphHeading>
          <BodyText>
            Any unauthorized use of images from Moments to Memories will be
            considered copyright infringement and may result in legal action.
            This includes, but is not limited to:
            <br />
            <br />
            Removal of the unauthorized content from the infringing party’s
            platform.
            <br />
            <br />
            Compensation for damages resulting from the unauthorized use.
            <br />
            <br />
            Pursuit of legal action to enforce our copyright rights.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>
            6. Changes to This Image Use Policy
          </ParagraphHeading>
          <BodyText>
            We may update this policy from time to time to reflect changes in
            how we handle image use and protection. Any changes will be posted
            on this page, and the updated policy will indicate the date of the
            latest revision.
          </BodyText>
        </div>
        <div className={styles.bodyText}>
          <ParagraphHeading>7. Contact Information</ParagraphHeading>
          <BodyText>
            If you have any questions or requests regarding the use of images on
            our site, please contact us at admin@momentstomemories.com.
          </BodyText>
        </div>
      </SectionContainer>
    )
}

export default ImageUsePage