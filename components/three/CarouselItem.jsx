// CarouselItem.jsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import Plane from './Plane'
import { getImageDimensions } from './utils'

const CarouselItem = ({
  index,
  width,
  height,
  setActivePlane,
  activePlane,
  item,
  gap, // Dynamic gap
}) => {
  const meshRef = useRef()
  const [hover, setHover] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isCloseActive, setCloseActive] = useState(false)
  const [imageSize, setImageSize] = useState({ width, height }) // State to hold image dimensions
  const { viewport } = useThree()
  const timeoutID = useRef()

  /*------------------------------
  Fetch and Set Image Dimensions
  ------------------------------*/
  useEffect(() => {
    if (!item || !item.image) {
      console.warn(
        `CarouselItem: 'item' or 'item.image' is undefined for index ${index}`
      )
      return
    }

    const fetchDimensions = async () => {
      try {
        const dims = await getImageDimensions(item.image)
        const aspectRatio = dims.width / dims.height
        // Adjust plane dimensions to maintain aspect ratio
        let adjustedWidth = width
        let adjustedHeight = height
        if (aspectRatio > 1) {
          // Landscape
          adjustedHeight = width / aspectRatio
        } else if (aspectRatio < 1) {
          // Portrait
          adjustedWidth = height * aspectRatio
        }
        setImageSize({ width: adjustedWidth, height: adjustedHeight })
      } catch (error) {
        console.error(
          `Error fetching image dimensions for ${item.image}:`,
          error
        )
      }
    }

    fetchDimensions()
  }, [item, width, height, index])

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
          duration: 2.5, // 2.5 seconds on open
          ease: 'power3.out',
        })
        gsap.to(meshRef.current.scale, {
          x: 1.2,
          y: 1.2,
          duration: 2.5, // 2.5 seconds on open
          ease: 'power3.out',
        })
      } else {
        gsap.to(meshRef.current.position, {
          x: (index - activePlane) * (width + gap), // Use dynamic gap
          y: 0,
          z: -0.01, // Send back
          duration: 1, // 1 second on close
          ease: 'power3.out',
        })
        gsap.to(meshRef.current.scale, {
          x: 1,
          y: 1,
          duration: 1, // 1 second on close
          ease: 'power3.out',
        })
      }
    }
  }, [isActive, index, activePlane, width, gap])

  /*------------------------------
  Hover Effect
  ------------------------------*/
  useEffect(() => {
    if (!meshRef.current) return
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
    }, 1000) // Match with close duration
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
      {/* Only render Plane if imageSize is set */}
      {imageSize && imageSize.width && imageSize.height && (
        <Plane
          width={imageSize.width}
          height={imageSize.height}
          texture={item.image}
          active={isActive}
        />
      )}

      {/* Overlay to handle closing */}
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
