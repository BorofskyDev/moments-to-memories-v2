'use client'

import { motion } from 'framer-motion'
import { flashAnimation } from '../animations/flashAnimation'


function FlashWrapper({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={flashAnimation}
      initial='hidden'
      whileInView={['flash', 'visible']}
      viewport={{ once: false, amount: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default FlashWrapper
