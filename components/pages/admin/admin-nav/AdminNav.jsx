// components/pages/admin/admin-nav/AdminNav.jsx

'use client'

import { useRef } from 'react'
import { useClickOutside } from '@/libs/hooks/navbar/useClickOutside'
import NavLink from '@/components/links/nav-link/NavLink'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'
import ClientsSvg from '@/components/layout/svgs/clients-svg/ClientsSvg'
import MessagesSvg from '@/components/layout/svgs/messages-svg/MessagesSvg'
import BlogSvg from '@/components/layout/svgs/blog-svg/BlogSvg'
import SettingsSvg from '@/components/layout/svgs/settings-svg/SettingsSvg'
import AnalyticsSvg from '@/components/layout/svgs/analytics-svg/AnalyticsSvg'
import { motion } from 'framer-motion'
import styles from './AdminNav.module.scss'
import RightArrowSvg from '@/components/layout/svgs/right-arrow-svg/RightArrowSvg'

function AdminNav({ isMenuOpen, handleMenuToggle }) {
  const menuRef = useRef(null)

  useClickOutside(menuRef, () => {
    if (isMenuOpen) {
      handleMenuToggle()
    }
  })

  const handleLinkClick = () => {
    handleMenuToggle()
  }

  const navigationLinks = [
    { href: '/admin/clients', label: 'Clients', icon: <ClientsSvg /> },
    { href: '/admin/messages', label: 'Messages', icon: <MessagesSvg /> },
    { href: '/admin/blog', label: 'Blog', icon: <BlogSvg /> },
    { href: '/admin/site-settings', label: 'Settings', icon: <SettingsSvg /> },
    { href: '/admin/analytics', label: 'Analytics', icon: <AnalyticsSvg /> },
  ]

  return (
    <div
      ref={menuRef}
      className={`${styles.adminNav} ${isMenuOpen ? styles.opened : ''}`}
    >
      <nav>
        <button
          className={styles.toggleButton}
          onClick={handleMenuToggle}
          aria-label='Toggle menu'
          aria-expanded={isMenuOpen}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <RightArrowSvg />
          </motion.div>
        </button>
        <ul>
          <SectionSubtitle>Admin Navigation</SectionSubtitle>
          {navigationLinks.map(({ href, label, icon }, index) => (
            <li key={index}>
              <NavLink href={href} onClick={handleLinkClick}>
                <div className={styles.icon}>
                  {icon}
                  
                  </div>
                 <span className={styles.label}>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default AdminNav
