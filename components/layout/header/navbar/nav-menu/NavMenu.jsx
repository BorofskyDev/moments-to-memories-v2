'use client'

import { useRef } from 'react'
import { useClickOutside } from '@/libs/hooks/navbar/useClickOutside'
import { useToggleMenu } from '@/libs/hooks/navbar/useToggleMenu'
import NavLink from '@/components/links/nav-link/NavLink'
import styles from './NavMenu.module.scss'

function NavMenu({ isMenuOpen, handleMenuToggle }) {
  const { isOpen, toggleMenu: toggleMenuState } = useToggleMenu(isMenuOpen)
  const menuRef = useRef(null)

  if (isMenuOpen !== isOpen) {
    toggleMenuState(isMenuOpen)
  }

  useClickOutside(menuRef, () => {
    if (isMenuOpen) {
      handleMenuToggle(false)
    }
  })

  const handleLinkClick = () => {
    handleMenuToggle(false)
  }

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/login', label: 'Login' },
    { href: '#contact', label: 'Contact' }, // Keep '#contact' for internal scrolling
  ]

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
        </ul>
      </nav>
    </div>
  )
}
export default NavMenu
