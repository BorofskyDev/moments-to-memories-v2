// NavMenu.js
'use client'

import { useRef } from 'react'
import { useClickOutside } from '@/libs/hooks/navbar/useClickOutside'
import { useToggleMenu } from '@/libs/hooks/navbar/useToggleMenu'
import { useAuth } from '@/libs/context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/libs/firebase'
import { useRouter } from 'next/navigation'
import NavLink from '@/components/links/nav-link/NavLink'
import styles from './NavMenu.module.scss'
import SignOutButton from '@/components/buttons/sign-out-button/SignOutButton'
import useIsMobile from '@/libs/hooks/navbar/useIsMobile' // Import the hook

function NavMenu({ isMenuOpen, handleMenuToggle }) {
  const { isOpen, toggleMenu: toggleMenuState } = useToggleMenu(isMenuOpen)
  const menuRef = useRef(null)
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const isMobile = useIsMobile() // Use the hook

  if (isMenuOpen !== isOpen) {
    toggleMenuState(isMenuOpen)
  }

  useClickOutside(menuRef, () => {
    if (isMobile && isMenuOpen) {
      // Apply condition
      handleMenuToggle(false)
    }
  })

  const handleLinkClick = () => {
    if (isMobile) {
      // Apply condition
      handleMenuToggle(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out;', error)
    }
  }

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  if (isAdmin) {
    navigationLinks.push({ href: '/admin', label: 'Admin' })
  }

  return (
    <div
      ref={menuRef}
      className={`${styles.navMenu} ${isMenuOpen ? styles.opened : ''}`}
    >
      <nav>
        <ul>
          {navigationLinks.map(({ href, label }, index) => (
            <li key={index}>
              <NavLink href={href} onClick={handleLinkClick}>
                {label}
              </NavLink>
            </li>
          ))}
          {user ? (
            <li>
              <SignOutButton
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Logout
              </SignOutButton>
            </li>
          ) : (
            <li>
              <NavLink href='/login' onClick={handleLinkClick}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default NavMenu
