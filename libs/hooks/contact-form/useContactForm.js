// libs/hooks/contact-form/useContactForm.js

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/libs/firebase'

const useContactForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    contactMethod: 'email', // Default value
    message: '',
  })

  // Error state
  const [errors, setErrors] = useState({})

  // Submission state
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Validate form data
  const validate = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.'
    }

    // Phone number validation (US formats)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    } else if (
      !/^(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/.test(formData.phone)
    ) {
      newErrors.phone =
        'Phone number is invalid. Expected format: 555-555-5555.'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.'
    } else if (formData.subject.length > 100) {
      newErrors.subject = 'Subject cannot exceed 100 characters.'
    }

    // Preferred contact method validation
    if (!formData.contactMethod) {
      newErrors.contactMethod = 'Preferred contact method is required.'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.'
    } else if (formData.message.length > 500) {
      newErrors.message = 'Message cannot exceed 500 characters.'
    }

    setErrors(newErrors)

    // Return true if no errors
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset success and error states
    setSuccess(false)
    setSubmitError('')

    // Validate form data
    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      // Reference to the "messages" collection
      const messagesCol = collection(db, 'messages')

      // Add a new document with form data and timestamp
      await addDoc(messagesCol, {
        ...formData,
        createdAt: serverTimestamp(),
      })

      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        contactMethod: 'email',
        message: '',
      })

      // Indicate success
      setSuccess(true)
    } catch (error) {
      console.error('Error submitting message:', error)
      setSubmitError('Failed to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    errors,
    loading,
    success,
    submitError,
    handleChange,
    handleSubmit,
  }
}

export default useContactForm
