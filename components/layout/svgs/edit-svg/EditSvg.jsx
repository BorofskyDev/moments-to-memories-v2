// components/PhotoSvg.jsx
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function EditSvg() {
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
        d='M 69.890625 4.007813 C 68.527344 4.007813 67.167969 4.523438 66.136719 5.554688 L 65.515625 6.171875 L 59.792969 11.894531 L 59.792969 11.898438 L 34.453125 37.234375 L 29.261719 50.738281 L 42.765625 45.546875 L 42.914063 45.394531 L 68.105469 20.207031 L 73.828125 14.484375 L 74.445313 13.863281 C 76.511719 11.800781 76.511719 8.421875 74.445313 6.355469 L 73.644531 5.554688 C 72.613281 4.523438 71.25 4.003906 69.890625 4.007813 Z M 69.890625 5.992188 C 70.734375 5.996094 71.578125 6.316406 72.230469 6.96875 L 73.03125 7.769531 C 74.332031 9.070313 74.332031 11.148438 73.03125 12.453125 L 72.414063 13.066406 L 66.933594 7.585938 L 67.546875 6.96875 C 68.199219 6.316406 69.042969 5.992188 69.890625 5.992188 Z M 65.515625 9 L 71 14.484375 L 68.105469 17.378906 L 62.621094 11.894531 Z M 61.207031 13.3125 L 66.6875 18.792969 L 42.828125 42.652344 C 42.671875 42.226563 42.441406 41.785156 42.050781 41.394531 C 41.382813 40.730469 40.5625 40.496094 39.921875 40.371094 C 39.777344 40.339844 39.789063 40.355469 39.660156 40.339844 C 39.644531 40.210938 39.660156 40.21875 39.628906 40.074219 C 39.503906 39.433594 39.269531 38.613281 38.605469 37.949219 C 38.214844 37.558594 37.773438 37.328125 37.347656 37.171875 Z M 17 14 C 14.242188 14 12 16.242188 12 19 L 12 65 C 12 67.757813 14.242188 70 17 70 L 63 70 C 65.757813 70 68 67.757813 68 65 L 68 24 L 66 26 L 66 65 C 66 66.652344 64.652344 68 63 68 L 17 68 C 15.347656 68 14 66.652344 14 65 L 14 19 C 14 17.347656 15.347656 16 17 16 L 52 16 L 54 14 Z M 20 21 C 19.449219 21 19 21.449219 19 22 C 19 22.550781 19.449219 23 20 23 C 20.550781 23 21 22.550781 21 22 C 21 21.449219 20.550781 21 20 21 Z M 24 21 C 23.449219 21 23 21.449219 23 22 C 23 22.550781 23.449219 23 24 23 C 24.550781 23 25 22.550781 25 22 C 25 21.449219 24.550781 21 24 21 Z M 28 21 C 27.449219 21 27 21.449219 27 22 C 27 22.550781 27.449219 23 28 23 C 28.550781 23 29 22.550781 29 22 C 29 21.449219 28.550781 21 28 21 Z M 32 21 C 31.449219 21 31 21.449219 31 22 C 31 22.550781 31.449219 23 32 23 C 32.550781 23 33 22.550781 33 22 C 33 21.449219 32.550781 21 32 21 Z M 36 21 C 35.449219 21 35 21.449219 35 22 C 35 22.550781 35.449219 23 36 23 C 36.550781 23 37 22.550781 37 22 C 37 21.449219 36.550781 21 36 21 Z M 40 21 C 39.449219 21 39 21.449219 39 22 C 39 22.550781 39.449219 23 40 23 C 40.550781 23 41 22.550781 41 22 C 41 21.449219 40.550781 21 40 21 Z M 44 21 C 43.449219 21 43 21.449219 43 22 C 43 22.550781 43.449219 23 44 23 C 44.550781 23 45 22.550781 45 22 C 45 21.449219 44.550781 21 44 21 Z M 20 25 C 19.449219 25 19 25.449219 19 26 C 19 26.550781 19.449219 27 20 27 C 20.550781 27 21 26.550781 21 26 C 21 25.449219 20.550781 25 20 25 Z M 20 29 C 19.449219 29 19 29.449219 19 30 C 19 30.550781 19.449219 31 20 31 C 20.550781 31 21 30.550781 21 30 C 21 29.449219 20.550781 29 20 29 Z M 20 33 C 19.449219 33 19 33.449219 19 34 C 19 34.550781 19.449219 35 20 35 C 20.550781 35 21 34.550781 21 34 C 21 33.449219 20.550781 33 20 33 Z M 60 33 C 59.449219 33 59 33.449219 59 34 C 59 34.550781 59.449219 35 60 35 C 60.550781 35 61 34.550781 61 34 C 61 33.449219 60.550781 33 60 33 Z M 20 37 C 19.449219 37 19 37.449219 19 38 C 19 38.550781 19.449219 39 20 39 C 20.550781 39 21 38.550781 21 38 C 21 37.449219 20.550781 37 20 37 Z M 60 37 C 59.449219 37 59 37.449219 59 38 C 59 38.550781 59.449219 39 60 39 C 60.550781 39 61 38.550781 61 38 C 61 37.449219 60.550781 37 60 37 Z M 35.96875 38.863281 C 36.011719 38.871094 36.039063 38.871094 36.082031 38.878906 C 36.523438 38.96875 36.996094 39.167969 37.1875 39.359375 C 37.382813 39.554688 37.582031 40.027344 37.671875 40.46875 C 37.757813 40.90625 37.757813 41.238281 37.757813 41.238281 L 37.757813 42.238281 L 38.757813 42.238281 C 38.757813 42.238281 39.09375 42.242188 39.53125 42.328125 C 39.96875 42.417969 40.441406 42.617188 40.636719 42.8125 C 40.832031 43.003906 41.03125 43.476563 41.117188 43.917969 C 41.125 43.960938 41.125 43.988281 41.132813 44.03125 L 35.207031 46.3125 L 33.6875 44.792969 Z M 20 41 C 19.449219 41 19 41.449219 19 42 C 19 42.550781 19.449219 43 20 43 C 20.550781 43 21 42.550781 21 42 C 21 41.449219 20.550781 41 20 41 Z M 60 41 C 59.449219 41 59 41.449219 59 42 C 59 42.550781 59.449219 43 60 43 C 60.550781 43 61 42.550781 61 42 C 61 41.449219 60.550781 41 60 41 Z M 20 45 C 19.449219 45 19 45.449219 19 46 C 19 46.550781 19.449219 47 20 47 C 20.550781 47 21 46.550781 21 46 C 21 45.449219 20.550781 45 20 45 Z M 60 45 C 59.449219 45 59 45.449219 59 46 C 59 46.550781 59.449219 47 60 47 C 60.550781 47 61 46.550781 61 46 C 61 45.449219 60.550781 45 60 45 Z M 20 49 C 19.449219 49 19 49.449219 19 50 C 19 50.550781 19.449219 51 20 51 C 20.550781 51 21 50.550781 21 50 C 21 49.449219 20.550781 49 20 49 Z M 60 49 C 59.449219 49 59 49.449219 59 50 C 59 50.550781 59.449219 51 60 51 C 60.550781 51 61 50.550781 61 50 C 61 49.449219 60.550781 49 60 49 Z M 20 53 C 19.449219 53 19 53.449219 19 54 C 19 54.550781 19.449219 55 20 55 C 20.550781 55 21 54.550781 21 54 C 21 53.449219 20.550781 53 20 53 Z M 60 53 C 59.449219 53 59 53.449219 59 54 C 59 54.550781 59.449219 55 60 55 C 60.550781 55 61 54.550781 61 54 C 61 53.449219 60.550781 53 60 53 Z M 20 57 C 19.449219 57 19 57.449219 19 58 C 19 58.550781 19.449219 59 20 59 C 20.550781 59 21 58.550781 21 58 C 21 57.449219 20.550781 57 20 57 Z M 60 57 C 59.449219 57 59 57.449219 59 58 C 59 58.550781 59.449219 59 60 59 C 60.550781 59 61 58.550781 61 58 C 61 57.449219 60.550781 57 60 57 Z M 20 61 C 19.449219 61 19 61.449219 19 62 C 19 62.550781 19.449219 63 20 63 C 20.550781 63 21 62.550781 21 62 C 21 61.449219 20.550781 61 20 61 Z M 24 61 C 23.449219 61 23 61.449219 23 62 C 23 62.550781 23.449219 63 24 63 C 24.550781 63 25 62.550781 25 62 C 25 61.449219 24.550781 61 24 61 Z M 28 61 C 27.449219 61 27 61.449219 27 62 C 27 62.550781 27.449219 63 28 63 C 28.550781 63 29 62.550781 29 62 C 29 61.449219 28.550781 61 28 61 Z M 32 61 C 31.449219 61 31 61.449219 31 62 C 31 62.550781 31.449219 63 32 63 C 32.550781 63 33 62.550781 33 62 C 33 61.449219 32.550781 61 32 61 Z M 36 61 C 35.449219 61 35 61.449219 35 62 C 35 62.550781 35.449219 63 36 63 C 36.550781 63 37 62.550781 37 62 C 37 61.449219 36.550781 61 36 61 Z M 40 61 C 39.449219 61 39 61.449219 39 62 C 39 62.550781 39.449219 63 40 63 C 40.550781 63 41 62.550781 41 62 C 41 61.449219 40.550781 61 40 61 Z M 44 61 C 43.449219 61 43 61.449219 43 62 C 43 62.550781 43.449219 63 44 63 C 44.550781 63 45 62.550781 45 62 C 45 61.449219 44.550781 61 44 61 Z M 48 61 C 47.449219 61 47 61.449219 47 62 C 47 62.550781 47.449219 63 48 63 C 48.550781 63 49 62.550781 49 62 C 49 61.449219 48.550781 61 48 61 Z M 52 61 C 51.449219 61 51 61.449219 51 62 C 51 62.550781 51.449219 63 52 63 C 52.550781 63 53 62.550781 53 62 C 53 61.449219 52.550781 61 52 61 Z M 56 61 C 55.449219 61 55 61.449219 55 62 C 55 62.550781 55.449219 63 56 63 C 56.550781 63 57 62.550781 57 62 C 57 61.449219 56.550781 61 56 61 Z M 60 61 C 59.449219 61 59 61.449219 59 62 C 59 62.550781 59.449219 63 60 63 C 60.550781 63 61 62.550781 61 62 C 61 61.449219 60.550781 61 60 61 Z'
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1} // Increase strokeWidth for visibility
      />
    </AnimatedIcon>
  )
}

export default EditSvg