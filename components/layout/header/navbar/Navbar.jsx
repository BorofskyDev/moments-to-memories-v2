'use client'

import { useState } from 'react'
import NavMenu from './nav-menu/NavMenu'
import Hamburger from './hamburger/Hamburger'
import Logo from '../logo/Logo'
import styles from './Navbar.module.scss'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className={styles.navbar}>
   
      <Hamburger isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
      <NavMenu isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
    </div>
  )
}
export default Navbar
