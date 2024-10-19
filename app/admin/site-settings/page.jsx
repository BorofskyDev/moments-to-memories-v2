import SectionHeading from "@/components/headings/section-heading/SectionHeading"
import HomePageGallery from "@/components/pages/admin/settings/home-page-gallery/HomePageGallery"
import Reviews from "@/components/pages/admin/settings/reviews/Reviews"
import styles from './SettingsPage.module.scss'
import GallerySettingsPage from "@/components/pages/admin/settings/gallery-settings-page/GallerySettingsPage"
import ServicesComponent from "@/components/pages/admin/settings/services/ServiceComponent"
import ResetPassword from "@/components/password-reset/PasswordReset"

function SettingsPage() {
  return (
    <div className={styles.settingsPage}>
      <SectionHeading>Site Settings</SectionHeading>
      <HomePageGallery />
      <Reviews />
      <GallerySettingsPage />
      <ServicesComponent />
      <ResetPassword />
    </div>
  )
}
export default SettingsPage