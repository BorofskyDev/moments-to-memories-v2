// components/pages/clients/client-profile-component/ClientProfileComponent.jsx

'use client'

import PropTypes from 'prop-types'
import useClientProfile from '@/libs/hooks/client-profile/useClientProfile'
import usePublicGallery from '@/libs/hooks/client-profile/usePublicGallery'
import CarouselGallery from '@/components/galleries/carousel-gallery/CarouselGallery'
import styles from './ClientProfileComponent.module.scss'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import Subheading from '@/components/headings/subheading/Subheading'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'

const ClientProfileComponent = ({ clientId }) => {
  const {
    clientData,
    loading: clientLoading,
    error: clientError,
  } = useClientProfile({ id: clientId })

  const {
    galleries,
    loading: galleriesLoading,
    error: galleriesError,
  } = usePublicGallery(clientId) // Use usePublicGallery instead of useGallery

  if (clientLoading || galleriesLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (clientError) {
    return (
      <div className={styles.error}>
        Error fetching client data: {clientError.message}
      </div>
    )
  }

  if (galleriesError) {
    return (
      <div className={styles.error}>
        Error fetching galleries: {galleriesError}
      </div>
    )
  }

  if (!clientData) {
    return <div className={styles.notFound}>Client not found.</div>
  }

  return (
    <SectionContainer className={styles.clientProfile}>
      <PageHeading className={styles.clientName}>{clientData.name}</PageHeading>

      <div className={styles.galleriesSection}>
        <Subheading>Galleries</Subheading>
        {galleries.length === 0 ? (
          <p>No galleries available for this client.</p>
        ) : (
          galleries.map((gallery) => (
            <div key={gallery.id} className={styles.gallery}>
              <ParagraphHeading className={styles.galleryName}>
                {gallery.name}
              </ParagraphHeading>
              <CarouselGallery
                images={gallery.photos.map((photo) => photo.url)}
                canDelete={false} // Set to true if deletion is allowed
              />
            </div>
          ))
        )}
      </div>
    </SectionContainer>
  )
}

ClientProfileComponent.propTypes = {
  clientId: PropTypes.string.isRequired,
}

export default ClientProfileComponent
