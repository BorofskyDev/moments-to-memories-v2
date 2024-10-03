// app/admin/clients/[clientId]/page.jsx

'use client'

import { useParams } from 'next/navigation' // Updated import
import { useState, useEffect } from 'react'
import { db } from '@/libs/firebase'
import { doc, getDoc } from 'firebase/firestore'
import ClientProfile from '@/components/pages/admin/clients/client-profile/ClientProfile'

const ClientPage = () => {
  const params = useParams() // Using useParams instead of useRouter
  const { clientId } = params

  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!clientId) return

    const fetchClient = async () => {
      try {
        const clientDoc = doc(db, 'clients', clientId)
        const clientSnapshot = await getDoc(clientDoc)

        if (clientSnapshot.exists()) {
          setClient({ id: clientSnapshot.id, ...clientSnapshot.data() })
        } else {
          setError('Client not found.')
        }
      } catch (err) {
        setError('Failed to fetch client.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [clientId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!client) return null

  return (
    <div >
      <ClientProfile client={client} />
    </div>
  )
}

export default ClientPage
