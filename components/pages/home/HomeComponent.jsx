import AboutSection from './about-section/AboutSection';
import HeroSection from './hero-section/HeroSection';
import styles from './HomeComponent.module.scss';
import ServicesSection from './services/ServicesSection';

function HomeComponent() {
  return (
    <div className={styles.homeComponent}>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
    </div>
  )
}
export default HomeComponent