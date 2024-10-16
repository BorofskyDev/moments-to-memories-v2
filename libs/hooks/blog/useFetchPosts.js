// libs/hooks/blog/useFetchPosts.js
import { useState, useEffect } from 'react'
import { db } from '@/libs/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'

const useFetchPosts = (postType = 'posts') => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const postsCollection = collection(db, postType)
        const q = query(postsCollection, orderBy('dateCreated', 'desc'))
        const querySnapshot = await getDocs(q)
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setPosts(postsData)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [postType])

  return { posts, loading, error }
}

export default useFetchPosts
