import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'
import ServiceItem from './service-item/ServiceItem'
import image1 from '@/public/profile-photos/baby1.png'
import image2 from '@/public/profile-photos/jets1.png'
import image3 from '@/public/profile-photos/model1.png'
import styles from './ServicesSection.module.scss'

function ServicesSection() {
  return (
    <SectionContainer className={styles.servicesSection}>
      <div className={styles.servicesSection__heading}>
      <SectionHeading>
        It&apos;s your story - how will it be written?
      </SectionHeading>
      <SectionSubtitle>Services For Every Occasion</SectionSubtitle>

      </div>
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
          description='Bring poise and creativity to your spaces. Whether it&apos;s for a home, office, or a gallery, these aret pieces are shot to inspire and elevate.'
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
        <ServiceItem
          title='Artistic'
          imageSrc={image3}
          imageAlt='woman in sunglasses and a bikini laying on a pool chair'
          description='Push the boundaries of creativity with sessions that are as unique as your imagination. Perfect for models and those looking for themed, avant-garde shoots.'
          features={[
            {
              title: 'Models',
              description:
                'High-fashion, editorial-style photography that turns every pose into a statement.',
            },
            {
              title: 'Themed Shots',
              description:
                "Dive into a world of creativity, with customized themes that reflect your vision and personality.",
            },
          ]}
        />
      </div>
    </SectionContainer>
  )
}

export default ServicesSection
