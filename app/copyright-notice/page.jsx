import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './CopyrightNoticePage.module.scss'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import BodyText from '@/components/layout/body-text/BodyText'

function CopyrightNoticePage() {
    return (
      <SectionContainer className={styles.copyrightNoticePage}>
        <div className={styles.header}>
          <PageHeading>Copyright Notice</PageHeading>
          <BodyText>
            All content on this website, including but not limited to images,
            text, graphics, logos, and videos, is the exclusive property of
            Moments to Memories or its content creators and is protected by
            international copyright laws. 
            <br />
            <br />
            Images: All images displayed on this
            site have been used with the express permission of the individuals
            depicted or their legal guardians. Unauthorized use, reproduction,
            or distribution of any images from Moments to Memories is strictly
            prohibited and may result in legal action.
            <br />
            <br />
             Text and Media: The text,
            articles, blog posts, and media displayed on this website are the
            intellectual property of Moments to Memories. They may not be
            copied, modified, or distributed without prior written consent. 
            <br />
            <br />
            Logo
            and Branding: The logo and branding elements used on this site are
            trademarks of Moments to Memories and may not be used without
            permission. 
            <br />
            <br />
            For permissions or inquiries regarding the use of any
            content on this site, please contact us at: 
            <br />
            Email:
            admin@momentstomemories.com 
            <br />
            <br />
            Any unauthorized use of the content on
            this website may result in legal consequences.
          </BodyText>
        </div>
      </SectionContainer>
    )
}

export default CopyrightNoticePage