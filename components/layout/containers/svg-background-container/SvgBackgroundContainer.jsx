// components/SvgBackgroundContainer.jsx
import PropTypes from 'prop-types'
import styles from './SvgBackgroundContainer.module.scss'
import Image from 'next/image'

function SvgBackgroundContainer({ src, className, style }) {
  return (
    <Image
      src={src}
      className={`${styles.svgBackgroundContainer} ${className}`}
      style={style}
      alt='' 
      aria-hidden='true' 
      width={1920}
      height={1080}
    />
  )
}

SvgBackgroundContainer.propTypes = {
  src: PropTypes.string.isRequired, // Path to the SVG in public folder
  className: PropTypes.string, // Additional CSS classes
  style: PropTypes.object, // Inline styles
}

SvgBackgroundContainer.defaultProps = {
  className: '',
  style: {},
}

export default SvgBackgroundContainer
