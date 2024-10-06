// components/PhotoSvg.jsx
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function NextPrevSvg({className}) {
  const id = useId() // Generate a unique ID for this instance

  return (
    <AnimatedIcon
      id={id} // Pass the ID to AnimatedIcon
      initial='hidden'
      animate='visible'
      viewport={{ once: false, amount: 0.5 }}
      animationDuration={2.5}
      className={className}
    >
      <defs>
        <linearGradient id={`icon-gradient-${id}`}>
          <stop offset='0%' stopColor='hsl(var(--primary-color))' />
          <stop offset='100%' stopColor='hsl(var(--secondary-color))' />
        </linearGradient>
      </defs>

      <path
        d="M 28 6.585938 L 19.585938 15 L 44.585938 40 L 19.585938 65 L 28 73.414063 L 61.414063 40 Z M 28 9.414063 L 58.585938 40 L 28 70.585938 L 22.414063 65 L 47.414063 40 L 22.414063 15 Z M 28 12 C 27.449219 12 27 12.449219 27 13 C 27 13.550781 27.449219 14 28 14 C 28.550781 14 29 13.550781 29 13 C 29 12.449219 28.550781 12 28 12 Z M 31 15 C 30.449219 15 30 15.449219 30 16 C 30 16.550781 30.449219 17 31 17 C 31.550781 17 32 16.550781 32 16 C 32 15.449219 31.550781 15 31 15 Z M 34 18 C 33.449219 18 33 18.449219 33 19 C 33 19.550781 33.449219 20 34 20 C 34.550781 20 35 19.550781 35 19 C 35 18.449219 34.550781 18 34 18 Z M 37 21 C 36.449219 21 36 21.449219 36 22 C 36 22.550781 36.449219 23 37 23 C 37.550781 23 38 22.550781 38 22 C 38 21.449219 37.550781 21 37 21 Z M 40 24 C 39.449219 24 39 24.449219 39 25 C 39 25.550781 39.449219 26 40 26 C 40.550781 26 41 25.550781 41 25 C 41 24.449219 40.550781 24 40 24 Z M 43 27 C 42.449219 27 42 27.449219 42 28 C 42 28.550781 42.449219 29 43 29 C 43.550781 29 44 28.550781 44 28 C 44 27.449219 43.550781 27 43 27 Z M 46 30 C 45.449219 30 45 30.449219 45 31 C 45 31.550781 45.449219 32 46 32 C 46.550781 32 47 31.550781 47 31 C 47 30.449219 46.550781 30 46 30 Z M 49 33 C 48.449219 33 48 33.449219 48 34 C 48 34.550781 48.449219 35 49 35 C 49.550781 35 50 34.550781 50 34 C 50 33.449219 49.550781 33 49 33 Z M 52 36 C 51.449219 36 51 36.449219 51 37 C 51 37.550781 51.449219 38 52 38 C 52.550781 38 53 37.550781 53 37 C 53 36.449219 52.550781 36 52 36 Z M 55 39 C 54.449219 39 54 39.449219 54 40 C 54 40.550781 54.449219 41 55 41 C 55.550781 41 56 40.550781 56 40 C 56 39.449219 55.550781 39 55 39 Z M 47 43 C 46.449219 43 46 43.449219 46 44 C 46 44.550781 46.449219 45 47 45 C 47.550781 45 48 44.550781 48 44 C 48 43.449219 47.550781 43 47 43 Z M 44 46 C 43.449219 46 43 46.449219 43 47 C 43 47.550781 43.449219 48 44 48 C 44.550781 48 45 47.550781 45 47 C 45 46.449219 44.550781 46 44 46 Z M 41 49 C 40.449219 49 40 49.449219 40 50 C 40 50.550781 40.449219 51 41 51 C 41.550781 51 42 50.550781 42 50 C 42 49.449219 41.550781 49 41 49 Z M 38 52 C 37.449219 52 37 52.449219 37 53 C 37 53.550781 37.449219 54 38 54 C 38.550781 54 39 53.550781 39 53 C 39 52.449219 38.550781 52 38 52 Z M 35 55 C 34.449219 55 34 55.449219 34 56 C 34 56.550781 34.449219 57 35 57 C 35.550781 57 36 56.550781 36 56 C 36 55.449219 35.550781 55 35 55 Z M 32 58 C 31.449219 58 31 58.449219 31 59 C 31 59.550781 31.449219 60 32 60 C 32.550781 60 33 59.550781 33 59 C 33 58.449219 32.550781 58 32 58 Z M 29 61 C 28.449219 61 28 61.449219 28 62 C 28 62.550781 28.449219 63 29 63 C 29.550781 63 30 62.550781 30 62 C 30 61.449219 29.550781 61 29 61 Z M 26 64 C 25.449219 64 25 64.449219 25 65 C 25 65.550781 25.449219 66 26 66 C 26.550781 66 27 65.550781 27 65 C 27 64.449219 26.550781 64 26 64 Z"
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1} // Increase strokeWidth for visibility
      />
    </AnimatedIcon>
  )
}

export default NextPrevSvg

