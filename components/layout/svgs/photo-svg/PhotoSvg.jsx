'use client'
import { motion, useAnimation } from 'framer-motion'

function PhotoSvg() {
  const controls = useAnimation()

  const maskVariants = {
    hidden: { r: 0 },
    visible: { r: 35 }, 
  }

  const handleViewportEnter = () => {
    controls.start('visible')
  }

  const handleViewportLeave = () => {
    controls.set('hidden')
  }

  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      width='50'
      height='50'
      viewBox='0 0 50 50'
      initial='hidden'
      animate={controls}
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      viewport={{ amount: 0.5 }}
    >
      <defs>
        <radialGradient id='icon-gradient'>
          <stop offset='0%' stopColor='hsl(var(--primary-color))' />
          <stop offset='100%' stopColor='hsl(var(--secondary-color))' />
        </radialGradient>

        <mask id='circle-mask'>
          <motion.circle
            cx='25'
            cy='25'
            fill='white'
            variants={maskVariants}
            initial='hidden'
            animate={controls}
            transition={{ duration: 2 }}
          />
        </mask>
      </defs>

      <motion.path
        d='M 25 2 C 12.305931 2 2 12.305931 2 25 C 2 37.694069 12.305931 48 25 48 C 37.694069 48 48 37.694069 48 25 C 48 12.305931 37.694069 2 25 2 z M 25 4 C 29.971281 4 34.527599 5.729348 38.121094 8.6074219 L 34.152344 20.267578 L 15.203125 6.4257812 C 18.127752 4.8826434 21.457804 4 25 4 z M 13.330078 7.5351562 L 23.308594 14.822266 L 4.3378906 28.742188 C 4.1199608 27.527254 4 26.278476 4 25 C 4 17.708627 7.7023737 11.299002 13.330078 7.5351562 z M 39.744141 10.042969 C 43.605282 13.849266 46 19.1387 46 25 C 46 27.456392 45.574759 29.810656 44.802734 32 L 32.271484 32 L 39.744141 10.042969 z M 25.001953 16.060547 L 33.476562 22.25 L 30.158203 32 L 19.707031 32 L 16.564453 22.251953 L 25.001953 16.060547 z M 14.865234 23.498047 L 22.050781 45.791016 C 13.797639 44.634674 7.0996364 38.69837 4.8320312 30.861328 L 14.865234 23.498047 z M 20.351562 34 L 43.958984 34 C 40.59146 41.093942 33.387039 46 25 46 C 24.735991 46 24.474514 45.990085 24.212891 45.980469 L 20.351562 34 z'
        fill='url(#icon-gradient)'
        mask='url(#circle-mask)'
      />
    </motion.svg>
  )
}

export default PhotoSvg
