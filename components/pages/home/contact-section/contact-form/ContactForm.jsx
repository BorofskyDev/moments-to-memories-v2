// components/pages/home/contact-section/contact-form/ContactForm.jsx

'use client'

import React from 'react'
import useContactForm from '@/libs/hooks/contact-form/useContactForm'
import styles from './ContactForm.module.scss'
import BodyText from '@/components/layout/body-text/BodyText'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import InputField from '@/components/layout/input-field/InputField' // Import the InputField component
import SubmitButton from '@/components/buttons/submit-button/SubmitButton'

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
      {success && (
        <BodyText className={styles.successMessage}>
          Your message has been sent successfully!
        </BodyText>
      )}

      {submitError && (
        <BodyText className={styles.submitError}>{submitError}</BodyText>
      )}

      {/* Name Field */}
      <InputField
        label='Name'
        name='name'
        value={formData.name}
        onChange={handleChange}
        required
        error={errors.name}
      />

      {/* Email Field */}
      <InputField
        label='Email'
        name='email'
        type='email'
        value={formData.email}
        onChange={handleChange}
        required
        error={errors.email}
      />

      {/* Phone Number Field */}
      <InputField
        label='Phone Number'
        name='phone'
        type='tel'
        value={formData.phone}
        onChange={handleChange}
        required
        error={errors.phone}
        // Uncomment the following lines if using react-input-mask
        // as="input"
        // inputComponent={InputMask}
        // mask="999-999-9999"
        // maskChar=""
      />

      {/* Subject Field */}
      <InputField
        label='Subject'
        name='subject'
        type='text'
        value={formData.subject}
        onChange={handleChange}
        required
        error={errors.subject}
        maxLength={100}
      />

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
      <InputField
        label='Message'
        name='message'
        as='textarea'
        value={formData.message}
        onChange={handleChange}
        required
        error={errors.message}
        maxLength={500}
      />

      {/* Submit Button */}
      <SubmitButton
        type='submit'
        className={styles.submitButton}
        disabled={loading}
        text={loading ? 'Submitting...' : 'Submit Message'}
      />
    </form>
  )
}

export default ContactForm
