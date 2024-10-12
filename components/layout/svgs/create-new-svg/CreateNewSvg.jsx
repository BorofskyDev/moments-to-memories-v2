// components/PhotoSvg.jsx
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function CreateNewSvg() {
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
       d="M 40 5.007813 C 38.792969 5.007813 37.582031 5.464844 36.667969 6.378906 L 33.871094 9.179688 L 30.207031 7.664063 C 27.816406 6.671875 25.046875 7.820313 24.058594 10.214844 L 22.542969 13.871094 L 18.578125 13.871094 C 15.992188 13.871094 13.871094 15.992188 13.871094 18.582031 L 13.871094 22.542969 L 10.214844 24.058594 C 7.820313 25.046875 6.671875 27.820313 7.664063 30.210938 L 9.179688 33.871094 L 6.375 36.671875 C 4.546875 38.5 4.546875 41.5 6.375 43.332031 L 9.179688 46.128906 L 7.664063 49.792969 C 6.671875 52.183594 7.820313 54.953125 10.214844 55.941406 L 13.871094 57.457031 L 13.871094 61.421875 C 13.871094 64.007813 15.992188 66.128906 18.578125 66.128906 L 22.542969 66.128906 L 24.058594 69.785156 C 25.046875 72.179688 27.816406 73.328125 30.207031 72.335938 L 33.871094 70.824219 L 36.667969 73.625 C 38.5 75.453125 41.5 75.453125 43.328125 73.625 L 46.128906 70.824219 L 49.789063 72.335938 C 52.179688 73.328125 54.953125 72.179688 55.941406 69.785156 L 57.457031 66.128906 L 61.417969 66.128906 C 64.007813 66.128906 66.128906 64.007813 66.128906 61.421875 L 66.128906 57.457031 L 69.785156 55.941406 C 72.179688 54.953125 73.328125 52.179688 72.335938 49.789063 L 70.820313 46.128906 L 73.621094 43.328125 C 75.449219 41.5 75.449219 38.5 73.621094 36.671875 L 70.820313 33.871094 L 72.332031 30.210938 C 73.324219 27.820313 72.175781 25.046875 69.785156 24.058594 L 66.125 22.542969 L 66.125 18.582031 C 66.125 15.992188 64.007813 13.871094 61.417969 13.871094 L 57.457031 13.871094 L 55.941406 10.214844 C 54.953125 7.820313 52.179688 6.671875 49.789063 7.664063 L 46.128906 9.179688 L 43.328125 6.378906 C 42.414063 5.464844 41.207031 5.007813 40 5.007813 Z M 40 6.992188 C 40.691406 6.992188 41.382813 7.257813 41.917969 7.792969 L 45.660156 11.539063 L 50.554688 9.511719 C 51.949219 8.933594 53.519531 9.585938 54.09375 10.980469 L 56.121094 15.871094 L 61.417969 15.871094 C 62.925781 15.871094 64.125 17.074219 64.125 18.582031 L 64.125 23.878906 L 69.019531 25.90625 C 70.414063 26.480469 71.0625 28.050781 70.484375 29.445313 L 68.460938 34.339844 L 72.203125 38.082031 L 72.207031 38.082031 C 73.273438 39.148438 73.273438 40.847656 72.207031 41.917969 L 68.460938 45.660156 L 70.488281 50.554688 C 71.066406 51.949219 70.414063 53.519531 69.019531 54.09375 L 64.128906 56.121094 L 64.128906 61.421875 C 64.128906 62.929688 62.925781 64.128906 61.417969 64.128906 L 56.121094 64.128906 L 54.09375 69.019531 C 53.519531 70.414063 51.949219 71.066406 50.554688 70.488281 L 45.660156 68.464844 L 41.917969 72.207031 C 40.847656 73.273438 39.152344 73.273438 38.082031 72.207031 L 34.339844 68.464844 L 29.445313 70.488281 C 28.050781 71.066406 26.480469 70.414063 25.90625 69.019531 L 23.875 64.128906 L 18.578125 64.128906 C 17.070313 64.128906 15.871094 62.929688 15.871094 61.421875 L 15.871094 56.125 L 10.980469 54.09375 C 9.585938 53.519531 8.933594 51.949219 9.511719 50.554688 L 11.535156 45.660156 L 7.792969 41.917969 C 6.726563 40.847656 6.726563 39.152344 7.792969 38.082031 L 11.535156 34.339844 L 9.511719 29.445313 C 8.933594 28.050781 9.585938 26.480469 10.980469 25.90625 L 15.871094 23.878906 L 15.871094 18.582031 C 15.871094 17.074219 17.070313 15.871094 18.578125 15.871094 L 23.875 15.871094 L 25.90625 10.980469 C 26.480469 9.585938 28.050781 8.933594 29.445313 9.511719 L 34.339844 11.539063 L 38.082031 7.792969 C 38.617188 7.257813 39.308594 6.992188 40 6.992188 Z M 40 9 C 39.449219 9 39 9.449219 39 10 C 39 10.550781 39.449219 11 40 11 C 40.550781 11 41 10.550781 41 10 C 41 9.449219 40.550781 9 40 9 Z M 28.527344 11.28125 C 28.394531 11.28125 28.261719 11.308594 28.136719 11.359375 C 27.625 11.570313 27.382813 12.15625 27.59375 12.667969 C 27.808594 13.175781 28.390625 13.417969 28.902344 13.207031 C 29.414063 12.996094 29.65625 12.410156 29.441406 11.902344 C 29.289063 11.53125 28.929688 11.285156 28.527344 11.28125 Z M 51.503906 11.28125 C 51.089844 11.273438 50.714844 11.519531 50.558594 11.902344 C 50.34375 12.410156 50.585938 12.996094 51.097656 13.207031 C 51.609375 13.417969 52.191406 13.175781 52.40625 12.667969 C 52.617188 12.15625 52.375 11.570313 51.863281 11.359375 C 51.75 11.3125 51.628906 11.285156 51.503906 11.28125 Z M 40 14 C 39.449219 14 39 14.449219 39 15 C 39 15.550781 39.449219 16 40 16 C 40.550781 16 41 15.550781 41 15 C 41 14.449219 40.550781 14 40 14 Z M 35.125 14.480469 C 35.058594 14.480469 34.992188 14.488281 34.925781 14.5 C 34.386719 14.609375 34.035156 15.132813 34.140625 15.675781 C 34.25 16.21875 34.777344 16.570313 35.316406 16.460938 C 35.859375 16.351563 36.210938 15.828125 36.105469 15.285156 C 36.011719 14.820313 35.601563 14.484375 35.125 14.480469 Z M 44.902344 14.480469 C 44.414063 14.46875 43.992188 14.808594 43.894531 15.285156 C 43.789063 15.828125 44.140625 16.351563 44.683594 16.460938 C 45.222656 16.570313 45.75 16.21875 45.859375 15.675781 C 45.964844 15.132813 45.613281 14.609375 45.074219 14.5 C 45.015625 14.488281 44.960938 14.480469 44.902344 14.480469 Z M 30.441406 15.902344 C 30.308594 15.902344 30.175781 15.925781 30.050781 15.980469 C 29.539063 16.191406 29.296875 16.773438 29.511719 17.285156 C 29.722656 17.796875 30.304688 18.039063 30.816406 17.828125 C 31.328125 17.613281 31.570313 17.03125 31.359375 16.519531 C 31.203125 16.148438 30.84375 15.90625 30.441406 15.902344 Z M 49.589844 15.902344 C 49.175781 15.894531 48.800781 16.136719 48.640625 16.519531 C 48.429688 17.03125 48.671875 17.613281 49.183594 17.828125 C 49.695313 18.039063 50.277344 17.796875 50.488281 17.285156 C 50.703125 16.773438 50.460938 16.191406 49.949219 15.980469 C 49.835938 15.929688 49.710938 15.90625 49.589844 15.902344 Z M 18.800781 17.785156 C 18.53125 17.785156 18.269531 17.890625 18.078125 18.078125 C 17.691406 18.46875 17.691406 19.105469 18.078125 19.496094 C 18.46875 19.882813 19.105469 19.882813 19.496094 19.496094 C 19.882813 19.105469 19.882813 18.46875 19.496094 18.078125 C 19.308594 17.894531 19.0625 17.789063 18.800781 17.785156 Z M 61.226563 17.785156 C 60.957031 17.785156 60.695313 17.890625 60.503906 18.078125 C 60.117188 18.46875 60.117188 19.105469 60.503906 19.496094 C 60.894531 19.882813 61.53125 19.882813 61.921875 19.496094 C 62.308594 19.105469 62.308594 18.46875 61.921875 18.078125 C 61.734375 17.894531 61.488281 17.789063 61.226563 17.785156 Z M 53.90625 18.210938 C 53.566406 18.203125 53.246094 18.371094 53.058594 18.65625 C 52.75 19.117188 52.875 19.738281 53.332031 20.042969 C 53.792969 20.347656 54.414063 20.226563 54.71875 19.765625 C 55.027344 19.304688 54.902344 18.6875 54.445313 18.378906 C 54.285156 18.273438 54.097656 18.214844 53.90625 18.210938 Z M 26.125 18.214844 C 25.921875 18.210938 25.722656 18.269531 25.558594 18.378906 C 25.097656 18.6875 24.972656 19.308594 25.28125 19.765625 C 25.585938 20.226563 26.207031 20.351563 26.667969 20.042969 C 27.125 19.738281 27.25 19.117188 26.941406 18.65625 C 26.761719 18.382813 26.453125 18.214844 26.125 18.214844 Z M 22.335938 21.324219 C 22.066406 21.316406 21.804688 21.421875 21.613281 21.613281 C 21.222656 22.003906 21.222656 22.640625 21.613281 23.03125 C 21.800781 23.21875 22.054688 23.324219 22.320313 23.324219 C 22.585938 23.324219 22.839844 23.21875 23.03125 23.03125 C 23.417969 22.640625 23.417969 22.003906 23.03125 21.613281 C 22.84375 21.429688 22.597656 21.324219 22.335938 21.324219 Z M 57.691406 21.324219 C 57.421875 21.320313 57.160156 21.425781 56.96875 21.613281 C 56.582031 22.003906 56.582031 22.640625 56.96875 23.03125 C 57.359375 23.417969 57.996094 23.417969 58.386719 23.03125 C 58.773438 22.640625 58.773438 22.003906 58.386719 21.613281 C 58.199219 21.429688 57.953125 21.324219 57.691406 21.324219 Z M 60.796875 25.109375 C 60.59375 25.105469 60.398438 25.164063 60.230469 25.277344 C 59.773438 25.585938 59.648438 26.203125 59.953125 26.664063 C 60.261719 27.121094 60.882813 27.246094 61.34375 26.9375 C 61.800781 26.632813 61.925781 26.011719 61.621094 25.550781 C 61.433594 25.277344 61.128906 25.113281 60.796875 25.109375 Z M 19.234375 25.109375 C 18.890625 25.105469 18.570313 25.273438 18.382813 25.554688 C 18.074219 26.015625 18.199219 26.632813 18.65625 26.941406 C 19.117188 27.25 19.738281 27.125 20.046875 26.667969 C 20.351563 26.207031 20.226563 25.585938 19.769531 25.28125 C 19.609375 25.171875 19.425781 25.113281 19.234375 25.109375 Z M 12.304688 27.515625 C 11.890625 27.507813 11.515625 27.753906 11.359375 28.136719 C 11.148438 28.644531 11.390625 29.230469 11.902344 29.441406 C 12.410156 29.652344 12.996094 29.410156 13.207031 28.902344 C 13.417969 28.390625 13.175781 27.804688 12.667969 27.59375 C 12.550781 27.546875 12.429688 27.519531 12.304688 27.515625 Z M 67.722656 27.515625 C 67.589844 27.515625 67.457031 27.542969 67.332031 27.59375 C 66.824219 27.804688 66.582031 28.390625 66.792969 28.902344 C 67.003906 29.410156 67.589844 29.652344 68.097656 29.441406 C 68.609375 29.230469 68.851563 28.644531 68.640625 28.136719 C 68.488281 27.761719 68.125 27.519531 67.722656 27.515625 Z M 63.105469 29.433594 C 62.96875 29.429688 62.839844 29.457031 62.714844 29.507813 C 62.203125 29.71875 61.960938 30.304688 62.171875 30.8125 C 62.386719 31.324219 62.96875 31.566406 63.480469 31.355469 C 63.992188 31.144531 64.234375 30.558594 64.019531 30.046875 C 63.867188 29.675781 63.503906 29.433594 63.105469 29.433594 Z M 16.925781 29.433594 C 16.515625 29.425781 16.140625 29.667969 15.980469 30.046875 C 15.769531 30.558594 16.011719 31.144531 16.519531 31.355469 C 17.03125 31.566406 17.617188 31.324219 17.828125 30.8125 C 18.039063 30.304688 17.796875 29.71875 17.285156 29.507813 C 17.171875 29.460938 17.050781 29.4375 16.925781 29.433594 Z M 15.503906 34.125 C 15.019531 34.109375 14.59375 34.449219 14.5 34.925781 C 14.390625 35.46875 14.742188 35.996094 15.285156 36.105469 C 15.546875 36.15625 15.816406 36.101563 16.035156 35.953125 C 16.257813 35.804688 16.410156 35.578125 16.460938 35.316406 C 16.570313 34.773438 16.21875 34.25 15.675781 34.140625 C 15.621094 34.128906 15.5625 34.125 15.503906 34.125 Z M 64.527344 34.125 C 64.457031 34.121094 64.390625 34.128906 64.328125 34.140625 C 63.785156 34.25 63.433594 34.777344 63.542969 35.316406 C 63.648438 35.859375 64.175781 36.210938 64.71875 36.105469 C 65.257813 35.996094 65.609375 35.46875 65.5 34.925781 C 65.410156 34.460938 65 34.125 64.527344 34.125 Z M 21.476563 35.363281 L 21.476563 46.636719 L 23.421875 46.636719 L 23.421875 38.964844 L 23.558594 38.964844 L 29.089844 46.636719 L 30.828125 46.636719 L 30.828125 35.363281 L 28.890625 35.363281 L 28.890625 43.027344 L 28.757813 43.027344 L 23.226563 35.363281 Z M 34.417969 35.363281 L 34.417969 46.636719 L 41.714844 46.636719 L 41.714844 44.894531 L 36.433594 44.894531 L 36.433594 41.738281 L 41.425781 41.738281 L 41.425781 40.097656 L 36.433594 40.097656 L 36.433594 37.105469 L 41.714844 37.105469 L 41.714844 35.363281 Z M 43.992188 35.363281 L 47.015625 46.636719 L 48.914063 46.636719 L 51.195313 38.652344 L 51.3125 38.652344 L 53.609375 46.636719 L 55.5 46.636719 L 58.527344 35.363281 L 56.4375 35.363281 L 54.511719 43.753906 L 54.402344 43.753906 L 52.152344 35.363281 L 50.359375 35.363281 L 48.140625 43.753906 L 48.027344 43.753906 L 46.09375 35.363281 Z M 10 39 C 9.449219 39 9 39.449219 9 40 C 9 40.550781 9.449219 41 10 41 C 10.550781 41 11 40.550781 11 40 C 11 39.449219 10.550781 39 10 39 Z M 15 39 C 14.449219 39 14 39.449219 14 40 C 14 40.550781 14.449219 41 15 41 C 15.550781 41 16 40.550781 16 40 C 16 39.449219 15.550781 39 15 39 Z M 65 39 C 64.449219 39 64 39.449219 64 40 C 64 40.550781 64.449219 41 65 41 C 65.550781 41 66 40.550781 66 40 C 66 39.449219 65.550781 39 65 39 Z M 70 39 C 69.449219 39 69 39.449219 69 40 C 69 40.550781 69.449219 41 70 41 C 70.550781 41 71 40.550781 71 40 C 71 39.449219 70.550781 39 70 39 Z M 15.484375 43.875 C 15.417969 43.875 15.351563 43.882813 15.285156 43.894531 C 14.742188 44.003906 14.390625 44.53125 14.5 45.074219 C 14.609375 45.613281 15.132813 45.964844 15.675781 45.859375 C 16.21875 45.75 16.570313 45.222656 16.460938 44.683594 C 16.367188 44.214844 15.960938 43.878906 15.484375 43.875 Z M 64.546875 43.875 C 64.058594 43.863281 63.636719 44.203125 63.542969 44.683594 C 63.433594 45.222656 63.785156 45.75 64.328125 45.859375 C 64.867188 45.964844 65.394531 45.613281 65.5 45.074219 C 65.554688 44.8125 65.5 44.542969 65.355469 44.320313 C 65.207031 44.101563 64.976563 43.945313 64.71875 43.894531 C 64.660156 43.882813 64.605469 43.878906 64.546875 43.875 Z M 16.910156 48.566406 C 16.777344 48.566406 16.644531 48.589844 16.519531 48.640625 C 16.011719 48.855469 15.769531 49.4375 15.980469 49.949219 C 16.191406 50.460938 16.777344 50.703125 17.285156 50.488281 C 17.796875 50.277344 18.039063 49.695313 17.828125 49.183594 C 17.675781 48.8125 17.3125 48.570313 16.910156 48.566406 Z M 63.121094 48.566406 C 62.707031 48.558594 62.332031 48.800781 62.171875 49.183594 C 61.960938 49.695313 62.203125 50.277344 62.714844 50.488281 C 62.960938 50.589844 63.234375 50.589844 63.480469 50.488281 C 63.726563 50.386719 63.921875 50.191406 64.019531 49.949219 C 64.234375 49.4375 63.992188 48.851563 63.480469 48.640625 C 63.367188 48.59375 63.242188 48.570313 63.121094 48.566406 Z M 12.292969 50.480469 C 12.160156 50.480469 12.027344 50.503906 11.902344 50.558594 C 11.390625 50.769531 11.148438 51.351563 11.359375 51.863281 C 11.574219 52.375 12.15625 52.617188 12.667969 52.40625 C 13.179688 52.191406 13.421875 51.609375 13.207031 51.097656 C 13.054688 50.726563 12.695313 50.484375 12.292969 50.480469 Z M 67.738281 50.480469 C 67.324219 50.472656 66.949219 50.714844 66.792969 51.097656 C 66.582031 51.609375 66.824219 52.191406 67.332031 52.40625 C 67.578125 52.503906 67.855469 52.503906 68.101563 52.402344 C 68.34375 52.300781 68.539063 52.105469 68.640625 51.859375 C 68.851563 51.351563 68.609375 50.765625 68.097656 50.554688 C 67.984375 50.507813 67.863281 50.484375 67.738281 50.480469 Z M 60.808594 52.886719 C 60.464844 52.878906 60.144531 53.046875 59.957031 53.328125 C 59.808594 53.550781 59.753906 53.820313 59.808594 54.082031 C 59.859375 54.34375 60.011719 54.570313 60.234375 54.71875 C 60.691406 55.023438 61.3125 54.902344 61.621094 54.441406 C 61.925781 53.980469 61.800781 53.363281 61.34375 53.054688 C 61.183594 52.949219 61 52.890625 60.808594 52.886719 Z M 19.222656 52.890625 C 19.023438 52.886719 18.824219 52.945313 18.65625 53.058594 C 18.199219 53.363281 18.074219 53.984375 18.382813 54.441406 C 18.691406 54.902344 19.308594 55.027344 19.769531 54.71875 C 20.230469 54.414063 20.351563 53.792969 20.046875 53.332031 C 19.863281 53.058594 19.554688 52.890625 19.222656 52.890625 Z M 22.335938 56.675781 C 22.066406 56.675781 21.804688 56.78125 21.613281 56.96875 C 21.226563 57.359375 21.226563 57.996094 21.613281 58.386719 C 22.003906 58.773438 22.640625 58.773438 23.03125 58.386719 C 23.417969 57.996094 23.417969 57.359375 23.03125 56.96875 C 22.84375 56.785156 22.597656 56.679688 22.335938 56.675781 Z M 57.691406 56.675781 C 57.421875 56.675781 57.160156 56.78125 56.96875 56.96875 C 56.582031 57.359375 56.582031 57.996094 56.96875 58.386719 C 57.359375 58.773438 57.996094 58.773438 58.386719 58.386719 C 58.773438 57.996094 58.773438 57.359375 58.386719 56.96875 C 58.199219 56.785156 57.953125 56.679688 57.691406 56.675781 Z M 26.128906 59.785156 C 25.789063 59.777344 25.46875 59.945313 25.28125 60.230469 C 25.132813 60.449219 25.078125 60.71875 25.132813 60.980469 C 25.183594 61.242188 25.335938 61.46875 25.558594 61.617188 C 25.777344 61.765625 26.046875 61.820313 26.308594 61.765625 C 26.570313 61.714844 26.796875 61.5625 26.945313 61.339844 C 27.25 60.878906 27.128906 60.257813 26.667969 59.953125 C 26.507813 59.847656 26.324219 59.789063 26.128906 59.785156 Z M 53.902344 59.785156 C 53.699219 59.78125 53.5 59.839844 53.332031 59.953125 C 52.875 60.261719 52.75 60.878906 53.058594 61.339844 C 53.363281 61.800781 53.984375 61.921875 54.445313 61.617188 C 54.667969 61.46875 54.820313 61.242188 54.871094 60.980469 C 54.921875 60.71875 54.867188 60.449219 54.71875 60.230469 C 54.539063 59.953125 54.230469 59.789063 53.902344 59.785156 Z M 18.800781 60.214844 C 18.53125 60.207031 18.269531 60.3125 18.078125 60.503906 C 17.6875 60.894531 17.6875 61.53125 18.078125 61.921875 C 18.46875 62.308594 19.101563 62.308594 19.492188 61.921875 C 19.882813 61.53125 19.882813 60.894531 19.492188 60.503906 C 19.308594 60.320313 19.0625 60.21875 18.800781 60.214844 Z M 61.226563 60.214844 C 60.957031 60.210938 60.695313 60.316406 60.503906 60.503906 C 60.117188 60.894531 60.117188 61.53125 60.503906 61.921875 C 60.894531 62.308594 61.53125 62.308594 61.921875 61.921875 C 62.308594 61.53125 62.308594 60.894531 61.921875 60.503906 C 61.734375 60.320313 61.488281 60.214844 61.226563 60.214844 Z M 30.453125 62.09375 C 30.042969 62.085938 29.667969 62.332031 29.511719 62.714844 C 29.296875 63.222656 29.539063 63.808594 30.050781 64.019531 C 30.5625 64.230469 31.144531 63.988281 31.359375 63.480469 C 31.570313 62.96875 31.328125 62.382813 30.816406 62.171875 C 30.703125 62.125 30.578125 62.097656 30.453125 62.09375 Z M 49.578125 62.09375 C 49.441406 62.09375 49.308594 62.121094 49.1875 62.171875 C 48.675781 62.382813 48.433594 62.96875 48.644531 63.480469 C 48.855469 63.988281 49.441406 64.230469 49.953125 64.019531 C 50.460938 63.808594 50.703125 63.222656 50.492188 62.714844 C 50.339844 62.34375 49.976563 62.097656 49.578125 62.09375 Z M 35.152344 63.519531 C 34.664063 63.507813 34.238281 63.847656 34.140625 64.324219 C 34.089844 64.585938 34.144531 64.855469 34.292969 65.074219 C 34.441406 65.296875 34.667969 65.449219 34.929688 65.5 C 35.472656 65.609375 35.996094 65.257813 36.105469 64.714844 C 36.15625 64.453125 36.101563 64.183594 35.957031 63.964844 C 35.808594 63.742188 35.578125 63.589844 35.316406 63.539063 C 35.261719 63.527344 35.207031 63.519531 35.152344 63.519531 Z M 44.882813 63.519531 C 44.816406 63.519531 44.75 63.527344 44.683594 63.539063 C 44.421875 63.589844 44.195313 63.742188 44.046875 63.964844 C 43.898438 64.183594 43.84375 64.453125 43.894531 64.714844 C 43.949219 64.976563 44.101563 65.207031 44.320313 65.351563 C 44.542969 65.5 44.8125 65.554688 45.074219 65.5 C 45.617188 65.394531 45.96875 64.867188 45.859375 64.328125 C 45.765625 63.859375 45.359375 63.523438 44.882813 63.519531 Z M 40 64 C 39.449219 64 39 64.449219 39 65 C 39 65.550781 39.449219 66 40 66 C 40.550781 66 41 65.550781 41 65 C 41 64.449219 40.550781 64 40 64 Z M 51.488281 66.714844 C 51.355469 66.714844 51.222656 66.738281 51.097656 66.792969 C 50.589844 67.003906 50.347656 67.585938 50.558594 68.097656 C 50.769531 68.605469 51.355469 68.847656 51.863281 68.640625 C 52.109375 68.539063 52.304688 68.34375 52.40625 68.097656 C 52.507813 67.851563 52.507813 67.578125 52.40625 67.332031 C 52.253906 66.960938 51.890625 66.71875 51.488281 66.714844 Z M 28.542969 66.71875 C 28.128906 66.707031 27.753906 66.953125 27.59375 67.332031 C 27.496094 67.578125 27.496094 67.855469 27.597656 68.101563 C 27.699219 68.34375 27.894531 68.539063 28.140625 68.640625 C 28.648438 68.851563 29.234375 68.609375 29.445313 68.097656 C 29.546875 67.855469 29.546875 67.578125 29.445313 67.332031 C 29.34375 67.089844 29.148438 66.894531 28.902344 66.792969 C 28.789063 66.746094 28.667969 66.71875 28.542969 66.71875 Z M 40 69 C 39.449219 69 39 69.449219 39 70 C 39 70.550781 39.449219 71 40 71 C 40.550781 71 41 70.550781 41 70 C 41 69.449219 40.550781 69 40 69 Z"
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1} // Increase strokeWidth for visibility
      />
    </AnimatedIcon>
  )
}

export default CreateNewSvg

