// components/galleries/GalleryComponent.jsx

'use client'

import React from 'react'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import styles from './GalleryComponent.module.scss'
import CarouselGallery from '@/components/galleries/carousel-gallery/CarouselGallery'
import useUserGalleries from '@/libs/hooks/gallery/useUserGalleries'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import MediumBodyText from '@/components/layout/body-text/medium-body-text/MediumBodyText'

const GalleryComponent = () => {
  const { galleries, loading, error } = useUserGalleries()

  if (loading) {
    return <p>Loading galleries...</p>
  }

  if (error) {
    return <BodyText className={styles.error}>{error}</BodyText>
  }

  if (galleries.length === 0) {
    return <BodyText>No galleries available.</BodyText>
  }

  return (
    <div className={styles.galleryContainer}>
      {galleries.map((gallery) => (
        <div key={gallery.id} className={styles.gallerySection}>
          <SectionHeading>{gallery.title}</SectionHeading>
          <MediumBodyText>{gallery.description}</MediumBodyText>
          <CarouselGallery images={gallery.images} />
        </div>
      ))}
    </div>
  )
}

export default GalleryComponent
