// components/PhotoSvg.jsx
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function CancelSvg() {
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
        d='M 18.785156 8.890625 L 8.890625 18.785156 L 30.101563 40 L 8.890625 61.214844 L 18.785156 71.109375 L 40 49.898438 L 61.214844 71.109375 L 71.109375 61.214844 L 49.898438 40 L 71.109375 18.785156 L 70.40625 18.078125 L 61.214844 8.890625 L 40 30.101563 Z M 18.785156 11.71875 L 40 32.929688 L 61.214844 11.71875 L 68.28125 18.785156 L 47.070313 40 L 68.28125 61.214844 L 61.214844 68.28125 L 40 47.070313 L 18.785156 68.28125 L 11.71875 61.214844 L 32.929688 40 L 11.71875 18.785156 Z M 19 15 C 18.449219 15 18 15.449219 18 16 C 18 16.550781 18.449219 17 19 17 C 19.550781 17 20 16.550781 20 16 C 20 15.449219 19.550781 15 19 15 Z M 61 15 C 60.449219 15 60 15.449219 60 16 C 60 16.550781 60.449219 17 61 17 C 61.550781 17 62 16.550781 62 16 C 62 15.449219 61.550781 15 61 15 Z M 22 18 C 21.449219 18 21 18.449219 21 19 C 21 19.550781 21.449219 20 22 20 C 22.550781 20 23 19.550781 23 19 C 23 18.449219 22.550781 18 22 18 Z M 58 18 C 57.449219 18 57 18.449219 57 19 C 57 19.550781 57.449219 20 58 20 C 58.550781 20 59 19.550781 59 19 C 59 18.449219 58.550781 18 58 18 Z M 25 21 C 24.449219 21 24 21.449219 24 22 C 24 22.550781 24.449219 23 25 23 C 25.550781 23 26 22.550781 26 22 C 26 21.449219 25.550781 21 25 21 Z M 55 21 C 54.449219 21 54 21.449219 54 22 C 54 22.550781 54.449219 23 55 23 C 55.550781 23 56 22.550781 56 22 C 56 21.449219 55.550781 21 55 21 Z M 28 24 C 27.449219 24 27 24.449219 27 25 C 27 25.550781 27.449219 26 28 26 C 28.550781 26 29 25.550781 29 25 C 29 24.449219 28.550781 24 28 24 Z M 52 24 C 51.449219 24 51 24.449219 51 25 C 51 25.550781 51.449219 26 52 26 C 52.550781 26 53 25.550781 53 25 C 53 24.449219 52.550781 24 52 24 Z M 31 27 C 30.449219 27 30 27.449219 30 28 C 30 28.550781 30.449219 29 31 29 C 31.550781 29 32 28.550781 32 28 C 32 27.449219 31.550781 27 31 27 Z M 49 27 C 48.449219 27 48 27.449219 48 28 C 48 28.550781 48.449219 29 49 29 C 49.550781 29 50 28.550781 50 28 C 50 27.449219 49.550781 27 49 27 Z M 34 30 C 33.449219 30 33 30.449219 33 31 C 33 31.550781 33.449219 32 34 32 C 34.550781 32 35 31.550781 35 31 C 35 30.449219 34.550781 30 34 30 Z M 46 30 C 45.449219 30 45 30.449219 45 31 C 45 31.550781 45.449219 32 46 32 C 46.550781 32 47 31.550781 47 31 C 47 30.449219 46.550781 30 46 30 Z M 37 33 C 36.449219 33 36 33.449219 36 34 C 36 34.550781 36.449219 35 37 35 C 37.550781 35 38 34.550781 38 34 C 38 33.449219 37.550781 33 37 33 Z M 43 33 C 42.449219 33 42 33.449219 42 34 C 42 34.550781 42.449219 35 43 35 C 43.550781 35 44 34.550781 44 34 C 44 33.449219 43.550781 33 43 33 Z M 40 36 C 39.449219 36 39 36.449219 39 37 C 39 37.550781 39.449219 38 40 38 C 40.550781 38 41 37.550781 41 37 C 41 36.449219 40.550781 36 40 36 Z M 33 43 C 32.449219 43 32 43.449219 32 44 C 32 44.550781 32.449219 45 33 45 C 33.550781 45 34 44.550781 34 44 C 34 43.449219 33.550781 43 33 43 Z M 47 43 C 46.449219 43 46 43.449219 46 44 C 46 44.550781 46.449219 45 47 45 C 47.550781 45 48 44.550781 48 44 C 48 43.449219 47.550781 43 47 43 Z M 30 46 C 29.449219 46 29 46.449219 29 47 C 29 47.550781 29.449219 48 30 48 C 30.550781 48 31 47.550781 31 47 C 31 46.449219 30.550781 46 30 46 Z M 50 46 C 49.449219 46 49 46.449219 49 47 C 49 47.550781 49.449219 48 50 48 C 50.550781 48 51 47.550781 51 47 C 51 46.449219 50.550781 46 50 46 Z M 27 49 C 26.449219 49 26 49.449219 26 50 C 26 50.550781 26.449219 51 27 51 C 27.550781 51 28 50.550781 28 50 C 28 49.449219 27.550781 49 27 49 Z M 53 49 C 52.449219 49 52 49.449219 52 50 C 52 50.550781 52.449219 51 53 51 C 53.550781 51 54 50.550781 54 50 C 54 49.449219 53.550781 49 53 49 Z M 24 52 C 23.449219 52 23 52.449219 23 53 C 23 53.550781 23.449219 54 24 54 C 24.550781 54 25 53.550781 25 53 C 25 52.449219 24.550781 52 24 52 Z M 56 52 C 55.449219 52 55 52.449219 55 53 C 55 53.550781 55.449219 54 56 54 C 56.550781 54 57 53.550781 57 53 C 57 52.449219 56.550781 52 56 52 Z M 21 55 C 20.449219 55 20 55.449219 20 56 C 20 56.550781 20.449219 57 21 57 C 21.550781 57 22 56.550781 22 56 C 22 55.449219 21.550781 55 21 55 Z M 59 55 C 58.449219 55 58 55.449219 58 56 C 58 56.550781 58.449219 57 59 57 C 59.550781 57 60 56.550781 60 56 C 60 55.449219 59.550781 55 59 55 Z M 18 58 C 17.449219 58 17 58.449219 17 59 C 17 59.550781 17.449219 60 18 60 C 18.550781 60 19 59.550781 19 59 C 19 58.449219 18.550781 58 18 58 Z M 62 58 C 61.449219 58 61 58.449219 61 59 C 61 59.550781 61.449219 60 62 60 C 62.550781 60 63 59.550781 63 59 C 63 58.449219 62.550781 58 62 58 Z M 15 61 C 14.449219 61 14 61.449219 14 62 C 14 62.550781 14.449219 63 15 63 C 15.550781 63 16 62.550781 16 62 C 16 61.449219 15.550781 61 15 61 Z M 65 61 C 64.449219 61 64 61.449219 64 62 C 64 62.550781 64.449219 63 65 63 C 65.550781 63 66 62.550781 66 62 C 66 61.449219 65.550781 61 65 61 Z'
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1} // Increase strokeWidth for visibility
      />
    </AnimatedIcon>
  )
}

export default CancelSvg