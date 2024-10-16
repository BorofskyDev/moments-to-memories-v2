'use client'
import CreateNewButton from '@/components/buttons/create-new/CreateNewButton'
import ParagraphHeading from '@/components/headings/paragraph-heading/ParagraphHeading'
import CreateNewPostModal from '@/components/modals/create-new-post-modal/CreateNewPostModal'
import { useState } from 'react'

const CreateNewBlogComponent = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
      <ParagraphHeading>Blog Management</ParagraphHeading>
      <CreateNewButton
        onClick={() => setModalOpen(true)}
        text='Create New Post'
      />
        {modalOpen && (
          <CreateNewPostModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        )}
     
    </div>
  )
}
export default CreateNewBlogComponent
