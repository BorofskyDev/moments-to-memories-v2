// components/PhotoSvg.jsx
'use client'

import React from 'react'
import { useId } from 'react'
import AnimatedIcon from '../AnimatedIcon'

function FacebookSvg() {
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
        d="M 40 7 C 21.786552 7 7 21.786552 7 40 C 7 56.534138 19.190083 70.207574 35.068359 72.59375 L 36.216797 72.765625 L 36.216797 48.480469 L 28.298828 48.480469 L 28.298828 42.068359 L 36.216797 42.068359 L 36.216797 36.472656 C 36.216797 32.00156 37.295889 28.958482 39.158203 27.021484 C 41.020517 25.084486 43.758652 24.136719 47.433594 24.136719 C 50.58148 24.136719 51.960918 24.338042 52.996094 24.472656 L 52.996094 29.876953 L 48.744141 29.876953 C 46.79354 29.876953 45.275087 30.918632 44.445312 32.367188 C 43.615538 33.815742 43.332031 35.614754 43.332031 37.470703 L 43.332031 42.068359 L 52.75 42.068359 L 51.757812 48.480469 L 43.333984 48.480469 L 43.333984 72.818359 L 44.46875 72.664062 C 60.572518 70.479017 73 56.695844 73 40 C 73 21.786552 58.213448 7 40 7 z M 40 9 C 57.132552 9 71 22.867448 71 40 C 71 55.298793 59.894326 67.878434 45.333984 70.419922 L 45.333984 67.478516 A 1 1 0 0 0 46.267578 66.480469 A 1 1 0 0 0 45.333984 65.484375 L 45.333984 50.480469 L 53.472656 50.480469 L 55.082031 40.068359 L 45.332031 40.068359 L 45.332031 37.470703 C 45.332031 35.832652 45.621212 34.336272 46.179688 33.361328 C 46.738163 32.386384 47.425741 31.876953 48.744141 31.876953 L 54.996094 31.876953 L 54.996094 22.662109 L 54.130859 22.544922 C 53.213225 22.420783 51.170943 22.136719 47.433594 22.136719 C 43.406536 22.136719 40.037483 23.222967 37.716797 25.636719 C 35.396111 28.050471 34.216797 31.676752 34.216797 36.472656 L 34.216797 40.068359 L 26.298828 40.068359 L 26.298828 50.480469 L 34.216797 50.480469 L 34.216797 65.625 A 1 1 0 0 0 33.732422 66.480469 A 1 1 0 0 0 34.216797 67.335938 L 34.216797 70.333984 C 19.879099 67.610897 9 55.139578 9 40 C 9 22.867448 22.867448 9 40 9 z M 40 12 A 1 1 0 0 0 39 13 A 1 1 0 0 0 40 14 A 1 1 0 0 0 41 13 A 1 1 0 0 0 40 12 z M 34.732422 12.519531 A 1 1 0 0 0 33.732422 13.519531 A 1 1 0 0 0 34.732422 14.519531 A 1 1 0 0 0 35.732422 13.519531 A 1 1 0 0 0 34.732422 12.519531 z M 45.267578 12.519531 A 1 1 0 0 0 44.267578 13.519531 A 1 1 0 0 0 45.267578 14.519531 A 1 1 0 0 0 46.267578 13.519531 A 1 1 0 0 0 45.267578 12.519531 z M 29.667969 14.054688 A 1 1 0 0 0 28.667969 15.054688 A 1 1 0 0 0 29.667969 16.054688 A 1 1 0 0 0 30.667969 15.054688 A 1 1 0 0 0 29.667969 14.054688 z M 50.332031 14.054688 A 1 1 0 0 0 49.332031 15.054688 A 1 1 0 0 0 50.332031 16.054688 A 1 1 0 0 0 51.332031 15.054688 A 1 1 0 0 0 50.332031 14.054688 z M 25 16.550781 A 1 1 0 0 0 24 17.550781 A 1 1 0 0 0 25 18.550781 A 1 1 0 0 0 26 17.550781 A 1 1 0 0 0 25 16.550781 z M 55 16.550781 A 1 1 0 0 0 54 17.550781 A 1 1 0 0 0 55 18.550781 A 1 1 0 0 0 56 17.550781 A 1 1 0 0 0 55 16.550781 z M 20.908203 19.908203 A 1 1 0 0 0 19.908203 20.908203 A 1 1 0 0 0 20.908203 21.908203 A 1 1 0 0 0 21.908203 20.908203 A 1 1 0 0 0 20.908203 19.908203 z M 59.091797 19.908203 A 1 1 0 0 0 58.091797 20.908203 A 1 1 0 0 0 59.091797 21.908203 A 1 1 0 0 0 60.091797 20.908203 A 1 1 0 0 0 59.091797 19.908203 z M 17.550781 24 A 1 1 0 0 0 16.550781 25 A 1 1 0 0 0 17.550781 26 A 1 1 0 0 0 18.550781 25 A 1 1 0 0 0 17.550781 24 z M 62.449219 24 A 1 1 0 0 0 61.449219 25 A 1 1 0 0 0 62.449219 26 A 1 1 0 0 0 63.449219 25 A 1 1 0 0 0 62.449219 24 z M 15.054688 28.667969 A 1 1 0 0 0 14.054688 29.667969 A 1 1 0 0 0 15.054688 30.667969 A 1 1 0 0 0 16.054688 29.667969 A 1 1 0 0 0 15.054688 28.667969 z M 64.945312 28.667969 A 1 1 0 0 0 63.945312 29.667969 A 1 1 0 0 0 64.945312 30.667969 A 1 1 0 0 0 65.945312 29.667969 A 1 1 0 0 0 64.945312 28.667969 z M 13.519531 33.732422 A 1 1 0 0 0 12.519531 34.732422 A 1 1 0 0 0 13.519531 35.732422 A 1 1 0 0 0 14.519531 34.732422 A 1 1 0 0 0 13.519531 33.732422 z M 66.480469 33.732422 A 1 1 0 0 0 65.480469 34.732422 A 1 1 0 0 0 66.480469 35.732422 A 1 1 0 0 0 67.480469 34.732422 A 1 1 0 0 0 66.480469 33.732422 z M 13 39 A 1 1 0 0 0 12 40 A 1 1 0 0 0 13 41 A 1 1 0 0 0 14 40 A 1 1 0 0 0 13 39 z M 67 39 A 1 1 0 0 0 66 40 A 1 1 0 0 0 67 41 A 1 1 0 0 0 68 40 A 1 1 0 0 0 67 39 z M 13.519531 44.267578 A 1 1 0 0 0 12.519531 45.267578 A 1 1 0 0 0 13.519531 46.267578 A 1 1 0 0 0 14.519531 45.267578 A 1 1 0 0 0 13.519531 44.267578 z M 66.480469 44.267578 A 1 1 0 0 0 65.480469 45.267578 A 1 1 0 0 0 66.480469 46.267578 A 1 1 0 0 0 67.480469 45.267578 A 1 1 0 0 0 66.480469 44.267578 z M 15.054688 49.332031 A 1 1 0 0 0 14.054688 50.332031 A 1 1 0 0 0 15.054688 51.332031 A 1 1 0 0 0 16.054688 50.332031 A 1 1 0 0 0 15.054688 49.332031 z M 64.945312 49.332031 A 1 1 0 0 0 63.945312 50.332031 A 1 1 0 0 0 64.945312 51.332031 A 1 1 0 0 0 65.945312 50.332031 A 1 1 0 0 0 64.945312 49.332031 z M 17.550781 54 A 1 1 0 0 0 16.550781 55 A 1 1 0 0 0 17.550781 56 A 1 1 0 0 0 18.550781 55 A 1 1 0 0 0 17.550781 54 z M 62.449219 54 A 1 1 0 0 0 61.449219 55 A 1 1 0 0 0 62.449219 56 A 1 1 0 0 0 63.449219 55 A 1 1 0 0 0 62.449219 54 z M 20.908203 58.091797 A 1 1 0 0 0 19.908203 59.091797 A 1 1 0 0 0 20.908203 60.091797 A 1 1 0 0 0 21.908203 59.091797 A 1 1 0 0 0 20.908203 58.091797 z M 59.091797 58.091797 A 1 1 0 0 0 58.091797 59.091797 A 1 1 0 0 0 59.091797 60.091797 A 1 1 0 0 0 60.091797 59.091797 A 1 1 0 0 0 59.091797 58.091797 z M 25 61.449219 A 1 1 0 0 0 24 62.449219 A 1 1 0 0 0 25 63.449219 A 1 1 0 0 0 26 62.449219 A 1 1 0 0 0 25 61.449219 z M 55 61.449219 A 1 1 0 0 0 54 62.449219 A 1 1 0 0 0 55 63.449219 A 1 1 0 0 0 56 62.449219 A 1 1 0 0 0 55 61.449219 z M 29.667969 63.945312 A 1 1 0 0 0 28.667969 64.945312 A 1 1 0 0 0 29.667969 65.945312 A 1 1 0 0 0 30.667969 64.945312 A 1 1 0 0 0 29.667969 63.945312 z M 50.332031 63.945312 A 1 1 0 0 0 49.332031 64.945312 A 1 1 0 0 0 50.332031 65.945312 A 1 1 0 0 0 51.332031 64.945312 A 1 1 0 0 0 50.332031 63.945312 z"
        fill='none'
        stroke={`url(#icon-gradient-${id})`}
        strokeWidth={1} // Increase strokeWidth for visibility
      />
    </AnimatedIcon>
  )
}

export default FacebookSvg

