// CameraSetup.jsx
'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

const CameraSetup = () => {
  const { camera, viewport } = useThree()

  useEffect(() => {
    const isMobile = viewport.width < 600
    camera.position.set(0, 0, isMobile ? 6 : 5) // Adjust Z based on device
    camera.fov = isMobile ? 60 : 50 // Adjust FOV based on device
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  }, [camera, viewport.width])

  return null
}

export default CameraSetup
