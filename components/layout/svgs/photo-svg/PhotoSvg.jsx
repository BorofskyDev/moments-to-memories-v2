'use client'

import { motion, useAnimation } from 'framer-motion'
import { useId } from 'react'

function PhotoSvg() {
  const controls = useAnimation()
  const id = useId() // Generate a unique ID for this instance

  const maskVariants = {
    hidden: { r: 0 },
    visible: { r: 35 },
  }

  const handleViewportEnter = () => {
    controls.start('visible')
  }

  const handleViewportLeave = () => {
    controls.set('hidden')
  }

  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      width='80'
      height='80'
      viewBox='0 0 80 80'
      initial='hidden'
      animate={controls}
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      viewport={{ amount: 0.5 }}
    >
      <defs>
        <radialGradient id={`icon-gradient-${id}`}>
          <stop offset='50%' stopColor='hsl(var(--primary-color))' />
          <stop offset='100%' stopColor='hsl(var(--secondary-color))' />
        </radialGradient>

        <mask id={`circle-mask-${id}`}>
          <motion.circle
            cx='40'
            cy='40'
            fill='white'
            variants={maskVariants}
            initial='hidden'
            animate={controls}
            transition={{ duration: 2 }}
          />
        </mask>
      </defs>

      <motion.path
        d='M 22 19 C 20.906937 19 20 19.906937 20 21 L 20 23 C 18.35503 23 17 24.35503 17 26 L 17 46 C 17 47.64497 18.35503 49 20 49 L 20 52.5 L 24 55.5 L 24 59 C 24 60.093063 24.906937 61 26 61 L 54 61 C 55.093063 61 56 60.093063 56 59 L 56 55.5 L 60 52.5 L 60 49 C 61.64497 49 63 47.64497 63 46 L 63 26 C 63 24.35503 61.64497 23 60 23 L 60 21 C 60 19.906937 59.093063 19 58 19 L 22 19 z M 22 21 L 58 21 L 58 25 L 60 25 C 60.56503 25 61 25.43497 61 26 L 61 46 C 61 46.56503 60.56503 47 60 47 L 58 47 L 58 51.5 L 54 54.5 L 54 59 L 26 59 L 26 54.5 L 22 51.5 L 22 47 L 20 47 C 19.43497 47 19 46.56503 19 46 L 19 26 C 19 25.43497 19.43497 25 20 25 L 22 25 L 22 21 z M 24 23 A 1 1 0 0 0 23 24 A 1 1 0 0 0 24 25 A 1 1 0 0 0 25 24 A 1 1 0 0 0 24 23 z M 28 23 A 1 1 0 0 0 27 24 A 1 1 0 0 0 28 25 A 1 1 0 0 0 29 24 A 1 1 0 0 0 28 23 z M 32 23 A 1 1 0 0 0 31 24 A 1 1 0 0 0 32 25 A 1 1 0 0 0 33 24 A 1 1 0 0 0 32 23 z M 36 23 A 1 1 0 0 0 35 24 A 1 1 0 0 0 36 25 A 1 1 0 0 0 37 24 A 1 1 0 0 0 36 23 z M 40 23 A 1 1 0 0 0 39 24 A 1 1 0 0 0 40 25 A 1 1 0 0 0 41 24 A 1 1 0 0 0 40 23 z M 44 23 A 1 1 0 0 0 43 24 A 1 1 0 0 0 44 25 A 1 1 0 0 0 45 24 A 1 1 0 0 0 44 23 z M 48 23 A 1 1 0 0 0 47 24 A 1 1 0 0 0 48 25 A 1 1 0 0 0 49 24 A 1 1 0 0 0 48 23 z M 52 23 A 1 1 0 0 0 51 24 A 1 1 0 0 0 52 25 A 1 1 0 0 0 53 24 A 1 1 0 0 0 52 23 z M 56 23 A 1 1 0 0 0 55 24 A 1 1 0 0 0 56 25 A 1 1 0 0 0 57 24 A 1 1 0 0 0 56 23 z M 24 47 A 1 1 0 0 0 23 48 A 1 1 0 0 0 24 49 A 1 1 0 0 0 25 48 A 1 1 0 0 0 24 47 z M 28 47 A 1 1 0 0 0 27 48 A 1 1 0 0 0 28 49 A 1 1 0 0 0 29 48 A 1 1 0 0 0 28 47 z M 32 47 A 1 1 0 0 0 31 48 A 1 1 0 0 0 32 49 A 1 1 0 0 0 33 48 A 1 1 0 0 0 32 47 z M 36 47 A 1 1 0 0 0 35 48 A 1 1 0 0 0 36 49 A 1 1 0 0 0 37 48 A 1 1 0 0 0 36 47 z M 40 47 A 1 1 0 0 0 39 48 A 1 1 0 0 0 40 49 A 1 1 0 0 0 41 48 A 1 1 0 0 0 40 47 z M 44 47 A 1 1 0 0 0 43 48 A 1 1 0 0 0 44 49 A 1 1 0 0 0 45 48 A 1 1 0 0 0 44 47 z M 48 47 A 1 1 0 0 0 47 48 A 1 1 0 0 0 48 49 A 1 1 0 0 0 49 48 A 1 1 0 0 0 48 47 z M 52 47 A 1 1 0 0 0 51 48 A 1 1 0 0 0 52 49 A 1 1 0 0 0 53 48 A 1 1 0 0 0 52 47 z M 56 47 A 1 1 0 0 0 55 48 A 1 1 0 0 0 56 49 A 1 1 0 0 0 57 48 A 1 1 0 0 0 56 47 z M 28 54 A 1 1 0 0 0 27 55 A 1 1 0 0 0 28 56 A 1 1 0 0 0 29 55 A 1 1 0 0 0 28 54 z M 32 54 A 1 1 0 0 0 31 55 A 1 1 0 0 0 32 56 A 1 1 0 0 0 33 55 A 1 1 0 0 0 32 54 z M 36 54 A 1 1 0 0 0 35 55 A 1 1 0 0 0 36 56 A 1 1 0 0 0 37 55 A 1 1 0 0 0 36 54 z M 40 54 A 1 1 0 0 0 39 55 A 1 1 0 0 0 40 56 A 1 1 0 0 0 41 55 A 1 1 0 0 0 40 54 z M 44 54 A 1 1 0 0 0 43 55 A 1 1 0 0 0 44 56 A 1 1 0 0 0 45 55 A 1 1 0 0 0 44 54 z M 48 54 A 1 1 0 0 0 47 55 A 1 1 0 0 0 48 56 A 1 1 0 0 0 49 55 A 1 1 0 0 0 48 54 z M 52 54 A 1 1 0 0 0 51 55 A 1 1 0 0 0 52 56 A 1 1 0 0 0 53 55 A 1 1 0 0 0 52 54 z'
        fill={`url(#icon-gradient-${id})`}
        mask={`url(#circle-mask-${id})`}
      />
    </motion.svg>
  )
}

export default PhotoSvg
