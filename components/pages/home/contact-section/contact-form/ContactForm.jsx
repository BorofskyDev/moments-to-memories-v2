// components/pages/home/contact-section/contact-form/ContactForm.jsx

'use client'

import React from 'react'
import useContactForm from '@/libs/hooks/contact-form/useContactForm'
import styles from './ContactForm.module.scss'
import BodyText from '@/components/layout/body-text/BodyText'
import MediumBodyText from '@/components/layout/body-text/medium-body-text/MediumBodyText'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'

const ContactForm = () => {
  const {
    formData,
    errors,
    loading,
    success,
    submitError,
    handleChange,
    handleSubmit,
  } = useContactForm()

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <SectionHeading>Contact Us</SectionHeading>

      {success && (
        <BodyText className={styles.successMessage}>
          Your message has been sent successfully!
        </BodyText>
      )}

      {submitError && (
        <BodyText className={styles.submitError}>{submitError}</BodyText>
      )}

      {/* Name Field */}
      <div className={styles.formGroup}>
        <label htmlFor='name'>
          Name<span className={styles.required}>*</span>
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className={`${styles.inputField} ${
            errors.name ? styles.errorInput : ''
          }`}
          required
        />
        {errors.name && (
          <BodyText className={styles.errorText}>{errors.name}</BodyText>
        )}
      </div>

      {/* Email Field */}
      <div className={styles.formGroup}>
        <label htmlFor='email'>
          Email<span className={styles.required}>*</span>
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className={`${styles.inputField} ${
            errors.email ? styles.errorInput : ''
          }`}
          required
        />
        {errors.email && (
          <BodyText className={styles.errorText}>{errors.email}</BodyText>
        )}
      </div>

      {/* Phone Number Field */}
      <div className={styles.formGroup}>
        <label htmlFor='phone'>
          Phone Number<span className={styles.required}>*</span>
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          className={`${styles.inputField} ${
            errors.phone ? styles.errorInput : ''
          }`}
          required
        />
        {errors.phone && (
          <BodyText className={styles.errorText}>{errors.phone}</BodyText>
        )}
      </div>

      {/* Subject Field */}
      <div className={styles.formGroup}>
        <label htmlFor='subject'>
          Subject<span className={styles.required}>*</span>
        </label>
        <input
          type='text'
          id='subject'
          name='subject'
          value={formData.subject}
          onChange={handleChange}
          className={`${styles.inputField} ${
            errors.subject ? styles.errorInput : ''
          }`}
          maxLength={100}
          required
        />
        {errors.subject && (
          <BodyText className={styles.errorText}>{errors.subject}</BodyText>
        )}
      </div>

      {/* Preferred Contact Method Field */}
      <div className={styles.formGroup}>
        <label htmlFor='contactMethod'>
          Preferred Contact Method<span className={styles.required}>*</span>
        </label>
        <select
          id='contactMethod'
          name='contactMethod'
          value={formData.contactMethod}
          onChange={handleChange}
          className={`${styles.selectField} ${
            errors.contactMethod ? styles.errorInput : ''
          }`}
          required
        >
          <option value='email'>Email</option>
          <option value='text'>Text</option>
          <option value='phone call'>Phone Call</option>
        </select>
        {errors.contactMethod && (
          <BodyText className={styles.errorText}>
            {errors.contactMethod}
          </BodyText>
        )}
      </div>

      {/* Message Field */}
      <div className={styles.formGroup}>
        <label htmlFor='message'>
          Message<span className={styles.required}>*</span>
        </label>
        <textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          className={`${styles.textareaField} ${
            errors.message ? styles.errorInput : ''
          }`}
          maxLength={500}
          required
        ></textarea>
        {errors.message && (
          <BodyText className={styles.errorText}>{errors.message}</BodyText>
        )}
      </div>

      {/* Submit Button */}
      <button type='submit' className={styles.submitButton} disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

export default ContactForm
