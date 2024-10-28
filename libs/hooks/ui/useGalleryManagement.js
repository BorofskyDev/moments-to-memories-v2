// libs/hooks/ui/useGalleryManagement.js

import { useState } from 'react'
import useSelectionGallery from '@/libs/hooks/client-profile/useSelectionGallery'
import { toast } from 'react-toastify'

const useGalleryManagement = (clientId) => {
  const {
    galleries,
    createGallery: createGalleryInDatabase,
    addPhotosToGallery: uploadPhotos,
    isUploading,
    error,
  } = useSelectionGallery(clientId)

  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedGalleryId, setSelectedGalleryId] = useState('')
  const [isCreateGalleryOpen, setIsCreateGalleryOpen] = useState(false)
  const [newGalleryName, setNewGalleryName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Handle folder selection and file validation
  const handleFolderSelect = (event) => {
    const files = Array.from(event.target.files)

    // Validate file types
    const supportedFormats = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
    ]
    const invalidFiles = files.filter(
      (file) => !supportedFormats.includes(file.type)
    )

    if (invalidFiles.length > 0) {
      toast.error('Some files have unsupported formats and will be ignored.')
      const validFiles = files.filter((file) =>
        supportedFormats.includes(file.type)
      )
      setSelectedFiles(validFiles)
    } else {
      setSelectedFiles(files)
    }
  }

  // Handle the upload process
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.warn('No files selected for upload.')
      return
    }

    if (!selectedGalleryId) {
      toast.warn('Please select a gallery to upload to.')
      return
    }

    setUploadProgress(0)

    try {
      // Call addPhotosToGallery with galleryId and files
      await uploadPhotos(selectedGalleryId, selectedFiles, (progress) => {
        setUploadProgress(progress)
      })

      toast.success('Folder uploaded successfully!')
      setSelectedFiles([])
    } catch (error) {
      console.error('Error uploading folder:', error)
      toast.error('Failed to upload folder. Please try again.')
    } finally {
      setUploadProgress(0)
    }
  }

  // Handle creating a new gallery with password
  const handleCreateGallery = async () => {
    if (!newGalleryName.trim()) {
      toast.warn('Gallery name cannot be empty.')
      return
    }

    if (!password || !confirmPassword) {
      toast.warn('Please enter and confirm the password.')
      return
    }

    if (password !== confirmPassword) {
      toast.warn('Passwords do not match.')
      return
    }

    try {
      // Use the createGallery function from useSelectionGallery
      await createGalleryInDatabase(newGalleryName, password)

      // Since galleries are updated in useSelectionGallery, selectedGalleryId will update accordingly
      const newGallery = galleries.find((g) => g.name === newGalleryName)
      if (newGallery) {
        setSelectedGalleryId(newGallery.id)
      }

      toast.success(`Gallery "${newGalleryName}" created successfully!`)
      setIsCreateGalleryOpen(false)
      setNewGalleryName('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error('Error creating gallery:', error)
      toast.error('Failed to create gallery. Please try again.')
    }
  }

  return {
    galleries,
    selectedFiles,
    uploadProgress,
    selectedGalleryId,
    isCreateGalleryOpen,
    newGalleryName,
    password,
    confirmPassword,
    isUploading,
    error,
    handleFolderSelect,
    handleUpload,
    handleCreateGallery,
    setIsCreateGalleryOpen,
    setNewGalleryName,
    setPassword,
    setConfirmPassword,
    setSelectedGalleryId,
    setSelectedFiles,
  }
}

export default useGalleryManagement
