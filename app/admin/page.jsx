
'use client'

import SignOutButton from '@/components/buttons/sign-out-button/SignOutButton'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
      <PageHeading>Kelli&apos;s Moments</PageHeading>
      <SignOutButton />
      {/* Add your admin functionalities here */}
    </div>
  )
}

export default AdminDashboard
