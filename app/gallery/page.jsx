import PageHeading from "@/components/headings/page-heading/PageHeading";
import GalleryComponent from "@/components/pages/gallery/GalleryComponent";
import styles from './GalleryPage.module.scss'


function GalleryPage() {
  return (
    <div className={styles.galleryPage}>
        <PageHeading>a Gallery of Moments</PageHeading>
        <GalleryComponent />
    </div>
  )
}
export default GalleryPage