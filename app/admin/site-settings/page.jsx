import SectionHeading from "@/components/headings/section-heading/SectionHeading"
import Reviews from "@/components/pages/admin/settings/reviews/Reviews"

function SettingsPage() {
  return (
    <div>
      <SectionHeading>Site Settings</SectionHeading>
      <Reviews />
    </div>
  )
}
export default SettingsPage