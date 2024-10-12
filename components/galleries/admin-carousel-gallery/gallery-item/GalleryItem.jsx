import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import AddButton from '@/components/buttons/add-button/AddButton'
import DeleteButton from '@/components/buttons/delete-button/DeleteButton'
import CarouselGallery from '../../carousel-gallery/CarouselGallery'
import styles from './GalleryItem.module.scss'

const GalleryItem = ({ id, title, description, images, onClick, btnText}) => {
  return (
    <div key={id} className={styles.galleryItem}>
      <ParagraphHeading>{title}</ParagraphHeading>
      <BodyText>{description}</BodyText>
      <AddButton
        onClick={() => handleOpenUploadModal(gallery)}
        text='Add Image'
      />
      <DeleteButton
        onClick={onClick}
        text={btnText}
      />
      {/* Display images using CarouselGallery */}
      {images.length > 0 ? (
        <CarouselGallery images={images} />
      ) : (
        <p>No images in this gallery.</p>
      )}
    </div>
  )
}
export default GalleryItem