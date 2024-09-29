// components/SignOutButton.jsx
'use client'

import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/libs/firebase' // Adjust the import path as necessary
import { useRouter } from 'next/navigation'

const SignOutButton = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return <button onClick={handleSignOut}>Sign Out</button>
}

export default SignOutButton
