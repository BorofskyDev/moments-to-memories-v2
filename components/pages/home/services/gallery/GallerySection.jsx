import CarouselGallery from "@/components/galleries/carousel-gallery/CarouselGallery"
import SectionHeading from "@/components/headings/section-heading/SectionHeading"
import SectionSubtitle from "@/components/headings/section-subtitle/SectionSubtitle"
import SectionContainer from "@/components/layout/containers/section-container/SectionContainer"
import ThreeDSlider from "@/components/three/ThreeDSlider"

function GallerySection() {
  return (
    <SectionContainer>
      <SectionHeading>A Gallery of moments</SectionHeading>
      <SectionSubtitle>Where Every Frame Tells Your Unique Story</SectionSubtitle>
        <CarouselGallery />
    </SectionContainer>
  )
}
export default GallerySection