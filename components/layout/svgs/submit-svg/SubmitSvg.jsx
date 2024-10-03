// components/PhotoSvg.jsx
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function SubmitSvg() {
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
        d="M 40 7 C 39.449219 7 39 7.449219 39 8 C 39 8.550781 39.449219 9 40 9 C 42.054688 9 44.058594 9.203125 46 9.585938 C 46.015625 9.589844 46.03125 9.59375 46.046875 9.59375 C 46.070313 9.597656 46.089844 9.601563 46.113281 9.601563 C 48.074219 9.996094 49.964844 10.574219 51.773438 11.316406 C 51.800781 11.332031 51.832031 11.347656 51.863281 11.359375 C 51.90625 11.375 51.945313 11.390625 51.988281 11.402344 C 53.808594 12.164063 55.539063 13.097656 57.160156 14.175781 C 57.183594 14.195313 57.203125 14.207031 57.222656 14.222656 C 57.253906 14.242188 57.285156 14.261719 57.316406 14.277344 C 58.949219 15.378906 60.46875 16.632813 61.859375 18.015625 C 61.878906 18.039063 61.898438 18.058594 61.921875 18.078125 C 61.9375 18.097656 61.953125 18.113281 61.972656 18.125 C 63.359375 19.523438 64.617188 21.046875 65.722656 22.683594 C 65.738281 22.714844 65.757813 22.746094 65.777344 22.777344 C 65.792969 22.804688 65.8125 22.828125 65.832031 22.855469 C 66.910156 24.476563 67.839844 26.199219 68.597656 28.015625 C 68.609375 28.054688 68.625 28.097656 68.640625 28.136719 C 68.652344 28.167969 68.667969 28.199219 68.6875 28.230469 C 69.429688 30.039063 70.003906 31.933594 70.394531 33.894531 C 70.398438 33.914063 70.402344 33.933594 70.40625 33.953125 C 70.40625 33.953125 70.40625 33.957031 70.40625 33.960938 C 70.792969 35.914063 71 37.933594 71 40 C 71 42.054688 70.796875 44.0625 70.414063 46.007813 C 70.410156 46.019531 70.40625 46.035156 70.40625 46.046875 C 70.398438 46.078125 70.394531 46.113281 70.390625 46.144531 C 70 48.09375 69.421875 49.972656 68.6875 51.765625 C 68.671875 51.796875 68.65625 51.828125 68.640625 51.859375 C 68.625 51.90625 68.609375 51.949219 68.597656 51.996094 C 67.839844 53.804688 66.910156 55.523438 65.839844 57.136719 C 65.835938 57.136719 65.835938 57.136719 65.835938 57.140625 C 65.8125 57.164063 65.792969 57.191406 65.777344 57.21875 C 65.75 57.257813 65.730469 57.292969 65.710938 57.332031 C 64.609375 58.964844 63.355469 60.484375 61.972656 61.875 C 61.953125 61.886719 61.9375 61.902344 61.921875 61.921875 C 61.902344 61.9375 61.886719 61.953125 61.875 61.972656 C 60.484375 63.355469 58.96875 64.609375 57.339844 65.707031 C 57.296875 65.726563 57.257813 65.75 57.222656 65.773438 C 57.195313 65.792969 57.167969 65.8125 57.140625 65.832031 C 55.527344 66.90625 53.808594 67.835938 52 68.59375 C 51.953125 68.605469 51.910156 68.621094 51.863281 68.640625 C 51.828125 68.652344 51.792969 68.671875 51.761719 68.6875 C 49.96875 69.425781 48.089844 70 46.148438 70.390625 C 46.113281 70.390625 46.082031 70.398438 46.046875 70.40625 C 46.039063 70.40625 46.027344 70.410156 46.015625 70.410156 C 44.070313 70.792969 42.058594 71 40 71 C 33.65625 71 27.765625 69.097656 22.859375 65.832031 C 22.832031 65.8125 22.804688 65.792969 22.78125 65.773438 C 22.621094 65.667969 22.433594 65.609375 22.242188 65.605469 C 21.902344 65.597656 21.582031 65.765625 21.390625 66.046875 C 21.246094 66.269531 21.191406 66.539063 21.242188 66.800781 C 21.292969 67.0625 21.445313 67.289063 21.667969 67.4375 C 21.695313 67.457031 21.726563 67.472656 21.753906 67.488281 L 21.75 67.5 C 23.472656 68.644531 25.324219 69.617188 27.253906 70.425781 C 27.292969 70.449219 27.332031 70.46875 27.375 70.484375 C 27.40625 70.5 27.441406 70.511719 27.480469 70.523438 C 29.371094 71.300781 31.355469 71.902344 33.40625 72.320313 C 33.457031 72.339844 33.511719 72.355469 33.5625 72.363281 C 33.621094 72.375 33.679688 72.382813 33.738281 72.382813 C 35.769531 72.773438 37.855469 73 40 73 C 40.023438 73 40.046875 73 40.070313 73 C 42.210938 72.992188 44.304688 72.777344 46.332031 72.378906 C 46.367188 72.378906 46.402344 72.375 46.4375 72.367188 C 46.460938 72.363281 46.480469 72.355469 46.5 72.351563 C 48.601563 71.929688 50.625 71.3125 52.5625 70.511719 C 52.578125 70.503906 52.597656 70.5 52.613281 70.492188 C 52.617188 70.488281 52.625 70.488281 52.628906 70.484375 C 54.601563 69.664063 56.476563 68.660156 58.234375 67.488281 C 58.269531 67.472656 58.300781 67.457031 58.332031 67.4375 C 58.363281 67.417969 58.386719 67.398438 58.414063 67.375 C 60.144531 66.210938 61.757813 64.882813 63.234375 63.417969 C 63.269531 63.390625 63.304688 63.363281 63.332031 63.332031 C 63.359375 63.308594 63.386719 63.277344 63.410156 63.25 C 64.886719 61.761719 66.222656 60.132813 67.398438 58.386719 C 67.414063 58.367188 67.425781 58.347656 67.4375 58.328125 C 67.457031 58.300781 67.476563 58.273438 67.492188 58.242188 C 69.832031 54.722656 71.515625 50.730469 72.367188 46.4375 C 72.367188 46.429688 72.371094 46.421875 72.371094 46.410156 C 72.78125 44.335938 73 42.195313 73 40 C 73 39.976563 73 39.953125 73 39.929688 C 72.992188 37.785156 72.777344 35.695313 72.378906 33.667969 C 72.378906 33.632813 72.375 33.597656 72.367188 33.5625 C 72.363281 33.539063 72.355469 33.511719 72.347656 33.488281 C 71.929688 31.390625 71.3125 29.371094 70.515625 27.4375 C 70.507813 27.414063 70.496094 27.394531 70.488281 27.371094 C 70.484375 27.363281 70.480469 27.351563 70.476563 27.34375 C 69.667969 25.398438 68.671875 23.550781 67.523438 21.8125 C 67.5 21.761719 67.472656 21.710938 67.4375 21.664063 C 67.417969 21.632813 67.394531 21.601563 67.371094 21.574219 C 66.203125 19.847656 64.878906 18.238281 63.417969 16.765625 C 63.390625 16.730469 63.363281 16.695313 63.332031 16.667969 C 63.308594 16.640625 63.277344 16.613281 63.25 16.589844 C 61.765625 15.117188 60.148438 13.785156 58.410156 12.613281 C 58.386719 12.59375 58.359375 12.578125 58.332031 12.558594 C 58.296875 12.535156 58.257813 12.511719 58.21875 12.496094 C 54.710938 10.164063 50.738281 8.488281 46.46875 7.640625 C 46.457031 7.636719 46.449219 7.632813 46.4375 7.632813 C 46.429688 7.632813 46.417969 7.628906 46.40625 7.628906 C 44.332031 7.21875 42.191406 7 40 7 Z M 33.761719 7.617188 C 33.695313 7.613281 33.628906 7.621094 33.5625 7.632813 C 33.019531 7.742188 32.667969 8.269531 32.777344 8.8125 C 32.886719 9.351563 33.410156 9.703125 33.953125 9.59375 C 34.496094 9.488281 34.847656 8.960938 34.738281 8.421875 C 34.644531 7.953125 34.238281 7.617188 33.761719 7.617188 Z M 27.761719 9.4375 C 27.628906 9.433594 27.496094 9.460938 27.371094 9.511719 C 26.859375 9.722656 26.617188 10.308594 26.828125 10.816406 C 27.042969 11.328125 27.625 11.570313 28.136719 11.359375 C 28.648438 11.148438 28.890625 10.5625 28.675781 10.050781 C 28.523438 9.683594 28.164063 9.4375 27.761719 9.4375 Z M 40 12 C 39.449219 12 39 12.449219 39 13 C 39 13.550781 39.449219 14 40 14 C 40.550781 14 41 13.550781 41 13 C 41 12.449219 40.550781 12 40 12 Z M 22.234375 12.390625 C 22.03125 12.390625 21.832031 12.449219 21.667969 12.5625 C 21.207031 12.867188 21.082031 13.488281 21.390625 13.949219 C 21.699219 14.40625 22.316406 14.53125 22.777344 14.222656 C 23.234375 13.914063 23.359375 13.296875 23.050781 12.835938 C 22.871094 12.5625 22.5625 12.394531 22.234375 12.390625 Z M 45.292969 12.515625 C 44.804688 12.503906 44.382813 12.84375 44.285156 13.324219 C 44.179688 13.863281 44.53125 14.390625 45.074219 14.5 C 45.613281 14.605469 46.140625 14.253906 46.25 13.714844 C 46.355469 13.171875 46.003906 12.644531 45.464844 12.535156 C 45.40625 12.527344 45.351563 12.519531 45.292969 12.515625 Z M 34.738281 12.519531 C 34.671875 12.519531 34.605469 12.523438 34.539063 12.535156 C 33.996094 12.644531 33.644531 13.171875 33.753906 13.714844 C 33.804688 13.972656 33.957031 14.203125 34.179688 14.351563 C 34.398438 14.496094 34.667969 14.550781 34.929688 14.5 C 35.472656 14.390625 35.824219 13.867188 35.714844 13.324219 C 35.621094 12.859375 35.214844 12.523438 34.738281 12.519531 Z M 29.675781 14.054688 C 29.542969 14.054688 29.410156 14.078125 29.285156 14.128906 C 28.773438 14.34375 28.53125 14.925781 28.746094 15.4375 C 28.957031 15.949219 29.539063 16.191406 30.050781 15.980469 C 30.5625 15.765625 30.804688 15.183594 30.59375 14.671875 C 30.4375 14.300781 30.078125 14.058594 29.675781 14.054688 Z M 50.355469 14.054688 C 49.941406 14.046875 49.566406 14.289063 49.40625 14.671875 C 49.195313 15.183594 49.4375 15.765625 49.949219 15.980469 C 50.460938 16.191406 51.042969 15.949219 51.253906 15.4375 C 51.46875 14.925781 51.226563 14.34375 50.714844 14.128906 C 50.601563 14.082031 50.476563 14.058594 50.355469 14.054688 Z M 17.386719 16.375 C 17.117188 16.371094 16.855469 16.476563 16.667969 16.667969 C 16.277344 17.054688 16.277344 17.691406 16.667969 18.078125 C 17.054688 18.46875 17.691406 18.46875 18.078125 18.078125 C 18.46875 17.691406 18.46875 17.054688 18.078125 16.667969 C 17.894531 16.480469 17.648438 16.375 17.386719 16.375 Z M 25.011719 16.546875 C 24.808594 16.546875 24.609375 16.605469 24.441406 16.71875 C 23.984375 17.023438 23.859375 17.644531 24.167969 18.105469 C 24.472656 18.5625 25.09375 18.6875 25.554688 18.378906 C 26.015625 18.074219 26.136719 17.453125 25.832031 16.996094 C 25.648438 16.71875 25.339844 16.550781 25.011719 16.546875 Z M 55.015625 16.546875 C 54.675781 16.542969 54.355469 16.710938 54.167969 16.996094 C 53.859375 17.453125 53.984375 18.074219 54.441406 18.378906 C 54.902344 18.6875 55.523438 18.5625 55.828125 18.105469 C 55.976563 17.886719 56.03125 17.613281 55.980469 17.355469 C 55.929688 17.09375 55.777344 16.863281 55.554688 16.71875 C 55.394531 16.609375 55.210938 16.550781 55.015625 16.546875 Z M 20.921875 19.90625 C 20.652344 19.90625 20.390625 20.011719 20.203125 20.203125 C 19.8125 20.589844 19.8125 21.226563 20.203125 21.613281 C 20.589844 22.003906 21.226563 22.003906 21.613281 21.613281 C 22.003906 21.226563 22.003906 20.589844 21.613281 20.203125 C 21.429688 20.015625 21.183594 19.910156 20.921875 19.90625 Z M 59.105469 19.90625 C 58.835938 19.90625 58.574219 20.011719 58.386719 20.203125 C 57.996094 20.589844 57.996094 21.226563 58.386719 21.613281 C 58.773438 22.003906 59.410156 22.003906 59.796875 21.613281 C 60.1875 21.226563 60.1875 20.589844 59.796875 20.203125 C 59.613281 20.015625 59.367188 19.910156 59.105469 19.90625 Z M 13.410156 21.222656 C 13.070313 21.214844 12.75 21.382813 12.5625 21.667969 C 12.253906 22.125 12.378906 22.746094 12.839844 23.050781 C 13.296875 23.359375 13.917969 23.234375 14.222656 22.777344 C 14.53125 22.316406 14.40625 21.699219 13.949219 21.390625 C 13.789063 21.285156 13.605469 21.226563 13.410156 21.222656 Z M 62.460938 24 C 62.257813 23.996094 62.0625 24.054688 61.894531 24.167969 C 61.4375 24.472656 61.3125 25.09375 61.621094 25.550781 C 61.925781 26.011719 62.546875 26.136719 63.003906 25.828125 C 63.464844 25.519531 63.589844 24.902344 63.28125 24.441406 C 63.097656 24.167969 62.789063 24 62.460938 24 Z M 17.566406 24 C 17.226563 23.992188 16.90625 24.160156 16.71875 24.441406 C 16.414063 24.902344 16.535156 25.523438 16.996094 25.828125 C 17.457031 26.136719 18.074219 26.011719 18.382813 25.554688 C 18.6875 25.09375 18.566406 24.472656 18.105469 24.167969 C 17.945313 24.0625 17.761719 24.003906 17.566406 24 Z M 39 26 L 39 49.585938 L 32.207031 42.792969 L 30.792969 44.207031 L 40 53.414063 L 49.207031 44.207031 L 47.792969 42.792969 L 41 49.585938 L 41 26 Z M 10.457031 26.75 C 10.046875 26.742188 9.667969 26.988281 9.511719 27.371094 C 9.300781 27.878906 9.542969 28.464844 10.050781 28.675781 C 10.5625 28.886719 11.148438 28.644531 11.359375 28.136719 C 11.570313 27.625 11.328125 27.039063 10.816406 26.828125 C 10.703125 26.78125 10.582031 26.753906 10.457031 26.75 Z M 64.953125 28.667969 C 64.820313 28.664063 64.6875 28.691406 64.5625 28.742188 C 64.050781 28.953125 63.808594 29.539063 64.019531 30.046875 C 64.234375 30.558594 64.816406 30.800781 65.328125 30.589844 C 65.839844 30.378906 66.082031 29.792969 65.871094 29.28125 C 65.714844 28.914063 65.355469 28.667969 64.953125 28.667969 Z M 15.078125 28.667969 C 14.664063 28.660156 14.289063 28.902344 14.132813 29.285156 C 13.921875 29.796875 14.164063 30.378906 14.671875 30.59375 C 15.183594 30.804688 15.769531 30.5625 15.980469 30.050781 C 16.191406 29.539063 15.949219 28.957031 15.4375 28.746094 C 15.324219 28.695313 15.203125 28.671875 15.078125 28.667969 Z M 8.640625 32.757813 C 8.152344 32.746094 7.730469 33.085938 7.632813 33.5625 C 7.527344 34.105469 7.878906 34.628906 8.421875 34.738281 C 8.679688 34.789063 8.949219 34.734375 9.171875 34.589844 C 9.390625 34.441406 9.542969 34.210938 9.59375 33.953125 C 9.703125 33.410156 9.351563 32.882813 8.8125 32.777344 C 8.753906 32.765625 8.699219 32.757813 8.640625 32.757813 Z M 66.484375 33.734375 C 66.417969 33.730469 66.351563 33.738281 66.285156 33.75 C 65.746094 33.859375 65.394531 34.386719 65.5 34.925781 C 65.609375 35.46875 66.136719 35.820313 66.675781 35.714844 C 67.21875 35.605469 67.570313 35.078125 67.464844 34.535156 C 67.371094 34.070313 66.960938 33.734375 66.484375 33.734375 Z M 13.546875 33.734375 C 13.058594 33.722656 12.636719 34.058594 12.539063 34.535156 C 12.488281 34.796875 12.539063 35.070313 12.6875 35.289063 C 12.835938 35.511719 13.066406 35.664063 13.328125 35.714844 C 13.585938 35.765625 13.855469 35.710938 14.078125 35.566406 C 14.296875 35.417969 14.449219 35.1875 14.5 34.925781 C 14.609375 34.386719 14.257813 33.859375 13.71875 33.75 C 13.660156 33.742188 13.605469 33.734375 13.546875 33.734375 Z M 8 39 C 7.449219 39 7 39.449219 7 40 C 7 40.550781 7.449219 41 8 41 C 8.550781 41 9 40.550781 9 40 C 9 39.449219 8.550781 39 8 39 Z M 13 39 C 12.449219 39 12 39.449219 12 40 C 12 40.550781 12.449219 41 13 41 C 13.550781 41 14 40.550781 14 40 C 14 39.449219 13.550781 39 13 39 Z M 67 39 C 66.449219 39 66 39.449219 66 40 C 66 40.550781 66.449219 41 67 41 C 67.550781 41 68 40.550781 68 40 C 68 39.449219 67.550781 39 67 39 Z M 13.523438 44.265625 C 13.457031 44.265625 13.390625 44.273438 13.324219 44.285156 C 12.78125 44.394531 12.429688 44.921875 12.539063 45.464844 C 12.648438 46.003906 13.171875 46.355469 13.714844 46.25 C 14.257813 46.140625 14.609375 45.613281 14.5 45.074219 C 14.40625 44.605469 14 44.269531 13.523438 44.265625 Z M 66.507813 44.265625 C 66.019531 44.253906 65.597656 44.59375 65.5 45.074219 C 65.394531 45.613281 65.746094 46.140625 66.285156 46.25 C 66.828125 46.355469 67.355469 46.003906 67.464844 45.464844 C 67.570313 44.921875 67.21875 44.394531 66.675781 44.285156 C 66.621094 44.277344 66.566406 44.269531 66.507813 44.265625 Z M 8.617188 45.246094 C 8.550781 45.242188 8.484375 45.25 8.421875 45.265625 C 7.878906 45.371094 7.527344 45.898438 7.632813 46.4375 C 7.742188 46.980469 8.269531 47.332031 8.8125 47.222656 C 9.351563 47.117188 9.703125 46.589844 9.59375 46.046875 C 9.503906 45.582031 9.09375 45.246094 8.617188 45.246094 Z M 64.96875 49.328125 C 64.554688 49.320313 64.179688 49.566406 64.019531 49.949219 C 63.808594 50.457031 64.050781 51.042969 64.5625 51.253906 C 65.074219 51.464844 65.65625 51.222656 65.871094 50.714844 C 66.082031 50.203125 65.839844 49.617188 65.328125 49.40625 C 65.214844 49.359375 65.089844 49.332031 64.96875 49.328125 Z M 15.0625 49.332031 C 14.929688 49.332031 14.796875 49.355469 14.671875 49.40625 C 14.429688 49.507813 14.234375 49.703125 14.132813 49.949219 C 14.03125 50.195313 14.03125 50.46875 14.128906 50.714844 C 14.34375 51.226563 14.925781 51.46875 15.4375 51.253906 C 15.683594 51.15625 15.878906 50.960938 15.980469 50.714844 C 16.082031 50.46875 16.082031 50.195313 15.980469 49.949219 C 15.828125 49.578125 15.464844 49.335938 15.0625 49.332031 Z M 10.441406 51.246094 C 10.308594 51.246094 10.179688 51.269531 10.054688 51.324219 C 9.542969 51.535156 9.300781 52.117188 9.515625 52.628906 C 9.726563 53.140625 10.308594 53.382813 10.820313 53.171875 C 11.332031 52.957031 11.574219 52.375 11.359375 51.863281 C 11.207031 51.492188 10.84375 51.25 10.441406 51.246094 Z M 62.46875 54 C 62.128906 53.992188 61.808594 54.160156 61.621094 54.441406 C 61.3125 54.902344 61.4375 55.519531 61.894531 55.828125 C 62.113281 55.976563 62.386719 56.03125 62.644531 55.976563 C 62.90625 55.925781 63.136719 55.773438 63.28125 55.550781 C 63.589844 55.09375 63.464844 54.472656 63.003906 54.167969 C 62.847656 54.058594 62.660156 54 62.46875 54 Z M 17.5625 54 C 17.359375 53.996094 17.164063 54.054688 16.996094 54.167969 C 16.539063 54.476563 16.414063 55.09375 16.71875 55.554688 C 17.027344 56.011719 17.648438 56.136719 18.109375 55.828125 C 18.566406 55.523438 18.691406 54.902344 18.382813 54.441406 C 18.199219 54.167969 17.890625 54.003906 17.5625 54 Z M 13.40625 56.777344 C 13.203125 56.773438 13.007813 56.832031 12.839844 56.945313 C 12.378906 57.25 12.257813 57.871094 12.5625 58.332031 C 12.867188 58.792969 13.488281 58.914063 13.949219 58.609375 C 14.171875 58.460938 14.324219 58.234375 14.375 57.972656 C 14.429688 57.710938 14.375 57.441406 14.226563 57.21875 C 14.042969 56.945313 13.734375 56.78125 13.40625 56.777344 Z M 20.921875 58.09375 C 20.652344 58.089844 20.390625 58.195313 20.203125 58.386719 C 19.8125 58.773438 19.8125 59.410156 20.203125 59.796875 C 20.589844 60.1875 21.226563 60.1875 21.613281 59.796875 C 22.003906 59.410156 22.003906 58.773438 21.613281 58.386719 C 21.429688 58.199219 21.183594 58.09375 20.921875 58.09375 Z M 59.105469 58.09375 C 58.835938 58.089844 58.574219 58.195313 58.386719 58.386719 C 57.996094 58.773438 57.996094 59.410156 58.386719 59.796875 C 58.773438 60.1875 59.410156 60.1875 59.796875 59.796875 C 60.1875 59.410156 60.1875 58.773438 59.796875 58.386719 C 59.613281 58.199219 59.367188 58.09375 59.105469 58.09375 Z M 25.019531 61.449219 C 24.679688 61.441406 24.359375 61.609375 24.171875 61.890625 C 23.863281 62.351563 23.988281 62.972656 24.449219 63.28125 C 24.90625 63.585938 25.527344 63.460938 25.832031 63.003906 C 26.140625 62.542969 26.015625 61.925781 25.558594 61.617188 C 25.398438 61.511719 25.210938 61.449219 25.019531 61.449219 Z M 55.011719 61.449219 C 54.808594 61.445313 54.613281 61.503906 54.445313 61.613281 C 54.222656 61.761719 54.070313 61.992188 54.019531 62.253906 C 53.96875 62.511719 54.023438 62.785156 54.171875 63.003906 C 54.476563 63.460938 55.097656 63.585938 55.558594 63.28125 C 56.015625 62.972656 56.140625 62.351563 55.832031 61.890625 C 55.652344 61.617188 55.34375 61.449219 55.011719 61.449219 Z M 17.386719 61.625 C 17.117188 61.621094 16.855469 61.726563 16.664063 61.921875 C 16.273438 62.308594 16.273438 62.945313 16.664063 63.332031 C 16.851563 63.523438 17.105469 63.628906 17.371094 63.628906 C 17.636719 63.628906 17.890625 63.523438 18.078125 63.332031 C 18.46875 62.941406 18.46875 62.308594 18.078125 61.921875 C 17.894531 61.734375 17.648438 61.632813 17.386719 61.625 Z M 29.691406 63.941406 C 29.277344 63.933594 28.902344 64.179688 28.746094 64.5625 C 28.535156 65.070313 28.777344 65.65625 29.285156 65.867188 C 29.796875 66.078125 30.382813 65.835938 30.59375 65.328125 C 30.804688 64.816406 30.5625 64.230469 30.050781 64.019531 C 29.9375 63.972656 29.816406 63.945313 29.691406 63.941406 Z M 50.339844 63.941406 C 50.207031 63.941406 50.074219 63.96875 49.953125 64.019531 C 49.707031 64.121094 49.511719 64.316406 49.410156 64.558594 C 49.308594 64.804688 49.308594 65.082031 49.40625 65.328125 C 49.621094 65.835938 50.203125 66.078125 50.714844 65.867188 C 50.960938 65.765625 51.15625 65.570313 51.257813 65.328125 C 51.359375 65.082031 51.359375 64.804688 51.257813 64.5625 C 51.105469 64.1875 50.742188 63.945313 50.339844 63.941406 Z M 34.761719 65.480469 C 34.273438 65.46875 33.847656 65.808594 33.753906 66.285156 C 33.644531 66.828125 33.996094 67.351563 34.539063 67.460938 C 35.082031 67.570313 35.605469 67.21875 35.714844 66.675781 C 35.824219 66.132813 35.472656 65.609375 34.929688 65.5 C 34.875 65.488281 34.816406 65.480469 34.761719 65.480469 Z M 45.269531 65.484375 C 45.203125 65.480469 45.136719 65.488281 45.074219 65.5 C 44.53125 65.609375 44.179688 66.132813 44.285156 66.675781 C 44.339844 66.9375 44.492188 67.164063 44.710938 67.3125 C 44.933594 67.460938 45.203125 67.515625 45.464844 67.464844 C 45.722656 67.410156 45.953125 67.257813 46.101563 67.039063 C 46.246094 66.816406 46.300781 66.546875 46.25 66.285156 C 46.15625 65.820313 45.746094 65.484375 45.269531 65.484375 Z M 40 66 C 39.449219 66 39 66.449219 39 67 C 39 67.550781 39.449219 68 40 68 C 40.550781 68 41 67.550781 41 67 C 41 66.449219 40.550781 66 40 66 Z"
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1}
      />
    </AnimatedIcon>
  )
}

export default SubmitSvg

