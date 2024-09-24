// components/SvgBackgroundContainer.jsx
import PropTypes from 'prop-types'
import styles from './SvgBackgroundContainer.module.scss'

function SvgBackgroundContainer({ src, className, style }) {
  return (
    <img
      src={src}
      className={`${styles.svgBackgroundContainer} ${className}`}
      style={style}
      alt='' 
      aria-hidden='true' 
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
