import FlashWrapper from '@/libs/hoc/FlashWrapper'
import styles from './Subheading.module.scss'

function Subheading({ children, className }) {
  return (
    <FlashWrapper>
      <h4 className={`${styles.subheading} ${className}`}>{children}</h4>
    </FlashWrapper>
  )
}

export default Subheading
