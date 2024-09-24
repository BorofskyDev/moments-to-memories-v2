// useToggleMenu.jsx
import { useState, useEffect } from 'react'

export function useToggleMenu(externalState = false) {
  const [isOpen, setIsOpen] = useState(externalState)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      // Corresponding to the Sass breakpoints: tab = 56.5rem (904px)
      setIsMobile(window.innerWidth < 904)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setIsOpen(externalState)
  }, [externalState])

  useEffect(() => {
    const toggleOverflow = () => {
      const body = document.body
      const html = document.documentElement

      if (isOpen && isMobile) {
        body.style.overflow = 'hidden'
        html.style.overflow = 'hidden'
      } else {
        body.style.overflow = ''
        html.style.overflow = ''
      }
    }

    toggleOverflow()

    return () => {
      const body = document.body
      const html = document.documentElement
      body.style.overflow = ''
      html.style.overflow = ''
    }
  }, [isOpen, isMobile])

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState)
  }

  return { isOpen, toggleMenu }
}
