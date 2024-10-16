// components/PostsList.jsx
'use client'

import React, { useState } from 'react'
import useFetchPosts from '@/libs/hooks/blog/useFetchPosts'
import EditPostModal from '@/components/modals/edit-post-modal/EditPostModal'
import styles from './PostsList.module.scss'

const PostsList = ({ postType = 'posts' }) => {
  const { posts, loading, error } = useFetchPosts(postType)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePostClick = (post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedPost(null)
    setIsModalOpen(false)
  }

  if (loading) return <p>Loading posts...</p>
  if (error) return <p>Error loading posts: {error.message}</p>

  return (
    <div className={styles.postsList}>
      <h2>{postType.charAt(0).toUpperCase() + postType.slice(1)}</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                onClick={() => handlePostClick(post)}
                className={styles.row}
              >
                <td>{post.title}</td>
                <td>{post.status}</td>
                <td>
                  {new Date(
                    post.dateCreated.seconds * 1000
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedPost && (
        <EditPostModal post={selectedPost} onClose={closeModal} />
      )}
    </div>
  )
}

export default PostsList
