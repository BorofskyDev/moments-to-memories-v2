import SectionHeading from "@/components/headings/section-heading/SectionHeading"
import HomePageGallery from "@/components/pages/admin/settings/home-page-gallery/HomePageGallery"
import Reviews from "@/components/pages/admin/settings/reviews/Reviews"
import styles from './SettingsPage.module.scss'


function SettingsPage() {
  return (
    <div className={styles.settingsPage}>
      <SectionHeading>Site Settings</SectionHeading>
      <HomePageGallery />
      <Reviews />
    </div>
  )
}
export default SettingsPage