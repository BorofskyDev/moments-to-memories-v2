

'use client'

import React, { forwardRef } from 'react'
import { useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { Color } from 'three'

const PostProcessing = forwardRef(({ ...props }, ref) => {
  const { viewport } = useThree()

  const active = true
  const ior = 0.9

  // Function to retrieve and parse the CSS variable
  const getBackgroundColor = () => {
    const root = document.documentElement
    const bgColor = getComputedStyle(root)
      .getPropertyValue('--background-color')
      .trim()
    const hslValues = bgColor
      .replace(/%/g, '') // Remove percentage signs
      .split(' ') // Split by space
      .map((value) => parseFloat(value)) // Convert to numbers
    const [h, s, l] = hslValues

    const hue = h / 360
    const saturation = s / 100
    const lightness = l / 100

    return { hue, saturation, lightness }
  }

  const { hue, saturation, lightness } = getBackgroundColor()
  console.log('PostProcessing HSL:', { hue, saturation, lightness })

  // Create a color based on HSL
  const backgroundColor = new Color()
  backgroundColor.setHSL(hue, saturation, lightness)

  return active ? (
    <mesh position={[0, 0, 0.5]} {...props}>
      {' '}
      {/* Adjusted position to avoid blocking scene */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      <MeshTransmissionMaterial
        ref={ref}
        background={backgroundColor}
        transmission={0.5} // Reduced transmission to avoid excessive transparency
        roughness={0.1} // Slight roughness to prevent perfect reflections
        thickness={0.3} // Adjusted thickness
        chromaticAberration={0.04} // Reduced chromatic aberration
        anisotropy={0.1} // Added slight anisotropy
        ior={ior}
      />
    </mesh>
  ) : null
})

PostProcessing.displayName = 'PostProcessing'

export default PostProcessing
