// app/login/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/libs/firebase'
import FormInput from '@/components/form-components/form-input/FormInput' // Adjust the import path as necessary
import SectionContainer from '@/components/layout/containers/section-container/SectionContainer'
import PageHeading from '@/components/headings/page-heading/PageHeading'
import GoogleSvg from '@/components/layout/svgs/google-svg/GoogleSvg'
import styles from './LoginComponent.module.scss'

const LoginComponent = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [generalError, setGeneralError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Optional: Redirect if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/')
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setEmailError('')
    setPasswordError('')
    setGeneralError(null)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Redirect to homepage after successful login
      router.push('/')
    } catch (err) {
      console.error(err)
      // Parse Firebase errors
      switch (err.code) {
        case 'auth/invalid-email':
          setEmailError('Invalid email format.')
          break
        case 'auth/user-disabled':
          setGeneralError('This user has been disabled.')
          break
        case 'auth/user-not-found':
          setGeneralError('No user found with this email.')
          break
        case 'auth/wrong-password':
          setPasswordError('Incorrect password.')
          break
        default:
          setGeneralError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setGeneralError(null)

    try {
      await signInWithPopup(auth, googleProvider)
      // Redirect to homepage after successful login
      router.push('/')
    } catch (err) {
      console.error(err)
      setGeneralError('Google sign-in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SectionContainer className={styles.loginComponent}>
      <PageHeading>Login</PageHeading>
      <form onSubmit={handleEmailLogin}>
        <FormInput
          label='Email:'
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Enter your email'
          error={emailError}
        />

        <FormInput
          label='Password:'
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Enter your password'
          error={passwordError}
        />

        {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

        <button
          className={styles.loginComponent__loginBtn}
          type='submit'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <button
        className={styles.loginComponent__googleBtn}
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        {loading ? (
          <>
            <GoogleSvg /> Signing in with Google...
          </>
        ) : (
          <>
            {' '}
            <GoogleSvg /> Sign in with Google{' '}
          </>
        )}
      </button>
    </SectionContainer>
  )
}

export default LoginComponent
