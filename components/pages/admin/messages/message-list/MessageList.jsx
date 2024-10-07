// components/pages/messages/message-list/MessageList.jsx

'use client'

import React, { useState } from 'react'
import useMessageList from '@/libs/hooks/messages/useMessageList'
import styles from './MessageList.module.scss'
import BodyText from '@/components/layout/body-text/BodyText'
import MessageModal from '@/components/modals/message-modal/MessageModal'

const MessageList = () => {
    console.log('Rendering MessageList Component')
  const { messages, loading, error, hasMore, loadMore } = useMessageList()
  const [selectedMessage, setSelectedMessage] = useState(null)

  const openModal = (message) => {
    setSelectedMessage(message)
  }

  const closeModal = () => {
    setSelectedMessage(null)
  }

  return (
    <div className={styles.messageListContainer}>
      {loading && <BodyText>Loading messages...</BodyText>}
      {error && <BodyText className={styles.errorText}>{error}</BodyText>}

      <ul className={styles.messageListContainer__messageList}>
        {messages.map((message) => (
          <li
            key={message.id}
            className={styles.messageItem}
            onClick={() => openModal(message)}
          >
            <span className={styles.messageName}>{message.name}</span>
            <span className={styles.messageSubject}>{message.subject}</span>

            <div className={styles.messagePreview}>
              {message.message.length > 25
                ? `${message.message.substring(0, 25)}...`
                : message.message}
            </div>
          </li>
        ))}
      </ul>

      {/* Load More Button */}
      {hasMore && !loading && (
        <button className={styles.loadMoreButton} onClick={loadMore}>
          Load More
        </button>
      )}

      {/* Message Modal */}
      {selectedMessage && (
        <MessageModal message={selectedMessage} onClose={closeModal} />
      )}
    </div>
  )
}

export default MessageList
