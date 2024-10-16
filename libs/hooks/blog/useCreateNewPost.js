// libs/hooks/blog/useCreateNewPost.js
import { useState, useEffect } from 'react'
import { db, storage } from '@/libs/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const useCreateNewPost = () => {
  // State variables
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [titleImage, setTitleImage] = useState(null)
  const [titleImageUrl, setTitleImageUrl] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [content, setContent] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [allCategories, setAllCategories] = useState([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [status, setStatus] = useState('draft')

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'))
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setAllCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Slug generation
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
  }

  useEffect(() => {
    if (title) {
      const newSlug = generateSlug(title)
      setSlug(newSlug)
      console.log('Title:', title)
      console.log('Generated Slug:', newSlug)
    } else {
      setSlug('')
    }
  }, [title])

  // Handle image upload for Title Image
  const uploadTitleImage = async () => {
    if (!titleImage) return ''
    try {
      const imageRef = ref(
        storage,
        `blogImages/${Date.now()}_${titleImage.name}`
      )
      await uploadBytes(imageRef, titleImage)
      const url = await getDownloadURL(imageRef)
      setTitleImageUrl(url)
      return url
    } catch (error) {
      console.error('Error uploading title image:', error)
      return ''
    }
  }

  // Handle image upload from Quill Editor
  const uploadImage = async (file) => {
    if (!file) {
      console.error('No file selected for upload.')
      return null
    }
    try {
      const imageRef = ref(storage, `blogImages/${Date.now()}_${file.name}`)
      await uploadBytes(imageRef, file)
      const url = await getDownloadURL(imageRef)
      return url
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  // Add new category
  const addNewCategory = async () => {
    if (!newCategoryName) return
    const newCategorySlug = generateSlug(newCategoryName)
    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        name: newCategoryName,
        slug: newCategorySlug,
      })
      setAllCategories([
        ...allCategories,
        { id: docRef.id, name: newCategoryName, slug: newCategorySlug },
      ])
      setSelectedCategory(docRef.id)
      setNewCategoryName('')
    } catch (error) {
      console.error('Error adding new category:', error)
    }
  }

  // Save post
  const savePost = async () => {
    // Validate required fields
    if (!title || !slug || !content || !seoDescription) {
      alert('Please fill in all required fields.')
      return
    }

    try {
      // Upload title image
      const imageUrl = await uploadTitleImage()

      // Save post to Firestore
      await addDoc(collection(db, 'posts'), {
        title,
        slug,
        titleImageUrl: imageUrl || '',
        categories: selectedCategory ? [selectedCategory] : [],
        content,
        seoDescription,
        dateCreated: new Date(),
        dateModified: new Date(),
        status,
      })

      // Reset form
      resetForm()

      alert('Post created successfully!')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save the post. Please try again.')
    }
  }

  const resetForm = () => {
    setTitle('')
    setSlug('')
    setTitleImage(null)
    setTitleImageUrl('')
    setSelectedCategory('')
    setContent('')
    setSeoDescription('')
    setStatus('draft')
  }

  return {
    title,
    setTitle,
    slug,
    setSlug,
    titleImage,
    setTitleImage,
    titleImageUrl,
    setTitleImageUrl,
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    content,
    setContent,
    seoDescription,
    setSeoDescription,
    allCategories,
    setAllCategories,
    newCategoryName,
    setNewCategoryName,
    addNewCategory,
    savePost,
    status,
    setStatus,
    generateSlug,
    uploadImage, // Export uploadImage
  }
}

export default useCreateNewPost
