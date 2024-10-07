// libs/hooks/messages/useMessageList.js

import { useState, useEffect } from 'react'
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from '@/libs/firebase'

const useMessageList = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastDoc, setLastDoc] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const MESSAGES_PER_PAGE = 20

  const fetchMessages = async () => {
    if (!hasMore) return

    setLoading(true)
    setError(null)

    try {
      const messagesCol = collection(db, 'messages')
      let messagesQuery = query(
        messagesCol,
        orderBy('createdAt', 'desc'),
        limit(MESSAGES_PER_PAGE)
      )

      if (lastDoc) {
        messagesQuery = query(
          messagesCol,
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(MESSAGES_PER_PAGE)
        )
      }

      const snapshot = await getDocs(messagesQuery)

      const fetchedMessages = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt
          ? docSnap.data().createdAt.toDate()
          : new Date(),
      }))

      setMessages((prevMessages) => {
        const messageMap = new Map()
        prevMessages.forEach((msg) => messageMap.set(msg.id, msg))
        fetchedMessages.forEach((msg) => messageMap.set(msg.id, msg))
        return Array.from(messageMap.values())
      })

      const lastVisible = snapshot.docs[snapshot.docs.length - 1]
      setLastDoc(lastVisible)

      if (snapshot.docs.length < MESSAGES_PER_PAGE) {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError('Failed to load messages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchMessages()
    }
  }

  // New deleteMessage function
  const deleteMessage = async (messageId) => {
    try {
      const messageDoc = doc(db, 'messages', messageId)
      await deleteDoc(messageDoc)
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      )
    } catch (err) {
      console.error('Error deleting message:', err)
      setError('Failed to delete message.')
      throw err // Re-throw to handle in the component if needed
    }
  }

  return { messages, loading, error, hasMore, loadMore, deleteMessage }
}

export default useMessageList
