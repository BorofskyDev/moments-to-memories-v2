import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'
import ServiceItem from './service-item/ServiceItem'
import image1 from '@/public/profile-photos/baby1.png'
import image2 from '@/public/profile-photos/jets1.png'
import styles from './ServicesSection.module.scss'

function ServicesSection() {
  return (
    <SectionContainer className={styles.servicesSection}>
      <SectionHeading>
        It&apros;s your story - how will it be written?
      </SectionHeading>
      <SectionSubtitle>Services For Every Occasion</SectionSubtitle>
      <div className={styles.servicesList}>
        <ServiceItem
          title='People'
          imageSrc={image1}
          imageAlt='Baby wrapped in a towell and a headbow asleep on a comfortable blanket'
          description='Capturing the essence of who you are, whether it&apros;s a personal portrait or the personality of a beloved pet. These sessions are designed to tell your unique story with grace and authenticity.'
          features={[
            {
              title: 'People',
              description:
                'From individual portraits to family gatherings, celebrate the moments that define you and your loved ones.',
            },
            {
              title: 'Pets',
              description:
                'Because our furry friends are family too. Capture their spirit and charm with a session that showcases their unique personality.',
            },
          ]}
        />
        <ServiceItem
          title='Commercial'
          imageSrc={image2}
          imageAlt='F-18 Blue Angel against the sky'
          description='Bring poise and creativity to your spaces. Whether it&apros;s for a home, office, or a gallery, these aret pieces are shot to inspire and elevate.'
          features={[
            {
              title: 'Art for Home',
              description:
                'Custom pieces that add a personal touch to your living space, turning everyday walls into galleries of elegance.',
            },
            {
              title: 'Art for Business',
              description:
                "Professional and artistic images that enhance your brand's environment, making a lasting impression on clients and employees.",
            },
          ]}
        />
      </div>
    </SectionContainer>
  )
}

export default ServicesSection
