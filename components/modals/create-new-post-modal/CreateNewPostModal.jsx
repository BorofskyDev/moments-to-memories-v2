// components/modals/CreateNewPostModal.jsx
'use client'

import React from 'react'
import useCreateNewPost from '@/libs/hooks/blog/useCreateNewPost'
import QuillNoSSRWrapper from './quill-no-ssr-wrapper/QuillNoSSRWrapper.jsx'
import styles from './CreateNewPostModal.module.scss'

const CreateNewPostModal = ({ isOpen, onClose }) => {
  const {
    title,
    setTitle,
    slug,
    setSlug,
    titleImage,
    setTitleImage,
    selectedCategory,
    setSelectedCategory,
    content,
    setContent,
    seoDescription,
    setSeoDescription,
    allCategories,
    newCategoryName,
    setNewCategoryName,
    addNewCategory,
    savePost,
    status,
    setStatus,
    generateSlug,
    uploadImage, // Destructure uploadImage
  } = useCreateNewPost()

  // Reference to the Quill editor
  const quillRef = React.useRef()

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      if (file && quillRef.current) {
        const editor = quillRef.current.getEditor()
        if (editor) {
          const range = editor.getSelection()
          try {
            const imageUrl = await uploadImage(file)
            if (imageUrl) {
              editor.insertEmbed(range.index, 'image', imageUrl)
              console.log('Image inserted at index:', range.index)
            } else {
              console.error('Failed to upload image.')
            }
          } catch (error) {
            console.error('Error in imageHandler:', error)
          }
        } else {
          console.error('Editor instance is undefined')
        }
      } else {
        console.error('quillRef.current is undefined or no file selected.')
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create New Post</h2>
        <form>
          {/* Title */}
          <label>
            Title:
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          {/* Slug */}
          <label>
            Slug:
            <input
              type='text'
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
            <button type='button' onClick={() => setSlug(generateSlug(title))}>
              Regenerate Slug
            </button>
          </label>
          {/* Title Image */}
          <label>
            Title Image:
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setTitleImage(e.target.files[0])}
            />
          </label>
          {/* Categories */}
          <label>
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value=''>Select Category</option>
              {allCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type='text'
              placeholder='New Category'
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button type='button' onClick={addNewCategory}>
              Add Category
            </button>
          </label>
          {/* Content */}
          <label>
            Content:
            <QuillNoSSRWrapper
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={{
                toolbar: {
                  container: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    ['clean'],
                  ],
                  // handlers: {
                  //   image: imageHandler, // Re-enable imageHandler
                  // },
                },
              }}
            />
          </label>
          {/* SEO Description */}
          <label>
            SEO Description:
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              maxLength={160}
            />
          </label>
          {/* Status */}
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value='draft'>Draft</option>
              <option value='published'>Published</option>
            </select>
          </label>
          {/* Save Button */}
          <div className={styles.buttonGroup}>
            <button type='button' onClick={savePost}>
              Save Post
            </button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNewPostModal
