// components/pages/admin/admin-nav/AdminNav.jsx
'use client'

import { useRef, useEffect } from 'react'
import { useClickOutside } from '@/libs/hooks/navbar/useClickOutside'
import { useToggleMenu } from '@/libs/hooks/navbar/useToggleMenu'
import NavLink from '@/components/links/nav-link/NavLink'
import SectionSubtitle from '@/components/headings/section-subtitle/SectionSubtitle'
import ClientsSvg from '@/components/layout/svgs/clients-svg/ClientsSvg'
import styles from './AdminNav.module.scss'

function AdminNav({ isMenuOpen, handleMenuToggle }) {
  const { isOpen, toggleMenu: toggleMenuState } = useToggleMenu(isMenuOpen)
  const menuRef = useRef(null)

  
  useEffect(() => {
    if (isMenuOpen !== isOpen) {
      toggleMenuState(isMenuOpen)
    }
  }, [isMenuOpen, isOpen, toggleMenuState])

  useClickOutside(menuRef, () => {
    if (isMenuOpen) {
      handleMenuToggle(false)
    }
  })

  const handleLinkClick = () => {
    handleMenuToggle(false)
  }

  const navigationLinks = [
    { href: '/admin/clients', label: 'Clients', icon: <ClientsSvg /> },
    { href: '/admin/messages', label: 'Messages' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/site-settings', label: 'Settings' },
    { href: '/admin/analytics', label: 'Analytics' },
  ]

  return (
    <div
      ref={menuRef}
      className={`${styles.navMenu} ${isMenuOpen ? styles.opened : ''}`}
    >
      <nav>
        <ul>
            <SectionSubtitle>Admin Navigation</SectionSubtitle>
          {navigationLinks.map(({ href, label, icon }, index) => (
            <li key={index}>
              <NavLink href={href} onClick={handleLinkClick}>
                <span>{label}</span>
                <span>{icon}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default AdminNav
