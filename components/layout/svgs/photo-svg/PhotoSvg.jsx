// components/PhotoSvg.jsx
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function PhotoSvg() {
  const id = useId() // Generate a unique ID for this instance

  return (
    <AnimatedIcon
      id={id} // Pass the ID to AnimatedIcon
      initial='hidden'
      animate='visible'
      viewport={{ once: false, amount: 0.5 }}
      animationDuration={2.5}
    >
      <defs>
        <linearGradient id={`icon-gradient-${id}`}>
          <stop offset='0%' stopColor='hsl(var(--primary-color))' />
          <stop offset='100%' stopColor='hsl(var(--secondary-color))' />
        </linearGradient>
      </defs>

      <path
        d='M 26 9 C 24.906937 9 24 9.9069372 24 11 L 24 13 C 22.35503 13 21 14.35503 21 16 L 21 32 C 21 33.64497 22.35503 35 24 35 L 24 37.416016 C 22.893306 37.85942 22 38.743378 22 40 L 22 51 C 22 52.256622 22.893306 53.14058 24 53.583984 L 24 59.351562 L 28 64.351562 L 28 69 C 28 70.093063 28.906937 71 30 71 L 50 71 C 51.093063 71 52 70.093063 52 69 L 52 64.351562 L 56 59.351562 L 56 53.583984 C 57.106694 53.14058 58 52.256622 58 51 L 58 40 C 58 38.743378 57.106694 37.85942 56 37.416016 L 56 35 C 57.64497 35 59 33.64497 59 32 L 59 16 C 59 14.35503 57.64497 13 56 13 L 56 11 C 56 9.9069372 55.093063 9 54 9 L 26 9 z M 26 11 L 54 11 L 54 15 L 56 15 C 56.56503 15 57 15.43497 57 16 L 57 32 C 57 32.56503 56.56503 33 56 33 L 54 33 L 54 39 L 55 39 C 55.56503 39 56 39.43497 56 40 L 56 51 C 56 51.56503 55.56503 52 55 52 L 54 52 L 54 58.648438 L 50 63.648438 L 50 69 L 30 69 L 30 63.648438 L 26 58.648438 L 26 52 L 25 52 C 24.43497 52 24 51.56503 24 51 L 24 40 C 24 39.43497 24.43497 39 25 39 L 26 39 L 26 33 L 24 33 C 23.43497 33 23 32.56503 23 32 L 23 16 C 23 15.43497 23.43497 15 24 15 L 26 15 L 26 11 z M 28 13 A 1 1 0 0 0 27 14 A 1 1 0 0 0 28 15 A 1 1 0 0 0 29 14 A 1 1 0 0 0 28 13 z M 32 13 A 1 1 0 0 0 31 14 A 1 1 0 0 0 32 15 A 1 1 0 0 0 33 14 A 1 1 0 0 0 32 13 z M 36 13 A 1 1 0 0 0 35 14 A 1 1 0 0 0 36 15 A 1 1 0 0 0 37 14 A 1 1 0 0 0 36 13 z M 40 13 A 1 1 0 0 0 39 14 A 1 1 0 0 0 40 15 A 1 1 0 0 0 41 14 A 1 1 0 0 0 40 13 z M 44 13 A 1 1 0 0 0 43 14 A 1 1 0 0 0 44 15 A 1 1 0 0 0 45 14 A 1 1 0 0 0 44 13 z M 48 13 A 1 1 0 0 0 47 14 A 1 1 0 0 0 48 15 A 1 1 0 0 0 49 14 A 1 1 0 0 0 48 13 z M 52 13 A 1 1 0 0 0 51 14 A 1 1 0 0 0 52 15 A 1 1 0 0 0 53 14 A 1 1 0 0 0 52 13 z M 28 33 A 1 1 0 0 0 27 34 A 1 1 0 0 0 28 35 A 1 1 0 0 0 29 34 A 1 1 0 0 0 28 33 z M 32 33 A 1 1 0 0 0 31 34 A 1 1 0 0 0 32 35 A 1 1 0 0 0 33 34 A 1 1 0 0 0 32 33 z M 36 33 A 1 1 0 0 0 35 34 A 1 1 0 0 0 36 35 A 1 1 0 0 0 37 34 A 1 1 0 0 0 36 33 z M 40 33 A 1 1 0 0 0 39 34 A 1 1 0 0 0 40 35 A 1 1 0 0 0 41 34 A 1 1 0 0 0 40 33 z M 44 33 A 1 1 0 0 0 43 34 A 1 1 0 0 0 44 35 A 1 1 0 0 0 45 34 A 1 1 0 0 0 44 33 z M 48 33 A 1 1 0 0 0 47 34 A 1 1 0 0 0 48 35 A 1 1 0 0 0 49 34 A 1 1 0 0 0 48 33 z M 52 33 A 1 1 0 0 0 51 34 A 1 1 0 0 0 52 35 A 1 1 0 0 0 53 34 A 1 1 0 0 0 52 33 z M 28 37 A 1 1 0 0 0 27 38 A 1 1 0 0 0 28 39 A 1 1 0 0 0 29 38 A 1 1 0 0 0 28 37 z M 32 37 A 1 1 0 0 0 31 38 A 1 1 0 0 0 32 39 A 1 1 0 0 0 33 38 A 1 1 0 0 0 32 37 z M 36 37 A 1 1 0 0 0 35 38 A 1 1 0 0 0 36 39 A 1 1 0 0 0 37 38 A 1 1 0 0 0 36 37 z M 40 37 A 1 1 0 0 0 39 38 A 1 1 0 0 0 40 39 A 1 1 0 0 0 41 38 A 1 1 0 0 0 40 37 z M 44 37 A 1 1 0 0 0 43 38 A 1 1 0 0 0 44 39 A 1 1 0 0 0 45 38 A 1 1 0 0 0 44 37 z M 48 37 A 1 1 0 0 0 47 38 A 1 1 0 0 0 48 39 A 1 1 0 0 0 49 38 A 1 1 0 0 0 48 37 z M 52 37 A 1 1 0 0 0 51 38 A 1 1 0 0 0 52 39 A 1 1 0 0 0 53 38 A 1 1 0 0 0 52 37 z M 28 52 A 1 1 0 0 0 27 53 A 1 1 0 0 0 28 54 A 1 1 0 0 0 29 53 A 1 1 0 0 0 28 52 z M 32 52 A 1 1 0 0 0 31 53 A 1 1 0 0 0 32 54 A 1 1 0 0 0 33 53 A 1 1 0 0 0 32 52 z M 36 52 A 1 1 0 0 0 35 53 A 1 1 0 0 0 36 54 A 1 1 0 0 0 37 53 A 1 1 0 0 0 36 52 z M 40 52 A 1 1 0 0 0 39 53 A 1 1 0 0 0 40 54 A 1 1 0 0 0 41 53 A 1 1 0 0 0 40 52 z M 44 52 A 1 1 0 0 0 43 53 A 1 1 0 0 0 44 54 A 1 1 0 0 0 45 53 A 1 1 0 0 0 44 52 z M 48 52 A 1 1 0 0 0 47 53 A 1 1 0 0 0 48 54 A 1 1 0 0 0 49 53 A 1 1 0 0 0 48 52 z M 52 52 A 1 1 0 0 0 51 53 A 1 1 0 0 0 52 54 A 1 1 0 0 0 53 53 A 1 1 0 0 0 52 52 z M 32 63 A 1 1 0 0 0 31 64 A 1 1 0 0 0 32 65 A 1 1 0 0 0 33 64 A 1 1 0 0 0 32 63 z M 36 63 A 1 1 0 0 0 35 64 A 1 1 0 0 0 36 65 A 1 1 0 0 0 37 64 A 1 1 0 0 0 36 63 z M 40 63 A 1 1 0 0 0 39 64 A 1 1 0 0 0 40 65 A 1 1 0 0 0 41 64 A 1 1 0 0 0 40 63 z M 44 63 A 1 1 0 0 0 43 64 A 1 1 0 0 0 44 65 A 1 1 0 0 0 45 64 A 1 1 0 0 0 44 63 z M 48 63 A 1 1 0 0 0 47 64 A 1 1 0 0 0 48 65 A 1 1 0 0 0 49 64 A 1 1 0 0 0 48 63 z'
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1} // Increase strokeWidth for visibility
      />
    </AnimatedIcon>
  )
}

export default PhotoSvg
