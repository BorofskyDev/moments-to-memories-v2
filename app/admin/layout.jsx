'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/libs/context/AuthContext'
import styles from './AdminLayout.module.scss'
import AdminNav from '@/components/pages/admin/admin-nav/AdminNav'

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

  return (
    <div className={styles.adminLayout}>
      <div className={styles.stableContainer}>
        <div className={styles.stableContainer__stickyContainer}>
          <AdminNav />
        </div>
      </div>
      <div className={styles.mobileContainer}>
        <div className={styles.mobileContainer__content}>{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
