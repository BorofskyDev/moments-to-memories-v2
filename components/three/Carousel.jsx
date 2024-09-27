// Carousel.jsx
'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import CarouselItem from './CarouselItem'
import { lerp, getPiramidalIndex } from './utils'
import PostProcessing from './PostProcessing' // Ensure this component is correctly implemented

/*------------------------------
Plane Settings
------------------------------*/
const PlaneSettings = {
  width: 1,
  height: 2.5,
  gap: 0.1,
}

/*------------------------------
Gsap Defaults
------------------------------*/
gsap.defaults({
  duration: 2.5,
  ease: 'power3.out',
})

/*------------------------------
PlaneEvents Component
------------------------------*/
const PlaneEvents = ({
  onWheel,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
}) => {
  const { viewport } = useThree()

  return (
    <mesh
      position={[0, 0, -0.01]}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  )
}

/*------------------------------
Carousel Component
------------------------------*/
const Carousel = ({ images }) => {
  const [root, setRoot] = useState(null)
  const postRef = useRef()

  const [activePlane, setActivePlane] = useState(null)

  /*--------------------
  Variables
  --------------------*/
  const progress = useRef(0)
  const startX = useRef(0)
  const isDown = useRef(false)
  const speedWheel = 0.02
  const speedDrag = -0.3
  const oldProgress = useRef(0)
  const speedRef = useRef(0)

  const items = useMemo(() => {
    return root ? Array.from(root.children) : []
  }, [root])

  /*--------------------
  Display Items
  --------------------*/
  const displayItems = (item, index, active) => {
    const piramidalIndex = getPiramidalIndex(items, active)[index]
    gsap.to(item.position, {
      x: (index - active) * (PlaneSettings.width + PlaneSettings.gap),
      y: items.length * -0.1 + piramidalIndex * 0.1,
      duration: 0.5,
      ease: 'power3.out',
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
    speedRef.current = lerp(
      speedRef.current,
      Math.abs(oldProgress.current - progress.current),
      0.1
    )

    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1)

    if (postRef.current) {
      postRef.current.thickness = speedRef.current
    }
  })

  /*--------------------
  Event Handlers
  --------------------*/
  const handleWheel = (e) => {
    if (activePlane !== null) return // Only allow scroll if no plane is active
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX)
    const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX
    progress.current += wheelProgress * speedWheel
  }

  const handleDown = (e) => {
    if (activePlane !== null) return // Prevent dragging if a plane is active
    isDown.current = true
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
  }

  const handleUp = () => {
    isDown.current = false
  }

  const handleMove = (e) => {
    if (activePlane !== null || !isDown.current) return // Prevent moving if a plane is active
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX.current) * speedDrag
    progress.current += mouseProgress
    startX.current = x
  }

  /*--------------------
  Click Handling
  --------------------*/
  useEffect(() => {
    if (!items) return
    if (activePlane !== null) {
      progress.current = (activePlane / (items.length - 1)) * 100 // Update progress based on activePlane
    }
  }, [activePlane, items])

  /*--------------------
  Render Slider
  --------------------*/
  const renderSlider = () => {
    return (
      <group ref={setRoot}>
        {images.map((image, index) => (
          <CarouselItem
            width={PlaneSettings.width}
            height={PlaneSettings.height}
            setActivePlane={setActivePlane}
            activePlane={activePlane}
            key={index} // Use index as key; ensure images are static
            item={{ image }}
            index={index}
          />
        ))}
      </group>
    )
  }

  return (
    <group>
      <PlaneEvents
        onWheel={handleWheel}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerLeave={handleUp}
        onPointerCancel={handleUp}
      />
      {renderSlider()}
      <PostProcessing ref={postRef} />
    </group>
  )
}

export default Carousel
