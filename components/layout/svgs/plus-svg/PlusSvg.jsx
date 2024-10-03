// components/PhotoSvg.jsx
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function PlusSvg() {
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
        d='M 34 7 L 34 34 L 7 34 L 7 46 L 34 46 L 34 73 L 46 73 L 46 46 L 73 46 L 73 34 L 46 34 L 46 7 Z M 36 9 L 44 9 L 44 36 L 71 36 L 71 44 L 44 44 L 44 71 L 36 71 L 36 44 L 9 44 L 9 36 L 36 36 Z M 12 40 C 11.449219 40 11 40.449219 11 41 C 11 41.550781 11.449219 42 12 42 C 12.550781 42 13 41.550781 13 41 C 13 40.449219 12.550781 40 12 40 Z M 16 40 C 15.449219 40 15 40.449219 15 41 C 15 41.550781 15.449219 42 16 42 C 16.550781 42 17 41.550781 17 41 C 17 40.449219 16.550781 40 16 40 Z M 20 40 C 19.449219 40 19 40.449219 19 41 C 19 41.550781 19.449219 42 20 42 C 20.550781 42 21 41.550781 21 41 C 21 40.449219 20.550781 40 20 40 Z M 24 40 C 23.449219 40 23 40.449219 23 41 C 23 41.550781 23.449219 42 24 42 C 24.550781 42 25 41.550781 25 41 C 25 40.449219 24.550781 40 24 40 Z M 28 40 C 27.449219 40 27 40.449219 27 41 C 27 41.550781 27.449219 42 28 42 C 28.550781 42 29 41.550781 29 41 C 29 40.449219 28.550781 40 28 40 Z M 32 40 C 31.449219 40 31 40.449219 31 41 C 31 41.550781 31.449219 42 32 42 C 32.550781 42 33 41.550781 33 41 C 33 40.449219 32.550781 40 32 40 Z M 48 40 C 47.449219 40 47 40.449219 47 41 C 47 41.550781 47.449219 42 48 42 C 48.550781 42 49 41.550781 49 41 C 49 40.449219 48.550781 40 48 40 Z M 52 40 C 51.449219 40 51 40.449219 51 41 C 51 41.550781 51.449219 42 52 42 C 52.550781 42 53 41.550781 53 41 C 53 40.449219 52.550781 40 52 40 Z M 56 40 C 55.449219 40 55 40.449219 55 41 C 55 41.550781 55.449219 42 56 42 C 56.550781 42 57 41.550781 57 41 C 57 40.449219 56.550781 40 56 40 Z M 60 40 C 59.449219 40 59 40.449219 59 41 C 59 41.550781 59.449219 42 60 42 C 60.550781 42 61 41.550781 61 41 C 61 40.449219 60.550781 40 60 40 Z M 64 40 C 63.449219 40 63 40.449219 63 41 C 63 41.550781 63.449219 42 64 42 C 64.550781 42 65 41.550781 65 41 C 65 40.449219 64.550781 40 64 40 Z M 68 40 C 67.449219 40 67 40.449219 67 41 C 67 41.550781 67.449219 42 68 42 C 68.550781 42 69 41.550781 69 41 C 69 40.449219 68.550781 40 68 40 Z M 38 67 C 37.449219 67 37 67.449219 37 68 C 37 68.550781 37.449219 69 38 69 C 38.550781 69 39 68.550781 39 68 C 39 67.449219 38.550781 67 38 67 Z M 42 67 C 41.449219 67 41 67.449219 41 68 C 41 68.550781 41.449219 69 42 69 C 42.550781 69 43 68.550781 43 68 C 43 67.449219 42.550781 67 42 67 Z'
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1}
      />
    </AnimatedIcon>
  )
}

export default PlusSvg