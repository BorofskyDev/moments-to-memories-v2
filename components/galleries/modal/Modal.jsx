// components/galleries/carousel-gallery/modal/Modal.jsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import styles from './Modal.module.scss'

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role='dialog'
        aria-modal='true'
        aria-label='Expanded Image Modal'
      >
        <motion.div
          className={styles.modal__modalContent}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
