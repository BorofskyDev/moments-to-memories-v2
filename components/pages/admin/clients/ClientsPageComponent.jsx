// components/pages/admin/clients/ClientsPageComponent.jsx

'use client'

import { useState, useEffect } from 'react'
import { db } from '@/libs/firebase'
import { collection, getDocs } from 'firebase/firestore'
import styles from './ClientsPageComponent.module.scss'
import CreateClientModal from '@/components/modals/create-client-modal/CreateClientModal'

function ClientsPageComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState([])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Fetch clients from Firestore
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clients'))
        const clientsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setClients(clientsData)
      } catch (error) {
        console.error('Error fetching clients: ', error)
      }
    }

    fetchClients()
  }, [])

  return (
    <div className={styles.clientsPage}>
      <h1>Clients</h1>
      <button onClick={openModal} className={styles.createButton}>
        Create Client / Prospect
      </button>

      {/* List of Clients */}
      <div className={styles.clientsList}>
        {clients.length === 0 ? (
          <p>No clients found.</p>
        ) : (
          <ul>
            {clients.map((client) => (
              <li key={client.id} className={styles.clientItem}>
                <h3>{client.name}</h3>
                <p>
                  Type:{' '}
                  {client.type.charAt(0).toUpperCase() + client.type.slice(1)}
                </p>
                <p>Email: {client.email || 'N/A'}</p>
                <p>Phone: {client.phone || 'N/A'}</p>
                {/* Add more client details as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Create Client Modal */}
      <CreateClientModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default ClientsPageComponent
