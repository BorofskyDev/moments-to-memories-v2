// components/three/CarouselItem.jsx

'use client'

import { useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import Plane from './Plane'

const CarouselItem = ({
  index,
  width,
  height,
  setActivePlane,
  activePlane,
  item,
}) => {
  const meshRef = useRef()
  const [hover, setHover] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const { viewport } = useThree()
  const timeoutID = useRef()

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [activePlane, index])

  useEffect(() => {
    if (meshRef.current.material) {
      gsap.killTweensOf(meshRef.current.position)
      gsap.to(meshRef.current.position, {
        z: isActive ? 0 : -0.01,
        duration: 0.2,
        ease: 'power3.out',
        delay: isActive ? 0 : 2,
      })
    }
  }, [isActive])

  /*------------------------------
  Hover effect
  ------------------------------*/
  useEffect(() => {
    const hoverScale = hover && !isActive ? 1.1 : 1
    gsap.to(meshRef.current.scale, {
      x: hoverScale,
      y: hoverScale,
      duration: 0.5,
      ease: 'power3.out',
    })
  }, [hover, isActive])

  const handleClose = (e) => {
    e.stopPropagation()
    if (!isActive) return
    setActivePlane(null)
    setHover(false)
    clearTimeout(timeoutID.current)
    timeoutID.current = setTimeout(() => {
      // Placeholder for any closing animations or state resets
    }, 1500)
  }

  return (
    <group
      ref={meshRef}
      onClick={() => {
        setActivePlane(index)
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Plane
        width={width}
        height={height}
        texture={item.image}
        active={isActive}
      />

      {isActive && (
        <mesh position={[0, 0, 0.01]} onClick={handleClose}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
    </group>
  )
}

export default CarouselItem
