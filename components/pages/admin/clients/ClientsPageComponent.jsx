'use client'
import { useState, useEffect } from 'react'
import { db } from '@/libs/firebase'
import { collection, getDocs } from 'firebase/firestore'
import CreateClientModal from '@/components/modals/create-client-modal/CreateClientModal'
import SectionHeading from '@/components/headings/section-heading/SectionHeading'
import ClientsList from '@/components/lists/clients-list/ClientsList'
import ProspectsList from '@/components/lists/prospects-list/ProspectsList'
import styles from './ClientsPageComponent.module.scss'
import MainActionButton from '@/components/buttons/main-action-button/MainActionButton'

function ClientsPageComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState([])
  const [prospects, setProspects] = useState([])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Fetch clients and prospects from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clients'))
        const fetchedClients = []
        const fetchedProspects = []

        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() }
          if (data.type === 'client') {
            fetchedClients.push(data)
          } else if (data.type === 'prospect') {
            fetchedProspects.push(data)
          }
        })

        setClients(fetchedClients)
        setProspects(fetchedProspects)
      } catch (error) {
        console.error('Error fetching clients and prospects:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className={styles.clientsPage}>
      <MainActionButton onClick={openModal} className={styles.createButton} text='create client/prospect'/>

      {/* List of Clients */}
      <div className={styles.clientsList}>
      <SectionHeading>Clients</SectionHeading>
        {clients.length === 0 ? (
          <p>No clients found.</p>
        ) : (
          <ClientsList clients={clients} />
        )}
      </div>

      {/* List of Prospects */}
      <div className={styles.clientsList}>
      <SectionHeading>Prospects</SectionHeading>
        {prospects.length === 0 ? (
          <p>No prospects found.</p>
        ) : (
          <ProspectsList prospects={prospects} />
        )}
      </div>

      {/* Create Client Modal */}
      <CreateClientModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default ClientsPageComponent
