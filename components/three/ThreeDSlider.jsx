// ThreeDSlider.jsx
'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Carousel from './Carousel'
import styles from './ThreeDSlider.module.scss'
import images from '../../libs/data/images' // Ensure this path is correct
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const ThreeDSlider = () => {
  return (
    <div className={styles.sliderContainer}>
      <Canvas
        className={styles.sliderContainer__canvas}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Carousel images={images} />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.85}
              luminanceSmoothing={0.6}
              intensity={0.3}
              height={300}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeDSlider
