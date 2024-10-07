import SectionHeading from "@/components/headings/section-heading/SectionHeading"
import HomePageGallery from "@/components/pages/admin/settings/home-page-gallery/HomePageGallery"
import Reviews from "@/components/pages/admin/settings/reviews/Reviews"

function SettingsPage() {
  return (
    <div>
      <SectionHeading>Site Settings</SectionHeading>
      <Reviews />
      <HomePageGallery />
    </div>
  )
}
export default SettingsPage