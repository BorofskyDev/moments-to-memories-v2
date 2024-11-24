// components/galleries/three-d-gallery/ThreeDGallery.jsx

'use client'

import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import PropTypes from 'prop-types'
import styles from './ThreeDGallery.module.scss'
import { LinearFilter } from 'three' // Import LinearFilter

const ImagePlane = ({
  url,
  position,
  index,
  selectedIndex,
  setSelectedIndex,
}) => {
  const meshRef = useRef()
  const texture = useTexture(url)

  // Adjust texture filtering for sharpness
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.generateMipmaps = false

  const isSelected = selectedIndex === index

  // Randomize floating parameters
  const [floatSpeed] = useState(() => Math.random() * 0.5 + 0.5) // Speed between 0.5 and 1.0
  const [floatOffset] = useState(() => Math.random() * Math.PI * 2) // Random initial phase

  useFrame(({ clock }) => {
    if (meshRef.current && !isSelected) {
      // Update the y position to create floating effect
      const t = clock.getElapsedTime()
      meshRef.current.position.y =
        position[1] + Math.sin(t * floatSpeed + floatOffset) * 0.05
    }
  })

  const { position: animatedPosition, scale } = useSpring({
    position: isSelected ? [0, 0, 2] : position,
    scale: isSelected ? [4.5, 4.5, 1] : [1.5, 1.5, 1], // Adjusted scales
    config: { mass: 1, tension: 280, friction: 60 },
  })

  const handleClick = () => {
    setSelectedIndex(isSelected ? null : index)
  }

  return (
    <a.mesh
      ref={meshRef}
      position={animatedPosition}
      scale={scale}
      onClick={handleClick}
      castShadow // Enable casting shadows
      receiveShadow // Enable receiving shadows
    >
      <planeGeometry args={[1.5, 1.5]} /> {/* Increased size */}
      <a.meshStandardMaterial map={texture} />
    </a.mesh>
  )
}

const ThreeDGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const maxColumns = 3
  const columns = Math.min(images.length, maxColumns)
  const rows = Math.ceil(images.length / columns)
  const spacing = 2 // Adjusted spacing to accommodate larger images

  return (
    <div className={styles.galleryContainer}>
      <Canvas
        shadows // Enable shadows
        camera={{ position: [0, 0, 15], fov: 60 }} // Moved camera back
        className={styles.canvas}
      >
        {/* Ambient light for general illumination */}
        <ambientLight intensity={0.5} />

        {/* Directional light for shadows */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Ground plane to receive shadows */}
        <mesh
          position={[0, -5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0.5} />
        </mesh>

        <Suspense fallback={null}>
          {images.map((url, index) => {
            const x = (index % columns) - (columns - 1) / 2
            const y = -Math.floor(index / columns) + (rows - 1) / 2
            const position = [x * spacing, y * spacing, 0]
            return (
              <ImagePlane
                key={index}
                url={url}
                position={position}
                index={index}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            )
          })}
        </Suspense>
      </Canvas>
    </div>
  )
}

ThreeDGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ThreeDGallery
