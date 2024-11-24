// useIsMobile.js
import { useState, useEffect } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        // 80rem in pixels
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away to set the initial state
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

export default useIsMobile
