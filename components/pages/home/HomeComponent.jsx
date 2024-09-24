import HeroSection from './hero-section/HeroSection';
import styles from './HomeComponent.module.scss';

function HomeComponent() {
  return (
    <div className={styles.homeComponent}>
      <HeroSection />
    </div>
  )
}
export default HomeComponent