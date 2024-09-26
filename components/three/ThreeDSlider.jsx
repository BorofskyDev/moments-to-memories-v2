// components/three/ThreeDSlider.jsx

'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Carousel from './Carousel'
import PostProcessing from './PostProcessing'
import styles from './ThreeDSlider.module.scss'
import images from '../../libs/data/images'
import * as THREE from 'three'

const ThreeDSlider = () => {
  const setBackground = (scene) => {
    const root = document.documentElement
    const bgColor = getComputedStyle(root)
      .getPropertyValue('--background-color')
      .trim()
    console.log('Background color:', bgColor)

    // Remove percentage signs and parse values
    const hslValues = bgColor
      .replace(/%/g, '') // Remove all '%' characters
      .split(' ') // Split by space since the value is '0 0% 11%'
      .map((value) => parseFloat(value)) // Convert strings to numbers

    const [h, s, l] = hslValues
    console.log('Parsed HSL values:', { h, s, l })

    // Normalize the HSL values to [0, 1] range
    const hue = h / 360 // Hue: 0 to 1
    const saturation = s / 100 // Saturation: 0 to 1
    const lightness = l / 100 // Lightness: 0 to 1
    console.log('Normalized HSL values:', { hue, saturation, lightness })

    // Set the background color using setHSL
    scene.background = new THREE.Color()
    scene.background.setHSL(hue, saturation, lightness)
    console.log('Scene background set to:', scene.background)
  }

  return (
    <div className={styles.sliderContainer}>
      <Canvas
        className={styles.sliderContainer__canvas}
        camera={{ position: [0, 0, 5], fov: 60 }}
        onCreated={({ scene }) => setBackground(scene)}
        gl={{ antialias: true, alpha: false }} // Ensure opaque background
      >
        {/* Add ambient and point lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <Suspense fallback={null}>
          <Carousel images={images} />
          <PostProcessing /> {/* Re-add PostProcessing here */}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeDSlider
