import { useState, useEffect } from 'react'

export function useScrollPosition(navbarHeight) {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      
      setIsShown(scrollTop > navbarHeight)
      
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [navbarHeight])

  return isShown
}
