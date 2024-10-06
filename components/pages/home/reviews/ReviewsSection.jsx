'use client'

import React, { useState, useEffect } from 'react'
import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import styles from './ReviewsSection.module.scss'
import { db } from '@/libs/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import Image from 'next/image'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import MediumBodyText from '@/components/layout/body-text/medium-body-text/MediumBodyText'
import BodyText from '@/components/layout/body-text/BodyText'
import NextPrevSvg from '@/components/layout/svgs/next-prev-svg/NextPrevSvg' // Import the NextPrevSvg component
import { motion, AnimatePresence } from 'framer-motion' // Import Framer Motion components

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([])
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 1 for next, -1 for previous
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      setError(null)
      try {
        const reviewsCol = collection(db, 'siteReviews')
        const reviewsQuery = query(reviewsCol, orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(reviewsQuery)
        const reviewsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setReviews(reviewsData)
      } catch (err) {
        console.error('Error fetching reviews:', err)
        setError('Failed to load reviews.')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const handlePrev = () => {
    if (currentReviewIndex > 0) {
      setDirection(-1)
      setCurrentReviewIndex(currentReviewIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentReviewIndex < reviews.length - 1) {
      setDirection(1)
      setCurrentReviewIndex(currentReviewIndex + 1)
    }
  }

  // Define animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  if (loading) {
    return (
      <SectionContainer>
        <p>Loading reviews...</p>
      </SectionContainer>
    )
  }

  if (error) {
    return (
      <SectionContainer>
        <p>{error}</p>
      </SectionContainer>
    )
  }

  if (reviews.length === 0) {
    return (
      <SectionContainer>
        <BodyText>No reviews available at the moment.</BodyText>
      </SectionContainer>
    )
  }

  const currentReview = reviews[currentReviewIndex]

  return (
    <SectionContainer className={styles.reviewsSection}>
      <SectionHeading>Reviews from my collaborators</SectionHeading>

      <div className={styles.navigationContainer}>
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className={`${styles.navButton} ${
            currentReviewIndex === 0 ? styles.disabled : ''
          }`}
          disabled={currentReviewIndex === 0}
          aria-label='Previous Review'
        >
          <NextPrevSvg className={styles.navButton__prev} />
        </button>

        {/* Animated Review Card Container */}
        <div className={styles.reviewCardContainer}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentReview.id}
              className={styles.reviewCard}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
            >
              <Image
                src={currentReview.imageUrl}
                alt={currentReview.title}
                className={styles.reviewCard__reviewImage}
                height={1200}
                width={1900}
              />
              <ParagraphHeading className={styles.reviewCard__reviewTitle}>
               
                  {currentReview.title}
                
              </ParagraphHeading>
              <BodyText className={styles.reviewCard__reviewText}>
                {currentReview.reviewText}
              </BodyText>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className={`${styles.navButton} ${
            currentReviewIndex === reviews.length - 1 ? styles.disabled : ''
          }`}
          disabled={currentReviewIndex === reviews.length - 1}
          aria-label='Next Review'
        >
          <NextPrevSvg />
        </button>
      </div>

      <MediumBodyText className={styles.sectionDescription}>
        Creating beautiful memories is a partnership. At Moments to Memories,
        every session is a shared journey, capturing the essence of our work
        together. These stories from my collaborators reflect the art, emotion,
        and timeless moments we’ve brought to life.
      </MediumBodyText>
    </SectionContainer>
  )
}

export default ReviewsSection
