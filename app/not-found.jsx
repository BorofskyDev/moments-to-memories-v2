import PageHeading from "@/components/headings/page-heading/PageHeading";
import Subheading from "@/components/headings/subheading/Subheading";
import BodyText from "@/components/layout/body-text/BodyText";
import InternalPageLink from "@/components/links/internal-page-link/InternalPageLink";
import styles from './not-found.module.scss'


const { default: SectionContainer } = require("@/components/layout/containers/section-container/SectionContainer");

function NotFound() {
  return (
    <SectionContainer>
      <PageHeading>looks like this moment wasn&apos;t meant to be</PageHeading>
      <Subheading className={styles.notFound}>
        It is a 404, but don&apos;t worry, we&apos;ll help you find your way
      </Subheading>
      <BodyText>
        It seems the page you&apos;re looking for is no longer here - or maybe it
        never was. But just like capturing the perfect photo, sometimes the best
        moments come from the unexpected. Let&apos;s get you back on track. Explore
        my gallery to see timeless works of art, or head to the <InternalPageLink href='/'>home page</InternalPageLink> to
        start a new journey.{' '}
      </BodyText>
    </SectionContainer>
  )
}
export default NotFound
