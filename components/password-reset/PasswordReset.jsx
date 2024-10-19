// components/ResetPassword.js
'use client'

import React, { useState } from 'react'
import { auth } from '@/libs/firebase' // Adjust the path as necessary
import { updatePassword } from 'firebase/auth'

const ResetPassword = () => {
  const [isResetting, setIsResetting] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleResetClick = () => {
    setIsResetting(true)
    setError('')
    setSuccess('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleCancel = () => {
    setIsResetting(false)
    setError('')
    setSuccess('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleSave = async () => {
    // Reset previous messages
    setError('')
    setSuccess('')

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (newPassword.length < 6) {
      setError('Password should be at least 6 characters long.')
      return
    }

    try {
      const user = auth.currentUser
      if (user) {
        await updatePassword(user, newPassword)
        setSuccess('Password has been successfully updated.')
        // Optionally, you can reset the form or close the component
        setIsResetting(false)
      } else {
        setError('No authenticated user found.')
      }
    } catch (err) {
      console.error(err)
      // Handle specific error codes as needed
      setError(err.message)
    }
  }

  return (
    <div>
      {!isResetting ? (
        <button onClick={handleResetClick}>Reset Password</button>
      ) : (
        <div>
          <h3>Reset Password</h3>
          <div>
            <label>
              New Password:
              <input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Confirm Password:
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <button onClick={handleSave}>Save Password</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
