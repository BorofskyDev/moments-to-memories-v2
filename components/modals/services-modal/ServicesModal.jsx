// components/modals/services-modal/ServicesModal.jsx

'use client'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './ServicesModal.module.scss'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import BodyText from '@/components/layout/body-text/BodyText'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'

const ServicesModal = ({ service, onSubmit, onClose }) => {
  const [title, setTitle] = useState(service ? service.title : '')
  const [imageFile, setImageFile] = useState(null)
  const [imageAlt, setImageAlt] = useState(service ? service.imageAlt : '')
  const [description, setDescription] = useState(
    service ? service.description : ''
  )
  const [features, setFeatures] = useState(service ? service.features : [])
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(
    service ? service.imageSrc : null
  )

  // Initialize features with at least one feature
  useEffect(() => {
    if (features.length === 0) {
      setFeatures([{ id: uuidv4(), title: '', description: '' }])
    }
  }, [features])

  // Handle adding a new feature
  const addFeature = () => {
    setFeatures([...features, { id: uuidv4(), title: '', description: '' }])
  }

  // Handle removing a feature
  const removeFeature = (id) => {
    setFeatures(features.filter((feature) => feature.id !== id))
  }

  // Handle feature field changes
  const handleFeatureChange = (id, field, value) => {
    setFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, [field]: value } : feature
      )
    )
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    if (!imageAlt.trim()) {
      setError('Image Alt Text is required.')
      return
    }
    if (!description.trim()) {
      setError('Description is required.')
      return
    }
    for (let feature of features) {
      if (!feature.title.trim() || !feature.description.trim()) {
        setError('All feature titles and descriptions are required.')
        return
      }
    }

    // Prepare service data
    const serviceData = {
      title,
      imageAlt,
      description,
      features: features.map(({ title, description }) => ({
        title,
        description,
      })),
    }

    try {
      await onSubmit(serviceData, imageFile)
    } catch (err) {
      setError('An error occurred while saving the service.')
    }
  }

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      // Generate a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={styles.servicesModal}>
      <ParagraphHeading>
        {service ? 'Edit Service' : 'Add New Service'}
      </ParagraphHeading>
      {error && <BodyText className={styles.error}>{error}</BodyText>}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Title */}
        <div className={styles.formGroup}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div className={styles.formGroup}>
          <label htmlFor='image'>Service Image</label>
          <input
            type='file'
            id='image'
            accept='image/*'
            onChange={handleImageChange}
            // Required only when adding a new service
            required={!service}
          />
          {service && !imageFile && imagePreview && (
            <div className={styles.imagePreview}>
              <BodyText>
                Current Image will be retained unless a new one is uploaded.
              </BodyText>
              <Image
                src={imagePreview}
                alt={imageAlt}
                width={400}
                height={300}
              />
            </div>
          )}
          {imageFile && imagePreview && (
            <div className={styles.imagePreview}>
              <BodyText>Selected Image Preview:</BodyText>
              <Image
                src={imagePreview}
                alt='Selected Image'
                width={400}
                height={300}
              />
            </div>
          )}
        </div>

        {/* Image Alt Text */}
        <div className={styles.formGroup}>
          <label htmlFor='imageAlt'>Image Alt Text</label>
          <input
            type='text'
            id='imageAlt'
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Features */}
        <div className={styles.formGroup}>
          <label>Features</label>
          {features.map((feature, index) => (
            <div key={feature.id} className={styles.featureItem}>
              <input
                type='text'
                placeholder='Feature Title'
                value={feature.title}
                onChange={(e) =>
                  handleFeatureChange(feature.id, 'title', e.target.value)
                }
                required
              />
              <textarea
                placeholder='Feature Description'
                value={feature.description}
                onChange={(e) =>
                  handleFeatureChange(feature.id, 'description', e.target.value)
                }
                required
              />
              {features.length > 1 && (
                <button
                  type='button'
                  onClick={() => removeFeature(feature.id)}
                  className={styles.removeFeatureButton}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type='button'
            onClick={addFeature}
            className={styles.addFeatureButton}
          >
            Add Feature
          </button>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button type='submit' className={styles.saveButton}>
            {service ? 'Update Service' : 'Add Service'}
          </button>
          <button
            type='button'
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

ServicesModal.propTypes = {
  service: PropTypes.object, // null for adding new service
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ServicesModal
