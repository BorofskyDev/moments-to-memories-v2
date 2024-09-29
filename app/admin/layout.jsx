
'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/libs/context/AuthContext' 

const AdminLayout = ({ children }) => {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !isAdmin) {
     
      router.push('/')
    } else if (!user) {
     
      router.push('/login')
    }
    
  }, [user, isAdmin, router])

 
  if (!user || !isAdmin) {
    return <p>Loading...</p>
  }

  return <>{children}</>
}

export default AdminLayout
