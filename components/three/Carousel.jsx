// components/three/Carousel.jsx

'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { usePrevious } from 'react-use'
import gsap from 'gsap'
import CarouselItem from './CarouselItem'
import { lerp, getPiramidalIndex } from './utils'
import PostProcessing from './PostProcessing'

const Carousel = ({ images }) => {
  console.log('Carousel images:', images) // Debugging line

  const rootRef = useRef()
  const postRef = useRef()

  const [activePlane, setActivePlane] = useState(null)
  const prevActivePlane = usePrevious(activePlane)
  const { viewport } = useThree()

  /*--------------------
  Variables
  --------------------*/
  const progress = useRef(0)
  const startX = useRef(0)
  const isDown = useRef(false)
  const speedWheel = 0.02
  const speedDrag = -0.3
  const oldProgress = useRef(0)
  const speed = useRef(0)

  const items = useMemo(() => {
    return rootRef.current ? Array.from(rootRef.current.children) : []
  }, [rootRef.current])

  /*--------------------
  Display Items
  --------------------*/
  const displayItems = (item, index, active) => {
    const piramidalIndex = getPiramidalIndex(items, active)[index]
    gsap.to(item.position, {
      x: (index - active) * 1.1, // Adjust based on plane width and gap
      y: items.length * -0.1 + piramidalIndex * 0.1,
    })
  }

  /*--------------------
  Animation Frame
  --------------------*/
  useFrame(() => {
    if (!items || items.length === 0) return

    progress.current = Math.max(0, Math.min(progress.current, 100))

    const active = Math.floor((progress.current / 100) * (items.length - 1))
    items.forEach((item, index) => displayItems(item, index, active))
    speed.current = lerp(
      speed.current,
      Math.abs(oldProgress.current - progress.current),
      0.1
    )

    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1)

    if (postRef.current) {
      postRef.current.thickness = speed.current
    }
  })

  /*--------------------
  Event Handlers
  --------------------*/
  const handleWheel = (e) => {
    if (activePlane !== null) return
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX)
    const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX
    progress.current += wheelProgress * speedWheel
  }

  const handleDown = (e) => {
    if (activePlane !== null) return
    isDown.current = true
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
  }

  const handleUp = () => {
    isDown.current = false
  }

  const handleMove = (e) => {
    if (activePlane !== null || !isDown.current) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX.current) * speedDrag
    progress.current += mouseProgress
    startX.current = x
  }

  /*--------------------
  Click Handler
  --------------------*/
  useEffect(() => {
    if (!items) return
    if (activePlane !== null && prevActivePlane === null) {
      progress.current = (activePlane / (items.length - 1)) * 100
    }
  }, [activePlane, items, prevActivePlane])

  /*--------------------
  Render Plane Events
  --------------------*/
  const renderPlaneEvents = () => {
    return (
      <mesh
        position={[0, 0, -0.01]}
        onWheel={handleWheel}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerLeave={handleUp}
        onPointerCancel={handleUp}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    )
  }

  /*--------------------
  Render Slider
  --------------------*/
  const renderSlider = () => {
    return (
      <group ref={rootRef}>
        {images.map((image, index) => (
          <CarouselItem
            width={1}
            height={2.5}
            setActivePlane={setActivePlane}
            activePlane={activePlane}
            key={index}
            item={{ image }}
            index={index}
          />
        ))}
      </group>
    )
  }

  return (
    <group>
      {renderPlaneEvents()}
      {renderSlider()}
      <PostProcessing ref={postRef} /> {/* Re-add PostProcessing */}
    </group>
  )
}

export default Carousel
