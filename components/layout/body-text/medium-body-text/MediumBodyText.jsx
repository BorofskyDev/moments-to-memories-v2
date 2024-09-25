'use client'

import { motion } from 'framer-motion'
import styles from './MediumBodyText.module.scss'

function MediumBodyText({ children, className }) {
  return (
    <motion.p
      className={`${className} ${styles.mediumBodyText}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      {children}
    </motion.p>
  )
}

export default MediumBodyText
