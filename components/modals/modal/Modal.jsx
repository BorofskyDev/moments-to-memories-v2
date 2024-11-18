// components/galleries/carousel-gallery/modal/Modal.jsx

'use client'

import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import styles from './Modal.module.scss'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const Modal = ({ isOpen, onClose, children }) => (
  <motion.div
    className={styles.modal}
    onClick={onClose}
    role='dialog'
    aria-modal='true'
    aria-label='Expanded Image Modal'
    variants={backdropVariants}
    initial='hidden'
    animate='visible'
    exit='hidden'
  >
    <div
      className={styles.modal__modalContent}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </motion.div>
)

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
