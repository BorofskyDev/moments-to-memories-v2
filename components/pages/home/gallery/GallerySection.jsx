import CarouselGallery from '@/components/galleries/carousel-gallery/CarouselGallery'
import GridGallery from '@/components/galleries/grid-gallery/GridGallery'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'
import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import ThreeDSlider from '@/components/three/ThreeDSlider'
import styles from './GallerySection.module.scss'

function GallerySection() {
  return (
    <SectionContainer>
      <div className={styles.gallerySection}>
        <div className={styles.gallerySection__title}>
          <SectionHeading>A Gallery of moments</SectionHeading>
          <SectionSubtitle>
            Where Every Frame Tells Your Unique Story
          </SectionSubtitle>
        </div>
        <GridGallery />
      </div>
    </SectionContainer>
  )
}
export default GallerySection
