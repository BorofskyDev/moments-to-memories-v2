// components/pages/admin/clients/ClientsPageComponent.jsx

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
import Pagination from '@/components/layout/pagination/Pagination'

function ClientsPageComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clients, setClients] = useState([])
  const [prospects, setProspects] = useState([])
  const [currentPageClients, setCurrentPageClients] = useState(1)
  const [currentPageProspects, setCurrentPageProspects] = useState(1)
  const itemsPerPage = 5

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Fetch clients and prospects from Firestore
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

  useEffect(() => {
    fetchData()
  }, [])

  // Function to handle new client/prospect entry
  const handleNewEntry = (newEntry) => {
    if (newEntry.type === 'client') {
      setClients((prevClients) => [newEntry, ...prevClients]) // Prepend new client
      setCurrentPageClients(1) // Reset to first page
    } else if (newEntry.type === 'prospect') {
      setProspects((prevProspects) => [newEntry, ...prevProspects]) // Prepend new prospect
      setCurrentPageProspects(1) // Reset to first page
    }
  }

  // Calculate total pages
  const totalPagesClients = Math.ceil(clients.length / itemsPerPage)
  const totalPagesProspects = Math.ceil(prospects.length / itemsPerPage)

  // Get current page clients
  const indexOfLastClient = currentPageClients * itemsPerPage
  const indexOfFirstClient = indexOfLastClient - itemsPerPage
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient)

  // Get current page prospects
  const indexOfLastProspect = currentPageProspects * itemsPerPage
  const indexOfFirstProspect = indexOfLastProspect - itemsPerPage
  const currentProspects = prospects.slice(
    indexOfFirstProspect,
    indexOfLastProspect
  )

  return (
    <div className={styles.clientsPage}>
      <MainActionButton
        onClick={openModal}
        className={styles.createButton}
        text='Create Client / Prospect'
      />

      {/* Create Client Modal */}
      <CreateClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onNewEntry={handleNewEntry}
      />

      {/* List of Clients */}
      <div className={styles.clientsList}>
        <SectionHeading>Clients</SectionHeading>
        {currentClients.length === 0 ? (
          <p>No clients found.</p>
        ) : (
          <ClientsList clients={currentClients} />
        )}
        {totalPagesClients > 1 && (
          <Pagination
            currentPage={currentPageClients}
            totalPages={totalPagesClients}
            onPageChange={(page) => setCurrentPageClients(page)}
          />
        )}
      </div>

      {/* List of Prospects */}
      <div className={styles.clientsList}>
        <SectionHeading>Prospects</SectionHeading>
        {currentProspects.length === 0 ? (
          <p>No prospects found.</p>
        ) : (
          <ProspectsList prospects={currentProspects} />
        )}
        {totalPagesProspects > 1 && (
          <Pagination
            currentPage={currentPageProspects}
            totalPages={totalPagesProspects}
            onPageChange={(page) => setCurrentPageProspects(page)}
          />
        )}
      </div>
    </div>
  )
}

export default ClientsPageComponent
