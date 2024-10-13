import SectionContainer from '../containers/section-container/SectionContainer'
import styles from './UnderConstruction.module.scss'
import Subheading from '@/components/headings/subheading/Subheading'
import BodyText from '../body-text/BodyText'
import PageHeading from '@/components/headings/page-heading/PageHeading'

const UnderConstruction = () => {
  return (
    <SectionContainer className={styles.underConstruction}>
      <PageHeading>This moment will have to wait</PageHeading>
      <Subheading>This page is currently under construction</Subheading>
      <BodyText>
        Some moments are best when waited for. I wish I had a timeframe for when
        this feature will be available, but at the moment I do not. Know,
        however, that it is being worked on as you read this.{' '}
      </BodyText>
    </SectionContainer>
  )
}

export default UnderConstruction
