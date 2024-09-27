import React, { forwardRef } from 'react'
import { useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { Color } from 'three'

const PostProcessing = forwardRef((_, ref) => {
  const { viewport } = useThree()

  const root = document.documentElement
  const bgColor = getComputedStyle(root)
    .getPropertyValue('--background-color')
    .trim()
  const [h, s, l] = bgColor
    .replace(/%/g, '')
    .split(' ')
    .map((value) => parseFloat(value))

  const hue = h / 360
  const saturation = s / 100
  const lightness = l / 100

  const backgroundColor = new Color()
  backgroundColor.setHSL(hue, saturation, lightness)

  return (
    <mesh position={[0, 0, -1]} renderOrder={-1}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <MeshTransmissionMaterial
        ref={ref}
        background={backgroundColor}
        transmission={0}
        roughness={0.1}
        thickness={0.3}
        chromaticAberration={0.02}
        anisotropy={0.05}
        opacity={0}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  )
})

PostProcessing.displayName = 'PostProcessing'

export default PostProcessing
