import { useState, useEffect } from 'react'

export function useNavbarHeight() {
  const [navbarHeight, setNavbarHeight] = useState(0)

  useEffect(() => {
    const height =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--fs-600')
      ) * 16 // Convert rem to px
    setNavbarHeight(height)
  }, [])

  return navbarHeight
}
