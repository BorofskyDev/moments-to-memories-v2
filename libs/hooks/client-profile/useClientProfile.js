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

  // Handle input change
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
      tag: 'New Tag',
      reason: 'Reason',
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD
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
    } catch (error) {
      console.error('Error adding important date:', error)
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
    } catch (error) {
      console.error('Error adding marketing tag:', error)
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
    } catch (error) {
      console.error('Error adding photoshoot date:', error)
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
    } catch (error) {
      console.error('Error adding relation:', error)
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
    handleDeleteImportantDate,
    handleAddMarketingTag,
    handleDeleteMarketingTag,
    handleAddPhotoshootDate,
    handleDeletePhotoshootDate,
    handleAddRelation,
    handleDeleteRelation,
    activeFields, // You can remove this if not used
    handleFieldClick, // You can remove this if not used
  }
}

export default useClientProfile
