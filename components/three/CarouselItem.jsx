// CarouselItem.jsx
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
  const [isCloseActive, setCloseActive] = useState(false)
  const { viewport } = useThree()
  const timeoutID = useRef()

  /*------------------------------
  Set Active State
  ------------------------------*/
  useEffect(() => {
    if (activePlane === index) {
      setIsActive(true)
      setCloseActive(true)
    } else {
      setIsActive(false)
    }
  }, [activePlane, index])

  /*------------------------------
  Animate Position and Scale
  ------------------------------*/
  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      gsap.killTweensOf(meshRef.current.position)
      gsap.killTweensOf(meshRef.current.scale)

      if (isActive) {
        gsap.to(meshRef.current.position, {
          x: 0,
          y: 0,
          z: 0.5, // Bring forward
          duration: 0.5,
          ease: 'power3.out',
        })
        gsap.to(meshRef.current.scale, {
          x: 1.2,
          y: 1.2,
          duration: 0.5,
          ease: 'power3.out',
        })
      } else {
        gsap.to(meshRef.current.position, {
          x: (index - activePlane) * (width + 0.1), // Adjust based on index and gap
          y: 0,
          z: -0.01, // Send back
          duration: 0.5,
          ease: 'power3.out',
        })
        gsap.to(meshRef.current.scale, {
          x: 1,
          y: 1,
          duration: 0.5,
          ease: 'power3.out',
        })
      }
    }
  }, [isActive, index, activePlane, width])

  /*------------------------------
  Hover Effect
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

  /*------------------------------
  Handle Close Click
  ------------------------------*/
  const handleClose = (e) => {
    e.stopPropagation()
    if (!isActive) return
    setActivePlane(null)
    setHover(false)
    clearTimeout(timeoutID.current)
    timeoutID.current = setTimeout(() => {
      setCloseActive(false)
    }, 1500) // Duration depends on closing animation
  }

  /*------------------------------
  Handle Click to Toggle Active
  ------------------------------*/
  const handleClick = () => {
    if (isActive) {
      setActivePlane(null)
    } else {
      setActivePlane(index)
    }
  }

  return (
    <group
      ref={meshRef}
      onClick={handleClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      renderOrder={isActive ? 1 : 0} // Ensure active planes are on top
    >
      <Plane
        width={width}
        height={height}
        texture={item.image}
        active={isActive}
      />

      {isCloseActive && (
        <mesh position={[0, 0, 0.01]} onClick={handleClose}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
    </group>
  )
}

export default CarouselItem
