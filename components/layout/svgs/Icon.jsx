
'use client'


import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const Icon = ({
  children,
  width = 80,
  height = 80,
  viewBox = '0 0 80 80',
  className = '',
  initial = 'hidden',
  animate = 'visible',
  transition = { duration: 2 },
  onViewportEnter,
  onViewportLeave,
  viewport = { amount: 0.5 },
  ...props
}) => (
  <motion.svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox={viewBox}
    initial={initial}
    animate={animate}
    transition={transition}
    onViewportEnter={onViewportEnter}
    onViewportLeave={onViewportLeave}
    viewport={viewport}
    className={className}
    {...props}
  >
    {children}
  </motion.svg>
)

Icon.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  viewBox: PropTypes.string,
  className: PropTypes.string,
  initial: PropTypes.string,
  animate: PropTypes.string,
  transition: PropTypes.object,
  onViewportEnter: PropTypes.func,
  onViewportLeave: PropTypes.func,
  viewport: PropTypes.object,
}

export default Icon
