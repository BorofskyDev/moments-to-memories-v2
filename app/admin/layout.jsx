// components/pages/admin/admin-layout/AdminLayout.jsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/libs/context/AuthContext'
import styles from './AdminLayout.module.scss'
import AdminNav from '@/components/pages/admin/admin-nav/AdminNav'
import PageHeading from '@/components/headings/page-heading/PageHeading'

const AdminLayout = ({ children }) => {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  // State to manage menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

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
      <PageHeading>Kelli&apos;s Moments</PageHeading>
      <div className={styles.stableMobileContainer}>
        <div className={styles.stableContainer}>
          <div className={styles.stableContainer__stickyContainer}>
            <AdminNav
              isMenuOpen={isMenuOpen}
              handleMenuToggle={handleMenuToggle}
            />
          </div>
        </div>
        <div className={styles.mobileContainer}>
          <div className={styles.mobileContainer__content}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
