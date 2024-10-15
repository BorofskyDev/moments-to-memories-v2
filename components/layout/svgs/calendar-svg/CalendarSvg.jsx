// components/PhotoSvg.jsx
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function CalendarSvg() {
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
        d="M 24 5 C 22.90625 5 22 5.90625 22 7 L 22 10 L 15 10 C 12.25 10 10 12.25 10 15 L 10 65 C 10 67.75 12.25 70 15 70 L 65 70 C 67.75 70 70 67.75 70 65 L 70 15 C 70 12.25 67.75 10 65 10 L 58 10 L 58 7 C 58 5.90625 57.09375 5 56 5 L 54 5 C 52.90625 5 52 5.90625 52 7 L 52 10 L 28 10 L 28 7 C 28 5.90625 27.09375 5 26 5 Z M 24 7 L 26 7 L 26 15 L 24 15 Z M 54 7 L 56 7 L 56 15 L 54 15 Z M 15 12 L 22 12 L 22 15 C 22 16.09375 22.90625 17 24 17 L 26 17 C 27.09375 17 28 16.09375 28 15 L 28 12 L 52 12 L 52 15 C 52 16.09375 52.90625 17 54 17 L 56 17 C 57.09375 17 58 16.09375 58 15 L 58 12 L 65 12 C 66.667969 12 68 13.332031 68 15 L 68 22 L 12 22 L 12 15 C 12 13.332031 13.332031 12 15 12 Z M 12 24 L 68 24 L 68 65 C 68 66.667969 66.667969 68 65 68 L 15 68 C 13.332031 68 12 66.667969 12 65 Z M 24 32 C 23.449219 32 23 32.449219 23 33 C 23 33.550781 23.449219 34 24 34 C 24.550781 34 25 33.550781 25 33 C 25 32.449219 24.550781 32 24 32 Z M 28 32 C 27.449219 32 27 32.449219 27 33 C 27 33.550781 27.449219 34 28 34 C 28.550781 34 29 33.550781 29 33 C 29 32.449219 28.550781 32 28 32 Z M 32 32 C 31.449219 32 31 32.449219 31 33 C 31 33.550781 31.449219 34 32 34 C 32.550781 34 33 33.550781 33 33 C 33 32.449219 32.550781 32 32 32 Z M 36 32 C 35.449219 32 35 32.449219 35 33 C 35 33.550781 35.449219 34 36 34 C 36.550781 34 37 33.550781 37 33 C 37 32.449219 36.550781 32 36 32 Z M 40 32 C 39.449219 32 39 32.449219 39 33 C 39 33.550781 39.449219 34 40 34 C 40.550781 34 41 33.550781 41 33 C 41 32.449219 40.550781 32 40 32 Z M 44 32 C 43.449219 32 43 32.449219 43 33 C 43 33.550781 43.449219 34 44 34 C 44.550781 34 45 33.550781 45 33 C 45 32.449219 44.550781 32 44 32 Z M 48 32 C 47.449219 32 47 32.449219 47 33 C 47 33.550781 47.449219 34 48 34 C 48.550781 34 49 33.550781 49 33 C 49 32.449219 48.550781 32 48 32 Z M 52 32 C 51.449219 32 51 32.449219 51 33 C 51 33.550781 51.449219 34 52 34 C 52.550781 34 53 33.550781 53 33 C 53 32.449219 52.550781 32 52 32 Z M 56 32 C 55.449219 32 55 32.449219 55 33 C 55 33.550781 55.449219 34 56 34 C 56.550781 34 57 33.550781 57 33 C 57 32.449219 56.550781 32 56 32 Z M 24 36 C 23.449219 36 23 36.449219 23 37 C 23 37.550781 23.449219 38 24 38 C 24.550781 38 25 37.550781 25 37 C 25 36.449219 24.550781 36 24 36 Z M 32 36 C 31.449219 36 31 36.449219 31 37 C 31 37.550781 31.449219 38 32 38 C 32.550781 38 33 37.550781 33 37 C 33 36.449219 32.550781 36 32 36 Z M 40 36 C 39.449219 36 39 36.449219 39 37 C 39 37.550781 39.449219 38 40 38 C 40.550781 38 41 37.550781 41 37 C 41 36.449219 40.550781 36 40 36 Z M 48 36 C 47.449219 36 47 36.449219 47 37 C 47 37.550781 47.449219 38 48 38 C 48.550781 38 49 37.550781 49 37 C 49 36.449219 48.550781 36 48 36 Z M 56 36 C 55.449219 36 55 36.449219 55 37 C 55 37.550781 55.449219 38 56 38 C 56.550781 38 57 37.550781 57 37 C 57 36.449219 56.550781 36 56 36 Z M 24 40 C 23.449219 40 23 40.449219 23 41 C 23 41.550781 23.449219 42 24 42 C 24.550781 42 25 41.550781 25 41 C 25 40.449219 24.550781 40 24 40 Z M 28 40 C 27.449219 40 27 40.449219 27 41 C 27 41.550781 27.449219 42 28 42 C 28.550781 42 29 41.550781 29 41 C 29 40.449219 28.550781 40 28 40 Z M 32 40 C 31.449219 40 31 40.449219 31 41 C 31 41.550781 31.449219 42 32 42 C 32.550781 42 33 41.550781 33 41 C 33 40.449219 32.550781 40 32 40 Z M 36 40 C 35.449219 40 35 40.449219 35 41 C 35 41.550781 35.449219 42 36 42 C 36.550781 42 37 41.550781 37 41 C 37 40.449219 36.550781 40 36 40 Z M 40 40 C 39.449219 40 39 40.449219 39 41 C 39 41.550781 39.449219 42 40 42 C 40.550781 42 41 41.550781 41 41 C 41 40.449219 40.550781 40 40 40 Z M 44 40 C 43.449219 40 43 40.449219 43 41 C 43 41.550781 43.449219 42 44 42 C 44.550781 42 45 41.550781 45 41 C 45 40.449219 44.550781 40 44 40 Z M 48 40 C 47.449219 40 47 40.449219 47 41 C 47 41.550781 47.449219 42 48 42 C 48.550781 42 49 41.550781 49 41 C 49 40.449219 48.550781 40 48 40 Z M 52 40 C 51.449219 40 51 40.449219 51 41 C 51 41.550781 51.449219 42 52 42 C 52.550781 42 53 41.550781 53 41 C 53 40.449219 52.550781 40 52 40 Z M 56 40 C 55.449219 40 55 40.449219 55 41 C 55 41.550781 55.449219 42 56 42 C 56.550781 42 57 41.550781 57 41 C 57 40.449219 56.550781 40 56 40 Z M 24 44 C 23.449219 44 23 44.449219 23 45 C 23 45.550781 23.449219 46 24 46 C 24.550781 46 25 45.550781 25 45 C 25 44.449219 24.550781 44 24 44 Z M 32 44 C 31.449219 44 31 44.449219 31 45 C 31 45.550781 31.449219 46 32 46 C 32.550781 46 33 45.550781 33 45 C 33 44.449219 32.550781 44 32 44 Z M 40 44 C 39.449219 44 39 44.449219 39 45 C 39 45.550781 39.449219 46 40 46 C 40.550781 46 41 45.550781 41 45 C 41 44.449219 40.550781 44 40 44 Z M 48 44 C 47.449219 44 47 44.449219 47 45 C 47 45.550781 47.449219 46 48 46 C 48.550781 46 49 45.550781 49 45 C 49 44.449219 48.550781 44 48 44 Z M 56 44 C 55.449219 44 55 44.449219 55 45 C 55 45.550781 55.449219 46 56 46 C 56.550781 46 57 45.550781 57 45 C 57 44.449219 56.550781 44 56 44 Z M 24 48 C 23.449219 48 23 48.449219 23 49 C 23 49.550781 23.449219 50 24 50 C 24.550781 50 25 49.550781 25 49 C 25 48.449219 24.550781 48 24 48 Z M 28 48 C 27.449219 48 27 48.449219 27 49 C 27 49.550781 27.449219 50 28 50 C 28.550781 50 29 49.550781 29 49 C 29 48.449219 28.550781 48 28 48 Z M 32 48 C 31.449219 48 31 48.449219 31 49 C 31 49.550781 31.449219 50 32 50 C 32.550781 50 33 49.550781 33 49 C 33 48.449219 32.550781 48 32 48 Z M 36 48 C 35.449219 48 35 48.449219 35 49 C 35 49.550781 35.449219 50 36 50 C 36.550781 50 37 49.550781 37 49 C 37 48.449219 36.550781 48 36 48 Z M 40 48 C 39.449219 48 39 48.449219 39 49 C 39 49.550781 39.449219 50 40 50 C 40.550781 50 41 49.550781 41 49 C 41 48.449219 40.550781 48 40 48 Z M 44 48 C 43.449219 48 43 48.449219 43 49 C 43 49.550781 43.449219 50 44 50 C 44.550781 50 45 49.550781 45 49 C 45 48.449219 44.550781 48 44 48 Z M 48 48 C 47.449219 48 47 48.449219 47 49 C 47 49.550781 47.449219 50 48 50 C 48.550781 50 49 49.550781 49 49 C 49 48.449219 48.550781 48 48 48 Z M 52 48 C 51.449219 48 51 48.449219 51 49 C 51 49.550781 51.449219 50 52 50 C 52.550781 50 53 49.550781 53 49 C 53 48.449219 52.550781 48 52 48 Z M 56 48 C 55.449219 48 55 48.449219 55 49 C 55 49.550781 55.449219 50 56 50 C 56.550781 50 57 49.550781 57 49 C 57 48.449219 56.550781 48 56 48 Z M 24 52 C 23.449219 52 23 52.449219 23 53 C 23 53.550781 23.449219 54 24 54 C 24.550781 54 25 53.550781 25 53 C 25 52.449219 24.550781 52 24 52 Z M 32 52 C 31.449219 52 31 52.449219 31 53 C 31 53.550781 31.449219 54 32 54 C 32.550781 54 33 53.550781 33 53 C 33 52.449219 32.550781 52 32 52 Z M 40 52 C 39.449219 52 39 52.449219 39 53 C 39 53.550781 39.449219 54 40 54 C 40.550781 54 41 53.550781 41 53 C 41 52.449219 40.550781 52 40 52 Z M 48 52 C 47.449219 52 47 52.449219 47 53 C 47 53.550781 47.449219 54 48 54 C 48.550781 54 49 53.550781 49 53 C 49 52.449219 48.550781 52 48 52 Z M 56 52 C 55.449219 52 55 52.449219 55 53 C 55 53.550781 55.449219 54 56 54 C 56.550781 54 57 53.550781 57 53 C 57 52.449219 56.550781 52 56 52 Z M 24 56 C 23.449219 56 23 56.449219 23 57 C 23 57.550781 23.449219 58 24 58 C 24.550781 58 25 57.550781 25 57 C 25 56.449219 24.550781 56 24 56 Z M 28 56 C 27.449219 56 27 56.449219 27 57 C 27 57.550781 27.449219 58 28 58 C 28.550781 58 29 57.550781 29 57 C 29 56.449219 28.550781 56 28 56 Z M 32 56 C 31.449219 56 31 56.449219 31 57 C 31 57.550781 31.449219 58 32 58 C 32.550781 58 33 57.550781 33 57 C 33 56.449219 32.550781 56 32 56 Z M 36 56 C 35.449219 56 35 56.449219 35 57 C 35 57.550781 35.449219 58 36 58 C 36.550781 58 37 57.550781 37 57 C 37 56.449219 36.550781 56 36 56 Z M 40 56 C 39.449219 56 39 56.449219 39 57 C 39 57.550781 39.449219 58 40 58 C 40.550781 58 41 57.550781 41 57 C 41 56.449219 40.550781 56 40 56 Z M 44 56 C 43.449219 56 43 56.449219 43 57 C 43 57.550781 43.449219 58 44 58 C 44.550781 58 45 57.550781 45 57 C 45 56.449219 44.550781 56 44 56 Z M 48 56 C 47.449219 56 47 56.449219 47 57 C 47 57.550781 47.449219 58 48 58 C 48.550781 58 49 57.550781 49 57 C 49 56.449219 48.550781 56 48 56 Z M 52 56 C 51.449219 56 51 56.449219 51 57 C 51 57.550781 51.449219 58 52 58 C 52.550781 58 53 57.550781 53 57 C 53 56.449219 52.550781 56 52 56 Z M 56 56 C 55.449219 56 55 56.449219 55 57 C 55 57.550781 55.449219 58 56 58 C 56.550781 58 57 57.550781 57 57 C 57 56.449219 56.550781 56 56 56 Z"
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1} // Increase strokeWidth for visibility
      />
    </AnimatedIcon>
  )
}

export default CalendarSvg
