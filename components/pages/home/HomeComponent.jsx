import AboutSection from './about-section/AboutSection';
import HeroSection from './hero-section/HeroSection';
import styles from './HomeComponent.module.scss';
import GallerySection from './gallery/GallerySection';
import ServicesSection from './services/ServicesSection';
import CTA from './cta/CTA';
import ReviewsSection from './reviews/ReviewsSection';

function HomeComponent() {
  return (
    <div className={styles.homeComponent}>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <CTA />
      <ReviewsSection />
    </div>
  )
}
export default HomeComponent