// libs/hooks/form/useClientForm.jsx

'use client'

import { useState, useEffect } from 'react'

const useClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    birthday: '',
    phone: '',
    relations: [],
    importantDates: [],
    photoshootDates: [],
    photoshootNotes: '',
    notes: '',
    marketingTags: [],
    type: '', // Ensure 'type' is initialized
  })

  const [relationInput, setRelationInput] = useState({
    name: '',
    relationshipType: '',
    age: '',
  })

  const [importantDateInput, setImportantDateInput] = useState({
    month: '',
    day: '',
    reason: '',
    tag: '',
  })

  const [photoshootDateInput, setPhotoshootDateInput] = useState('')
  const [marketingTagInput, setMarketingTagInput] = useState('')

  // Handle basic input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle type toggle change
  const handleTypeChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, type: value }))
  }

  // Handle birthday change and auto-update age
  const handleBirthdayChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, birthday: value }))

    if (value) {
      const today = new Date()
      const birthDate = new Date(value)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      setFormData((prev) => ({ ...prev, age: age.toString() })) // Store age as string
    } else {
      setFormData((prev) => ({ ...prev, age: '' }))
    }
  }

  // Handle adding a relation
  const handleAddRelation = () => {
    if (relationInput.name.trim() === '') return
    setFormData((prev) => ({
      ...prev,
      relations: [...prev.relations, relationInput],
    }))
    setRelationInput({ name: '', relationshipType: '', age: '' })
  }

  // Handle removing a relation
  const handleRemoveRelation = (index) => {
    setFormData((prev) => ({
      ...prev,
      relations: prev.relations.filter((_, i) => i !== index),
    }))
  }

  // Handle adding an important date
  const handleAddImportantDate = () => {
    const { month, day, reason, tag } = importantDateInput
    if (month === '' || day === '') return
    setFormData((prev) => ({
      ...prev,
      importantDates: [...prev.importantDates, { month, day, reason, tag }],
    }))
    setImportantDateInput({ month: '', day: '', reason: '', tag: '' })
  }

  // Handle removing an important date
  const handleRemoveImportantDate = (index) => {
    setFormData((prev) => ({
      ...prev,
      importantDates: prev.importantDates.filter((_, i) => i !== index),
    }))
  }

  // Handle adding a photoshoot date
  const handleAddPhotoshootDate = () => {
    if (photoshootDateInput.trim() === '') return
    setFormData((prev) => ({
      ...prev,
      photoshootDates: [...prev.photoshootDates, photoshootDateInput],
    }))
    setPhotoshootDateInput('')
  }

  // Handle removing a photoshoot date
  const handleRemovePhotoshootDate = (index) => {
    setFormData((prev) => ({
      ...prev,
      photoshootDates: prev.photoshootDates.filter((_, i) => i !== index),
    }))
  }

  // Handle adding a marketing tag
  const handleAddMarketingTag = () => {
    if (marketingTagInput.trim() === '') return
    setFormData((prev) => ({
      ...prev,
      marketingTags: [...prev.marketingTags, marketingTagInput],
    }))
    setMarketingTagInput('')
  }

  // Handle removing a marketing tag
  const handleRemoveMarketingTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      marketingTags: prev.marketingTags.filter((_, i) => i !== index),
    }))
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      email: '',
      birthday: '',
      phone: '',
      relations: [],
      importantDates: [],
      photoshootDates: [],
      photoshootNotes: '',
      notes: '',
      marketingTags: [],
      type: '',
    })
    setRelationInput({ name: '', relationshipType: '', age: '' })
    setImportantDateInput({ month: '', day: '', reason: '', tag: '' })
    setPhotoshootDateInput('')
    setMarketingTagInput('')
  }

  return {
    formData,
    setFormData,
    handleChange,
    handleBirthdayChange,
    relationInput,
    setRelationInput,
    handleAddRelation,
    handleRemoveRelation,
    importantDateInput,
    setImportantDateInput,
    handleAddImportantDate,
    handleRemoveImportantDate,
    photoshootDateInput,
    setPhotoshootDateInput,
    handleAddPhotoshootDate,
    handleRemovePhotoshootDate,
    marketingTagInput,
    setMarketingTagInput,
    handleAddMarketingTag,
    handleRemoveMarketingTag,
    handleTypeChange,
    resetForm,
  }
}

export default useClientForm
