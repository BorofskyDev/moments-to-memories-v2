
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function ClientsSvg() {
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
       d="M 30.855469 12 C 26.953125 12 23.488281 13.265625 20.988281 15.546875 C 18.492188 17.824219 17 21.125 17 25 C 17 27.558594 17.554688 31.695313 17.839844 33.78125 C 17.367188 34.230469 17 34.796875 17 35.5 C 17 36.089844 17.167969 36.546875 17.300781 37 C 17.367188 37.230469 17.433594 37.441406 17.472656 37.597656 C 17.515625 37.753906 17.519531 37.910156 17.519531 37.75 C 17.519531 39.003906 18.585938 40 19.824219 40 L 20.078125 40 C 20.257813 43.128906 21.734375 45.894531 24 47.78125 L 24 51.3125 C 23.113281 51.625 19.824219 52.8125 16.035156 54.796875 C 13.867188 55.933594 11.6875 57.265625 9.992188 58.769531 C 8.296875 60.277344 7 61.996094 7 64 L 7 68 L 73 68 L 73 64 C 73 61.996094 71.703125 60.277344 70.007813 58.769531 C 68.3125 57.265625 66.132813 55.933594 63.964844 54.796875 C 60.175781 52.8125 56.886719 51.625 56 51.3125 L 56 47.777344 C 58.265625 45.890625 59.742188 43.128906 59.921875 40 L 60.175781 40 C 61.414063 40 62.480469 39.003906 62.480469 37.75 C 62.480469 37.910156 62.484375 37.753906 62.527344 37.597656 C 62.566406 37.441406 62.632813 37.230469 62.699219 37 C 62.832031 36.546875 63 36.089844 63 35.5 C 63 34.792969 62.632813 34.226563 62.15625 33.777344 C 62.441406 31.660156 63 27.4375 63 25 C 63 21.808594 62.148438 19.53125 60.796875 18.0625 C 59.628906 16.785156 58.125 16.269531 56.671875 16.125 C 56.433594 15.671875 56.042969 15.019531 55.234375 14.265625 C 53.996094 13.117188 51.925781 12 48.855469 12 C 44.726563 12 41.09375 13.4375 38.578125 15.972656 C 38.335938 15.527344 37.96875 14.949219 37.234375 14.265625 C 35.996094 13.117188 33.925781 12 30.855469 12 Z M 30.855469 14 C 30.894531 14 30.933594 14.003906 30.972656 14.003906 C 30.433594 14.019531 30 14.457031 30 15 C 30 15.550781 30.449219 16 31 16 C 31.550781 16 32 15.550781 32 15 C 32 14.460938 31.570313 14.03125 31.039063 14.007813 C 33.519531 14.050781 34.980469 14.902344 35.875 15.734375 C 36.789063 16.582031 37.0625 17.34375 37.0625 17.34375 L 37.300781 18 L 38 18 C 38.34375 18 38.683594 18.046875 39.023438 18.117188 C 39.085938 18.609375 39.488281 19 40 19 C 40.230469 19 40.429688 18.910156 40.597656 18.78125 C 40.855469 18.957031 41.101563 19.164063 41.328125 19.414063 C 41.613281 19.726563 41.875 20.113281 42.109375 20.5625 C 42.042969 20.699219 42 20.839844 42 21 C 42 21.417969 42.261719 21.777344 42.625 21.925781 C 42.855469 22.769531 43 23.773438 43 25 C 43 25.269531 42.96875 25.671875 42.953125 26.011719 C 42.421875 26.035156 42 26.464844 42 27 C 42 27.488281 42.355469 27.875 42.816406 27.964844 C 42.679688 29.523438 42.511719 30.925781 42.34375 32.261719 C 42.136719 32.441406 42 32.703125 42 33 C 42 33.207031 42.078125 33.386719 42.1875 33.546875 C 42.167969 33.667969 42.140625 33.914063 42.125 34.019531 L 42.027344 34.75 L 42.691406 35.0625 C 42.890625 35.152344 43 35.3125 43 35.5 C 43 35.515625 42.90625 36.007813 42.78125 36.4375 C 42.714844 36.65625 42.652344 36.871094 42.59375 37.074219 C 42.539063 37.277344 42.480469 37.414063 42.480469 37.75 C 42.480469 37.875 42.378906 38 42.175781 38 L 40 38 L 40 39.375 C 40 39.941406 39.929688 40.496094 39.828125 41.03125 C 39.363281 41.117188 39 41.507813 39 42 C 39 42.292969 39.132813 42.554688 39.335938 42.734375 C 39 43.558594 38.550781 44.320313 38 45 C 38 44.449219 37.550781 44 37 44 C 36.449219 44 36 44.449219 36 45 C 36 45.550781 36.449219 46 37 46 C 37.027344 46 37.046875 45.988281 37.074219 45.984375 C 36.855469 46.183594 36.636719 46.378906 36.398438 46.554688 L 36 46.855469 L 36 52.714844 L 36.675781 52.945313 C 36.675781 52.945313 37.640625 53.285156 39.03125 53.839844 C 39.023438 53.894531 39 53.941406 39 54 C 39 54.550781 39.449219 55 40 55 C 40.332031 55 40.613281 54.828125 40.796875 54.578125 C 42.105469 55.140625 43.535156 55.78125 45.035156 56.566406 C 47.117188 57.660156 49.1875 58.941406 50.679688 60.265625 C 52.171875 61.59375 53 62.914063 53 64 L 53 66 C 53 65.449219 52.550781 65 52 65 C 51.449219 65 51 65.449219 51 66 L 47 66 C 47 65.449219 46.550781 65 46 65 C 45.449219 65 45 65.449219 45 66 L 41 66 C 41 65.449219 40.550781 65 40 65 C 39.449219 65 39 65.449219 39 66 L 35 66 C 35 65.449219 34.550781 65 34 65 C 33.449219 65 33 65.449219 33 66 L 29 66 C 29 65.449219 28.550781 65 28 65 C 27.449219 65 27 65.449219 27 66 L 23 66 C 23 65.449219 22.550781 65 22 65 C 21.449219 65 21 65.449219 21 66 L 17 66 C 17 65.449219 16.550781 65 16 65 C 15.449219 65 15 65.449219 15 66 L 11 66 C 11 65.449219 10.550781 65 10 65 C 9.449219 65 9 65.449219 9 66 L 9 64 C 9 62.914063 9.828125 61.59375 11.320313 60.265625 C 12.8125 58.941406 14.882813 57.660156 16.964844 56.566406 C 18.464844 55.78125 19.894531 55.140625 21.203125 54.578125 C 21.386719 54.828125 21.667969 55 22 55 C 22.550781 55 23 54.550781 23 54 C 23 53.941406 22.976563 53.894531 22.96875 53.839844 C 24.359375 53.285156 25.324219 52.945313 25.324219 52.945313 L 26 52.714844 L 26 46.859375 L 25.601563 46.558594 C 25.363281 46.378906 25.140625 46.183594 24.921875 45.984375 C 24.949219 45.988281 24.972656 46 25 46 C 25.550781 46 26 45.550781 26 45 C 26 44.449219 25.550781 44 25 44 C 24.449219 44 24 44.449219 24 45 C 23.449219 44.320313 23 43.558594 22.664063 42.734375 C 22.867188 42.554688 23 42.292969 23 42 C 23 41.507813 22.636719 41.117188 22.171875 41.03125 C 22.070313 40.492188 22 39.941406 22 39.375 L 22 38 L 19.824219 38 C 19.621094 38 19.519531 37.875 19.519531 37.75 C 19.519531 37.414063 19.460938 37.277344 19.40625 37.074219 C 19.347656 36.871094 19.285156 36.65625 19.21875 36.4375 C 19.09375 36.007813 19 35.515625 19 35.5 C 19 35.316406 19.109375 35.152344 19.304688 35.0625 L 19.96875 34.75 L 19.871094 34.019531 C 19.855469 33.917969 19.828125 33.667969 19.8125 33.546875 C 19.921875 33.390625 20 33.207031 20 33 C 20 32.703125 19.863281 32.441406 19.65625 32.257813 C 19.484375 30.933594 19.316406 29.539063 19.175781 27.964844 C 19.640625 27.878906 20 27.488281 20 27 C 20 26.464844 19.574219 26.035156 19.046875 26.011719 C 19.03125 25.671875 19 25.28125 19 25 C 19 23.894531 19.144531 22.871094 19.402344 21.914063 C 19.753906 21.757813 20 21.410156 20 21 C 20 20.824219 19.941406 20.667969 19.863281 20.527344 C 20.1875 19.757813 20.601563 19.050781 21.089844 18.40625 C 21.246094 18.753906 21.59375 19 22 19 C 22.550781 19 23 18.550781 23 18 C 23 17.554688 22.703125 17.1875 22.296875 17.0625 C 22.3125 17.046875 22.324219 17.035156 22.339844 17.019531 C 22.910156 16.5 23.554688 16.042969 24.25 15.644531 C 24.433594 15.859375 24.695313 16 25 16 C 25.550781 16 26 15.550781 26 15 C 26 14.941406 25.976563 14.894531 25.96875 14.839844 C 27.429688 14.296875 29.074219 14 30.855469 14 Z M 48.855469 14 C 51.453125 14 52.957031 14.882813 53.875 15.734375 C 54.789063 16.582031 55.0625 17.34375 55.0625 17.34375 L 55.300781 18 L 56 18 C 57.1875 18 58.386719 18.390625 59.328125 19.414063 C 60.269531 20.4375 61 22.160156 61 25 C 61 27.238281 60.386719 32.097656 60.125 34.019531 L 60.027344 34.75 L 60.691406 35.0625 C 60.890625 35.152344 61 35.3125 61 35.5 C 61 35.515625 60.90625 36.007813 60.78125 36.4375 C 60.714844 36.65625 60.652344 36.871094 60.59375 37.074219 C 60.539063 37.277344 60.480469 37.414063 60.480469 37.75 C 60.480469 37.875 60.378906 38 60.175781 38 L 58 38 L 58 39.375 C 58 42.320313 56.582031 44.914063 54.398438 46.554688 L 54 46.855469 L 54 52.714844 L 54.675781 52.945313 C 54.675781 52.945313 58.871094 54.382813 63.035156 56.566406 C 65.117188 57.660156 67.1875 58.941406 68.679688 60.265625 C 70.171875 61.59375 71 62.914063 71 64 L 71 66 L 55 66 L 55 64 C 55 61.996094 53.703125 60.277344 52.007813 58.769531 C 50.3125 57.265625 48.132813 55.933594 45.964844 54.796875 C 42.175781 52.8125 38.886719 51.625 38 51.3125 L 38 47.777344 C 40.265625 45.890625 41.742188 43.128906 41.921875 40 L 42.175781 40 C 43.414063 40 44.480469 39.003906 44.480469 37.75 C 44.480469 37.910156 44.484375 37.753906 44.527344 37.597656 C 44.566406 37.441406 44.632813 37.230469 44.699219 37 C 44.832031 36.546875 45 36.089844 45 35.5 C 45 34.792969 44.632813 34.226563 44.15625 33.777344 C 44.441406 31.660156 45 27.4375 45 25 C 45 21.808594 44.148438 19.53125 42.796875 18.0625 C 42.199219 17.410156 41.515625 16.960938 40.792969 16.652344 C 42.847656 14.976563 45.621094 14 48.855469 14 Z M 28 17 C 27.449219 17 27 17.449219 27 18 C 27 18.550781 27.449219 19 28 19 C 28.550781 19 29 18.550781 29 18 C 29 17.449219 28.550781 17 28 17 Z M 34 17 C 33.449219 17 33 17.449219 33 18 C 33 18.550781 33.449219 19 34 19 C 34.550781 19 35 18.550781 35 18 C 35 17.449219 34.550781 17 34 17 Z M 25 20 C 24.449219 20 24 20.449219 24 21 C 24 21.550781 24.449219 22 25 22 C 25.550781 22 26 21.550781 26 21 C 26 20.449219 25.550781 20 25 20 Z M 31 20 C 30.449219 20 30 20.449219 30 21 C 30 21.550781 30.449219 22 31 22 C 31.550781 22 32 21.550781 32 21 C 32 20.449219 31.550781 20 31 20 Z M 37 20 C 36.449219 20 36 20.449219 36 21 C 36 21.550781 36.449219 22 37 22 C 37.550781 22 38 21.550781 38 21 C 38 20.449219 37.550781 20 37 20 Z M 22 23 C 21.449219 23 21 23.449219 21 24 C 21 24.550781 21.449219 25 22 25 C 22.550781 25 23 24.550781 23 24 C 23 23.449219 22.550781 23 22 23 Z M 28 23 C 27.449219 23 27 23.449219 27 24 C 27 24.550781 27.449219 25 28 25 C 28.550781 25 29 24.550781 29 24 C 29 23.449219 28.550781 23 28 23 Z M 34 23 C 33.449219 23 33 23.449219 33 24 C 33 24.550781 33.449219 25 34 25 C 34.550781 25 35 24.550781 35 24 C 35 23.449219 34.550781 23 34 23 Z M 40 23 C 39.449219 23 39 23.449219 39 24 C 39 24.550781 39.449219 25 40 25 C 40.550781 25 41 24.550781 41 24 C 41 23.449219 40.550781 23 40 23 Z M 25 26 C 24.449219 26 24 26.449219 24 27 C 24 27.550781 24.449219 28 25 28 C 25.550781 28 26 27.550781 26 27 C 26 26.449219 25.550781 26 25 26 Z M 31 26 C 30.449219 26 30 26.449219 30 27 C 30 27.550781 30.449219 28 31 28 C 31.550781 28 32 27.550781 32 27 C 32 26.449219 31.550781 26 31 26 Z M 37 26 C 36.449219 26 36 26.449219 36 27 C 36 27.550781 36.449219 28 37 28 C 37.550781 28 38 27.550781 38 27 C 38 26.449219 37.550781 26 37 26 Z M 22 29 C 21.449219 29 21 29.449219 21 30 C 21 30.550781 21.449219 31 22 31 C 22.550781 31 23 30.550781 23 30 C 23 29.449219 22.550781 29 22 29 Z M 28 29 C 27.449219 29 27 29.449219 27 30 C 27 30.550781 27.449219 31 28 31 C 28.550781 31 29 30.550781 29 30 C 29 29.449219 28.550781 29 28 29 Z M 34 29 C 33.449219 29 33 29.449219 33 30 C 33 30.550781 33.449219 31 34 31 C 34.550781 31 35 30.550781 35 30 C 35 29.449219 34.550781 29 34 29 Z M 40 29 C 39.449219 29 39 29.449219 39 30 C 39 30.550781 39.449219 31 40 31 C 40.550781 31 41 30.550781 41 30 C 41 29.449219 40.550781 29 40 29 Z M 25 32 C 24.449219 32 24 32.449219 24 33 C 24 33.550781 24.449219 34 25 34 C 25.550781 34 26 33.550781 26 33 C 26 32.449219 25.550781 32 25 32 Z M 31 32 C 30.449219 32 30 32.449219 30 33 C 30 33.550781 30.449219 34 31 34 C 31.550781 34 32 33.550781 32 33 C 32 32.449219 31.550781 32 31 32 Z M 37 32 C 36.449219 32 36 32.449219 36 33 C 36 33.550781 36.449219 34 37 34 C 37.550781 34 38 33.550781 38 33 C 38 32.449219 37.550781 32 37 32 Z M 22 35 C 21.449219 35 21 35.449219 21 36 C 21 36.550781 21.449219 37 22 37 C 22.550781 37 23 36.550781 23 36 C 23 35.449219 22.550781 35 22 35 Z M 28 35 C 27.449219 35 27 35.449219 27 36 C 27 36.550781 27.449219 37 28 37 C 28.550781 37 29 36.550781 29 36 C 29 35.449219 28.550781 35 28 35 Z M 34 35 C 33.449219 35 33 35.449219 33 36 C 33 36.550781 33.449219 37 34 37 C 34.550781 37 35 36.550781 35 36 C 35 35.449219 34.550781 35 34 35 Z M 40 35 C 39.449219 35 39 35.449219 39 36 C 39 36.550781 39.449219 37 40 37 C 40.550781 37 41 36.550781 41 36 C 41 35.449219 40.550781 35 40 35 Z M 25 38 C 24.449219 38 24 38.449219 24 39 C 24 39.550781 24.449219 40 25 40 C 25.550781 40 26 39.550781 26 39 C 26 38.449219 25.550781 38 25 38 Z M 31 38 C 30.449219 38 30 38.449219 30 39 C 30 39.550781 30.449219 40 31 40 C 31.550781 40 32 39.550781 32 39 C 32 38.449219 31.550781 38 31 38 Z M 37 38 C 36.449219 38 36 38.449219 36 39 C 36 39.550781 36.449219 40 37 40 C 37.550781 40 38 39.550781 38 39 C 38 38.449219 37.550781 38 37 38 Z M 28 41 C 27.449219 41 27 41.449219 27 42 C 27 42.550781 27.449219 43 28 43 C 28.550781 43 29 42.550781 29 42 C 29 41.449219 28.550781 41 28 41 Z M 34 41 C 33.449219 41 33 41.449219 33 42 C 33 42.550781 33.449219 43 34 43 C 34.550781 43 35 42.550781 35 42 C 35 41.449219 34.550781 41 34 41 Z M 31 44 C 30.449219 44 30 44.449219 30 45 C 30 45.550781 30.449219 46 31 46 C 31.550781 46 32 45.550781 32 45 C 32 44.449219 31.550781 44 31 44 Z M 28 47 C 27.449219 47 27 47.449219 27 48 C 27 48.550781 27.449219 49 28 49 C 28.550781 49 29 48.550781 29 48 C 29 47.449219 28.550781 47 28 47 Z M 34 47 C 33.449219 47 33 47.449219 33 48 C 33 48.550781 33.449219 49 34 49 C 34.550781 49 35 48.550781 35 48 C 35 47.449219 34.550781 47 34 47 Z M 31 50 C 30.449219 50 30 50.449219 30 51 C 30 51.550781 30.449219 52 31 52 C 31.550781 52 32 51.550781 32 51 C 32 50.449219 31.550781 50 31 50 Z M 28 53 C 27.449219 53 27 53.449219 27 54 C 27 54.550781 27.449219 55 28 55 C 28.550781 55 29 54.550781 29 54 C 29 53.449219 28.550781 53 28 53 Z M 34 53 C 33.449219 53 33 53.449219 33 54 C 33 54.550781 33.449219 55 34 55 C 34.550781 55 35 54.550781 35 54 C 35 53.449219 34.550781 53 34 53 Z M 19 56 C 18.449219 56 18 56.449219 18 57 C 18 57.550781 18.449219 58 19 58 C 19.550781 58 20 57.550781 20 57 C 20 56.449219 19.550781 56 19 56 Z M 25 56 C 24.449219 56 24 56.449219 24 57 C 24 57.550781 24.449219 58 25 58 C 25.550781 58 26 57.550781 26 57 C 26 56.449219 25.550781 56 25 56 Z M 31 56 C 30.449219 56 30 56.449219 30 57 C 30 57.550781 30.449219 58 31 58 C 31.550781 58 32 57.550781 32 57 C 32 56.449219 31.550781 56 31 56 Z M 37 56 C 36.449219 56 36 56.449219 36 57 C 36 57.550781 36.449219 58 37 58 C 37.550781 58 38 57.550781 38 57 C 38 56.449219 37.550781 56 37 56 Z M 43 56 C 42.449219 56 42 56.449219 42 57 C 42 57.550781 42.449219 58 43 58 C 43.550781 58 44 57.550781 44 57 C 44 56.449219 43.550781 56 43 56 Z M 16 59 C 15.449219 59 15 59.449219 15 60 C 15 60.550781 15.449219 61 16 61 C 16.550781 61 17 60.550781 17 60 C 17 59.449219 16.550781 59 16 59 Z M 22 59 C 21.449219 59 21 59.449219 21 60 C 21 60.550781 21.449219 61 22 61 C 22.550781 61 23 60.550781 23 60 C 23 59.449219 22.550781 59 22 59 Z M 28 59 C 27.449219 59 27 59.449219 27 60 C 27 60.550781 27.449219 61 28 61 C 28.550781 61 29 60.550781 29 60 C 29 59.449219 28.550781 59 28 59 Z M 34 59 C 33.449219 59 33 59.449219 33 60 C 33 60.550781 33.449219 61 34 61 C 34.550781 61 35 60.550781 35 60 C 35 59.449219 34.550781 59 34 59 Z M 40 59 C 39.449219 59 39 59.449219 39 60 C 39 60.550781 39.449219 61 40 61 C 40.550781 61 41 60.550781 41 60 C 41 59.449219 40.550781 59 40 59 Z M 46 59 C 45.449219 59 45 59.449219 45 60 C 45 60.550781 45.449219 61 46 61 C 46.550781 61 47 60.550781 47 60 C 47 59.449219 46.550781 59 46 59 Z M 13 62 C 12.449219 62 12 62.449219 12 63 C 12 63.550781 12.449219 64 13 64 C 13.550781 64 14 63.550781 14 63 C 14 62.449219 13.550781 62 13 62 Z M 19 62 C 18.449219 62 18 62.449219 18 63 C 18 63.550781 18.449219 64 19 64 C 19.550781 64 20 63.550781 20 63 C 20 62.449219 19.550781 62 19 62 Z M 25 62 C 24.449219 62 24 62.449219 24 63 C 24 63.550781 24.449219 64 25 64 C 25.550781 64 26 63.550781 26 63 C 26 62.449219 25.550781 62 25 62 Z M 31 62 C 30.449219 62 30 62.449219 30 63 C 30 63.550781 30.449219 64 31 64 C 31.550781 64 32 63.550781 32 63 C 32 62.449219 31.550781 62 31 62 Z M 37 62 C 36.449219 62 36 62.449219 36 63 C 36 63.550781 36.449219 64 37 64 C 37.550781 64 38 63.550781 38 63 C 38 62.449219 37.550781 62 37 62 Z M 43 62 C 42.449219 62 42 62.449219 42 63 C 42 63.550781 42.449219 64 43 64 C 43.550781 64 44 63.550781 44 63 C 44 62.449219 43.550781 62 43 62 Z M 49 62 C 48.449219 62 48 62.449219 48 63 C 48 63.550781 48.449219 64 49 64 C 49.550781 64 50 63.550781 50 63 C 50 62.449219 49.550781 62 49 62 Z"
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1} // Increase strokeWidth for visibility
      />
    </AnimatedIcon>
  )
}

export default ClientsSvg
