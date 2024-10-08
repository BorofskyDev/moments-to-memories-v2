import Subheading from '@/components/headings/subheading/Subheading'
import BodyText from '@/components/layout/body-text/BodyText'
import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import CtaButton from '@/components/links/cta-button/CtaButton'
import InternalPageLink from '@/components/links/internal-page-link/InternalPageLink'
import styles from './AboutPage.module.scss'

const {
  default: PageHeading,
} = require('@/components/headings/page-heading/PageHeading')

function AboutPage() {
  return (
    <SectionContainer className={styles.aboutPage}>
      <PageHeading>the story behind the lens</PageHeading>
      <Subheading>Where art meets memory</Subheading>
      <BodyText>
        What are our lives if not a composition of moments? The moments that we
        reflect on to find the smile that we need because in that current moment
        it has escaped us. Our lives are composed of the memories we reflect to
        when we need the warm blanket of nostalgia to guard us from modern
        burdens - that is what drew me to photography.
      </BodyText>
      <BodyText>
        After years on the other side of the camera as a model, I began to
        wonder what it would be like to capture the world from the
        photographer’s perspective. Curiosity sparked my journey, and my journey
        sparked my joy. Over the years that joy has fueled me to learn how to
        take my experience and help my clients - my collaborators , really - to
        release their personality in every photo. Through practice, passion, and
        a dedication to perfecting my craft, I’ve learned to see beyond the lens
        and into the heart of every moment
      </BodyText>

      <BodyText>
        At Moments to Memories, I focus on more than just posed shots. While I
        love portraits, I find magic in action - catching the eye of a subtle
        glance, capturing the laughter of a mom and dad as their child
        misbehaves, or the quiet strength in a confident stare. Every session is
        a person collaboration, and I aim to capture the essence of the
        individual in every frame. With each click, I’m not just photographing
        an image; I’m revealing a story.
      </BodyText>

      <BodyText>
        I’ve worked with a variety of clients, from individuals seeking
        portraits to businesses in need of custom photography for their brand.
        I’ve even found a fun niche with our four-legged friends and their human
        friends. Most recently, I’ve partnered with{' '}
        <InternalPageLink href='https://joelborofsky.com'>
          JBSky Dev
        </InternalPageLink>
        to provide bespoke photography for his clients - whether it’s showcasing
        products for an online store or creating compelling images for a
        marketing campaign. Each project is an opportunity for me to create
        something unique and meaningful, and it’s this process that fuels my
        creativity.
      </BodyText>

      <BodyText>
        My goal is to make every photo feel personal, timeless, and full of
        life. I take pride in drawing out the personalities of my clients,
        capturing the real, authentic moments that define who they are.
      </BodyText>
      <BodyText>
        Let me help tell your story. Whether you’re looking for the perfect
        portrait, capturing a milestone, or need professional shots for your
        business, I’m here to turn your moments into memories that last. Explore
        my gallery or book a session today, and let’s create something
        unforgettable together.
      </BodyText>
      <CtaButton href='/#contact'>Book a Session</CtaButton>
    </SectionContainer>
  )
}

export default AboutPage
