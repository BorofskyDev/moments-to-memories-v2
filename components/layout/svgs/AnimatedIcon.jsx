// components/AnimatedIcon.jsx
'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import PropTypes from 'prop-types'

const AnimatedIcon = ({
  children,
  width = 80,
  height = 80,
  viewBox = '0 0 80 80',
  className = '',
  animationDuration = 1.5,
  id,
  ...props
}) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false }) // Adjust 'once' as needed

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  }

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else {
      controls.set('hidden')
    }
  }, [isInView, controls])

  return (
    <motion.svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === 'path' || child.type === motion.path) {
            return (
              <motion.path
                {...child.props}
                variants={pathVariants}
                initial='hidden'
                animate={controls}
                transition={{ duration: animationDuration, ease: 'easeInOut' }}
              />
            )
          }
          return child
        }
        return child
      })}
    </motion.svg>
  )
}

AnimatedIcon.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  viewBox: PropTypes.string,
  className: PropTypes.string,
  animationDuration: PropTypes.number,
  id: PropTypes.string,
}

export default AnimatedIcon
