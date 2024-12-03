// components/modals/create-admin-modal/CreateAdminModal.jsx
'use client'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '@/libs/context/AuthContext'
import Modal from '@/components/modals/modal/Modal' // Corrected path

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
})

const CreateAdminModal = ({ onClose }) => {
  const { user } = useAuth()
  const [feedback, setFeedback] = useState({ message: '', type: '' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    setFeedback({ message: '', type: '' })
    try {
      const idToken = await user.getIdToken()

      const response = await fetch('/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ email: data.email }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      setFeedback({ message: result.message, type: 'success' })
      reset()
    } catch (error) {
      setFeedback({ message: error.message, type: 'error' })
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2>Create Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
        <div className='form-group'>
          <label htmlFor='email'>User Email:</label>
          <input id='email' type='email' {...register('email')} />
          {errors.email && (
            <p className='error-message'>{errors.email.message}</p>
          )}
        </div>

        <div className='form-actions'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-success'
          >
            {isSubmitting ? 'Assigning...' : 'Assign Admin'}
          </button>
          <button type='button' onClick={onClose} className='btn btn-secondary'>
            Cancel
          </button>
        </div>
      </form>

      {feedback.message && (
        <p
          className={
            feedback.type === 'success' ? 'success-message' : 'error-message'
          }
        >
          {feedback.message}
        </p>
      )}

      <style jsx>{`
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 0.5rem;
        }

        .form-group input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .error-message {
          color: red;
          font-size: 0.9rem;
        }

        .success-message {
          color: green;
          font-size: 0.9rem;
          margin-top: 1rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .btn-success {
          background-color: #28a745;
          color: white;
        }

        .btn-success:hover {
          background-color: #218838;
        }

        .btn-secondary {
          background-color: #6c757d;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #5a6268;
        }
      `}</style>
    </Modal>
  )
}

CreateAdminModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default CreateAdminModal
