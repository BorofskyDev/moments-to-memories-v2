// app/clients/[clientId]/page.jsx

import React from 'react'
import ClientProfileComponent from '@/components/pages/clients/client-profile-component/ClientProfileComponent'

const ClientProfilePage = ({ params }) => {
  const { clientId } = params

  return <ClientProfileComponent clientId={clientId} />
}

export default ClientProfilePage
