// components/three/ThreeDSlider.jsx

'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Carousel from './Carousel'
import styles from './ThreeDSlider.module.scss'
import images from '../../libs/data/images'
import * as THREE from 'three'

const ThreeDSlider = () => {
  const setBackground = (scene) => {
     console.log('Setting background to bright red')

    const root = document.documentElement
    const bgColor = getComputedStyle(root)
      .getPropertyValue('--background-color')
      .trim()
    console.log('Background color:', bgColor)

    // Remove percentage signs and parse values
    const hslValues = bgColor
      .replace(/%/g, '')
      .split(' ')
      .map((value) => parseFloat(value))
    const [h, s, l] = hslValues

    // Corrected divisions to normalize values
    const hue = h / 360
    const saturation = s / 100
    const lightness = l / 100

    console.log('Parsed HSL values:', { h, s, l })
    console.log('Normalized HSL values:', { hue, saturation, lightness })

    // Set the background color using setHSL
    scene.background = new THREE.Color()
    scene.background.setHSL(hue, saturation, lightness)
  }


  return (
    <div className={styles.sliderContainer}>
      <Canvas
        className={styles.sliderContainer__canvas}
        camera={{ position: [0, 0, 5], fov: 60 }}
        onCreated={({ scene }) => setBackground(scene)}
      >
        {/* <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} /> */}

        <Suspense fallback={null}>
          <Carousel images={images} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeDSlider
