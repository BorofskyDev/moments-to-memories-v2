// components/lists/mini-clients-list/MiniClientsList.jsx

'use client'

import { useState, useEffect } from 'react'
import { db } from '@/libs/firebase'
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import styles from './MiniClientList.module.scss'
import Link from 'next/link'
import InternalPageLink from '@/components/links/internal-page-link/InternalPageLink'

const MiniClientsList = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsRef = collection(db, 'clients')
        const q = query(clientsRef, where('type', '==', 'client'), limit(5))

        const querySnapshot = await getDocs(q)
        const fetchedClients = []

        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() }
          fetchedClients.push(data)
        })

        setClients(fetchedClients)
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  if (loading) {
    return <p>Loading clients...</p>
  }

  return (
    <div className={styles.miniClientsList}>
      <ul >
        {clients.map((client) => (
          <li key={client.id} className={styles.clientItem}>
            <Link href={`/admin/clients/${client.id}`}>
             
                <p className={styles.clientName} title={client.name}>
                  {client.name}
                </p>
                <p className={styles.clientEmail} title={client.email}>
                  {client.email || 'N/A'}
                </p>
                <p className={styles.clientPhone} title={client.phone}>
                  {client.phone || 'N/A'}
                </p>
              
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.viewAllLink}>
        <InternalPageLink href='/admin/clients'>View All Clients</InternalPageLink>
      </div>
    </div>
  )
}

export default MiniClientsList
