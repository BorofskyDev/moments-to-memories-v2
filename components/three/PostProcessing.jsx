// components/three/PostProcessing.jsx

'use client'

import React, { forwardRef } from 'react'
import { useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

const PostProcessing = forwardRef(({ ...props }, ref) => {
  const { viewport } = useThree()

  const active = true
  const ior = 0.9

  // Retrieve and parse the CSS variable
  const getBackgroundColor = () => {
    const root = document.documentElement
    const bgColor = getComputedStyle(root)
      .getPropertyValue('--background-color')
      .trim()

    // Remove percentage signs and parse values
    const hslValues = bgColor
      .replace(/%/g, '')
      .split(' ')
      .map((value) => parseFloat(value))
    const [h, s, l] = hslValues

    // Convert h, s, l values to the range expected by THREE.Color.setHSL
    const hue = h / 360 // Hue between 0 and 1
    const saturation = s / 100 // Saturation between 0 and 1
    const lightness = l / 100 // Lightness between 0 and 1

    // Create and return the THREE.Color object
    const color = new THREE.Color()
    color.setHSL(hue, saturation, lightness)
    return color
  }

  // Get the background color
  const backgroundColor = getBackgroundColor()

  return active ? (
    <mesh position={[0, 0, 1]} {...props}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <MeshTransmissionMaterial
        ref={ref}
        background={backgroundColor}
        transmission={0.7}
        roughness={0}
        thickness={0}
        chromaticAberration={0.06}
        anisotropy={0}
        ior={ior}
      />
    </mesh>
  ) : null
})

PostProcessing.displayName = 'PostProcessing'

export default PostProcessing
