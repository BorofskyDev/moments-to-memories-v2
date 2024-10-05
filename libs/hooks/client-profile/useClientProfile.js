// libs/hooks/client-profile/useClientProfile.js

import { useState, useEffect } from 'react'
import { db } from '@/libs/firebase'
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'

const useClientProfile = (client) => {
  const [clientData, setClientData] = useState(null)
  const [editedFields, setEditedFields] = useState({})
  const [activeFields, setActiveFields] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasEdits, setHasEdits] = useState(false)

  // Fetch client data
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientDoc = await getDoc(doc(db, 'clients', client.id))
        if (clientDoc.exists()) {
          setClientData({ id: clientDoc.id, ...clientDoc.data() })
        } else {
          console.error('No such client!')
        }
      } catch (error) {
        console.error('Error fetching client data:', error)
      }
    }

    if (client && client.id) {
      fetchClientData()
    }
  }, [client])

  // Handle field click (activate/deactivate edit mode)
  const handleFieldClick = (fieldName, isActive) => {
    setActiveFields((prev) => ({
      ...prev,
      [fieldName]: isActive,
    }))
  }

  // Handle input change for basic fields
  const handleInputChange = (fieldName, value) => {
    setEditedFields((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
    setHasEdits(true)
  }

  // Handle save
  const handleSave = async () => {
    if (!clientData) return
    setIsSaving(true)
    try {
      // Update Firestore with edited fields
      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, editedFields)
      setClientData((prev) => ({
        ...prev,
        ...editedFields,
      }))
      setEditedFields({})
      setHasEdits(false)
      setActiveFields({})
    } catch (error) {
      console.error('Error saving client data:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    setEditedFields({})
    setActiveFields({})
    setHasEdits(false)
  }

  // Handle delete
  const handleDelete = async () => {
    if (!clientData) return
    setIsDeleting(true)
    try {
      // Delete client document from Firestore
      await deleteDoc(doc(db, 'clients', clientData.id))
      // Optionally, redirect or perform other actions after deletion
    } catch (error) {
      console.error('Error deleting client:', error)
    } finally {
      setIsDeleting(false)
      setIsModalOpen(false)
    }
  }

  // Handle adding a new Important Date
  const handleAddImportantDate = async () => {
    const newDate = {
      tag: '',
      reason: '',
      month: '',
      day: '',
    }
    try {
      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        importantDates: arrayUnion(newDate),
      })
      setClientData((prev) => ({
        ...prev,
        importantDates: [...prev.importantDates, newDate],
      }))
      setHasEdits(true)
      console.log('Added new important date with separate month and day.')
    } catch (error) {
      console.error('Error adding important date:', error)
    }
  }

  // Handle updating a specific field of an Important Date
  const handleUpdateImportantDate = async (index, fieldName, value) => {
    try {
      const updatedImportantDates = [...clientData.importantDates]
      if (updatedImportantDates[index]) {
        updatedImportantDates[index][fieldName] = value
      } else {
        console.error(`No important date found at index ${index}`)
        return
      }

      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        importantDates: updatedImportantDates,
      })

      setClientData((prev) => ({
        ...prev,
        importantDates: updatedImportantDates,
      }))
      setHasEdits(true)
      console.log(
        `Updated important date at index ${index}, field '${fieldName}'.`
      )
    } catch (error) {
      console.error(`Error updating important date at index ${index}:`, error)
    }
  }

  // Handle deleting an Important Date by index
  const handleDeleteImportantDate = async (index) => {
    try {
      const dateToDelete = clientData.importantDates[index]
      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        importantDates: arrayRemove(dateToDelete),
      })
      setClientData((prev) => ({
        ...prev,
        importantDates: prev.importantDates.filter((_, i) => i !== index),
      }))
    } catch (error) {
      console.error('Error deleting important date:', error)
    }
  }

  // Handle adding a new Marketing Tag
  const handleAddMarketingTag = async () => {
    const newTag = 'New Marketing Tag'
    try {
      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        marketingTags: arrayUnion(newTag),
      })
      setClientData((prev) => ({
        ...prev,
        marketingTags: [...prev.marketingTags, newTag],
      }))
      setHasEdits(true)
    } catch (error) {
      console.error('Error adding marketing tag:', error)
    }
  }

  // Handle updating a specific Marketing Tag
  const handleUpdateMarketingTag = async (index, newTag) => {
    try {
      const updatedMarketingTags = [...clientData.marketingTags]
      if (updatedMarketingTags[index] !== undefined) {
        updatedMarketingTags[index] = newTag
      } else {
        console.error(`No marketing tag found at index ${index}`)
        return
      }

      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        marketingTags: updatedMarketingTags,
      })

      setClientData((prev) => ({
        ...prev,
        marketingTags: updatedMarketingTags,
      }))
      setHasEdits(true)
      console.log(`Updated marketing tag at index ${index} to '${newTag}'.`)
    } catch (error) {
      console.error(`Error updating marketing tag at index ${index}:`, error)
    }
  }

  // Handle deleting a Marketing Tag by index
  const handleDeleteMarketingTag = async (index) => {
    try {
      const tagToDelete = clientData.marketingTags[index]
      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        marketingTags: arrayRemove(tagToDelete),
      })
      setClientData((prev) => ({
        ...prev,
        marketingTags: prev.marketingTags.filter((_, i) => i !== index),
      }))
      setHasEdits(true)
    } catch (error) {
      console.error('Error deleting marketing tag:', error)
    }
  }

  // Handle adding a new Photoshoot Date
  const handleAddPhotoshootDate = async () => {
    const newDate = {
      tag: 'New Tag',
      reason: 'Reason',
      date: new Date().toISOString().split('T')[0],
    }
    try {
      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        photoshootDates: arrayUnion(newDate),
      })
      setClientData((prev) => ({
        ...prev,
        photoshootDates: [...prev.photoshootDates, newDate],
      }))
      setHasEdits(true)
    } catch (error) {
      console.error('Error adding photoshoot date:', error)
    }
  }

  // Handle updating a sepcific field of a Photoshoot Date 
  const handleUpdatePhotoshootDate = async (index, fieldName, value) => {
    try {
      if (!clientData) return

      const updatedPhotoshootDates = [...clientData.photoshootDates]
      if (updatedPhotoshootDates[index]) {
        updatedPhotoshootDates[index][fieldName] = value
      } else {
        console.error(`No photoshoot date found at index ${index}`)
        return
      }

      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        photoshootDates: updatedPhotoshootDates,
      })

      setClientData((prev) => ({
        ...prev,
        photoshootDates: updatedPhotoshootDates,
      }))
      setHasEdits(true)
      console.log(
        `Updated photoshoot date at index ${index}, field '${fieldName}'.`
      )
    } catch (error) {
      console.error(`Error updating photoshoot date at index ${index}:`, error)
    }
  }

  // Handle deleting a Photoshoot Date by index
  const handleDeletePhotoshootDate = async (index) => {
    try {
      const dateToDelete = clientData.photoshootDates[index]
      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        photoshootDates: arrayRemove(dateToDelete),
      })
      setClientData((prev) => ({
        ...prev,
        photoshootDates: prev.photoshootDates.filter((_, i) => i !== index),
      }))
    } catch (error) {
      console.error('Error deleting photoshoot date:', error)
    }
  }

  // Handle adding a new Relation
  const handleAddRelation = async () => {
    const newRelation = {
      name: 'New Relation',
      age: 0,
      relationshipType: 'Relation Type',
    }
    try {
      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        relations: arrayUnion(newRelation),
      })
      setClientData((prev) => ({
        ...prev,
        relations: [...prev.relations, newRelation],
      }))
      setHasEdits(true)
    } catch (error) {
      console.error('Error adding relation:', error)
    }
  }

  // Handle updating a specific Relation
  const handleUpdateRelation = async (index, fieldName, value) => {
    try {
      const updatedRelations = [...clientData.relations]
      if (updatedRelations[index]) {
        updatedRelations[index][fieldName] = value
      } else {
        console.error(`No relation found at index ${index}`)
        return
      }

      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        relations: updatedRelations,
      })

      setClientData((prev) => ({
        ...prev,
        relations: updatedRelations,
      }))
      setHasEdits(true)
      console.log(`Updated relation at index ${index}, field '${fieldName}'.`)
    } catch (error) {
      console.error(`Error updating relation at index ${index}:`, error)
    }
  }

  // Handle deleting a Relation by index
  const handleDeleteRelation = async (index) => {
    try {
      const relationToDelete = clientData.relations[index]
      const clientRef = doc(db, 'clients', clientData.id)
      await updateDoc(clientRef, {
        relations: arrayRemove(relationToDelete),
      })
      setClientData((prev) => ({
        ...prev,
        relations: prev.relations.filter((_, i) => i !== index),
      }))
      setHasEdits(true)
    } catch (error) {
      console.error('Error deleting relation:', error)
    }
  }

  return {
    clientData,
    editedFields,
    isSaving,
    isDeleting,
    isModalOpen,
    handleInputChange,
    handleSave,
    handleCancel,
    handleDelete,
    setIsModalOpen,
    hasEdits,
    handleAddImportantDate,
    handleUpdateImportantDate,
    handleDeleteImportantDate,
    handleAddMarketingTag,
    handleUpdateMarketingTag, // Expose the new handler
    handleDeleteMarketingTag,
    handleAddPhotoshootDate,
    handleUpdatePhotoshootDate,
    handleDeletePhotoshootDate,
    handleAddRelation,
    handleUpdateRelation,
    handleDeleteRelation,
    activeFields, // You can remove this if not used
    handleFieldClick, // You can remove this if not used
  }
}

export default useClientProfile
